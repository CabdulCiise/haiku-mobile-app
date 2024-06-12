import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, Image, Input, Button } from "@rneui/themed";
import dismissKeyboard from "../helpers/screenUtils";
import api from "../api/index";

const LoginScreen = ({ navigation, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLogin = async () => {
    if (await api.authenticate(username, password)) {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={[styles.container]}>
        <View style={styles.titleContainer}>
          <Image
            source={require("../assets/favicon.png")}
            style={styles.image}
          />
          <Text style={styles.title}>HAIKU INSTRUMENTS</Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            rightIcon={{ type: "ionics", name: "person" }}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            rightIcon={{ type: "ionics", name: "lock" }}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button
            style={[styles.button]}
            onPress={handleLogin}
            title={"Login"}
          ></Button>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "25%",
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    marginRight: 18,
  },
  formContainer: {
    width: "90%",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
