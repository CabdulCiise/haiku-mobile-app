import axios from "axios";

axios.defaults.baseURL = "http://34.162.207.64/:5000/";
// axios.defaults.baseURL = "http://10.0.40.15:5000/";
// axios.defaults.baseURL = "http://192.168.1.67:5000/";
axios.defaults.timeout = 5000;

const fetch = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export default {
  async authenticate(username, password) {
    const response = await axios.post("user/authenticate", {
      username,
      password,
    });

    return response.data?.id != null;
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
