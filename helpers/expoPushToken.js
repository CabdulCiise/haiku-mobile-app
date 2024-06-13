import { useState, useEffect } from "react";
import { registerForPushNotificationsAsync } from "./notifications";

let expoPushToken;

const useExpoPushToken = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    registerForPushNotificationsAsync().then((t) => {
      expoPushToken = t ?? "";
      setToken(t ?? "");
    });
  }, []);

  return token;
};

export { useExpoPushToken, expoPushToken };
