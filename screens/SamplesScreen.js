import React, { useEffect, useState, useContext } from "react";
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
import { dismissKeyboard } from "../helpers/screenUtils";
import api from "../api/index";

const SamplesScreen = () => {
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    fetchSamples();
    const intervalId = setInterval(fetchSamples, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchSamples = () => {
    api.fetchSamples(true).then((data) => {
      setSamples(data);
    });
  };

  const renderSample = ({ item }) => {
    return (
      <TouchableHighlight>
        <View style={styles.itemContainer}>
          <View style={styles.itemTextContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.text}>
              Concentration: {item.concentration} g/mL
            </Text>
            <Text style={styles.text}>Volume: {item.volume} mL</Text>
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
    textAlign: "right",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
});

export default SamplesScreen;
