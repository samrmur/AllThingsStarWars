import React, {useCallback} from 'react'
import {ListItemCardProps} from '@components/core/ListItemCard'
import DoubleColumnListView, {
  fullScreenStyle
} from '@components/core/DoubleColumnListView'
import placeholder from '@assets/star-wars-logo.jpg'
import SpeciesListQuery, {
  SpeciesListQueryData
} from './graphql/SpeciesListQuery.graphql'
import {NetworkStatus, useQuery} from '@apollo/client'
import {useI18n} from '@shopify/react-i18n'

const SpeciesListScreen = () => {
  const [i18n] = useI18n()

  const {networkStatus, data, error, refetch, fetchMore} = useQuery<
    SpeciesListQueryData,
    SpeciesListQueryData.Variables
  >(SpeciesListQuery)

  const speaksTitle = i18n.translate('SpeciesList.speaks')
  const classificationTitle = i18n.translate('SpeciesList.classification')
  const designationTitle = i18n.translate('SpeciesList.designation')

  const species: ListItemCardProps[] =
    data?.allSpecies?.edges?.map<ListItemCardProps>(species => {
      const node = species?.node

      return {
        id: node?.id?.toString() ?? '',
        title: node?.name ?? '',
        subtitle: `${speaksTitle} ${node?.language ?? ''}`,
        content: `${classificationTitle}: ${
          node?.classification ?? ''
        }\n${designationTitle}: ${node?.designation ?? ''}`,
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
