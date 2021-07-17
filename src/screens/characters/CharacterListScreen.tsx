import React, {useCallback} from 'react'
import {View, StyleProp, ViewStyle} from 'react-native'
import {useTranslation} from 'react-i18next'
import {ListItemCardProps} from '@components/core/ListItemCard'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import placeholder from '@assets/star-wars-logo.jpg'
import AppbarNavigationHeader from '@components/core/AppbarNavigationHeader'
import {NetworkStatus, useQuery} from '@apollo/client'
import CharacterListQuery, {
  CharacterListQueryData
} from './graphql/CharacterListQuery.graphql'

const viewStyle: StyleProp<ViewStyle> = {
  flexGrow: 1
}

const FIRST = 20

const CharacterListScreen = () => {
  const {t} = useTranslation()

  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    CharacterListQueryData,
    CharacterListQueryData.Variables
  >(CharacterListQuery, {
    variables: {
      first: FIRST
    }
  })

  const characters: ListItemCardProps[] =
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

  const fetchMoreCharacters = useCallback(() => {
    fetchMore({
      variables: {
        first: FIRST,
        after: data?.allPeople?.pageInfo?.endCursor
      }
    })
  }, [data?.allPeople?.pageInfo?.endCursor, fetchMore])

  return (
    <View style={viewStyle}>
      <AppbarNavigationHeader
        title={t('characters.title')}
        subtitle={t('characters.subtitle')}
      />
      <DoubleColumnListView
        loading={networkStatus == NetworkStatus.loading}
        loadingMore={networkStatus == NetworkStatus.fetchMore}
        refreshing={networkStatus == NetworkStatus.refetch}
        hasNextPage={data?.allPeople?.pageInfo?.hasNextPage == true}
        style={fullScreenStyle}
        error={error}
        onRefresh={refetch}
        onLoadMore={fetchMoreCharacters}
        data={characters}
      />
    </View>
  )
}

export default CharacterListScreen
