import React from 'react'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import {ListItemCardProps} from '@components/core/ListItemCard'
import {useTranslation} from 'react-i18next'
import placeholder from '@assets/star-wars-logo.jpg'
import AppBarNavigationHeader from '@components/core/AppbarNavigationHeader'
import {View, StyleProp, ViewStyle} from 'react-native'
import {useQuery, NetworkStatus} from '@apollo/client'
import FilmListQuery, {
  FilmListQueryData
} from '../../data/queries/FilmListQuery.graphql'

const viewStyle: StyleProp<ViewStyle> = {
  flexGrow: 1
}

const FilmListScreen = () => {
  const {t} = useTranslation()

  const {networkStatus, data, error, refetch} = useQuery<
    FilmListQueryData,
    FilmListQueryData.Variables
  >(FilmListQuery, {
    variables: {
      first: 6
    }
  })

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
    <View style={viewStyle}>
      <AppBarNavigationHeader
        title={t('films.title')}
        subtitle={t('films.subtitle')}
      />
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
    </View>
  )
}

export default FilmListScreen
