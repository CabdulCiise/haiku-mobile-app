import React, { useState, useEffect } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import { ThemeProvider } from "styled-components";
import {
  LoginScreen,
  LogsScreen,
  SampleQueueScreen,
  AboutScreen,
  HardwareScreen,
  SettingsScreen,
} from "./screens";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  drawerBackground: "#f0f0f0",
  iconColor: "#007bff",
  inputBackground: "#f9f9f9",
  inputBorder: "#ccc",
  buttonBackground: "#007bff",
  buttonText: "#ffffff",
};

const darkTheme = {
  background: "#000000",
  text: "#ffffff",
  drawerBackground: "#333333",
  iconColor: "#007bff",
  inputBackground: "#333333",
  inputBorder: "#555",
  buttonBackground: "#007bff",
  buttonText: "#ffffff",
};

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  const DrawerNavigator = () => (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.drawerBackground,
        },
        drawerLabelStyle: {
          color: theme.text,
        },
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
        sceneContainerStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Drawer.Screen
        name="SampleQueueScreen"
        component={SampleQueueScreen}
        options={{
          title: "Sample Queue",
          drawerIcon: ({ size }) => (
            <MaterialIcons name="queue" color={theme.iconColor} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="HardwareScreen"
        component={HardwareScreen}
        options={{
          title: "Hardware Status",
          drawerIcon: ({ size }) => (
            <Ionicons
              name="hardware-chip"
              color={theme.iconColor}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="LogsScreen"
        component={LogsScreen}
        options={{
          title: "Logs",
          drawerIcon: ({ size }) => (
            <MaterialIcons
              name="description"
              color={theme.iconColor}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          drawerIcon: ({ size }) => (
            <Entypo name="cog" color={theme.iconColor} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          title: "About",
          drawerIcon: ({ size }) => (
            <FontAwesome
              name="info-circle"
              color={theme.iconColor}
              size={size}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              initialParams={{ onLogin: handleLogin, theme }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
