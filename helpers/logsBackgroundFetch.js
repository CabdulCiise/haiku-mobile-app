import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import moment from "moment";

import { sendPushNotification } from "./notifications";
import api from "../api/index";

const BACKGROUND_FETCH_TASK = "background-fetch-logs";
const intervalMinutes = 5;

const checkForErrors = (logs) => {
  const recentErrors = logs.filter(
    (log) =>
      log.messageType === "Error" &&
      moment().diff(moment(log.datetime), "minutes") <= intervalMinutes
  );

  if (recentErrors.length > 0) {
    const errorMessages = recentErrors.map((error) => error.message).join("\n");
    sendPushNotification("Error Log", errorMessages);
  }
};

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const data = await api.fetchLogs();
  checkForErrors(data);

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

const registerBackgroundFetchAsync = async () => {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: intervalMinutes,
    stopOnTerminate: false,
  });
};

export async function checkLogsBackgroundFetch() {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    BACKGROUND_FETCH_TASK
  );

  if (!isRegistered) {
    await registerBackgroundFetchAsync();
  }
}
