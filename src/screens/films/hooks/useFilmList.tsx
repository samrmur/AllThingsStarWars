import { useCallback } from "react"
import FilmListQuery, { FilmListQueryQueryData } from "@data/queries/FilmListQuery.graphql"
import { useQuery } from "@apollo/react-hooks"

const PAGE_SIZE = 9

const useFilmList = () => {
  const { 
    data, 
    networkStatus,
    error,
    refetch
  } = useQuery<FilmListQueryQueryData>(FilmListQuery, {
    variables: {
      first: PAGE_SIZE
    },
    notifyOnNetworkStatusChange: true
  })

  const loading = networkStatus == 1
  const refreshing = networkStatus == 4
  const refreshFilms = useCallback(() => {
    refetch()
  }, [refetch])

  return {
    loading,
    refreshing,
    data,
    error,
    refreshFilms
  }
}

export default useFilmList