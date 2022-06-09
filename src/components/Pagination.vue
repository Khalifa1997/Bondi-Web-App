<template>
  <div class="pagination">
    <div class="flex text-gray-700">
      <div
        class="pagination__jumper pagination__cell pagination__cell--rounded-md"
        v-on:click="changePageHandle(1)"
      >
        <div class="">
          <img
            style="transform: rotate(90deg)"
            src="@/assets/arrow-down.svg"
            alt="lt"
          />
        </div>
      </div>
      <div class="pagination__cell-container">
        <div
          v-for="num in pageNumbers"
          v-bind:key="num"
          v-on:click="changePageHandle(num)"
          :class="
            'pagination__cell pagination__cell--rounded-md ' +
              (selectedPage === num ? 'pagination__cell-selected' : '')
          "
        >
          <div>
            {{ num }}
          </div>
        </div>
      </div>
      <div
        v-on:click="this.lastPage"
        class="pagination__jumper pagination__cell pagination__cell--rounded-md"
      >
        <div>
          <img
            style="transform: rotate(-90deg)"
            src="@/assets/arrow-down.svg"
            alt="lt"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: function() {
    return {};
  },
  props: {
    selectedPage: {
      default: 1 as number
    },
    paginationDispatchOnModuleString: {
      default: "" as string
    },
    totalNumerOfRecords: {
      default: 0 as number
    },
    maxRecordsPerPage: {
      default: 0 as number
    }
  },
  methods: {
    lastPage: function() {
      return Math.ceil(this.totalNumerOfRecords / this.maxRecordsPerPage);
    },
    changePageHandle: function(num: number) {
      if (!this.paginationDispatchOnModuleString) {
        return;
      }

      this.$store.dispatch(this.paginationDispatchOnModuleString, {
        pageno: num,
        maxRecordsPerPage: this.maxRecordsPerPage
      });
    }
  },
  computed: {
    pageNumbers: function() {
      if (this.totalNumerOfRecords < this.maxRecordsPerPage) {
        return [1];
      }

      const pageno = Math.ceil(
        this.totalNumerOfRecords / this.maxRecordsPerPage
      );
      if (pageno <= 7 || this.selectedPage < 4) {
        const s = Array(pageno <= 7 ? pageno : 7)
          .fill(1)
          .map((val: number, index: number) => val + index);

        return s;
      }

      const s = Array(pageno)
        .fill(1)
        .map((v: number, index: number) => v + index);

      const start = this.selectedPage - 3 < 1 ? 1 : this.selectedPage - 3;
      const end = this.selectedPage + 4;
      const temp = s.slice(start, end);
      if (temp.length !== 7) {
        const t = ([] as number[]).concat(
          Array(7 - temp.length)
            .fill(temp[0])
            .map((v: number, index: number) => v - index - 1)
            .reverse(),
          temp
        );

        return t;
      }

      return temp;
    }
  }
});
</script>
