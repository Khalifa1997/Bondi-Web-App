<template>
  <div class="modelDetails">
    <div class="modelDetails__container">
      <div class="modelDetails__row">
        <h1 class="modelDetails__left">Model</h1>
        <h1 class="modelDetails__right">
          {{ device.model ? device.model.name : `Name` }}
        </h1>
      </div>

      <div class="modelDetails__row">
        <h1 class="modelDetails__left">Hostname</h1>
        <h1 class="modelDetails__right">{{ device.hostname }}</h1>
      </div>
      <div class="modelDetails__row">
        <h1 class="modelDetails__left">IP Address</h1>
        <h1 class="modelDetails__right">{{ device.managementIpAddress }}</h1>
      </div>
      <div class="modelDetails__row">
        <h1 class="modelDetails__left">Site</h1>
        <h1 class="modelDetails__right">
          {{ device.site ? device.site.name : `Site` }}
        </h1>
      </div>
      <div class="modelDetails__row">
        <h1 class="modelDetails__left">Status</h1>
        <h1 class="modelDetails__active">{{ device.status }}</h1>
      </div>
      <div class="modelDetails__row">
        <h1 class="modelDetails__left">Running Config</h1>
        <button class="modelDetails__icon" @click="downloadConfig">
          <icon :width="22" fill="#212121" :name="Icons.DOWNLOAD" />
          <h1 class="modelDetails__icon__text">Download</h1>
        </button>
      </div>
      <div
        class="modelDetails__row"
        v-if="device.order && device.order.shipTrackingUrl"
      >
        <h1 class="modelDetails__left">Tracking URL</h1>
        <a
          class="modelDetails__right modelDetails__URL"
          target="_blank"
          :href="device.order.shipTrackingUrl"
          >Tracking URL</a
        >
      </div>
      <div class="modelDetails__row" v-if="device.healthInfoUrl">
        <h1 class="modelDetails__left">Tracking Health URL</h1>
        <a
          class="modelDetails__right modelDetails__URL button button--sm button--squared button--light"
          target="_blank"
          :href="device.healthInfoUrl"
        >
          <img :src="require(`@/assets/monitor.svg`)" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Icon from "@/components/Icon.vue";
import { Icons } from "../IconPaths";
import { axios } from "../api/config";
import { DeviceDto } from "@/api/models";

export default Vue.extend({
  components: {
    Icon
  },
  data() {
    return {
      Icons
    };
  },
  props: {
    id: {
      type: String
    },
    device: {
      type: Object as PropType<DeviceDto>
    }
  },
  methods: {
    downloadConfig() {
      axios.get(`api/management/devices/${this.id}/configuration`).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${this.device.hostname}.config.txt`);
        document.body.appendChild(link);
        link.click();
      });
    }
  }
});
</script>
