import React, {useCallback} from 'react'
import {ListItemCardProps} from '@components/core/ListItemCard'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import placeholder from '@assets/star-wars-logo.jpg'
import VehicleListQuery, {
  VehicleListQueryData
} from './graphql/VehicleListQuery.graphql'
import {NetworkStatus, useQuery} from '@apollo/client'
import {useI18n} from '@shopify/react-i18n'

const FIRST = 20

const VehicleListScreen = () => {
  const [i18n] = useI18n()

  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    VehicleListQueryData,
    VehicleListQueryData.Variables
  >(VehicleListQuery, {
    variables: {
      first: FIRST
    }
  })

  const vehicleClassTitle = i18n.translate('VehicleList.class')

  const vehicles: ListItemCardProps[] =
    data?.allVehicles?.edges?.map<ListItemCardProps>(starship => {
      const node = starship?.node

      return {
        id: node?.id?.toString() ?? '',
        title: node?.name ?? '',
        subtitle: node?.model ?? '',
        content: `${vehicleClassTitle}:\n${node?.vehicleClass ?? ''}`,
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
      style={fullScreenStyle}
      data={vehicles}
    />
  )
}

export default VehicleListScreen
