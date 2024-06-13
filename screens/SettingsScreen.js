import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { Text, Icon } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch } from "@rneui/themed";
import { dismissKeyboard } from "../helpers/screenUtils";

const SettingsScreen = ({ navigation, route }) => {
  const userName = route.params.userName;
  const [notifySamplesCompleted, setNotifySamplesCompleted] = useState(false);
  const [notifyErrorsSeen, setNotifyErrorsSeen] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" type="material" size={32} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, notifySamplesCompleted, notifyErrorsSeen]);

  useEffect(() => {
    const loadSettings = async () => {
      const samplesCompleted = await AsyncStorage.getItem(
        "notifySamplesCompleted"
      );
      const errorsSeen = await AsyncStorage.getItem("notifyErrorsSeen");

      if (samplesCompleted !== null) {
        setNotifySamplesCompleted(samplesCompleted === "true");
      }

      if (errorsSeen !== null) {
        setNotifyErrorsSeen(errorsSeen === "true");
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    await AsyncStorage.setItem(
      "notifySamplesCompleted",
      notifySamplesCompleted.toString()
    );
    await AsyncStorage.setItem("notifyErrorsSeen", notifyErrorsSeen.toString());
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <Text style={styles.greeting}>Hi there {userName},</Text>
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
    paddingHorizontal: 16,
  },
  saveButton: {
    marginRight: 16,
  },
  saveButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  greeting: {
    fontSize: 16,
    marginBottom: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default SettingsScreen;
