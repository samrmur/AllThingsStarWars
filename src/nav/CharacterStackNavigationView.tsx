import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar } from "react-native-paper";
import { Route } from "@react-navigation/native";
import { Scene, StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import CharacterListScreen from "@screens/characters/CharacterListScreen";
import { useTranslation } from "react-i18next";

interface CharacterStackNavigationHeaderProps {
  previous: Scene<Route<string>> | undefined,
  navigation: StackNavigationProp<Record<string, object | undefined>, string>
}

const CharacterStackNavigationHeader = ({
  previous,
  navigation
} : CharacterStackNavigationHeaderProps) => {
  const { t } = useTranslation()
  
  return (
    <Appbar.Header accessibilityStates>
      {previous ? (
        <Appbar.BackAction accessibilityStates onPress={() => { navigation.pop() }} />
      ) : null}
      <Appbar.Content title={t("characters.title")} subtitle={t("characters.subtitle")} accessibilityStates />
    </Appbar.Header>
  )
}

const CharacterStackNavigationView = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator screenOptions={{
      header: ({ previous, navigation }) => <CharacterStackNavigationHeader previous={previous} navigation={navigation} />
    }}>
      <Stack.Screen name="CharactersList" component={CharacterListScreen} />
    </Stack.Navigator>
  )
}

export default CharacterStackNavigationView