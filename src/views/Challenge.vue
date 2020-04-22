<template>
  <div class="challenge">
    <i
      class="fad fa-turntable fa-4x fa-swap-opacity"
      style="--fa-primary-color: black; --fa-secondary-color: darksalmon;"
    ></i>
    <h1>Challenge</h1>
    <br />
    <div class="buttons">
      <button
        v-for="choice in choices"
        v-bind:key="choice.mp3"
        class="button is-fullwidth"
      >
        {{ choice.title }}
      </button>
    </div>
  </div>
</template>

<script>
import PhishinService from "@/services/PhishinService.js";

export default {
  name: "Challenge",
  data() {
    return {
      show: {},
      choices: [],
      loading: true
    };
  },
  methods: {
    loadRandomShow() {
      this.loading = true;
      PhishinService.getRandomShow()
        .then(response => {
          if (response.data.data.tracks.length < 20) {
            console.log(
              "🎣 Show too small! Only ",
              response.data.data.tracks.length,
              " tracks. Thowing back."
            );
            this.loadRandomShow();
          } else {
            console.log(
              "🎣 Weighing show... ",
              response.data.data.tracks.length,
              " tracks. Looks good!"
            );
            console.log("🐟 Show:", response.data.data); // For now, logs out the response
            this.show = response.data.data;
            this.loadChoiceTracks();
          }
        })
        .catch(error => {
          console.log("🚨 There was an error:", error.message); // Logs out the error
        });
    },
    loadChoiceTracks() {
      const shuffled = this.show.tracks.sort(() => 0.5 - Math.random());
      let selection = shuffled.slice(0, 5);
      this.choices = selection.map(track => ({
        title: track.title,
        mp3: track.mp3
      }));
      console.log("🎲 5 random track choices selected!");
      console.log(
        "🔀 Choices:",
        this.choices.map(track => track.title).join(", ")
      );
      this.loading = false;
    }
  },
  created() {
    this.loadRandomShow();
  }
};
</script>
