import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
} from "react-native";

import { dismissKeyboard } from "../helpers/screenUtils";

const AboutScreen = ({ route, navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text>About Screen</Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AboutScreen;