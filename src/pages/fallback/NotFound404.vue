<template>
  <div class="not-found">
    <div class="not-found__img-wrapper">
      <img
        class="not-found__img"
        src="@/assets/404 Error-rafiki 1.svg"
        alt="404"
      />
    </div>
    <div class="not-found__title typo-xl">
      {{ localize("notFoundTitle", "lang-en") }}
    </div>
    <div class="not-found__description typo-basic">
      {{ localize("notFoundDesc", "lang-en") }}
    </div>
    <div class="not-found__action">
      <router-link
        to="/"
        tag="button"
        class="button button--wide button--Fallback button--light"
      >
        {{ localize("backToHome", "lang-en") }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import localize from "@/localization/languages";

export default Vue.extend({
  data: function() {
    return {
      localize
    };
  }
});
</script>
