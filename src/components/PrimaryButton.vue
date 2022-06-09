<template>
  <div
    class="button button--wide button--rounded-sm"
    :class="loading ? ` buttonLoading` : ``"
  >
    <img
      v-if="loading"
      :src="require(`@/assets/loading.svg`)"
      class="mr-2 w-5 h-5"
      alt="lt"
    />

    <button>
      {{ ButtonName }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    ButtonName: {
      type: String,
      default: "Button"
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
});
</script>
