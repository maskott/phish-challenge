<template>
  <section>
    <div class="juke-box box">
      <div class="columns is-vcentered">
        <div class="column is-3 icons has-text-left">
          <i class="fad fa-boombox fa-3x" style="--fa-secondary-color: darkblue;"></i>
          <i
            class="fad fa-3x"
            @click="toggleStatus"
            v-show="isTrackLoaded"
            :class="{
              'fa-play-circle': !isPlaying,
              'fa-pause-circle': isPlaying
            }"
          ></i>
        </div>
        <div class="column status is-size-7">
          <h5 class="current-track has-text-weight-bold">
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
        <div class="column is-3 has-text-right is-vertical-center">
          <div class="spinner">
            <i
              class="fad fa-cassette-tape fa-4x"
              style="--fa-primary-opacity: 0.5; --fa-secondary-opacity: 0.2;"
            ></i>
            <i
              class="fad fa-compact-disc fa-swap-opacity"
              style="--fa-primary-color: white; --fa-secondary-color: black;"
              :class="{ 'fa-spin': isPlaying }"
              v-show="isTrackLoaded"
            ></i>
            <i
              class="fad fa-compact-disc fa-swap-opacity"
              style="--fa-primary-color: white; --fa-secondary-color: black;"
              :class="{ 'fa-spin': isPlaying }"
              v-show="isTrackLoaded"
            ></i>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            v-model="volume"
            orient="vertical"
            :disabled="!isTrackLoaded"
          />
        </div>
      </div>
      <progress
        class="progress is-primary"
        v-show="isTrackLoaded"
        :value="progress"
        max="100"
      >{{ progress }}%</progress>
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
  position: relative;
  margin-bottom: 2rem;
}

.juke-box .icons i.fad:first-of-type {
  margin-right: 0.5rem;
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
}
.active {
  font-weight: bolder;
}
input[type="range"][orient="vertical"] {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
  width: 1rem;
  height: 60px;
  padding: 0 1rem;
}
.is-vertical-center {
  display: flex;
  align-items: center;
}
.spinner {
  position: relative;
}
.spinner i.fad:not(:first-child) {
  position: absolute;
  top: 20px;
  z-index: 20;
}
.spinner i.fad:nth-child(1) {
  z-index: 10;
}
.spinner i.fad:nth-child(2) {
  left: 0.64rem;
}
.spinner i.fad:nth-child(3) {
  left: 2.385rem;
}
</style>
