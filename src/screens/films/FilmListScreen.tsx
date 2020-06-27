import React from "react"
import DoubleColumnListView from "@components/core/DoubleColumnListView"
import useFilmList from "./hooks/useFilmList"
import { ListItemCardProps } from "@components/core/ListItemCard"

const FilmListScreen = () => {
  const {
    loading,
    data,
    error,
    refreshFilms
  } = useFilmList()

  const films: ListItemCardProps[] = data?.allFilms?.edges?.map<ListItemCardProps>((film) => {
    const node = film?.node

    return {
      id: node?.episodeID?.toString() ?? "",
      title: `Episode ${node?.episodeID}`,
      subtitle: node?.title ?? "",
      content: `Producers:\n${node?.producers?.toString()}` ?? "",
      src: "https://picsum.photos/700"
    }
  }).sort((a, b) => {
    return Number(a.id) - Number(b.id)
  }) ?? []

  return (
    <DoubleColumnListView
      loading={loading}
      loadingMore={false}
      refreshing={false}
      hasNextPage={false}
      style={{ height: "100%" }}
      onRefresh={refreshFilms}
      data={films}
    />
  )
}

export default FilmListScreen