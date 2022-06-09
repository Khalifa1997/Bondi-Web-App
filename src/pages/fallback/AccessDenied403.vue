<template>
  <div class="access-denied">
    <div class="access-denied__img-wrapper">
      <img
        class="access-denied__img"
        src="@/assets/403 Error Forbidden-rafiki 1.svg"
        alt="403"
      />
    </div>
    <div class="access-denied__title typo-xl">
      {{ localize("accessDeniedTitle", "lang-en") }}
    </div>
    <div class="access-denied__description typo-basic">
      {{ localize("accessDeniedDesc", "lang-en") }}
    </div>
    <div class="access-denied__action">
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
