<template>
  <div class="home">
    <side-bar
      class="home__sidebar"
      :style="modal ? fadeStyle : null"
    ></side-bar>

    <div class="home__container">
      <search-bar
        class="home__search"
        @modalOpen="modalOpen($event)"
      ></search-bar>
      <div class="comingSoon">
        <h1 class="comingSoon__header">
          {{ localize("ComingSoon", "lang-en") }}
        </h1>
        <p class="comingSoon__description">
          {{ localize("WorkingOnIt", "lang-en") }}
        </p>

        <router-link
          :to="ROUTES.DASHBOARD"
          tag="button"
          class="button  button--light comingSoon__button"
        >
          <div>{{ localize("backToDashboard", "lang-en") }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { ROUTES } from "@/router/routes";
import localize from "@/localization/languages";
import SideBar from "@/components/SideBar.vue";
import SearchBar from "@/components/SearchBar.vue";

import { Icons } from "../IconPaths";

export default Vue.extend({
  name: "Home",
  components: {
    SideBar,
    SearchBar
  },
  data: function() {
    return {
      localize,
      Icons,
      modal: false,
      fadeStyle: {
        filter: "blur(7px)"
      }
    };
  },
  methods: {
    modalOpen(x: boolean) {
      this.modal = x;
    }
  },
  computed: {
    ROUTES() {
      return ROUTES;
    }
  }
});
</script>
