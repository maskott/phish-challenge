<template>
  <section>
    <div class="juke-box">
      <div class="flex">
        <div class="icon">
          <i class="fad fa-boombox fa-3x"></i>
        </div>
        <div class="controls">
          <a class="play-pause" @click="toggleStatus" v-show="isTrackLoaded">
            <i
              class="fad fa-3x"
              :class="{
                'fa-play-circle': !isPlaying,
                'fa-pause-circle': isPlaying
              }"
            ></i>
          </a>
        </div>
        <div class="status">
          <h5 class="current-track">
            {{
              tracks.length
                ? tracks[activeTrack].title
                : "Please select a track"
            }}
          </h5>
          <h6 v-if="tracks.length">
            {{ tracks[activeTrack].show_date }}
            &bull;
            {{ tracks[activeTrack].set_name }}
          </h6>
          <h6 v-if="tracks.length">
            <span v-if="audioElement">
              {{ hasPlayed | trackDuration }}
              of
              {{ audioElement.duration | trackDuration }}
              <i>({{ progress.toFixed(1) + "%" }})</i>
            </span>
            <span v-else>
              {{
                tracks[activeTrack]
                  ? tracks[activeTrack].duration
                  : 0 | songDuration
              }}
            </span>
          </h6>
        </div>
        <div class="spinner" v-show="isTrackLoaded">
          <i
            class="fad fa-compact-disc fa-2x"
            :class="{ 'fa-spin': isPlaying }"
          ></i>
          <i class="fad fa-cassette-tape fa-2x"></i>
          <i
            class="fad fa-compact-disc fa-2x"
            :class="{ 'fa-spin': isPlaying }"
          ></i>
        </div>
        <div class="volume" v-show="isTrackLoaded">
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            v-model="volume"
            orient="vertical"
          />
        </div>
      </div>
      <div class="progress">
        <div class="played" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </section>
</template>

<script>
const STATUSES = {
  STOPPED: 0,
  PAUSED: 1,
  PLAYING: 2
};

export default {
  data() {
    return {
      audioElement: null,
      status: STATUSES.STOPPED,
      duration: "0:00",
      volume: 5,
      progress: 0
    };
  },
  props: {
    tracks: Array,
    activeTrack: null
  },
  methods: {
    toggleStatus: function() {
      if (!this.isTrackLoaded) {
        this.loadTrack(this.activeTrack || 0);
      }
      if (!this.isPlaying) {
        this.play();
        return;
      }
      this.pause();
    },
    loadTrack: function(index, autoplay = false) {
      if (this.audioElement) this.audioElement.pause();
      this.activeTrack = index;
      this.audioElement = new Audio(this.tracks[index].mp3);
      this.updateVolume();
      this.status = STATUSES.STOPPED;
      this.audioElement.addEventListener("ended", this.loadNextTrack);
      this.audioElement.ontimeupdate = this.updateProgress;
      var $vm = this;
      this.audioElement.addEventListener("durationchange", function() {
        $vm.duration = $vm.audioElement.duration;
      });
      if (autoplay) this.play();
    },
    loadNextTrack: function(autoplay = true) {
      this.activeTrack++;
      if (this.activeTrack >= this.tracks.length) {
        this.activeTrack = 0;
      }
      this.loadTrack(this.activeTrack, autoplay);
    },
    play: function() {
      this.status = STATUSES.PLAYING;
      this.audioElement.play();
    },
    pause: function() {
      this.status = STATUSES.PAUSED;
      this.audioElement.pause();
    },
    updateVolume: function() {
      this.audioElement ? (this.audioElement.volume = this.volume / 10) : null;
    },
    updateProgress: function() {
      if (!this.audioElement || !this.audioElement.currentTime)
        return (this.progress = 0);
      this.progress =
        (this.audioElement.currentTime / this.audioElement.duration) * 100;
    }
  },
  computed: {
    isPaused: function() {
      return STATUSES.PAUSED === this.status;
    },
    isPlaying: function() {
      return STATUSES.PLAYING === this.status;
    },
    isTrackLoaded: function() {
      return this.activeTrack !== null && this.audioElement;
    },
    hasPlayed: function() {
      return (this.progress / 100) * this.duration;
    }
  },
  watch: {
    volume: function() {
      this.updateVolume();
    },
    activeTrack: function() {
      this.loadTrack(this.activeTrack, true);
    }
  }
};
</script>

<style scoped>
.juke-box {
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.35);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.35);
  text-align: center;
  margin: 1rem 0;
  display: block;
  position: relative;
}
.juke-box div.flex {
  display: flex;
  flex-direction: row;
  padding: 1rem 1rem;
  align-items: center;
}
.juke-box .fad {
  margin: 0 0.5rem 0 0;
}
.flex .status {
  flex-grow: 1;
}
.juke-box .status h5,
.juke-box .status h6 {
  margin: 0;
  padding: 0;
}
.juke-box .progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.5rem;
  background-color: rgba(44, 62, 80, 0.4);
}
.juke-box .progress .played {
  position: absolute;
  top: 0;
  left: 0;
  width: 0.5rem;
  height: 0.5rem;
  background-color: rgb(44, 62, 80);
}
.active {
  font-weight: bolder;
}
input[type="range"][orient="vertical"] {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
  width: 1rem;
  height: 50px;
  padding: 0 5px;
}
</style>
