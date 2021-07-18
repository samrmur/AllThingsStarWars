import React, {useCallback} from 'react'
import {ListItemCardProps} from '@components/core/ListItemCard'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import placeholder from '@assets/star-wars-logo.jpg'
import {NetworkStatus, useQuery} from '@apollo/client'
import CharacterListQuery, {
  CharacterListQueryData
} from './graphql/CharacterListQuery.graphql'
import {useI18n} from '@shopify/react-i18n'

const FIRST = 20

const CharacterListScreen = () => {
  const [i18n] = useI18n()

  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    CharacterListQueryData,
    CharacterListQueryData.Variables
  >(CharacterListQuery, {
    variables: {
      first: FIRST
    }
  })

  const fromTitle = i18n.translate('CharacterList.from')
  const speciesTitle = i18n.translate('CharacterList.species')
  const birthYearTitle = i18n.translate('CharacterList.birthYear')

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
        subtitle: `${fromTitle}: ${node?.homeworld?.name ?? ''}`,
        content: `${speciesTitle}: ${species ?? ''}\n${birthYearTitle}: ${
          node?.birthYear?.toString() ?? ''
        }`,
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
  )
}

export default CharacterListScreen
