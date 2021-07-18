import {TemplateBuilder} from '@babel/template'
import Types from '@babel/types'
import {TRANSLATION_DIRECTORY_NAME} from './shared'
import {TranslationDefinition} from './types'

export function translationsImport(
  template: TemplateBuilder<Types.ImportDeclaration | Types.ObjectExpression>,
  {id, locale}: {id: string; locale: string}
) {
  return template(
    `import ${id} from './${TRANSLATION_DIRECTORY_NAME}/${locale}.json';`,
    {
      sourceType: 'module'
    }
  )() as Types.ImportDeclaration
}

export function i18nCallExpression(
  template: TemplateBuilder<Types.ImportDeclaration | Types.ObjectExpression>,
  {
    id,
    fallbackID,
    bindingName,
    translations
  }: {
    id: string
    fallbackID: string
    bindingName: string
    translations: TranslationDefinition[]
  }
) {
  const localeIds = translations.map(translation => translation.locale)

  const translationArrayString = `[${localeIds
    .map(id => JSON.stringify(id))
    .join(', ')}]`

  const selectLocaleStatement = localeIds
    .map((id, index) => {
      return `${
        index !== 0 ? 'else ' : ''
      }if (locale === '${id}') { return ${id} }`
    })
    .join(' ')

  return template(
    `${bindingName}({
      id: '${id}',
      fallback: ${fallbackID},
      translations(locale) {
        if (${translationArrayString}.indexOf(locale) < 0) {
          return;
        }
        return (async () => {
          ${selectLocaleStatement}
        })();
      },
    })`,
    {
      sourceType: 'module',
      preserveComments: true
    }
  )()
}
