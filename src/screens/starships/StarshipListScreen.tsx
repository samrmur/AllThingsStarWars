import React, {useCallback} from 'react'
import {ListItemCardProps} from '@components/core/ListItemCard'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import placeholder from '@assets/star-wars-logo.jpg'
import {NetworkStatus, useQuery} from '@apollo/client'
import StarshipListQuery, {
  StarshipListQueryData
} from './graphql/StarshipListQuery.graphql'
import {useI18n} from '@shopify/react-i18n'

const FIRST = 20

const StarshipListScreen = () => {
  const [i18n] = useI18n()

  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    StarshipListQueryData,
    StarshipListQueryData.Variables
  >(StarshipListQuery, {
    variables: {
      first: FIRST
    }
  })

  const starshipClassTitle = i18n.translate('StarshipList.class')

  const starships: ListItemCardProps[] =
    data?.allStarships?.edges?.map<ListItemCardProps>(starship => {
      const node = starship?.node

      return {
        id: node?.id?.toString() ?? '',
        title: node?.name ?? '',
        subtitle: node?.model ?? '',
        content: `${starshipClassTitle}:\n${node?.starshipClass ?? ''}`,
        src: placeholder
      }
    }) ?? []

  const fetchMoreStarships = useCallback(() => {
    fetchMore({
      variables: {
        first: FIRST,
        after: data?.allStarships?.pageInfo?.endCursor
      }
    })
  }, [data?.allStarships?.pageInfo?.endCursor, fetchMore])

  return (
    <DoubleColumnListView
      loading={networkStatus == NetworkStatus.loading}
      loadingMore={networkStatus == NetworkStatus.fetchMore}
      refreshing={networkStatus == NetworkStatus.refetch}
      hasNextPage={data?.allStarships?.pageInfo?.hasNextPage == true}
      onRefresh={refetch}
      onLoadMore={fetchMoreStarships}
      style={fullScreenStyle}
      error={error}
      data={starships}
    />
  )
}

export default StarshipListScreen
