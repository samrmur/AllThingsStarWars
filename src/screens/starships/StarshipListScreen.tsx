import React, {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {ListItemCardProps} from '@components/core/ListItemCard'
import DoubleColumnListView from '@components/core/DoubleColumnListView'
import placeholder from '@assets/star-wars-logo.jpg'
import useStarshipList from './hooks/useStarshipList'

const doubleColumnListViewStyle = {
  flex: 1
}

const StarshipListScreen = () => {
  const {t} = useTranslation()

  const {
    loading,
    refreshing,
    loadingMore,
    hasNextPage,
    data,
    refreshStarships,
    loadMoreStarships
  } = useStarshipList()

  const starships: ListItemCardProps[] = useMemo(() => {
    return (
      data?.allStarships?.edges?.map<ListItemCardProps>(species => {
        const node = species?.node

        return {
          id: node?.id?.toString() ?? '',
          title: node?.name ?? '',
          subtitle: node?.model ?? '',
          content: `${t('starships.class')}:\n${node?.starshipClass ?? ''}`,
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
      onRefresh={refreshStarships}
      onLoadMore={loadMoreStarships}
      style={doubleColumnListViewStyle}
      data={starships}
    />
  )
}

export default StarshipListScreen
