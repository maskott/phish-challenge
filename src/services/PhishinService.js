import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://phishin.skott.us/",
  timeout: 1000,
  headers: {
    Accept: "application/json"
  }
});

export default {
  getRandomShow() {
    return apiClient.get("/random-show");
  },
  getShow(id) {
    return apiClient.get("/shows/" + id);
  }
};
