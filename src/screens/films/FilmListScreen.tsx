import React, {useMemo} from 'react'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import useFilmList from './hooks/useFilmList'
import {ListItemCardProps} from '@components/core/ListItemCard'
import {useTranslation} from 'react-i18next'
import placeholder from '@assets/star-wars-logo.jpg'
import AppBarNavigationHeader from '@components/core/AppbarNavigationHeader'
import {View, StyleProp, ViewStyle} from 'react-native'
import {apolloErrorExtractor} from '@helpers/apolloHelpers'

const viewStyle: StyleProp<ViewStyle> = {
  flexGrow: 1
}

const FilmListScreen = () => {
  const {t} = useTranslation()

  const {loading, refreshing, data, error, refreshFilms} = useFilmList()

  const extractedError = useMemo(() => {
    return apolloErrorExtractor(error)
  }, [error])

  const films: ListItemCardProps[] = useMemo(() => {
    return (
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
    )
    // Disabled for now, false psotive returned from eslint. To be fixed in: https://github.com/facebook/react/pull/19062
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <View style={viewStyle}>
      <AppBarNavigationHeader
        title={t('films.title')}
        subtitle={t('films.subtitle')}
      />
      <DoubleColumnListView
        loading={loading}
        loadingMore={false}
        refreshing={refreshing}
        hasNextPage={false}
        style={fullScreenStyle}
        error={extractedError}
        onRefresh={refreshFilms}
        data={films}
      />
    </View>
  )
}

export default FilmListScreen
