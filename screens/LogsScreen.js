import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  FlatList,
  TouchableHighlight,
  RefreshControl,
} from "react-native";
import { Text, Button } from "@rneui/themed";

import moment from "moment";
import api from "../api/index";
import { dismissKeyboard } from "../helpers/screenUtils";
import { checkLogsBackgroundFetch } from "../helpers/logsBackgroundFetch";

const LogsScreen = () => {
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLogs();
    checkLogsBackgroundFetch();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await api.fetchLogs();

      if (data === null || data.length === 0) {
        setMessage("There are no logs....");
      } else {
        setMessage("");
      }

      setLogs(data);
    } catch (error) {
      setLogs([]);
      setMessage("Server error: failed to fetch logs");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLogs();
    setRefreshing(false);
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <SafeAreaView>
              <Text style={styles.messageText}>{message}</Text>
              <Button
                title="Refresh"
                onPress={onRefresh}
                style={styles.refreshButton}
              />
            </SafeAreaView>
          )}
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
  messageText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  refreshButton: {
    alignItems: "center",
    marginTop: 10,
  },
});

export default LogsScreen;
