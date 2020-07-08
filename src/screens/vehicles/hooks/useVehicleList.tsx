import {useCallback} from 'react'
import VehicleListQuery, {
  VehicleListQueryData
} from '@data/queries/VehicleListQuery.graphql'
import {useQuery} from '@apollo/react-hooks'
import {refreshController} from '@helpers/apolloHelpers'

const PAGE_SIZE = 20

const useVehicleList = () => {
  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    VehicleListQueryData,
    VehicleListQueryData.Variables
  >(VehicleListQuery, {
    variables: {
      first: PAGE_SIZE,
      after: null
    },
    notifyOnNetworkStatusChange: true
  })

  const loading = networkStatus === 1
  const loadingMore = networkStatus === 3
  const refreshing = networkStatus === 4
  const hasNextPage = data?.allVehicles?.pageInfo?.hasNextPage ?? false

  const loadMoreVehicles = useCallback(() => {
    const endCursor = data?.allVehicles?.pageInfo?.endCursor

    fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: endCursor
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        const allStarships = fetchMoreResult?.allVehicles

        return allStarships !== null && allStarships !== undefined
          ? {
              allVehicles: {
                __typename: allStarships.__typename,
                edges: [
                  ...(previousResult.allVehicles?.edges ?? []),
                  ...(allStarships?.edges ?? [])
                ],
                pageInfo: allStarships.pageInfo
              }
            }
          : previousResult
      }
    })
    // Disabled for now, false psotive returned from eslint. To be fixed in: https://github.com/facebook/react/pull/19062
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, fetchMore])

  const refreshVehicles = useCallback(() => {
    refreshController(refetch)
  }, [refetch])

  return {
    loading,
    refreshing,
    loadingMore,
    hasNextPage,
    data,
    error,
    refreshVehicles,
    loadMoreVehicles
  }
}

export default useVehicleList
