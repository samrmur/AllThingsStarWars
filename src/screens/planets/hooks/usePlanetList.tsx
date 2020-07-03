import {useCallback} from 'react'
import PlanetListQuery, {
  PlanetListQueryData
} from '@data/queries/PlanetListQuery.graphql'
import {useQuery} from '@apollo/react-hooks'

const PAGE_SIZE = 20

const usePlanetList = () => {
  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    PlanetListQueryData,
    PlanetListQueryData.Variables
  >(PlanetListQuery, {
    variables: {
      first: PAGE_SIZE,
      after: null
    },
    notifyOnNetworkStatusChange: true
  })

  const loading = networkStatus === 1
  const loadingMore = networkStatus === 3
  const refreshing = networkStatus === 4
  const hasNextPage = data?.allPlanets?.pageInfo?.hasNextPage ?? false

  const loadMorePlanets = useCallback(() => {
    const endCursor = data?.allPlanets?.pageInfo?.endCursor

    fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: endCursor
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        const allPlanets = fetchMoreResult?.allPlanets

        return allPlanets !== null && allPlanets !== undefined
          ? {
              allPlanets: {
                __typename: allPlanets.__typename,
                edges: [
                  ...(previousResult.allPlanets?.edges ?? []),
                  ...(allPlanets?.edges ?? [])
                ],
                pageInfo: allPlanets.pageInfo
              }
            }
          : previousResult
      }
    })
    // Disabled for now, false psotive returned from eslint. To be fixed in: https://github.com/facebook/react/pull/19062
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, fetchMore])

  return {
    loading,
    refreshing,
    loadingMore,
    hasNextPage,
    data,
    error,
    refreshPlanets: refetch,
    loadMorePlanets
  }
}

export default usePlanetList
