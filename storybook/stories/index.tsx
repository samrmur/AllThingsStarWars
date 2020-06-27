import React from "react";
import { storiesOf } from "@storybook/react-native";
import { boolean } from '@storybook/addon-knobs';
import ListItemCardPage from "./components/ListItemCardPage";
import DoubleColumnListViewPage from "./components/DoubleColumnListViewPage";

storiesOf('Components Section', module)
  .add('List Item Cards', () => <ListItemCardPage />)
  .add('Double Column List', () => <DoubleColumnListViewPage 
    loading={boolean("loading", false)} 
    refreshing={boolean("refreshing", false)}
    loadingMore={boolean("loadingMore", false)} 
  />)