<template>
  <div class="home">
    <side-bar
      class="home__sidebar"
      :style="eitherModalActive ? fadeStyle : null"
    ></side-bar>
    <error-modal
      v-if="GET_ERRORS.length > 0"
      @clicked="clearErrors"
      v-scroll-lock="GET_ERRORS.length > 0"
    />
    <div class="home__container">
      <search-bar
        class="home__search"
        @modalOpen="modalOpen($event)"
        :style="modalShow ? fadeStyle : null"
      ></search-bar>
      <action-modal
        :title="localize(`decommissionConfirm`, `lang-en`)"
        :description="localize(`decommissionConfirmParagraph`, `lang-en`)"
        v-if="modalShow"
        v-scroll-lock="modalShow"
        :action="modalAction"
        @clicked="toggleModal"
        :buttonName="localize(`decommission`, `lang-en`)"
      />
      <div class="deviceDetails" :style="eitherModalActive ? fadeStyle : null">
        <div class="device__breadCrumbs">
          <icon :name="Icons.ORDER" />
          <bread-crumbs
            :items="['Devices', GET_SELECTED_DEVICE.hostname]"
            class="ml-4"
          />
        </div>
        <div class="">
          <div class="typo-lg device-details__header">Model Details</div>
          <model-details
            :id="this.$route.params.id"
            :device="GET_SELECTED_DEVICE"
            class="deviceDetails__model-details"
          />
        </div>
        <button class="deviceDetails__button" @click="toggleModal">
          <icon class="ml-auto" :name="Icons.DELETE" />
          <h2 class="deviceDetails__button__text">
            Decommission device
          </h2>
        </button>
        <div class="">
          <div class="typo-lg device-details__header">Interfaces</div>
          <accordion
            :interfaces="GET_INTERFACES"
            :deviceID="this.$route.params.id"
            class="deviceDetails__accordion"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import SideBar from "@/components/SideBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import ActionModal from "@/components/ActionModal.vue";
import ModelDetails from "@/components/ModelDetails.vue";
import localize from "@/localization/languages";
import VScrollLock from "v-scroll-lock";
import Icon from "@/components/Icon.vue";
import Accordion from "@/components/Accordion.vue";
import { Icons } from "../IconPaths";
import { mapGetters } from "vuex";
import { Modules } from "@/store";
import { DeviceGetters } from "@/store/device/getters";
import { DeviceActions } from "@/store/device/actions";
import ErrorModal from "@/components/ErrorModal.vue";
Vue.use(VScrollLock);
export default Vue.extend({
  data: function() {
    return {
      modalShow: false,
      orderModal: false,
      Icons,
      fadeStyle: {
        filter: "blur(7px)"
      },
      localize
      // interfaces: [] as IdeviceInterface[],
      // device: {} as Idevice
    };
  },

  // async created() {
  //   await axios
  //     .get(`/api/management/devices/${this.$route.params.id}/interfaces`)
  //     .then(res => (this.interfaces = res.data))

  //   await axios
  //     .get(`/api/management/devices/${this.$route.params.id}`)
  //     .then(res => (this.device = res.data))

  // },
  components: {
    BreadCrumbs,
    Icon,
    ModelDetails,
    Accordion,
    ErrorModal,
    SideBar,
    SearchBar,
    ActionModal
  },

  methods: {
    modalAction() {
      this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.DELETE}`, {
        deviceId: this.$route.params.id
      });
    },
    clearErrors() {
      this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.RESET_ERRORS}`);

      this.$emit("clicked");
    },
    toggleModal() {
      this.modalShow = !this.modalShow;
    },
    modalOpen(x: boolean) {
      this.orderModal = x;
    }
  },
  mounted() {
    this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.GET_INTERFACES}`, {
      deviceId: this.$route.params.id
    });
    this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.GET_DEVICE}`, {
      deviceId: this.$route.params.id
    });
  },
  beforeRouteLeave(to, from, next) {
    window.onbeforeunload = null;

    if (this.GET_LOADING)
      window.onbeforeunload = (event: any) => {
        const e = event || window.event;
        // Cancel the event
        e.preventDefault();
        if (e) {
          e.returnValue = ""; // Legacy method for cross browser support
        }
        return ""; // Legacy method for cross browser support
      };
    else {
      next();
    }
  },
  computed: {
    ...mapGetters(Modules.DEVICE, [
      DeviceGetters.GET_SELECTED_DEVICE,
      DeviceGetters.GET_INTERFACES,
      DeviceGetters.GET_ERRORS,
      DeviceGetters.GET_LOADING
    ]),
    eitherModalActive(): boolean {
      return this.orderModal || this.modalShow;
    }
  }
});
</script>
