import React, {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {ListItemCardProps} from '@components/core/ListItemCard'
import DoubleColumnListView from '@components/core/DoubleColumnListView'
import placeholder from '@assets/star-wars-logo.jpg'
import useVehicleList from './hooks/useVehicleList'

const doubleColumnListViewStyle = {
  flex: 1
}

const VehicleListScreen = () => {
  const {t} = useTranslation()

  const {
    loading,
    refreshing,
    loadingMore,
    hasNextPage,
    data,
    refreshVehicles,
    loadMoreVehicles
  } = useVehicleList()

  const vehicles: ListItemCardProps[] = useMemo(() => {
    return (
      data?.allVehicles?.edges?.map<ListItemCardProps>(starship => {
        const node = starship?.node

        return {
          id: node?.id?.toString() ?? '',
          title: node?.name ?? '',
          subtitle: node?.model ?? '',
          content: `${t('vehicles.class')}:\n${node?.vehicleClass ?? ''}`,
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
      onRefresh={refreshVehicles}
      onLoadMore={loadMoreVehicles}
      style={doubleColumnListViewStyle}
      data={vehicles}
    />
  )
}

export default VehicleListScreen
