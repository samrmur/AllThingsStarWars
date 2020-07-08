import React, {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {ListItemCardProps} from '@components/core/ListItemCard'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import placeholder from '@assets/star-wars-logo.jpg'
import useSpeciesList from './hooks/useSpeciesList'
import {apolloErrorExtractor} from '@helpers/apolloHelpers'

const SpeciesListScreen = () => {
  const {t} = useTranslation()

  const {
    loading,
    refreshing,
    loadingMore,
    hasNextPage,
    data,
    error,
    refreshSpecies,
    loadMoreSpecies
  } = useSpeciesList()

  const extractedError = useMemo(() => {
    return apolloErrorExtractor(error)
  }, [error])

  const species: ListItemCardProps[] = useMemo(() => {
    return (
      data?.allSpecies?.edges?.map<ListItemCardProps>(species => {
        const node = species?.node

        return {
          id: node?.id?.toString() ?? '',
          title: node?.name ?? '',
          subtitle: `${t('species.speaks')} ${node?.language ?? ''}`,
          content: `${t('species.classification')}: ${
            node?.classification ?? ''
          }\n${t('species.designation')}: ${node?.designation ?? ''}`,
          src: placeholder
        }
      }) ?? []
    )
    // Disabled for now, false psotive returned from eslint. To be fixed in: https://github.com/facebook/react/pull/19062
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <DoubleColumnListView
      loading={loading}
      loadingMore={loadingMore}
      refreshing={refreshing}
      hasNextPage={hasNextPage}
      onRefresh={refreshSpecies}
      onLoadMore={loadMoreSpecies}
      style={fullScreenStyle}
      error={extractedError}
      data={species}
    />
  )
}

export default SpeciesListScreen
