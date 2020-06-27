import { useCallback } from "react"
import FilmListQuery, { FilmListQueryQueryData } from "@data/queries/FilmListQuery.graphql"
import { useQuery } from "@apollo/react-hooks"

const PAGE_SIZE = 9

const useFilmList = () => {
  const { 
    data, 
    loading,
    error,
    refetch
  } = useQuery<FilmListQueryQueryData>(FilmListQuery, {
    variables: {
      first: PAGE_SIZE
    }
  })

  const refreshFilms = useCallback(() => {
    refetch()
  }, [refetch])

  return {
    loading,
    data,
    error,
    refreshFilms
  }
}

export default useFilmList