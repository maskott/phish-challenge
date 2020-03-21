<template>
  <div class="show box" v-if="show">
    <h4 class="location">
      <i class="fad fa-map-marker-alt"></i>
      {{ show.venue ? show.venue.location : "" }}
    </h4>
    <h4>
      <i class="fad fa-calendar"></i>
      {{ show.date }}
    </h4>
    <h2 class="subtitle">
      <router-link
        v-if="show.id"
        :to="{ name: 'show', params: { id: show.id } }"
        class="show-link"
      >{{ show.venue_name }}</router-link>
    </h2>

    <div v-for="set in sets" :key="set">
      <h3 class="subtitle">{{ set }}</h3>
      <ul class="tracks">
        <li
          v-for="track in tracksBySet[set]"
          :key="track.id"
          @click.prevent="setTracks(track.id)"
          :data-tooltip="track.duration | songDuration"
        >{{ track.title }}</li>
      </ul>
    </div>

    <h5 class="duration">
      <i class="fad fa-stopwatch"></i>
      {{ show.duration | showDuration }}
    </h5>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    show: Object
  },
  methods: {
    setTracks(id) {
      this.$emit(
        "set-tracks",
        this.show.tracks,
        _.findIndex(this.show.tracks, { id: id })
      );
    }
  },
  computed: {
    tracksBySet() {
      return _.groupBy(this.show.tracks, function(track) {
        return track.set_name;
      });
    },
    sets() {
      return _.keys(
        _.groupBy(this.show.tracks, function(track) {
          return track.set_name;
        })
      );
    }
  }
};
</script>

<style scoped>
.show {
  text-align: left;
  margin-bottom: 2rem;
}
.location {
  float: right;
}
h2 {
  text-align: center;
}
a.show-link {
  text-decoration: none;
  color: initial;
}
a.show-link:hover {
  text-decoration: underline;
}
ul.tracks {
  margin: 0 0 1rem;
  padding: 0;
  clear: both;
}
ul.tracks li {
  display: inline;
  padding-right: 1rem;
  cursor: pointer;
}
ul.tracks li:hover {
  color: black;
}
.duration {
  float: right;
  position: relative;
  margin-top: -2.1rem;
}
</style>
