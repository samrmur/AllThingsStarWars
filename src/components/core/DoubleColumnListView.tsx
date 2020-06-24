import React from "react"
import { FlatList } from "react-native-gesture-handler"
import { View, StyleProp, ViewStyle, RefreshControl } from "react-native"
import ListItemCard, { ListItemCardProps } from "./ListItemCard"
import { ActivityIndicator } from "react-native-paper"

interface DoubleColumnListViewProps {
  loading: boolean,
  loadingMore: boolean,
  refreshing: boolean,
  data: ListItemCardProps[],
  style?: StyleProp<ViewStyle>
}

const DoubleColumnListView = ({
  refreshing,
  loadingMore,
  data,
  style
} : DoubleColumnListViewProps) => {
  return (
    <FlatList 
      numColumns={2}
      data={data}
      style={style}
      refreshControl={<RefreshControl refreshing={refreshing} />}
      keyExtractor={(item) => item.id}
      renderItem={({item, index}) => {
        const paddingStart = index % 2 == 0 ? 10 : 5
        const paddingEnd = index % 2 == 1 ? 10 : 5

        return (
          <View style={{ width: "50%", padding: 10, paddingEnd: paddingEnd, paddingStart: paddingStart }}>
            <ListItemCard id={item.id} title={item.title} subtitle={item.subtitle} content={item.content} src={item.src} />
          </View>
        )
      }}
      ListFooterComponent={loadingMore ? <ActivityIndicator animating={true} accessibilityStates /> : null}
    />
  )
}

export default React.memo(DoubleColumnListView)
