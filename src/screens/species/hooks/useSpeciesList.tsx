import {useCallback} from 'react'
import SpeciesListQuery, {
  SpeciesListQueryData
} from '@data/queries/SpeciesListQuery.graphql'
import {useQuery} from '@apollo/react-hooks'

const PAGE_SIZE = 20

const useSpeciesList = () => {
  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    SpeciesListQueryData,
    SpeciesListQueryData.Variables
  >(SpeciesListQuery, {
    variables: {
      first: PAGE_SIZE,
      after: null
    },
    notifyOnNetworkStatusChange: true
  })

  const loading = networkStatus === 1
  const loadingMore = networkStatus === 3
  const refreshing = networkStatus === 4
  const hasNextPage = data?.allSpecies?.pageInfo?.hasNextPage ?? false

  const loadMoreSpecies = useCallback(() => {
    const endCursor = data?.allSpecies?.pageInfo?.endCursor

    fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: endCursor
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        const allSpecies = fetchMoreResult?.allSpecies

        return allSpecies !== null && allSpecies !== undefined
          ? {
              allSpecies: {
                __typename: allSpecies.__typename,
                edges: [
                  ...(previousResult.allSpecies?.edges ?? []),
                  ...(allSpecies?.edges ?? [])
                ],
                pageInfo: allSpecies.pageInfo
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
    refreshSpecies: refetch,
    loadMoreSpecies
  }
}

export default useSpeciesList
