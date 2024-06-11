import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import api from "../api/index";

const SampleDetailScreen = ({ route, navigation }) => {
  const sampleId = route.params?.sampleId;
  const [state, setState] = useState({
    sampleStatistics: null,
    injection1Measurements: null,
    injection2Measurements: null,
    selectedDataset: "ratio",
  });

  const updateStateObject = (vals) => {
    setState((prevState) => ({
      ...prevState,
      ...vals,
    }));
  };

  useFocusEffect(
    React.useCallback(() => {
      const parent = navigation.getParent();
      parent.setOptions({ headerShown: false });

      return () => {
        parent.setOptions({ headerShown: true });
      };
    }, [navigation])
  );

  useEffect(() => {
    api.fetchSampleStatistics(sampleId).then((data) => {
      updateStateObject({ sampleStatistics: data });
    });

    api.fetchSampleInjections(sampleId).then((data) => {
      updateStateObject({
        injection1Measurements: data[0].measurements,
        injection2Measurements: data[1].measurements,
      });
    });
  }, [route.params?.sampleId]);

  const renderSampleStatistics = () => {
    const { sampleStatistics } = state;

    if (!sampleStatistics) {
      return <Text>Loading...</Text>;
    }

    const statsEntries = Object.entries(sampleStatistics).map(
      ([key, value]) => (
        <View style={styles.row} key={key}>
          <Text style={styles.label}>{key}</Text>
          <Text style={styles.value}>
            {value !== null ? value.toString() : ""}
          </Text>
        </View>
      )
    );

    return <View style={styles.table}>{statsEntries}</View>;
  };

  const renderChart = () => {
    const { injection1Measurements, injection2Measurements, selectedDataset } =
      state;

    if (!injection1Measurements || !injection2Measurements) {
      return <Text>Loading chart...</Text>;
    }

    const data = {
      labels: Array.from(
        { length: injection1Measurements.length },
        (_, i) => i + 1
      ),
      datasets: [
        {
          data: injection1Measurements.map((m) => m[selectedDataset]),
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          label: `Injection 1 - ${selectedDataset}`,
        },
        {
          data: injection2Measurements.map((m) => m[selectedDataset]),
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          label: `Injection 2 - ${selectedDataset}`,
        },
      ],
    };

    return (
      <ScrollView horizontal contentContainerStyle={styles.chartContainer}>
        <LineChart
          data={data}
          width={Dimensions.get("window").width * 2}
          height={220}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </ScrollView>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderSampleStatistics()}
      <RNPickerSelect
        onValueChange={(value) => updateStateObject({ selectedDataset: value })}
        items={[
          { label: "Ratio", value: "ratio" },
          { label: "P1", value: "p1" },
          { label: "P2", value: "p2" },
        ]}
        style={pickerSelectStyles}
        value={state.selectedDataset}
      />
      {renderChart()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  table: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    color: "#555",
  },
  chartContainer: {
    flexDirection: "row",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default SampleDetailScreen;
