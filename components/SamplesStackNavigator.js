import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SamplesScreen, SampleDetailScreen } from "../screens";

const Stack = createStackNavigator();

const SamplesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Samples">
      <Stack.Screen name="Samples" component={SamplesScreen} />
      {/* <Stack.Screen name="Sample Detail" component={SampleDetailScreen} /> */}
    </Stack.Navigator>
  );
};

export default SamplesStackNavigator;
