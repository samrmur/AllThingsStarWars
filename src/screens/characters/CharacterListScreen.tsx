import React from "react"
import { useTranslation } from "react-i18next"
import useCharacterList from "./hooks/useCharacterList"
import { ListItemCardProps } from "@components/core/ListItemCard"
import DoubleColumnListView from "@components/core/DoubleColumnListView"
import placeholder from "@assets/star-wars-logo.jpg"

const doubleColumnListViewStyle = {
  height: "100%"
}

const CharacterListScreen = () => {
  const { t } = useTranslation() 

  const {
    loading,
    refreshing,
    loadingMore,
    hasNextPage,
    data,
    refreshCharacters,
    loadMoreCharacters
  } = useCharacterList()

  const characters: ListItemCardProps[] = data?.allPeople?.edges?.map<ListItemCardProps>((character) => {
    const node = character?.node
    let species = node?.species?.name

    if (species !== undefined && species !== null && species.length > 9) {
      species = species.substring(0, 9).concat("...")
    }

    return {
      id: node?.id?.toString() ?? "",
      title: node?.name ?? "",
      subtitle: `${t('characters.from')}: ${node?.homeworld?.name ?? ""}`,
      content: `${t('characters.species')}: ${species ?? ""}\n${t('characters.birthYear')}: ${node?.birthYear?.toString() ?? ""}`,
      src: placeholder
    }
  }) ?? []

  return (
    <DoubleColumnListView
      loading={loading}
      loadingMore={loadingMore}
      refreshing={refreshing}
      hasNextPage={hasNextPage}
      style={doubleColumnListViewStyle}
      onRefresh={refreshCharacters}
      onLoadMore={loadMoreCharacters}
      data={characters}
    />
  )
}

export default CharacterListScreen
