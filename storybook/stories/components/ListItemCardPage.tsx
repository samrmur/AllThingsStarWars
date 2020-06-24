import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ListItemCard from "@components/core/ListItemCard";

const ListItemCardPage = () => (
  <ScrollView>
    <Text style={{ marginStart: 10, fontWeight: "bold" }}>List Item Cards</Text>
    <ListItemCard id={"1"} style={{ margin: 10 }} title="Episode 1" subtitle="The Phantom Menace" content="This is the first episode of the series!" src="https://picsum.photos/700" />
    <ListItemCard id={"2"} style={{ margin: 10 }} title="Episode 2" subtitle="Attack of the Clones" content="This is the second episode of the series!" src="https://picsum.photos/700" />
    <ListItemCard id={"3"} style={{ margin: 10 }} title="Episode 3" subtitle="Revenge of the Sith" content="This is the third episode of the series!" src="https://picsum.photos/700" />
  </ScrollView>
)

export default ListItemCardPage;
