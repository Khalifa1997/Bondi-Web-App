<template>
  <div class="drawer">
    <input type="checkbox" class="drawer__toggle" name="drawer-toggle" />
    <label for="drawer-toggle" class="drawer__toggle__label"></label>
    <header class="app__header"></header>
    <nav class="drawer__side">
      <ul class="drawer__list">
        <li
          v-for="item in this.drawerMenuItems"
          v-bind:key="item.name"
          class="drawer__list__item"
        >
          <router-link :to="item.location">{{ item.name }} </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    drawerMenuItems: {
      default: [] as { name: string; location: string }[]
    }
  }
});
</script>
