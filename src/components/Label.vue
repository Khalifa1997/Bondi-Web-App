<template>
  <label class="label">{{ title }}</label>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ""
    }
  }
});
</script>
