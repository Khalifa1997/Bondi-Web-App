<template>
  <div class="checkbox w-full" :for="id">
    <div class="checkbox__title">{{ lable }}</div>
    <div class="checkbox__image-container">
      <img
        v-if="checked"
        src="@/assets/checkbox-checked.svg"
        alt="chkbx-chkd"
      />
      <img v-if="!checked" src="" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "CheckBox",
  props: {
    id: {
      default: "" as string
    },
    name: {
      default: "" as string
    },
    checked: {
      default: false as boolean
    },
    val: {
      default: "NOVAL" as unknown
    },
    lable: {
      default: "" as string
    }
  }
});
</script>
