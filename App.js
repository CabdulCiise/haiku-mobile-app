import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  LogsScreen,
  SampleQueueScreen,
  AboutScreen,
  HardwareScreen,
  SettingsScreen,
} from "./screens";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="SampleQueueScreen"
          component={SampleQueueScreen}
          options={{
            title: "Sample Queue",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="queue" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="HardwareScreen"
          component={HardwareScreen}
          options={{
            title: "Hardware Status",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="hardware-chip" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="LogsScreen"
          component={LogsScreen}
          options={{
            title: "Logs",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="description" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: "Settings",
            drawerIcon: ({ color, size }) => (
              <Entypo name="cog" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{
            title: "About",
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="info-circle" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
