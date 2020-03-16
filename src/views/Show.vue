<template>
  <div class="show">
    <h1>Specific Show</h1>
    <ShowCard :show="show" @set-tracks="setTracks" />
  </div>
</template>

<script>
import ShowCard from "@/components/ShowCard.vue";
import PhishinService from "@/services/PhishinService.js";

export default {
  name: "specific-show",
  components: {
    ShowCard
  },
  props: {
    id: Number
  },
  data() {
    return {
      show: {}
    };
  },
  methods: {
    setTracks(tracks, index) {
      this.$emit("set-tracks", tracks, index);
    }
  },
  created() {
    PhishinService.getShow(this.id)
      .then(response => {
        console.log("🐟 Show: ", response.data.data); // For now, logs out the response
        this.show = response.data.data;
      })
      .catch(error => {
        console.log("🚨 There was an error:", error.message); // Logs out the error
      });
  }
};
</script>
