import React, {useCallback, useMemo} from 'react'
import {FlatList, ScrollView} from 'react-native-gesture-handler'
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
import FullScreenError, {FullScreenErrorProps} from './FullScreenError'

export interface DoubleColumnListViewProps {
  loading: boolean
  loadingMore: boolean
  refreshing: boolean
  hasNextPage: boolean
  onRefresh?: () => void
  onLoadMore?: () => void
  data: ListItemCardProps[]
  error?: FullScreenErrorProps
  style?: StyleProp<ViewStyle>
}

export const fullScreenStyle: StyleProp<ViewStyle> = {
  flex: 1
}

const scrollIndicatorInsets = {
  right: 1
}

const DoubleColumnListView = ({
  loading,
  refreshing,
  loadingMore,
  hasNextPage,
  onRefresh,
  onLoadMore,
  data,
  error,
  style
}: DoubleColumnListViewProps) => {
  const theme = useTheme()

  const loadingComponent = useMemo(() => {
    const mergedStyle: StyleProp<ViewStyle> = [
      {justifyContent: 'center', backgroundColor: theme.colors.background},
      style
    ]

    return (
      <View style={mergedStyle}>
        <ActivityIndicator color={theme.colors.accent} size="large" />
      </View>
    )
  }, [style, theme])

  const refreshControl = useMemo(() => {
    return (
      <RefreshControl
        onRefresh={onRefresh}
        progressBackgroundColor={theme.colors.primary}
        tintColor={theme.colors.accent}
        colors={[theme.colors.accent]}
        refreshing={refreshing}
      />
    )
  }, [onRefresh, refreshing, theme])

  const footer = useMemo(() => {
    return loadingMore ? (
      <ActivityIndicator
        style={{margin: 5}}
        color={theme.colors.accent}
        size="large"
      />
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

  const flatListStyle = useMemo(() => {
    return [style, {backgroundColor: theme.colors.background}]
  }, [style, theme])

  if (loading) {
    return loadingComponent
  } else if (data.length === 0 && error !== undefined) {
    return (
      <ScrollView
        contentContainerStyle={flatListStyle}
        refreshControl={refreshControl}
      >
        <FullScreenError name={error.name} message={error.message} />
      </ScrollView>
    )
  } else {
    return (
      <FlatList
        numColumns={2}
        data={data}
        style={flatListStyle}
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={100}
        scrollIndicatorInsets={scrollIndicatorInsets}
        refreshControl={refreshControl}
        keyExtractor={keyExtractor}
        onEndReached={loadMoreIfPossible}
        renderItem={renderItem}
        ListFooterComponent={footer}
      />
    )
  }
}

export default DoubleColumnListView
