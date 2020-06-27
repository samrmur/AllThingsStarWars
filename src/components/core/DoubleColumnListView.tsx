import React from "react"
import { FlatList } from "react-native-gesture-handler"
import { View, StyleProp, ViewStyle, RefreshControl, ActivityIndicator } from "react-native"
import ListItemCard, { ListItemCardProps } from "./ListItemCard"
import { useTheme } from "react-native-paper"

interface DoubleColumnListViewProps {
  loading: boolean,
  loadingMore: boolean,
  refreshing: boolean,
  hasNextPage: boolean,
  onRefresh?: () => void
  data: ListItemCardProps[],
  style?: StyleProp<ViewStyle>
}

const DoubleColumnListView = ({
  loading,
  refreshing,
  loadingMore,
  onRefresh,
  data,
  style
} : DoubleColumnListViewProps) => {
  const theme = useTheme()

  return loading ? (
    <View style={{ ...style as object, justifyContent: 'center' }}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </View>
  ) : (
    <FlatList 
      numColumns={2}
      data={data}
      style={style}
      refreshControl={<RefreshControl onRefresh={onRefresh} tintColor={theme.colors.primary} colors={[theme.colors.primary]} refreshing={refreshing} />}
      keyExtractor={(item) => item.id}
      renderItem={({item, index}) => {
        const paddingStart = index % 2 == 0 ? 10 : 5
        const paddingEnd = index % 2 == 1 ? 10 : 5

        return (
          <View style={{ width: '50%', padding: 10, paddingEnd: paddingEnd, paddingStart: paddingStart }}>
            <ListItemCard id={item.id} title={item.title} subtitle={item.subtitle} content={item.content} src={item.src} />
          </View>
        )
      }}
      ListFooterComponent={loadingMore ? <ActivityIndicator color={theme.colors.primary} size="small" /> : null}
    />
  )
}

export default DoubleColumnListView
