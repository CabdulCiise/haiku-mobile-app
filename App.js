import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { LoginScreen } from "./screens";
import Navigator from "./components/Navigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const theme = createTheme({
    mode: "light",
  });

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
              <Stack.Screen name="Drawer" component={Navigator} />
            ) : (
              <Stack.Screen name="Login">
                {(props) => (
                  <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />
                )}
              </Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
