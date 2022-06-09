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
        :title="localize(`deleteConfirm`, `lang-en`)"
        :description="localize(`deleteConfirmParagraph`, `lang-en`)"
        v-if="modalShow"
        v-scroll-lock="modalShow"
        :action="() => 1 + 1"
        @clicked="toggleModal"
        :buttonName="localize(`delete`, `lang-en`)"
      />
      <div class="orderDetails" :style="eitherModalActive ? fadeStyle : null">
        <div class="orderDetails__breadCrumbs typo-xl">
          <icon :name="Icons.ORDER" />
          <bread-crumbs
            :items="['Orders', GET_SELECTED_ORDER_DEVICE.hostname]"
            class="ml-3"
          />
        </div>
        <card
          :header="
            GET_SELECTED_ORDER_DEVICE.model
              ? GET_SELECTED_ORDER_DEVICE.model.displayName
              : ``
          "
          title="CPE"
          class="orderDetails__img__card"
          @click.native="
            $router.push(
              ROUTES.DEVICE_DETAILS_BASE + `/${GET_SELECTED_ORDER_DEVICE.id}`
            )
          "
        >
          <template v-slot:img>
            <img
              class="orderDetails__img__card__img"
              :src="require('@/assets/test.png')"
          /></template>

          <template v-slot:company>
            <img
              class="orderDetails__img__card__company"
              :src="require('@/assets/cisco.jpg')"
          /></template>
          <template v-slot:price>
            <p class="orderDetails__img__card__price">$ 43000</p>
          </template>
          <template v-slot:label>
            <Label class="orderDetails__img__card__label" />
          </template>
        </card>
        <card header="New South Wales" class="orderDetails__card__left">
          <template v-slot:paragraph>
            <p class="orderDetails__card__left__paragraph">
              The is expected to arrive at your place within 10 days, on
              November 10, 2021
            </p>
          </template></card
        >
        <button class="cancelOrder" @click="toggleModal">Cancel Order</button>
        <order-details-card
          class="orderDetails__card__right"
          :orderNum="GET_SELECTED_ORDER.id"
          :hostname="GET_SELECTED_ORDER_DEVICE.hostname"
          :site="
            GET_SELECTED_ORDER_DEVICE.site
              ? GET_SELECTED_ORDER_DEVICE.site.name
              : ``
          "
          :vendor="
            GET_SELECTED_ORDER_DEVICE.site
              ? GET_SELECTED_ORDER_DEVICE.model.vendor
              : ``
          "
        >
        </order-details-card>
        <!-- <div
          class="orderDetails__provisionOrder"
          v-if="
            currentNode === 3 &&
              !GET_USER_LOGIN.user.permissions.CanManageOrder &&
              GET_USER_LOGIN.user.permissions.CanOrderDevice
          "
        >
          <p class="orderDetails__provisionOrder__text">
            Hold on. Your Device is now Provisioning.
          </p>
        </div> -->
      </div>

      <div class="orderDetails__progress-bar mt-6 mb-20">
        <progress-bar
          :trackURL="
            GET_SELECTED_ORDER ? GET_SELECTED_ORDER.shipTrackingUrl : ``
          "
          @progressed="incrementNode($event)"
          :orderID="GET_SELECTED_ORDER ? GET_SELECTED_ORDER.id : -1"
          :site="
            GET_SELECTED_ORDER_DEVICE.site
              ? GET_SELECTED_ORDER_DEVICE.site.name
              : ``
          "
          :headers="progressHeaders"
          :currentNode="currentNode"
          :style="eitherModalActive ? fadeStyle : null"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Card from "@/components/Card.vue";
import OrderDetailsCard from "@/components/OrderDetailsCard.vue";

import BreadCrumbs from "@/components/BreadCrumbs.vue";
import SideBar from "@/components/SideBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import ActionModal from "@/components/ActionModal.vue";
import ErrorModal from "@/components/ErrorModal.vue";
import VScrollLock from "v-scroll-lock";
import Icon from "@/components/Icon.vue";
import { Icons } from "../IconPaths";
import localize from "@/localization/languages";
import { ROUTES } from "@/router/routes";
import { LoginGetters } from "@/store/login/getters";
import { mapGetters } from "vuex";
import { Modules } from "@/store";
import { OrderActions } from "@/store/order/actions";
import { OrderGetters } from "@/store/order/getters";
import { DeviceDto } from "@/api/models";
import { Idevice } from "@/store/device/state";
import { Iorder } from "@/store/order/state";

Vue.use(VScrollLock);

export default Vue.extend({
  data: function() {
    return {
      ROUTES,
      modalShow: false,
      orderModal: false,
      incremented: false,
      Icons,
      fadeStyle: {
        filter: "blur(7px)"
      },
      localize,
      currentNode: 0,
      progressHeaders: [
        {
          title: "Ordered",
          status: "Finished",
          timestamp: new Date()
        },
        {
          title: "Planned",
          status: "Finished",
          timestamp: new Date()
        },
        {
          title: "Shipped",
          status: "Finished",
          timestamp: new Date()
        },
        {
          title: "Delivered",
          status: "Finished",
          timestamp: new Date()
        },
        {
          title: "Provisioned",
          status: "Finished",
          timestamp: new Date()
        }
      ]
    };
  },
  components: {
    BreadCrumbs,
    Icon,
    Card,
    OrderDetailsCard,
    ErrorModal,
    SideBar,
    SearchBar,
    ProgressBar,
    ActionModal
  },
  mounted() {
    this.$store.dispatch(`${Modules.ORDERS}/${OrderActions.GET_ORDER}`, {
      orderId: this.$route.params.id
    });
  },
  watch: {
    GET_SELECTED_ORDER: function(newVal: Iorder) {
      if (!newVal) {
        return;
      }
      this.currentNode = Math.max(
        1,
        ["Ordered", "Planned", "Shipped", "Delivered", "Provisioned"].indexOf(
          newVal.status
        )
      );

      if (newVal.shipDate)
        this.progressHeaders[2].timestamp = new Date(newVal.shipDate);
      if (newVal.deliveryDate)
        this.progressHeaders[3].timestamp = new Date(newVal.deliveryDate);
      this.progressHeaders[0].timestamp = new Date(newVal.createdAt);
    },
    incremented(newVal) {
      if (newVal) {
        this.currentNode += 1;
        this.incremented = false;
      }
    }
  },
  methods: {
    clearErrors() {
      this.$store.dispatch(`${Modules.ORDERS}/${OrderActions.RESET_ERRORS}`);

      this.$emit("clicked");
    },
    toggleModal() {
      this.modalShow = !this.modalShow;
    },
    modalOpen(x: boolean) {
      this.orderModal = x;
    },
    incrementNode(x: boolean) {
      if (x) this.incremented = true;
    }
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
    eitherModalActive(): boolean {
      return this.orderModal || this.modalShow;
    },
    ...mapGetters(Modules.LOGIN, [LoginGetters.GET_USER_LOGIN]),
    ...mapGetters(Modules.ORDERS, [
      OrderGetters.GET_SELECTED_ORDER,
      OrderGetters.GET_SELECTED_ORDER_DEVICE,
      OrderGetters.GET_ERRORS,
      OrderGetters.GET_LOADING
    ])
  }
});
</script>
