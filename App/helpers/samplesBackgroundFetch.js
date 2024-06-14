import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import moment from "moment"; // Ensure moment is imported

import { sendPushNotification } from "../helpers/notifications";
import api from "../api/index";

const BACKGROUND_FETCH_TASK = "background-fetch-samples";
const intervalMinutes = 5;

const checkQueuedSamplesCompleted = (samples) => {
  if (!samples || samples.length === 0) return;

  const samplesLeft = samples.filter(
    (sample) =>
      sample.sampleStatus.name !== "Completed" &&
      sample.timeSampleAnalyzed !== null &&
      moment().diff(moment(sample.timeSampleAnalyzed), "minutes") >
        intervalMinutes
  );

  if (samplesLeft.length === 0) {
    sendPushNotification("Samples Completed", null);
  }
};

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    const data = await api.fetchSamples(true);
    checkQueuedSamplesCompleted(data);
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error("Background fetch task failed:", error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

async function registerBackgroundFetchAsync() {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: intervalMinutes * 60,
      stopOnTerminate: false,
    });
    console.log("Background fetch registered");
  } catch (error) {
    console.error("Failed to register background fetch:", error);
  }
}

export async function checkSamplesBackgroundFetch() {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    BACKGROUND_FETCH_TASK
  );

  if (!isRegistered) {
    await registerBackgroundFetchAsync();
  }
}
