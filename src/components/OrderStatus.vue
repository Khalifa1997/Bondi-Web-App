<template>
  <div class="orderStatus">
    <div class="orderStatus__container">
      <div class="orderStatus__first">
        <h1 class="orderStatus__first__OrderStatus">Order Status</h1>
        <p class="orderStatus__first__text" v-if="this.progress === 60">
          Prepare the order
        </p>
        <p class="orderStatus__first__text" v-else>Received</p>
      </div>
    </div>
    <div class="orderStatus__second">
      <div class="orderStatus__second__width" :class="`w-` + progressCalc">
        <div class="orderStatus__second__bg">
          <p class="orderStatus__second__progress">{{ progress }}%</p>
          <p class="orderStatus__second__status__progress">
            {{ localize("statusProgress", "lang-en") }}
          </p>
        </div>
      </div>
    </div>
    <div class="orderStatus__third">
      <div class="orderStatus__third__container">
        <p class="orderStatus__third__progress">
          {{ progress === 60 ? `Next Step` : `Device Status` }}
        </p>
        <div class="chip" v-if="progress === 100">
          <div class="chip__img rounded-full bg-warning"></div>
          <div class="text-warning ml-1">
            {{ localize("active", "lang-en") }}
          </div>
        </div>
        <p v-else class="">{{ localize("shippingTheOrder", "lang-en") }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import localize from "@/localization/languages";
export default Vue.extend({
  data: function() {
    return { localize };
  },
  props: {
    progress: {
      type: Number,
      default: 100
    }
  },
  computed: {
    progressCalc: function() {
      if (this.progress == 60) {
        return "3/5";
      } else {
        return "full";
      }
    }
  }
});
</script>
