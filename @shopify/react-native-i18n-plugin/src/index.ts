import path from 'path'
import glob from 'glob'
import stringHash from 'string-hash'
import {camelCase} from 'change-case'

import type {BabelFile} from '@babel/core'
import {TemplateBuilder} from '@babel/template'
import Types from '@babel/types'
import {Node, NodePath} from '@babel/traverse'

import {i18nCallExpression, translationsImport} from './babel-templates'
import {TranslationDefinition} from './types'
import {DEFAULT_FALLBACK_LOCALE, TRANSLATION_DIRECTORY_NAME} from './shared'

export const I18N_CALL_NAMES = ['useI18n', 'withI18n']

export interface Options {
  defaultLocale?: string
}

interface State {
  program: NodePath<Types.Program>
  opts: Options
}

// Direct copy of https://github.com/Shopify/quilt/blob/main/packages/react-i18n/src/babel-plugin/index.ts with
// changes that use static injection over dynamic injection since dynamic imports are not supported by React Native.
export default function injectWithStaticI18nArguments({
  types: t,
  template
}: {
  types: typeof Types
  template: TemplateBuilder<Types.ImportDeclaration | Types.ObjectExpression>
}) {
  function addI18nArguments({
    binding,
    bindingName,
    filename,
    fallbackLocale,
    generateUidIdentifier,
    insertImports,
    rewritei18nCall
  }) {
    const {referencePaths} = binding

    const referencePathsToRewrite = referencePaths.filter(referencePath => {
      const parent: Node = referencePath.parent
      return (
        parent.type === 'CallExpression' &&
        (!parent.arguments || parent.arguments.length === 0)
      )
    })

    if (referencePathsToRewrite.length === 0) {
      return
    }

    if (referencePathsToRewrite.length > 1) {
      throw new Error(
        `You attempted to use ${bindingName} ${referencePathsToRewrite.length} times in a single file. This is not supported by the Babel plugin that automatically inserts translations.`
      )
    }

    const translationFilePaths = getTranslationFilePaths(
      filename,
      TRANSLATION_DIRECTORY_NAME
    )

    if (translationFilePaths.length === 0) {
      return
    }

    const translations = translationFilePaths
      .map(filePath => path.basename(filePath, path.extname(filePath)))
      .filter(locale => locale !== fallbackLocale)
      .sort()
      .map(locale => {
        return {
          id: generateUidIdentifier(locale),
          locale: locale
        }
      })

    insertImports(translations)
    rewritei18nCall(referencePathsToRewrite[0], translations)
  }

  return {
    visitor: {
      Program(nodePath: NodePath<Types.Program>, state: State) {
        state.program = nodePath
      },
      ImportDeclaration(
        this: {file: BabelFile},
        nodePath: NodePath<Types.ImportDeclaration>,
        state: State
      ) {
        if (nodePath.node.source.value !== '@shopify/react-i18n') {
          return
        }

        const {specifiers} = nodePath.node
        specifiers.forEach(specifier => {
          if (
            !t.isImportSpecifier(specifier) ||
            !I18N_CALL_NAMES.includes(
              (specifier.imported as Types.Identifier).name
            )
          ) {
            return
          }

          const bindingName = specifier.local.name
          const binding = nodePath.scope.getBinding(bindingName)

          if (!binding) {
            return
          }

          const {defaultLocale} = state.opts
          const fallbackLocale = defaultLocale
            ? defaultLocale
            : DEFAULT_FALLBACK_LOCALE

          const fallbackID = nodePath.scope.generateUidIdentifier(
            camelCase(fallbackLocale)
          ).name
          const {filename} = this.file.opts

          if (typeof filename !== 'string') {
            throw new Error(
              `You attempted to run the react-i18n plugin on code without specifying an input filename. A filename is required to sucessfully inject translation information.`
            )
          }

          addI18nArguments({
            binding,
            bindingName,
            filename,
            fallbackLocale,
            generateUidIdentifier(locale) {
              return nodePath.scope.generateUidIdentifier(camelCase(locale))
                .name
            },
            insertImports(translations) {
              const {program} = state

              translations.forEach((translation: TranslationDefinition) => {
                program.node.body.unshift(
                  translationsImport(template, {
                    id: translation.id,
                    locale: translation.locale
                  })
                )
              })

              program.node.body.unshift(
                translationsImport(template, {
                  id: fallbackID,
                  locale: fallbackLocale
                })
              )
            },
            rewritei18nCall(referencePathToRewrite, translations) {
              referencePathToRewrite.parentPath.replaceWith(
                i18nCallExpression(template, {
                  id: generateID(filename),
                  fallbackID,
                  bindingName,
                  translations
                })
              )
            }
          })
        })
      }
    }
  }
}

function getTranslationFilePaths(
  filename: string,
  translationDirName: string
): string[] {
  return glob.sync(
    path.resolve(path.dirname(filename), translationDirName, '*.json'),
    {
      nodir: true
    }
  )
}

// based on postcss-modules implementation
// see https://github.com/css-modules/postcss-modules/blob/60920a97b165885683c41655e4ca594d15ec2aa0/src/generateScopedName.js
function generateID(filename: string) {
  const hash = stringHash(filename).toString(36)
  const extension = path.extname(filename)
  const legible = path.basename(filename, extension)
  return `${legible}_${hash}`
}
