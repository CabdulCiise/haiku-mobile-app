import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Text, Icon } from "@rneui/themed";
import api from "../api/index";

const SampleDetailScreen = ({ route, navigation }) => {
  const { sampleId, sampleName } = route.params;
  const [sampleStatistics, setSampleStatistics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.fetchSampleStatistics(sampleId);
      setSampleStatistics(data);
    };
    fetchData();
  }, [sampleId]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: sampleName,
      headerLeft: () => (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" type="material" size={32} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, sampleName]);

  const renderRow = (label, value) => (
    <View style={styles.row} key={label}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  const renderSampleStatistics = () => {
    if (!sampleStatistics) return <Text>Loading...</Text>;

    const stats = [
      { label: "Sample Id", value: sampleStatistics.sampleId },
      {
        label: "Average P2 @ Plateau 1",
        value: sampleStatistics.averageP2AtPlateau1.toFixed(3),
      },
      {
        label: "Average P2 @ Plateau 2",
        value: sampleStatistics.averageP2AtPlateau2.toFixed(3),
      },
      {
        label: "P2 At Plateau 1 Exceeded Max Transducer",
        value: sampleStatistics.p2AtPlateau1ExceededMaxTransducer.toString(),
      },
      {
        label: "P2 At Plateau 2 Exceeded Max Transducer",
        value: sampleStatistics.p2AtPlateau2ExceededMaxTransducer.toString(),
      },
      {
        label: "Concentration At Analysis",
        value: sampleStatistics.concentrationAtAnalysis.toFixed(3),
      },
      {
        label: "Average Plateau 1",
        value: sampleStatistics.averagePlateau1.toFixed(3),
      },
      {
        label: "Average Plateau 2",
        value: sampleStatistics.averagePlateau2.toFixed(3),
      },
      {
        label: "Average Baseline 1",
        value: sampleStatistics.averageBaseline1.toFixed(3),
      },
      {
        label: "Average Baseline 2",
        value: sampleStatistics.averageBaseline2
          ? sampleStatistics.averageBaseline2.toFixed(3)
          : null,
      },
      {
        label: "Relative Viscosity 1",
        value: sampleStatistics.relativeViscosity1.toFixed(3),
      },
      {
        label: "Relative Viscosity 2",
        value: sampleStatistics.relativeViscosity2.toFixed(3),
      },
      {
        label: "Inherent Viscosity 1",
        value: sampleStatistics.inherentViscosity1.toFixed(3),
      },
      {
        label: "Inherent Viscosity 2",
        value: sampleStatistics.inherentViscosity2.toFixed(3),
      },
      {
        label: "Intrinsic Viscosity 1",
        value: sampleStatistics.intrinsicViscosity1.toFixed(3),
      },
      {
        label: "Intrinsic Viscosity 2",
        value: sampleStatistics.intrinsicViscosity2.toFixed(3),
      },
      { label: "Solvent Name", value: sampleStatistics.solventName },
      {
        label: "Density At 25°C",
        value: sampleStatistics.densityAt25C
          ? sampleStatistics.densityAt25C.toFixed(3)
          : null,
      },
      {
        label: "Temperature Coefficient",
        value: sampleStatistics.temperatureCoefficient
          ? sampleStatistics.temperatureCoefficient.toFixed(3)
          : null,
      },
      {
        label: "IV Output Gain",
        value: sampleStatistics.ivOutputGain.toFixed(3),
      },
      {
        label: "IV Output Offset",
        value: sampleStatistics.ivOutputOffset.toFixed(3),
      },
      {
        label: "Average Intrinsic Viscosity",
        value: sampleStatistics.averageIntrinsicViscosity.toFixed(3),
      },
      {
        label: "Average Inherent Viscosity",
        value: sampleStatistics.averageInherentViscosity.toFixed(3),
      },
      {
        label: "Percent RSD Intrinsic Viscosity",
        value: sampleStatistics.percentRsdIntrinsicViscosity.toFixed(3),
      },
      {
        label: "Percent RSD Inherent Viscosity",
        value: sampleStatistics.percentRsdInherentViscosity.toFixed(3),
      },
    ];

    return (
      <View style={styles.table}>
        {stats.map((stat) => renderRow(stat.label, stat.value))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderSampleStatistics()}
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default SampleDetailScreen;
