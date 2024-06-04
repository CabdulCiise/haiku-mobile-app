import React, { useState, useContext } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components";
import dismissKeyboard from "../helpers/screenUtils";

const LoginScreen = ({ route }) => {
  const { onLogin } = route.params;
  const theme = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.titleContainer}>
          <Image
            source={require("../assets/favicon.png")}
            style={styles.image}
          />
          <Text style={[styles.title, { color: theme.text }]}>
            HAIKU INSTRUMENTS
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Text
            style={[styles.title, { color: theme.text }, { marginBottom: 24 }]}
          >
            LOG IN
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.inputBorder,
                  color: theme.text,
                },
              ]}
              placeholder="Username"
              placeholderTextColor={theme.text}
              value={username}
              onChangeText={setUsername}
            />
            <Ionicons
              name="person"
              size={24}
              color={theme.iconColor}
              style={styles.icon}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.inputBorder,
                  color: theme.text,
                },
              ]}
              placeholder="Password"
              placeholderTextColor={theme.text}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Ionicons
              name="lock-closed"
              size={24}
              color={theme.iconColor}
              style={styles.icon}
            />
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: theme.buttonBackground,
                },
              ]}
              onPress={handleLogin}
            >
              <Text style={[styles.buttonText, { color: theme.buttonText }]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: "center",
    marginTop: 50,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  formContainer: {
    width: "90%",
    marginTop: 100,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    padding: 8,
    paddingRight: 40,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  icon: {
    position: "absolute",
    right: 10,
  },
});

export default LoginScreen;
