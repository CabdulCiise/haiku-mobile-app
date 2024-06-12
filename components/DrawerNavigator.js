import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "@rneui/themed";
import {
  LogsScreen,
  SamplesScreen,
  AboutScreen,
  HardwareScreen,
  SettingsScreen,
} from "../screens";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{}} initialRouteName="Samples">
      <Drawer.Screen
        name="Samples"
        component={SamplesScreen}
        options={{
          title: "Samples",
          drawerIcon: () => <Icon name="queue" type="material" />,
        }}
      />
      <Drawer.Screen
        name="HardwareScreen"
        component={HardwareScreen}
        options={{
          title: "Hardware Status",
          drawerIcon: () => <Icon name="hardware-chip" type="ionicon" />,
        }}
      />
      <Drawer.Screen
        name="LogsScreen"
        component={LogsScreen}
        options={{
          title: "Logs",
          drawerIcon: () => <Icon name="description" type="material" />,
        }}
      />
      <Drawer.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          drawerIcon: () => <Icon name="settings" type="material" />,
        }}
      />
      <Drawer.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          title: "About",
          drawerIcon: () => <Icon name="info-circle" type="font-awesome" />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
