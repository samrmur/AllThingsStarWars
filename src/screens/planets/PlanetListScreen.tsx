import React, {useCallback} from 'react'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import {ListItemCardProps} from '@components/core/ListItemCard'
import placeholder from '@assets/star-wars-logo.jpg'
import {NetworkStatus, useQuery} from '@apollo/client'
import PlanetListQuery, {
  PlanetListQueryData
} from './graphql/PlanetListQuery.graphql'
import {useI18n} from '@shopify/react-i18n'

const FIRST = 20

const PlanetListScreen = () => {
  const [i18n] = useI18n()

  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    PlanetListQueryData,
    PlanetListQueryData.Variables
  >(PlanetListQuery, {
    variables: {
      first: FIRST
    }
  })

  const populationTitle = i18n.translate('PlanetList.population')
  const diameterTitle = i18n.translate('PlanetList.diameter')

  const planets: ListItemCardProps[] =
    data?.allPlanets?.edges?.map<ListItemCardProps>(planet => {
      const node = planet?.node

      return {
        id: node?.id?.toString() ?? '',
        title: node?.name ?? '',
        subtitle: `${populationTitle}: ${node?.population?.toString() ?? ''}`,
        content: `${diameterTitle}:\n${node?.diameter?.toString() ?? ''}`,
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
