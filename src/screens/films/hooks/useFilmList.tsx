import FilmListQuery, {
  FilmListQueryData
} from '@data/queries/FilmListQuery.graphql'
import {useQuery} from '@apollo/react-hooks'
import {useCallback} from 'react'
import {refreshController} from '@helpers/apolloHelpers'

const PAGE_SIZE = 9

const useFilmList = () => {
  const {data, networkStatus, error, refetch} = useQuery<FilmListQueryData>(
    FilmListQuery,
    {
      variables: {
        first: PAGE_SIZE
      },
      notifyOnNetworkStatusChange: true
    }
  )

  const loading = networkStatus === 1
  const refreshing = networkStatus === 4

  const refreshFilms = useCallback(() => {
    refreshController(refetch)
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
