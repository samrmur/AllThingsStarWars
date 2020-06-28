import { useQuery } from "@apollo/react-hooks";
import CharacterListQuery, { CharacterListQueryData } from "@data/queries/CharacterListQuery.graphql";
import { useCallback } from "react";

const PAGE_SIZE = 20

const useCharacterList = () => {
  const {
    networkStatus,
    data,
    error,
    refetch,
    fetchMore
  } = useQuery<CharacterListQueryData, CharacterListQueryData.Variables>(CharacterListQuery, {
    variables: {
      first: PAGE_SIZE,
      after: null
    },
    notifyOnNetworkStatusChange: true
  })

  const loading = networkStatus == 1
  const loadingMore = networkStatus == 3
  const refreshing = networkStatus == 4

  const loadMoreCharacters = useCallback(() => {
    fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: data?.allPeople?.pageInfo?.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const allPeople = fetchMoreResult?.allPeople

        return allPeople !== null && allPeople !== undefined ? {
          allPeople: {
            __typename: allPeople.__typename,
            edges: [...previousResult.allPeople?.edges ?? [], ...allPeople?.edges ?? []],
            pageInfo: allPeople.pageInfo
          }
        } : previousResult
      }
    })
  }, [networkStatus, data])

  return {
    loading,
    refreshing,
    loadingMore,
    data,
    error,
    refreshCharacters: refetch,
    loadMoreCharacters
  }
}

export default useCharacterList