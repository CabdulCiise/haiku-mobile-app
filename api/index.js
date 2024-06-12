import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.67:5000/";

const fetch = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default {
  async authenticate(username, password) {
    try {
      const response = await axios.post("user/authenticate", {
        username,
        password,
      });

      return response.data?.id != null;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  async fetchSamples(isQueued) {
    return await fetch(`sample?isQueued=${isQueued}`);
  },

  async fetchSampleInjections(sampleId) {
    return await fetch(`sample/injections/${sampleId}`);
  },

  async fetchSampleStatistics(sampleId) {
    return await fetch(`sample/statistics/${sampleId}`);
  },

  async fetchLogs() {
    return await fetch(`logMessage`);
  },
};
