import React from 'react'
import DoubleColumnListView from '@components/core/DoubleColumnListView'
import useFilmList from './hooks/useFilmList'
import {ListItemCardProps} from '@components/core/ListItemCard'
import {useTranslation} from 'react-i18next'
import placeholder from '@assets/star-wars-logo.jpg'

const doubleColumnListViewStyle = {
  height: '100%'
}

const FilmListScreen = () => {
  const {t} = useTranslation()

  const {loading, refreshing, data, refreshFilms} = useFilmList()

  const films: ListItemCardProps[] =
    data?.allFilms?.edges
      ?.map<ListItemCardProps>(film => {
        const node = film?.node

        return {
          id: node?.episodeID?.toString() ?? '',
          title: `${t('films.episode')} ${node?.episodeID}`,
          subtitle: node?.title ?? '',
          content:
            `${t('films.producers')}:\n${node?.producers?.toString()}` ?? '',
          src: placeholder
        }
      })
      .sort((a, b) => {
        return Number(a.id) - Number(b.id)
      }) ?? []

  return (
    <DoubleColumnListView
      loading={loading}
      loadingMore={false}
      refreshing={refreshing}
      hasNextPage={false}
      style={doubleColumnListViewStyle}
      onRefresh={refreshFilms}
      data={films}
    />
  )
}

export default FilmListScreen
