import { Platform, Keyboard } from "react-native";

const dismissKeyboard = () => {
  if (Platform.OS != "web") {
    Keyboard.dismiss();
  }
};

export default dismissKeyboard;
