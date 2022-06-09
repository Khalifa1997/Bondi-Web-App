<template>
  <div class=" chip" :class="active ? `chipActive` : `chipInActive`">
    <div class="mx-1 my-1 flex flex-row items-center">
      <h1 class="text-xs">{{ name }}</h1>
      <div
        class="rounded-full h-3 w-3 ml-2"
        :class="active ? `activeCircle` : `inActiveCircle`"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    name: {
      type: String,
      default: "Up"
    },
    active: {
      type: Boolean,
      default: false
    }
  }
});
</script>
<style scoped>
.chip {
  border: 0.5px solid;
  border-radius: 5px;
}

.chipActive {
  background-color: #f2fcf5;
  border-color: #5ec169;
  color: #5ec169;
}

.chipInActive {
  background-color: #ffeaed;
  border-color: #c15e5e;
  color: #c15e5e;
}

.chip :hover {
  filter: invert(100%);
  -webkit-filter: invert(100%);
}

.activeCircle {
  background: #5ec169;
}

.inActiveCircle {
  background: #c15e5e;
}
</style>
