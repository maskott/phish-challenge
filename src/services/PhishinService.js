import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://phish.in/api/v1",
  timeout: 1000,
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer 3781a190cb0140f485c533cf197ecee4e8e20e92385ed71e842f98c87c79d8d52043ef17088e8dbe3b25edf4401f8f93"
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
