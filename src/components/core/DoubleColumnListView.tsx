import React, { useCallback, useMemo } from "react"
import { FlatList } from "react-native-gesture-handler"
import { View, StyleProp, ViewStyle, RefreshControl, ActivityIndicator, ListRenderItem, ListRenderItemInfo } from "react-native"
import ListItemCard, { ListItemCardProps } from "./ListItemCard"
import { useTheme } from "react-native-paper"

interface DoubleColumnListViewProps {
  loading: boolean,
  loadingMore: boolean,
  refreshing: boolean,
  hasNextPage: boolean,
  onRefresh?: () => void,
  onLoadMore?: () => void,
  data: ListItemCardProps[],
  style?: StyleProp<ViewStyle>
}

const DoubleColumnListView = ({
  loading,
  refreshing,
  loadingMore,
  onRefresh,
  onLoadMore,
  data,
  style
} : DoubleColumnListViewProps) => {
  const theme = useTheme()

  const memoizedStyle: StyleProp<ViewStyle> = useMemo(() => {
    return { ...style as object, justifyContent: 'center' }
  }, [])

  const keyExtractor = useCallback((item: ListItemCardProps) => item.id, [])
  const renderItem = useCallback((info: ListRenderItemInfo<ListItemCardProps>) => {
    const index = info.index
    const item = info.item
    const paddingStart = index % 2 == 0 ? 10 : 5
    const paddingEnd = index % 2 == 1 ? 10 : 5
  
    return (
      <View style={{ width: '50%', padding: 10, paddingEnd: paddingEnd, paddingStart: paddingStart }}>
        <ListItemCard id={item.id} title={item.title} subtitle={item.subtitle} content={item.content} src={item.src} />
      </View>
    )
  }, [])

  return loading ? (
    <View style={memoizedStyle}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </View>
  ) : (
    <FlatList 
      numColumns={2}
      data={data}
      style={style}
      refreshControl={<RefreshControl onRefresh={onRefresh} tintColor={theme.colors.primary} colors={[theme.colors.primary]} refreshing={refreshing} />}
      keyExtractor={keyExtractor}
      onEndReached={onLoadMore}
      renderItem={renderItem}
      ListFooterComponent={loadingMore ? <ActivityIndicator color={theme.colors.primary} size="small" /> : null}
    />
  )
}

export default DoubleColumnListView
