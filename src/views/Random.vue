<template>
  <div class="random">
    <div class="columns">
      <div class="column">
        <h1 class="title">Random Show</h1>
      </div>
      <div class="column is-3">
        <button class="button is-primary" @click="loadRandomShow" :class="{'is-loading': loading}">
          <span class="icon">
            <i class="fad fa-random"></i>
          </span>
          <span>Again</span>
        </button>
      </div>
    </div>
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
      show: {},
      loading: true
    };
  },
  methods: {
    updateTracks(tracks, index) {
      this.$emit("set-tracks", tracks, index);
    },
    loadRandomShow() {
      this.loading = true;
      PhishinService.getRandomShow()
        .then(response => {
          console.log("🐟 Show:", response.data.data); // For now, logs out the response
          this.show = response.data.data;
          this.loading = false;
        })
        .catch(error => {
          console.log("🚨 There was an error:", error.message); // Logs out the error
        });
    }
  },
  created() {
    this.loadRandomShow();
  }
};
</script>
