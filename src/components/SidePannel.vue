<template>
  <div class="">
    <div class="side-pannel">
      <div class="side-pannel__header">
        <div
          class="side-pannel__header__title side-pannel__header__title--light"
        >
          {{ localize("numberOfDevices", "lang-en") }}
        </div>
        <div class="side-pannel__header__data side-pannel__header__data--light">
          {{ totalNumberOfDevices }}
        </div>
      </div>
      <hr />
      <div class="side-pannel__body">
        <div class="side-pannel__body__title side-pannel__body__title--light">
          {{ localize("servedSites", "lang-en") }}
        </div>
        <div class="side-pannel__body__data side-pannel__body__data--light">
          {{ totalNumberOfSites }}
        </div>
      </div>
      <hr />
      <div class="side-pannel__footer">
        <div
          class="side-pannel__footer__title side-pannel__footer__title--light"
        >
          {{ localize("newOrders", "lang-en") }}
        </div>
        <div class="side-pannel__footer__data side-pannel__footer__data--light">
          {{ totalNumberOfOrders }}
        </div>
      </div>
    </div>
    <div class="side-pannel__actions"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import localize from "@/localization/languages";

export default Vue.extend({
  data() {
    return {
      localize,
      modal: false,
      Order: false
    };
  },
  methods: {
    closeModal() {
      if (this.modal) {
        this.modal = false;
        this.Order = false;
      }
    }
  },
  name: "SidePannel",

  props: {
    totalNumberOfDevices: {
      default: 0 as number
    },
    totalNumberOfSites: {
      default: 0 as number
    },
    totalNumberOfOrders: {
      default: 0 as number
    }
  }
});
</script>
