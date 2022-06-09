<template>
  <div
    :class="`filter filter--light `"
    v-on:click="show = !show"
    v-click-outside="modalClose"
  >
    <div class="filter__header">
      {{ title }}
    </div>
    <div class="filter__selected">
      <div class="align-middle">
        Selected items
        {{ numberOfItemsSelected }}
      </div>
      <div class="filter__arrow">
        <img src="@/assets/arrow-down.svg" alt="arr" />
      </div>
    </div>
    <div class="filter__content filter__content--light">
      <div class="filter__content__top"></div>
      <ul class="filter__content__list filter__content__list--light">
        <li
          v-for="(item, index) in items"
          v-bind:key="item.field + index"
          v-on:click="filterBy(item, index), $event.stopImmediatePropagation()"
          :class="
            `filter__content__list__item filter__content__list__item--light ${
              item.checked === true ? 'selected typo-base' : 'typo-sm'
            }`
          "
        >
          <CheckBox
            :lable="item.value"
            :id="item.field"
            :checked="item.value"
            :val="item.value"
          ></CheckBox>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CheckBox from "@/components/CheckBox.vue";

export default Vue.extend({
  name: "Filters",
  components: {
    CheckBox
  },
  data: function() {
    return {
      numberOfItemsSelected: "None" as number | string,
      show: false as boolean
    };
  },
  props: {
    title: {
      default: "" as string
    },
    filterField: {
      default: ""
    },
    selectedItems: {
      default: {} as { [key: string]: unknown[] }
    },
    items: {
      default: [] as {
        field: string;
        value: string;
        actionDispatchString: string;
        checked: boolean;
      }[]
    }
  },

  methods: {
    modalClose() {
      this.show = !this.show;
    },
    filterBy: function(data: { [key: string]: unknown }, index: number) {
      this.items[index].checked = !this.items[index].checked;
      this.$store.dispatch(data.actionDispatchString as string, {
        value: data.value,
        field: data.field
      });
      const item = this.selectedItems[this.filterField];
      if (!item || !item.length) {
        this.numberOfItemsSelected = "None";
        return undefined;
      }
      this.numberOfItemsSelected = item.length;
    }
  }
});
</script>
