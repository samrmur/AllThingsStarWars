import React, {useMemo} from 'react'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import usePlanetList from './hooks/usePlanetList'
import {ListItemCardProps} from '@components/core/ListItemCard'
import {useTranslation} from 'react-i18next'
import placeholder from '@assets/star-wars-logo.jpg'
import {apolloErrorExtractor} from '@helpers/apolloHelpers'

const PlanetListScreen = () => {
  const {t} = useTranslation()

  const {
    loading,
    refreshing,
    loadingMore,
    hasNextPage,
    data,
    error,
    refreshPlanets,
    loadMorePlanets
  } = usePlanetList()

  const extractedError = useMemo(() => {
    return apolloErrorExtractor(error)
  }, [error])

  const planets: ListItemCardProps[] = useMemo(() => {
    return (
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
    )
    // Disabled for now, false psotive returned from eslint. To be fixed in: https://github.com/facebook/react/pull/19062
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <DoubleColumnListView
      loading={loading}
      loadingMore={loadingMore}
      refreshing={refreshing}
      hasNextPage={hasNextPage}
      onRefresh={refreshPlanets}
      onLoadMore={loadMorePlanets}
      style={fullScreenStyle}
      error={extractedError}
      data={planets}
    />
  )
}

export default PlanetListScreen
