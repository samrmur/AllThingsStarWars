import React from 'react'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import {ListItemCardProps} from '@components/core/ListItemCard'
import placeholder from '@assets/star-wars-logo.jpg'
import {useQuery, NetworkStatus} from '@apollo/client'
import FilmListQuery, {FilmListQueryData} from './graphql/FilmListQuery.graphql'
import {useI18n} from '@shopify/react-i18n'

const FilmListScreen = () => {
  const [i18n] = useI18n()

  const {networkStatus, data, error, refetch} = useQuery<
    FilmListQueryData,
    FilmListQueryData.Variables
  >(FilmListQuery, {
    variables: {
      first: 6
    }
  })

  const episodeTitle = i18n.translate('FilmList.episode')
  const producersTitle = i18n.translate('FilmList.producers')

  const films: ListItemCardProps[] =
    data?.allFilms?.edges
      ?.map<ListItemCardProps>(film => {
        const node = film?.node

        return {
          id: node?.episodeID?.toString() ?? '',
          title: `${episodeTitle} ${node?.episodeID}`,
          subtitle: node?.title ?? '',
          content: `${producersTitle}:\n${node?.producers?.join(', ')}` ?? '',
          src: placeholder
        }
      })
      .sort((a, b) => {
        return Number(a.id) - Number(b.id)
      }) ?? []

  return (
    <DoubleColumnListView
      loading={networkStatus == NetworkStatus.loading}
      loadingMore={false}
      refreshing={networkStatus == NetworkStatus.refetch}
      hasNextPage={false}
      style={fullScreenStyle}
      error={error}
      onRefresh={refetch}
      data={films}
    />
  )
}

export default FilmListScreen
