import React, { useEffect, useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { dismissKeyboard } from "../helpers/screenUtils";
import api from "../api/index";
import { ThemeContext } from "styled-components";
import moment from "moment";
import { TabView, SceneMap } from "react-native-tab-view";

const SamplesScreen = ({ route, navigation }) => {
  const theme = useContext(ThemeContext);
  const [samples, setSamples] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "queued", title: "Queued" },
    { key: "historical", title: "Historical" },
  ]);

  useEffect(() => {
    fetchSamples(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation])
  );

  const fetchSamples = (isHistorical) => {
    api.fetchSamples(!isHistorical).then((data) => {
      setSamples(data);
    });
  };

  const renderSample = ({ item }) => (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate("Sample Detail", {
          sampleId: item.id,
        })
      }
    >
      <View style={styles.itemContainer}>
        <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.status, { color: theme.text }]}>
          {item.sampleStatus.name}
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          Queued ~ {moment(item.queuedTime).format("MM/DD/YY h:mm a")}
        </Text>
        {item.sampleStatus.name === "Completed" && (
          <Text style={[styles.text, { color: theme.text }]}>
            Completed ~ {moment(item.completedTime).format("MM/DD/YY h:mm a")}
          </Text>
        )}
        <View style={[styles.separator, { backgroundColor: theme.text }]} />
      </View>
    </TouchableHighlight>
  );

  const renderScene = SceneMap({
    queued: () => <FlatList data={samples} renderItem={renderSample} />,
    historical: () => <FlatList data={samples} renderItem={renderSample} />,
  });

  const handleIndexChange = (index) => {
    setIndex(index);
    fetchSamples(index === 1);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container2}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={handleIndexChange}
            style={styles.tabView}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    width: "100%",
  },
  itemContainer: {
    padding: 5,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
  },
  status: {
    fontSize: 14,
    fontStyle: "italic",
  },
  text: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    marginVertical: 5,
  },
  tabView: {},
});

export default SamplesScreen;
