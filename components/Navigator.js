import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Tab, TabView, Icon } from "@rneui/themed";
import { LogsScreen, SamplesScreen, SettingsScreen } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Navigator = () => {
  const [index, setIndex] = useState(0);

  const SettingsButton = ({ navigation }) => (
    <TouchableOpacity
      style={styles.settingsButton}
      onPress={() => navigation.navigate("Settings")}
    >
      <Icon name="settings" type="material" />
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#2089dc",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "right",
        headerRight: () => <SettingsButton navigation={navigation} />,
      })}
    >
      <Stack.Screen name="Tabs" options={{ headerTitle: "Haiku Instruments" }}>
        {() => (
          <>
            <Tab
              value={index}
              onChange={(e) => setIndex(e)}
              indicatorStyle={styles.indicator}
              variant="primary"
              containerStyle={styles.tabContainer}
            >
              <Tab.Item
                title="Samples"
                titleStyle={styles.titleStyle}
                icon={{ name: "queue", type: "material" }}
              />
              <Tab.Item
                title="Logs"
                titleStyle={styles.titleStyle}
                icon={{ name: "description", type: "material" }}
              />
            </Tab>
            <TabView value={index} onChange={setIndex} animationType="spring">
              <TabView.Item style={styles.tabItem}>
                <SamplesScreen />
              </TabView.Item>
              <TabView.Item style={styles.tabItem}>
                <LogsScreen />
              </TabView.Item>
            </TabView>
          </>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "Settings",
          headerTitleAlign: "center",
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  indicator: {
    height: 3,
  },
  titleStyle: {
    fontSize: 12,
  },
  tabContainer: {},
  tabItem: {
    width: "100%",
  },
  settingsButton: {
    marginRight: 16,
  },
  saveButton: {
    marginRight: 16,
  },
  saveButtonText: {
    fontSize: 16,
  },
});

export default Navigator;
