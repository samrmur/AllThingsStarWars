import React, {useMemo} from 'react'
import {View, StyleProp, ViewStyle} from 'react-native'
import {useTranslation} from 'react-i18next'
import useCharacterList from './hooks/useCharacterList'
import {ListItemCardProps} from '@components/core/ListItemCard'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import placeholder from '@assets/star-wars-logo.jpg'
import AppbarNavigationHeader from '@components/core/AppbarNavigationHeader'
import {apolloErrorExtractor} from '@helpers/apolloHelpers'

const viewStyle: StyleProp<ViewStyle> = {
  flexGrow: 1
}

const CharacterListScreen = () => {
  const {t} = useTranslation()

  const {
    loading,
    refreshing,
    loadingMore,
    hasNextPage,
    data,
    error,
    refreshCharacters,
    loadMoreCharacters
  } = useCharacterList()

  const extractedError = useMemo(() => {
    return apolloErrorExtractor(error)
  }, [error])

  const characters: ListItemCardProps[] = useMemo(() => {
    return (
      data?.allPeople?.edges?.map<ListItemCardProps>(character => {
        const node = character?.node
        let species = node?.species?.name

        if (species !== undefined && species !== null && species.length > 9) {
          species = species.substring(0, 9).concat('...')
        }

        return {
          id: node?.id?.toString() ?? '',
          title: node?.name ?? '',
          subtitle: `${t('characters.from')}: ${node?.homeworld?.name ?? ''}`,
          content: `${t('characters.species')}: ${species ?? ''}\n${t(
            'characters.birthYear'
          )}: ${node?.birthYear?.toString() ?? ''}`,
          src: placeholder
        }
      }) ?? []
    )
    // Disabled for now, false psotive returned from eslint. To be fixed in: https://github.com/facebook/react/pull/19062
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <View style={viewStyle}>
      <AppbarNavigationHeader
        title={t('characters.title')}
        subtitle={t('characters.subtitle')}
      />
      <DoubleColumnListView
        loading={loading}
        loadingMore={loadingMore}
        refreshing={refreshing}
        hasNextPage={hasNextPage}
        style={fullScreenStyle}
        error={extractedError}
        onRefresh={refreshCharacters}
        onLoadMore={loadMoreCharacters}
        data={characters}
      />
    </View>
  )
}

export default CharacterListScreen
