import React from "react";
import { storiesOf } from "@storybook/react-native";
import ListItemCardPage from "./components/ListItemCardPage";
import DoubleColumnListViewPage from "./components/DoubleColumnListViewPage";

storiesOf('Components Section', module)
  .add('List Item Cards', () => <ListItemCardPage />)
  .add('Double Column List', () => <DoubleColumnListViewPage />)