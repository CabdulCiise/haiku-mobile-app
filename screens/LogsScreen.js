import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  FlatList,
  TouchableHighlight,
  AppState,
} from "react-native";
import { Text } from "@rneui/themed";
import moment from "moment";
import api from "../api/index";
import { dismissKeyboard } from "../helpers/screenUtils";
import BackgroundFetch from "react-native-background-fetch";
import PushNotification from "react-native-push-notification";

const LogsScreen = ({ route, navigation }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();

    BackgroundFetch.configure(
      {
        minimumFetchInterval: 1,
        stopOnTerminate: false,
        startOnBoot: true,
      },
      async (taskId) => {
        console.log("[BackgroundFetch] task start: ", taskId);
        await fetchLogs();
        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.log("[BackgroundFetch] failed to start: ", error);
      }
    );
  }, []);

  const fetchLogs = async () => {
    try {
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
        PushNotification.localNotification({
          title: "Error Log",
          message: error.message,
        });
      });
    }
  };

  const renderLogItem = ({ item }) => {
    let backgroundColor;
    switch (item.messageType) {
      case "Error":
        backgroundColor = styles.error;
        break;
      case "Warning":
        backgroundColor = styles.warning;
        break;
      case "Info":
        backgroundColor = styles.info;
        break;
      default:
        backgroundColor = styles.default;
    }

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
