import React, {useCallback} from 'react'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import {ListItemCardProps} from '@components/core/ListItemCard'
import {useTranslation} from 'react-i18next'
import placeholder from '@assets/star-wars-logo.jpg'
import {NetworkStatus, useQuery} from '@apollo/client'
import PlanetListQuery, {
  PlanetListQueryData
} from '../../data/queries/PlanetListQuery.graphql'

const FIRST = 20

const PlanetListScreen = () => {
  const {t} = useTranslation()

  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    PlanetListQueryData,
    PlanetListQueryData.Variables
  >(PlanetListQuery, {
    variables: {
      first: FIRST
    }
  })

  const planets: ListItemCardProps[] =
    data?.allPlanets?.edges?.map<ListItemCardProps>(planet => {
      const node = planet?.node

      return {
        id: node?.id?.toString() ?? '',
        title: node?.name ?? '',
        subtitle: `${t('planets.population')}: ${
          node?.population?.toString() ?? ''
        }`,
        content: `${t('planets.diameter')}:\n${
          node?.diameter?.toString() ?? ''
        }`,
        src: placeholder
      }
    }) ?? []

  const fetchMorePlanets = useCallback(() => {
    fetchMore({
      variables: {
        first: FIRST,
        after: data?.allPlanets?.pageInfo?.endCursor
      }
    })
  }, [data?.allPlanets?.pageInfo?.endCursor, fetchMore])

  return (
    <DoubleColumnListView
      loading={networkStatus == NetworkStatus.loading}
      loadingMore={networkStatus == NetworkStatus.fetchMore}
      refreshing={networkStatus == NetworkStatus.refetch}
      hasNextPage={data?.allPlanets?.pageInfo?.hasNextPage == true}
      onRefresh={refetch}
      onLoadMore={fetchMorePlanets}
      style={fullScreenStyle}
      error={error}
      data={planets}
    />
  )
}

export default PlanetListScreen
