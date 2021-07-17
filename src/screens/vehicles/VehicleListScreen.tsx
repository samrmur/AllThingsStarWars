import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {ListItemCardProps} from '@components/core/ListItemCard'
import DoubleColumnListView from '@components/core/DoubleColumnListView'
import placeholder from '@assets/star-wars-logo.jpg'
import VehicleListQuery, {
  VehicleListQueryData
} from './graphql/VehicleListQuery.graphql'
import {NetworkStatus, useQuery} from '@apollo/client'

const doubleColumnListViewStyle = {
  flex: 1
}

const FIRST = 20

const VehicleListScreen = () => {
  const {t} = useTranslation()

  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    VehicleListQueryData,
    VehicleListQueryData.Variables
  >(VehicleListQuery, {
    variables: {
      first: FIRST
    }
  })

  const vehicles: ListItemCardProps[] =
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

  const fetchMoreVehicles = useCallback(() => {
    fetchMore({
      variables: {
        first: FIRST,
        after: data?.allVehicles?.pageInfo?.endCursor
      }
    })
  }, [data?.allVehicles?.pageInfo?.endCursor, fetchMore])

  return (
    <DoubleColumnListView
      loading={networkStatus == NetworkStatus.loading}
      loadingMore={networkStatus == NetworkStatus.fetchMore}
      refreshing={networkStatus == NetworkStatus.refetch}
      hasNextPage={data?.allVehicles?.pageInfo?.hasNextPage == true}
      onRefresh={refetch}
      onLoadMore={fetchMoreVehicles}
      error={error}
      style={doubleColumnListViewStyle}
      data={vehicles}
    />
  )
}

export default VehicleListScreen
