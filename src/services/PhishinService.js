import axios from "axios";

axios.defaults.timeout = 3000;

const apiClient = axios.create({
  baseURL: "https://phishin.skott.us/",
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
  },
  getEras() {
    return apiClient.get("/eras");
  },
  getYear(year) {
    return apiClient.get("/years/" + year);
  }
};
