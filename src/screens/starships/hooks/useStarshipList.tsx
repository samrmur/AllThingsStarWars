import {useCallback} from 'react'
import StarshipListQuery, {
  StarshipListQueryData
} from '@data/queries/StarshipListQuery.graphql'
import {useQuery} from '@apollo/react-hooks'
import {refreshController} from '@helpers/apolloHelpers'

const PAGE_SIZE = 20

const useStarshipList = () => {
  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    StarshipListQueryData,
    StarshipListQueryData.Variables
  >(StarshipListQuery, {
    variables: {
      first: PAGE_SIZE,
      after: null
    },
    notifyOnNetworkStatusChange: true
  })

  const loading = networkStatus === 1
  const loadingMore = networkStatus === 3
  const refreshing = networkStatus === 4
  const hasNextPage = data?.allStarships?.pageInfo?.hasNextPage ?? false

  const loadMoreStarships = useCallback(() => {
    const endCursor = data?.allStarships?.pageInfo?.endCursor

    fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: endCursor
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        const allStarships = fetchMoreResult?.allStarships

        return allStarships !== null && allStarships !== undefined
          ? {
              allStarships: {
                __typename: allStarships.__typename,
                edges: [
                  ...(previousResult.allStarships?.edges ?? []),
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

  const refreshStarships = useCallback(() => {
    refreshController(refetch)
  }, [refetch])

  return {
    loading,
    refreshing,
    loadingMore,
    hasNextPage,
    data,
    error,
    refreshStarships,
    loadMoreStarships
  }
}

export default useStarshipList
