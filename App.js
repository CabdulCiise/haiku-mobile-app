import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Tab, TabView, Icon } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  LoginScreen,
  LogsScreen,
  SampleDetailScreen,
  SamplesScreen,
  SettingsScreen,
} from "./screens";

const Stack = createStackNavigator();

const SettingsButton = ({ navigation, userName }) => (
  <TouchableOpacity
    style={styles.settingsButton}
    onPress={() => navigation.navigate("Settings", { userName: userName })}
  >
    <Icon name="settings" type="material" color="#fff" />
  </TouchableOpacity>
);

const LogoutButton = ({ onLogout }) => (
  <TouchableOpacity style={styles.rightHeaderButton} onPress={onLogout}>
    <Icon name="logout" type="material" color="#fff" />
  </TouchableOpacity>
);

const screenOptions = (isLoggedIn, navigation, onLogout, userName) => ({
  headerStyle: {
    backgroundColor: "#2089dc",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "500",
    fontSize: 20,
  },
  headerTitleAlign: "center",
  headerLeft: isLoggedIn
    ? () => <SettingsButton navigation={navigation} userName={userName} />
    : null,
  headerRight: isLoggedIn ? () => <LogoutButton onLogout={onLogout} /> : null,
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState();
  const [tabIndex, setTabIndex] = useState(0);

  const handleLogout = () => setIsLoggedIn(false);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) =>
            screenOptions(isLoggedIn, navigation, handleLogout, userName)
          }
        >
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Tabs"
                options={{ headerTitle: "Haiku Instruments" }}
              >
                {({ navigation }) => (
                  <>
                    <Tab
                      value={tabIndex}
                      onChange={setTabIndex}
                      indicatorStyle={styles.indicator}
                      variant="primary"
                    >
                      <Tab.Item
                        title="Samples"
                        titleStyle={styles.titleStyle}
                        icon={{
                          name: "queue",
                          type: "material",
                          color: "#fff",
                        }}
                      />
                      <Tab.Item
                        title="Logs"
                        titleStyle={styles.titleStyle}
                        icon={{
                          name: "description",
                          type: "material",
                          color: "#fff",
                        }}
                      />
                    </Tab>
                    <TabView
                      value={tabIndex}
                      onChange={setTabIndex}
                      animationType="spring"
                    >
                      <TabView.Item style={styles.tabItem}>
                        <SamplesScreen navigation={navigation} />
                      </TabView.Item>
                      <TabView.Item style={styles.tabItem}>
                        <LogsScreen navigation={navigation} />
                      </TabView.Item>
                    </TabView>
                  </>
                )}
              </Stack.Screen>
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen
                name="Sample Details"
                component={SampleDetailScreen}
              />
            </>
          ) : (
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen
                  {...props}
                  onLogin={(userName) => {
                    setIsLoggedIn(true);
                    setUserName(userName);
                  }}
                />
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  indicator: {
    height: 3,
  },
  titleStyle: {
    fontSize: 12,
  },
  tabItem: {
    width: "100%",
  },
  settingsButton: {
    marginLeft: 16,
  },
  rightHeaderButton: {
    marginRight: 16,
  },
});

export default App;
