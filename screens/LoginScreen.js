import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, Image, Input, Button } from "@rneui/themed";
import dismissKeyboard from "../helpers/screenUtils";
import api from "../api/index";

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const isAuthenticated = await api.authenticate(username, password);
    if (isAuthenticated) {
      onLogin(username);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
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
            secureTextEntry
            rightIcon={{ type: "ionics", name: "lock" }}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button onPress={handleLogin} title="Login" />
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
