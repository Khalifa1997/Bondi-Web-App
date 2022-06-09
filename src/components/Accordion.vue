<template>
  <div class="accordion">
    <div class="accordion__row" v-for="i in interfaces" :key="i.id">
      <div class="accordion__row__container">
        <div class="accordion__left" @click="selectRow(i.id)">
          <h1 class="accordion__left__header">{{ i.name }}</h1>
          <h2 class="accordion__left__subheader ">
            {{ i.description }}
          </h2>
        </div>
        <div class="typo-sm pr-2">{{ i.ipAddress }}</div>
        <button>
          <chip
            @click.native="changeUpDown(i.enabled, i.id)"
            :active="i.enabled"
            :name="i.enabled ? `Up` : `Down`"
          />
        </button>
      </div>
      <div class="accordion__row__data" v-if="selected === i.id">
        <div class="accordion__row__data__container">
          <div class="accordion__row__data__IP">
            <h1 class="accordion__row__data__title">IPv4 Address</h1>
            <div class="flex flex-col items-start" style="width: 30.3rem;">
              <input
                class="accordion__row__data__IP__field "
                :placeholder="
                  GET_SELECTED_INTERFACE.ipAddress
                    ? GET_SELECTED_INTERFACE.ipAddress
                    : `IP Address`
                "
                v-model="ipaddress"
              />
              <p
                class="max-w-md w-full text-danger mt-2 text-left text-sm ml-auto"
                v-if="ipaddressError.length > 0"
              >
                {{ ipaddressError }}
              </p>
            </div>
          </div>

          <div class="accordion__row__data__description">
            <h1 class="accordion__row__data__title">Description</h1>
            <textarea
              class="accordion__row__data__description__field"
              :placeholder="
                GET_SELECTED_INTERFACE.description
                  ? GET_SELECTED_INTERFACE.description
                  : `Description`
              "
              v-model="description"
            />
          </div>
          <primary-button
            :loading="GET_LOADING"
            @click.native="submitIP(i.id)"
            class="accordion__row__data__button button--light"
            :ButtonName="GET_LOADING ? `This will take a moment` : `Done`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Chip from "@/components/Chip.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { Modules } from "@/store";
import { DeviceActions } from "@/store/device/actions";
import { IdeviceInterface } from "@/store/device/state";
import { mapGetters } from "vuex";
import { DeviceGetters } from "@/store/device/getters";
import localize from "@/localization/languages";
const ipRegex = new RegExp(
  //eslint-disable-next-line
  "^([01]?\d\d?|2[0-4]\d|25[0-5])(?:\.(?:[01]?\d\d?|2[0-4]\d|25[0-5])){3}(?:/[0-2]\d|/3[0-2])?$"
);
export default Vue.extend({
  components: {
    Chip,
    PrimaryButton
  },
  data() {
    return {
      localize,
      selected: -1,
      ipaddress: "",
      description: "",
      ipaddressError: "",
      descriptionError: ""
    };
  },
  props: {
    interfaces: {
      default: [] as IdeviceInterface[],
      required: true
    },
    deviceID: {
      default: "" as string,
      required: true
    }
  },
  computed: {
    ...mapGetters(Modules.DEVICE, [
      DeviceGetters.GET_SELECTED_INTERFACE,
      DeviceGetters.GET_LOADING
    ])
  },
  methods: {
    selectRow(i: number) {
      if (this.selected === i) {
        this.selected = -1;
        return;
      }
      this.selected = i;
      this.$store.dispatch(
        `${Modules.DEVICE}/${DeviceActions.SET_DEVICE_INTERFACE_DESCRIPTION}`,
        { interfaceId: i }
      );
    },
    changeUpDown(enabled: boolean, interfaceID: number) {
      const confirmed = confirm(
        `Are you sure you want to change to the interface to ` +
          (enabled ? `down` : `up`) +
          `?`
      );
      if (confirmed)
        this.$store.dispatch(
          `${Modules.DEVICE}/${DeviceActions.ADD_DEVICE_STATUS}`,
          {
            deviceId: this.deviceID,
            interfaceId: interfaceID,
            enabled: !enabled
          }
        );
    },
    submitIP(interfaceID: number) {
      const arr = this.ipaddress.split(/\.|\//gm).map(num => Number(num));
      const isAllNumbers = arr.every(num => typeof num === "number");

      if (
        !isAllNumbers ||
        arr.length !== 5 ||
        !arr.slice(0, arr.length - 1).every(n => n < 256) ||
        arr[4] === 0
      ) {
        this.ipaddressError = localize("ipAddressErrorFormat", "lang-en");
        return;
      }
      this.$store.dispatch(
        `${Modules.DEVICE}/${DeviceActions.ADD_DEVICE_INTERFACE_DESCRIPTION}`,
        {
          deviceId: this.deviceID,
          interfaceId: interfaceID,
          data: {
            description: this.description,
            ipAddressV4: this.ipaddress
          }
        }
      );
    }
  }
});
</script>
