import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import FilmListScreen from "@screens/films/FilmListScreen";
import { Appbar } from "react-native-paper";
import { Route } from "@react-navigation/native";
import { Scene, StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";

interface FilmStackNavigationHeaderProps {
  previous: Scene<Route<string>> | undefined,
  navigation: StackNavigationProp<Record<string, object | undefined>, string>
}

const FilmStackNavigationHeader = ({
  previous,
  navigation
} : FilmStackNavigationHeaderProps) => {
  return (
    <Appbar.Header accessibilityStates>
      {previous ? (
        <Appbar.BackAction accessibilityStates onPress={() => { navigation.pop() }} />
      ) : null}
      <Appbar.Content title="Films" subtitle="The Original Six" accessibilityStates />
    </Appbar.Header>
  )
}

const FilmStackNavigationView = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator screenOptions={{
      header: ({ previous, navigation }) => <FilmStackNavigationHeader previous={previous} navigation={navigation} />
    }}>
      <Stack.Screen name="FilmsList" component={FilmListScreen} />
    </Stack.Navigator>
  )
}

export default FilmStackNavigationView
