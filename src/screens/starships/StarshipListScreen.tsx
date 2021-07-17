import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {ListItemCardProps} from '@components/core/ListItemCard'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import placeholder from '@assets/star-wars-logo.jpg'
import {NetworkStatus, useQuery} from '@apollo/client'
import StarshipListQuery, {
  StarshipListQueryData
} from './graphql/StarshipListQuery.graphql'

const FIRST = 20

const StarshipListScreen = () => {
  const {t} = useTranslation()

  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    StarshipListQueryData,
    StarshipListQueryData.Variables
  >(StarshipListQuery, {
    variables: {
      first: FIRST
    }
  })

  const starships: ListItemCardProps[] =
    data?.allStarships?.edges?.map<ListItemCardProps>(starship => {
      const node = starship?.node

      return {
        id: node?.id?.toString() ?? '',
        title: node?.name ?? '',
        subtitle: node?.model ?? '',
        content: `${t('starships.class')}:\n${node?.starshipClass ?? ''}`,
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
