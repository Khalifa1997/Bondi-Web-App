<template>
  <div class="progress-bar__info__container">
    <h1 class="progress-bar__info__title">
      {{ date }}
    </h1>
    <p class="progress-bar__info__paragraph">
      We’re currently preparing the order for you. Please hold on till we update
      the order status.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    date: {
      type: String,
      default: "15th of March 2021 3:20 PM"
    }
  }
});
</script>
