<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link>
      &nbsp;|&nbsp;
      <router-link :to="{ name: 'find' }">Find a Show</router-link>
      &nbsp;|&nbsp;
      <router-link :to="{ name: 'random' }">Random Show</router-link>
      &nbsp;|&nbsp;
      <router-link :to="{ name: 'challenge' }">Challenge</router-link>
    </div>
    <JukeBox :tracks="tracks" :activeTrack="nowPlaying" />
    <router-view @set-tracks="setTracks" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tracks: [],
      nowPlaying: null
    };
  },
  methods: {
    setTracks(tracks, index) {
      this.tracks = tracks;
      this.nowPlaying = index;
    }
  }
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  max-width: 600px;
  margin: auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
