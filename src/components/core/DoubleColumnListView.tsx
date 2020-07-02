import React, {useCallback, useMemo} from 'react'
import {FlatList} from 'react-native-gesture-handler'
import {
  View,
  StyleProp,
  ViewStyle,
  RefreshControl,
  ActivityIndicator,
  ListRenderItemInfo
} from 'react-native'
import ListItemCard, {ListItemCardProps} from './ListItemCard'
import {useTheme} from 'react-native-paper'

export interface DoubleColumnListViewProps {
  loading: boolean
  loadingMore: boolean
  refreshing: boolean
  hasNextPage: boolean
  onRefresh?: () => void
  onLoadMore?: () => void
  data: ListItemCardProps[]
  style?: StyleProp<ViewStyle>
}

const DoubleColumnListView = ({
  loading,
  refreshing,
  loadingMore,
  hasNextPage,
  onRefresh,
  onLoadMore,
  data,
  style
}: DoubleColumnListViewProps) => {
  const theme = useTheme()

  const loadingComponent = useMemo(() => {
    const mergedStyle: StyleProp<ViewStyle> = [
      {justifyContent: 'center'},
      style
    ]

    return (
      <View style={mergedStyle}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </View>
    )
  }, [style, theme])

  const refreshControl = useMemo(() => {
    return (
      <RefreshControl
        onRefresh={onRefresh}
        tintColor={theme.colors.primary}
        colors={[theme.colors.primary]}
        refreshing={refreshing}
      />
    )
  }, [onRefresh, refreshing, theme])

  const footer = useMemo(() => {
    return loadingMore ? (
      <ActivityIndicator color={theme.colors.primary} size="small" />
    ) : null
  }, [loadingMore, theme])

  const loadMoreIfPossible = useCallback(() => {
    if (!loading && !loadingMore && !refreshing && hasNextPage) {
      onLoadMore?.()
    }
  }, [loading, loadingMore, refreshing, hasNextPage, onLoadMore])

  const keyExtractor = useCallback((item: ListItemCardProps) => item.id, [])
  const renderItem = useCallback(
    (info: ListRenderItemInfo<ListItemCardProps>) => {
      const index = info.index
      const item = info.item
      const paddingStart = index % 2 === 0 ? 10 : 5
      const paddingEnd = index % 2 === 1 ? 10 : 5

      const viewStyle: StyleProp<ViewStyle> = {
        width: '50%',
        padding: 10,
        paddingEnd: paddingEnd,
        paddingStart: paddingStart
      }

      return (
        <View style={viewStyle}>
          <ListItemCard
            id={item.id}
            title={item.title}
            subtitle={item.subtitle}
            content={item.content}
            src={item.src}
          />
        </View>
      )
    },
    []
  )

  return loading ? (
    loadingComponent
  ) : (
    <FlatList
      numColumns={2}
      data={data}
      style={style}
      refreshControl={refreshControl}
      keyExtractor={keyExtractor}
      onEndReached={loadMoreIfPossible}
      renderItem={renderItem}
      ListFooterComponent={footer}
    />
  )
}

export default DoubleColumnListView
