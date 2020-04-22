<template>
  <section>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <label class="label">Era:</label>
        </div>
        <div class="level-item">
          <div class="control">
            <div class="tabs is-centered is-toggle is-toggle-rounded">
              <ul>
                <li
                  v-for="(years, era, index) in eras"
                  :key="era"
                  @click.prevent="setSelectedEra(era, index)"
                  :class="{ 'is-active': index == selectedEraIndex }"
                >
                  <a>{{ era }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <label class="label">Year:</label>
        </div>
        <div class="level-item">
          <div class="control">
            <div class="select is-rounded">
              <select v-model="selectedYear">
                <option
                  v-for="(year, index) in eras[selectedEra]"
                  :key="year"
                  :class="{ 'is-active': index == selectedYearIndex }"
                  >{{ year }}</option
                >
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="content">
      <h2 class="title">{{ selectedYear }}</h2>
      <div class="has-text-left list is-hoverable">
        <router-link
          v-for="show in shows"
          :key="show.id"
          :to="{ name: 'show', params: { id: show.id } }"
          class="list-item"
          >{{ show.date }}: {{ show.venue_name }}</router-link
        >
      </div>
    </div>
  </section>
</template>

<script>
import PhishinService from "@/services/PhishinService.js";

export default {
  name: "find-show",
  data() {
    return {
      eras: {},
      selectedEra: "1.0",
      selectedEraIndex: 0,
      selectedYear: "1983-1987",
      selectedYearIndex: 0,
      shows: {}
    };
  },
  methods: {
    setSelectedEra: function(era, index) {
      this.selectedEraIndex = index;
      this.selectedEra = era;
      this.selectedYearIndex = 0;
      this.selectedYear = this.eras[this.selectedEra][this.selectedYearIndex];
    },
    getEras: function() {
      PhishinService.getEras()
        .then(response => {
          console.log("🗓 Eras:", response.data.data);
          this.eras = response.data.data;
        })
        .catch(error => {
          console.log("🚨 There was an error:", error.message);
        });
    },
    getShowsFromYear: function() {
      PhishinService.getYear(this.selectedYear)
        .then(response => {
          console.log("🎉 Shows:", response.data.data);
          this.shows = response.data.data;
        })
        .catch(error => {
          console.log("🚨 There was an error:", error.message);
        });
    }
  },
  watch: {
    selectedYear: function() {
      this.getShowsFromYear();
    }
  },
  created() {
    this.getEras();
    this.getShowsFromYear();
  }
};
</script>

<style></style>
