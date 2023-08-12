/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useMemo, useState } from "react";
import { Dimensions, StyleSheet, useColorScheme } from "react-native";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import LoginStackScreen from "./src/stack/LoginStackScreen";
import RootStackScreen from "./src/stack/RootStackScreen";
import { Provider } from "react-redux";
import { store } from "./src/state";
// import { AppContext } from "./src/context/AppContext";
import DarkTheme from "./src/theme/DarkTheme";
import DefaultTheme from "./src/theme/DefaultTheme";
import { AppContext, ThemeContextType } from "./src/context/AppContext";
// import ThemeContext from "./src/context/ThemeContext";

const h = Dimensions.get("window").height;
const w = Dimensions.get("window").width;
interface NewTheme {
  icon: string;
}

const RouterNavigation = () => {
  // Get Content of state reducers

  const [login, setLogin] = useState(false);
  const scheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const appContext = useMemo<ThemeContextType>(() => {
    return {
      isDarkTheme,
      setIsDarkTheme,
    };
  }, [isDarkTheme, setIsDarkTheme]);
  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <AppContext.Provider value={appContext}>
        {login ? <LoginStackScreen /> : <RootStackScreen />}
      </AppContext.Provider>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RouterNavigation />
    </Provider>
  );
};

export default App;
