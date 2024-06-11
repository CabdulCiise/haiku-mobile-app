import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import SamplesStackNavigator from "./SamplesStackNavigator";
import {
  LogsScreen,
  SamplesScreen,
  AboutScreen,
  HardwareScreen,
  SettingsScreen,
} from "../screens";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const theme = useContext(ThemeContext);

  return (
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
      initialRouteName="SamplesStack"
    >
      <Drawer.Screen
        name="SamplesStack"
        component={SamplesStackNavigator}
        options={{
          title: "Samples",
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
};

export default DrawerNavigator;
