<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="'0 0 ' + width + ' ' + height"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :d="name" :fill="fill" />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 20
    },
    height: {
      type: Number,
      default: 20
    },
    fill: {
      type: String,
      default: "#7B7F82"
    }
  }
});
</script>
