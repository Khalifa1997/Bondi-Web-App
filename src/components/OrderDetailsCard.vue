<template>
  <div class="orderDetails-card">
    <h1 class="orderDetails-card__header">
      {{ localize("orderDetails", "lang-en") }}
    </h1>
    <div class="orderDetails-card__container"></div>
    <div class="orderDetails-card__item">
      <p class="orderDetails-card__left">
        {{ localize("order", "lang-en") + " " + localize("number", "lang-en") }}
      </p>
      <h1 class="orderDetails-card__right">
        {{ orderNum }}
      </h1>
    </div>
    <div class="orderDetails-card__item">
      <p class="orderDetails-card__left">
        {{ localize("hostname", "lang-en") }}
      </p>
      <h1 class="orderDetails-card__right">
        {{ hostname }}
      </h1>
    </div>
    <div class="orderDetails-card__item">
      <h1 class="orderDetails-card__left">{{ localize("site", "lang-en") }}</h1>
      <h1 class="orderDetails-card__right">
        {{ site }}
      </h1>
    </div>
    <div class="orderDetails-card__item">
      <h1 class="orderDetails-card__left">
        {{ localize("price", "lang-en") }}
      </h1>
      <h1 class="orderDetails-card__right">
        ${{ price == 0 ? totalcost : price }}
      </h1>
    </div>

    <div class="orderDetails-card__item">
      <p class="orderDetails-card__left">{{ localize("vendor", "lang-en") }}</p>
      <h1 class="orderDetails-card__right">{{ vendor }}</h1>
    </div>

    <div class="orderDetails-card__item">
      <p class="orderDetails-card__left">
        {{ localize("totalCost", "lang-en") }}
      </p>
      <h1 class="orderDetails-card__right">$ {{ totalcost }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import localize from "@/localization/languages";

export default Vue.extend({
  data: function() {
    return {
      localize
    };
  },
  props: {
    orderNum: {
      default: "" as string
    },
    hostname: {
      type: String,
      default: "Host name"
    },
    site: {
      type: String,
      default: "Site"
    },
    price: {
      type: Number,
      default: 0
    },
    totalcost: {
      type: Number,
      default: (Math.random() * 20000).toFixed(2)
    },
    vendor: {
      type: String,
      default: "Cisco"
    }
  }
});
</script>
