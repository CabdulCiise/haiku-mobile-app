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
import { dismissKeyboard } from "../helpers/screenUtils";
import api from "../api/index";
import { checkSamplesBackgroundFetch } from "../helpers/samplesBackgroundFetch";

const SamplesScreen = ({ navigation }) => {
  const [samples, setSamples] = useState([]);
  const [message, setMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSamples();
    checkSamplesBackgroundFetch();

    const intervalId = setInterval(fetchSamples, 300000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchSamples = async () => {
    try {
      const data = await api.fetchSamples(true);

      if (data === null || data.length == 0) {
        setMessage("There are no samples in queue....");
      } else {
        setMessage("");
      }

      setSamples(data);
    } catch (error) {
      setSamples([]);
      setMessage("Server error: failed to fetch samples");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSamples();
    setRefreshing(false);
  };

  const renderSample = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={
          item.sampleStatus.name === "Completed"
            ? () =>
                navigation.navigate("Sample Details", {
                  sampleId: item.id,
                  sampleName: item.name,
                })
            : null
        }
      >
        <View style={styles.itemContainer}>
          <View style={styles.itemTextContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.text}>
              Concentration: {item.concentration} g/mL
            </Text>
            <Text style={styles.text}>Volume: {item.volume.toFixed(2)} mL</Text>
            <Text style={styles.text}>
              Weight: {item.calculatedPolymerWeight} g
            </Text>
            <Text style={styles.text}>
              Queued: {moment(item.queuedTime).format("MM/DD/YY h:mm a")}
            </Text>
            {item.sampleStatus.name === "Completed" && (
              <Text style={styles.text}>
                Completed:{" "}
                {moment(item.completedTime).format("MM/DD/YY h:mm a")}
              </Text>
            )}
          </View>
          <Text style={styles.status}>{item.sampleStatus.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={samples}
          renderItem={renderSample}
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
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontStyle: "italic",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    minWidth: 100,
  },
  text: {
    fontSize: 14,
    color: "#333",
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

export default SamplesScreen;
