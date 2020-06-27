import React from "react";
import DoubleColumnListView from "@components/core/DoubleColumnListView";
import { View, Text } from "react-native";

interface DoubleColumnListViewPageProps {
  loading: boolean
  refreshing: boolean,
  loadingMore: boolean
}

const DoubleColumnListViewPage = ({
  loading,
  refreshing,
  loadingMore
} : DoubleColumnListViewPageProps) => (
  <View>
    <Text style={{ marginStart: 10, marginBottom: 10, fontWeight: "bold" }}>Double Column List View</Text>
    <DoubleColumnListView
      loading={loading}
      loadingMore={loadingMore}
      refreshing={refreshing}
      hasNextPage={false}
      style={{ height: "100%" }}
      data={[
        {id: 'item1', title: "Episode 1", subtitle: "The Phantom Menace", content: "This is the first episode of the series! The Darth Maul scene was really cool!", src: "https://picsum.photos/200"},
        {id: 'item2', title: "Episode 2", subtitle: "Attack of the Clones", content: "This is the second episode of the series!", src: "https://picsum.photos/200"}
      ]}
    />
  </View>
)

export default DoubleColumnListViewPage;
