<template>
  <table class="table">
    <tr class="table__header table__header--light">
      <th
        v-for="(item, index) in tableHeaders"
        v-bind:key="index"
        class="table__header__cell table__header__cell--light"
      >
        <div class="table__header__cell__title">{{ item.title }}</div>
      </th>
    </tr>
    <tr
      v-for="(item, index) in tableData"
      v-bind:key="item.id"
      class="table__row"
    >
      <td
        v-for="theader in tableHeaders"
        v-bind:key="theader.field"
        class="table__row__cell table__row__cell--light short-text"
        :style="
          theader.dataCellOverrideStyles &&
          theader.dataCellOverrideStyles.length !== 0
            ? theader.dataCellOverrideStyles.join(';')
            : ''
        "
      >
        <div
          v-if="theader.dataCellOverrideComponent === undefined"
          class="table__row__cell__data short-text"
        >
          {{ getObjVal(item, `${theader.field}`) }}
        </div>
        <div v-if="theader.dataCellOverrideComponent !== undefined">
          <v-runtime-template
            :template="
              theader.dataCellOverrideComponent(
                item[theader.field],
                'table__row__cell__data short-text',
                item,
                index
              )
            "
          >
          </v-runtime-template>
        </div>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import VRuntimeTemplate from "v-runtime-template";

export default Vue.extend({
  components: {
    VRuntimeTemplate
  },
  methods: {
    getObjVal: function(_obj: unknown, str: string) {
      const s = eval(`_obj.${str}`);
      return s;
    }
  },
  props: {
    theme: {
      default: ""
    },

    tableHeaders: {
      default: [] as {
        title: string;
        field: string;
        dataCellOverrideStyles: string[];
        headCellOverrideStyles: string[];
        // return v-html string
        dataCellOverrideComponent: (
          cellData: unknown,
          defaultStyleClasses: string,
          rowData: unknown,
          rowIndex: number
        ) => string;
      }[]
    },
    tableData: {
      default: [] as { id: string; [key: string]: unknown }[]
    }
  }
});
</script>
