import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { Text } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch } from "@rneui/themed";
import { dismissKeyboard } from "../helpers/screenUtils";

const SettingsScreen = ({ navigation }) => {
  const [notifySamplesCompleted, setNotifySamplesCompleted] = useState(false);
  const [notifyErrorsSeen, setNotifyErrorsSeen] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, notifySamplesCompleted, notifyErrorsSeen]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const samplesCompleted = await AsyncStorage.getItem(
          "notifySamplesCompleted"
        );
        const errorsSeen = await AsyncStorage.getItem("notifyErrorsSeen");

        if (samplesCompleted !== null) {
          setNotifySamplesCompleted(JSON.parse(samplesCompleted));
        }

        if (errorsSeen !== null) {
          setNotifyErrorsSeen(JSON.parse(errorsSeen));
        }
      } catch (error) {
        console.error("Failed to load settings.", error);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem(
        "notifySamplesCompleted",
        JSON.stringify(notifySamplesCompleted)
      );
      await AsyncStorage.setItem(
        "notifyErrorsSeen",
        JSON.stringify(notifyErrorsSeen)
      );
      navigation.goBack();
    } catch (error) {
      console.error("Failed to save settings.", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.setting}>
            <Text style={styles.settingText}>
              Notify when samples completed
            </Text>
            <Switch
              value={notifySamplesCompleted}
              onValueChange={(value) => setNotifySamplesCompleted(value)}
            />
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingText}>Notify when errors seen</Text>
            <Switch
              value={notifyErrorsSeen}
              onValueChange={(value) => setNotifyErrorsSeen(value)}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  viewContainer: {
    padding: 16,
  },
  settingText: {
    fontSize: 16,
    fontWeight: "400",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  saveButton: {
    marginRight: 16,
  },
  saveButtonText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
