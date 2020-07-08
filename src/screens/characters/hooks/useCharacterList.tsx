import {useQuery} from '@apollo/react-hooks'
import CharacterListQuery, {
  CharacterListQueryData
} from '@data/queries/CharacterListQuery.graphql'
import {useCallback} from 'react'
import {refreshController} from '@helpers/apolloHelpers'

const PAGE_SIZE = 20

const useCharacterList = () => {
  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    CharacterListQueryData,
    CharacterListQueryData.Variables
  >(CharacterListQuery, {
    variables: {
      first: PAGE_SIZE,
      after: null
    },
    notifyOnNetworkStatusChange: true
  })

  const loading = networkStatus === 1
  const loadingMore = networkStatus === 3
  const refreshing = networkStatus === 4
  const hasNextPage = data?.allPeople?.pageInfo?.hasNextPage ?? false

  const loadMoreCharacters = useCallback(() => {
    const endCursor = data?.allPeople?.pageInfo?.endCursor

    fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: endCursor
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        const allPeople = fetchMoreResult?.allPeople

        return allPeople !== null && allPeople !== undefined
          ? {
              allPeople: {
                __typename: allPeople.__typename,
                edges: [
                  ...(previousResult.allPeople?.edges ?? []),
                  ...(allPeople?.edges ?? [])
                ],
                pageInfo: allPeople.pageInfo
              }
            }
          : previousResult
      }
    })
    // Disabled for now, false psotive returned from eslint. To be fixed in: https://github.com/facebook/react/pull/19062
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, fetchMore])

  const refreshCharacters = useCallback(() => {
    refreshController(refetch)
  }, [refetch])

  return {
    loading,
    refreshing,
    loadingMore,
    hasNextPage,
    data,
    error,
    refreshCharacters,
    loadMoreCharacters
  }
}

export default useCharacterList
