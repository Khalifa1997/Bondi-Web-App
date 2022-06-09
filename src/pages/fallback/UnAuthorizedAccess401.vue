<template>
  <div class="unauthurized">
    <div class="unauthurized__img-wrapper">
      <img
        class="unauthurized__img"
        src="@/assets/401 Error Unauthorized-rafiki 1.svg"
        alt="401"
      />
    </div>
    <div class="unauthurized__title typo-xl">
      {{ localize("unauthorizedTitle", "lang-en") }}
    </div>
    <div class="unauthurized__description typo-base">
      {{ localize("unauthorizedDesc", "lang-en") }}
    </div>
    <div class="unauthurized__action">
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
