import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import JukeBox from "@/components/JukeBox.vue";
import "bulma/css/bulma.css";

Vue.component("JukeBox", JukeBox);

Vue.config.productionTip = false;

Vue.filter("showDuration", function(value) {
  let total = Math.floor(value / 1000);
  let hours = Math.floor(total / 3600);
  total %= 3600;
  let minutes = Math.floor(total / 60);
  let seconds = total % 60;

  let dMins = minutes > 9 ? minutes : "0" + minutes;
  let dSecs = seconds > 9 ? seconds : "0" + seconds;

  let duration = dMins + ":" + dSecs;
  if (hours > 0) {
    duration = hours + ":" + duration;
  }

  return duration;
});

Vue.filter("songDuration", function(value) {
  let total = Math.floor(value);
  let minutes = Math.floor(total / 36000);
  let seconds = total % 60;
  let dSecs = seconds > 9 ? seconds : "0" + seconds;

  return minutes + ":" + dSecs;
});

Vue.filter("trackDuration", function(value) {
  let total = Math.floor(value);
  let minutes = Math.floor(total / 36);
  let seconds = total % 60;
  let dSecs = seconds > 9 ? seconds : "0" + seconds;

  return minutes + ":" + dSecs;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
