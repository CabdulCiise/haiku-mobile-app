import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { Text } from "@rneui/themed";
import moment from "moment";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import api from "../api/index";
import { dismissKeyboard } from "../helpers/screenUtils";
// import PushNotification from "react-native-push-notification";

const BACKGROUND_FETCH_TASK = "background-fetch-logs";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  await fetchLogs();

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 1,
    stopOnTerminate: false,
    startOnBoot: true,
  });
}

const LogsScreen = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
    checkBackgroundFetch();
  }, []);

  const checkBackgroundFetch = async () => {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    console.log("background job", isRegistered);

    if (!isRegistered) {
      console.log("registering");
      await registerBackgroundFetchAsync();
    } else {
      console.log("registered");
    }
  };

  const fetchLogs = async () => {
    try {
      console.log("fetching logs");
      const data = await api.fetchLogs();
      setLogs(data);
      checkForErrors(data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  };

  const checkForErrors = (logs) => {
    const recentErrors = logs.filter(
      (log) =>
        log.messageType === "Error" &&
        moment().diff(moment(log.datetime), "minutes") <= 1
    );

    if (recentErrors.length > 0) {
      recentErrors.forEach((error) => {
        // Uncomment and configure the push notification as needed
        // PushNotification.localNotification({
        //   title: "Error Log",
        //   message: error.message,
        // });
      });
    }
  };

  const renderLogItem = ({ item }) => {
    const backgroundColor = getItemBackgroundColor(item.messageType);

    return (
      <TouchableHighlight>
        <View style={[styles.logItem, backgroundColor]}>
          <View style={styles.logHeader}>
            <Text style={styles.logType}>{item.messageType}</Text>
            <Text style={styles.logDateTime}>
              {moment(item.datetime).format("MM/DD/YY h:mm:ss a")}
            </Text>
          </View>
          <Text style={styles.logMessage}>{item.message}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const getItemBackgroundColor = (messageType) => {
    switch (messageType) {
      case "Error":
        return styles.error;
      case "Warning":
        return styles.warning;
      case "Info":
        return styles.info;
      default:
        return styles.default;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={logs}
          renderItem={renderLogItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logItem: {
    padding: 12,
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  logHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  logDateTime: {
    fontSize: 12,
  },
  logMessage: {
    fontSize: 16,
  },
  logType: {
    fontSize: 14,
    fontStyle: "italic",
  },
  error: {
    backgroundColor: "#f8d7da",
  },
  warning: {
    backgroundColor: "#fff3cd",
  },
  info: {
    backgroundColor: "#d1ecf1",
  },
  default: {
    backgroundColor: "#f0f0f0",
  },
});

export default LogsScreen;
