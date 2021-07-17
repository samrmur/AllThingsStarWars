import React, {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {ListItemCardProps} from '@components/core/ListItemCard'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import placeholder from '@assets/star-wars-logo.jpg'
import SpeciesListQuery, {
  SpeciesListQueryData
} from '../../data/queries/SpeciesListQuery.graphql'
import {NetworkStatus, useQuery} from '@apollo/client'

const SpeciesListScreen = () => {
  const {t} = useTranslation()

  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    SpeciesListQueryData,
    SpeciesListQueryData.Variables
  >(SpeciesListQuery)

  const species: ListItemCardProps[] =
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

  const fetchMoreSpecies = useCallback(() => {
    fetchMore({
      variables: {
        first: 20,
        after: data?.allSpecies?.pageInfo?.endCursor
      }
    })
  }, [data?.allSpecies?.pageInfo?.endCursor, fetchMore])

  return (
    <DoubleColumnListView
      loading={networkStatus == NetworkStatus.loading}
      loadingMore={networkStatus == NetworkStatus.fetchMore}
      refreshing={networkStatus == NetworkStatus.refetch}
      hasNextPage={data?.allSpecies?.pageInfo?.hasNextPage == true}
      onRefresh={refetch}
      onLoadMore={fetchMoreSpecies}
      style={fullScreenStyle}
      error={error}
      data={species}
    />
  )
}

export default SpeciesListScreen
