<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs__list ">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumbs__list__item"
      >
        <p
          v-if="index < items.length - 1"
          class="breadcrumbs__list__item__text "
        >
          {{ item }}
        </p>
        <img
          style="transform: rotate(-90deg)"
          src="@/assets/arrow-down.svg"
          v-if="index < items.length - 1"
          class="breadcrumbs__list__item__svg"
          alt="lt"
        />
      </li>
      <li class="breadcrumbs__list__item__last">
        <p class="breadcrumbs__list__item__last__text">
          {{ items[items.length - 1] }}
        </p>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    items: {
      type: Array,
      default: () => ["1", "2"]
    }
  }
});
</script>
