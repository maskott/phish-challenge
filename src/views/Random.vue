<template>
  <div class="random">
    <h1>Random Show</h1>
    <ShowCard :show="show" @set-tracks="updateTracks" />
  </div>
</template>

<script>
import ShowCard from "@/components/ShowCard.vue";
import PhishinService from "@/services/PhishinService.js";

export default {
  name: "random-show",
  components: {
    ShowCard
  },
  data() {
    return {
      show: {}
    };
  },
  methods: {
    updateTracks(tracks, index) {
      this.$emit("set-tracks", tracks, index);
    }
  },
  created() {
    PhishinService.getRandomShow()
      .then(response => {
        console.log("🐟 Show:", response.data.data); // For now, logs out the response
        this.show = response.data.data;
      })
      .catch(error => {
        console.log("🚨 There was an error:", error.message); // Logs out the error
      });
  }
};
</script>
