<template>
  <div class="home">
    <side-bar
      class="home__sidebar"
      :style="modal ? fadeStyle : null"
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
      ></search-bar>

      <div class="home__header" :style="modal ? fadeStyle : null">
        <div class="home__header__title ">
          <icon :name="Icons.ORDER" fill="#7B7F82" />
          <h1 class="home__header__title__text typo-xl">
            {{ localize("orders", "lang-en") }}
          </h1>
        </div>
        <div class="home__table-options">
          <Filters
            :title="`Status`"
            :filterField="`status`"
            :items="statusFilterItems"
            :selectedItems="GET_ORDER_FILTER_ITEMS"
          ></Filters>
          <Filters
            :title="`Location`"
            :filterField="`deviceSite`"
            :items="deviceStiteFilterItems"
            :selectedItems="GET_ORDER_FILTER_ITEMS"
          ></Filters>
        </div>
      </div>
      <Table
        :tableHeaders="this.$data.tableHeaders"
        :tableData="GET_SET_OF_ORDERS.data"
        :style="modal ? fadeStyle : null"
      ></Table>
      <div class="lg:col-span-8" :style="modal ? fadeStyle : null">
        <div class="lg:col-span-1"></div>
        <div class="lg:col-span-5 md:col-span-12">
          <!-- Scrolled : {{ scrolledToBottom }} -->
          <!-- <Pagination
            :selectedPage="GET_PAGINATION.pageno"
            :paginationDispatchOnModuleString="onPaginationDispatchString"
            :totalNumerOfRecords="GET_SET_OF_ORDERS.total"
            :maxRecordsPerPage="GET_PAGINATION.maxRecordsPerPage"
          ></Pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Table from "@/components/Table.vue";
// import Pagination from "@/components/Pagination.vue";
import Filters from "@/components/Filters.vue";
import { Modules } from "@/store";

import { mapGetters } from "vuex";
import { ROUTES } from "@/router/routes";
import localize from "@/localization/languages";
import SideBar from "@/components/SideBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import Icon from "@/components/Icon.vue";
import ErrorModal from "@/components/ErrorModal.vue";
import VScrollLock from "v-scroll-lock";
import { Icons } from "../IconPaths";
import { OrderActions } from "@/store/order/actions";
import { OrderGetters } from "@/store/order/getters";
import { dateTimeFormater } from "@/utils/formaters";
import { DeviceGetters } from "@/store/device/getters";
import { DeviceActions } from "@/store/device/actions";
Vue.use(VScrollLock);

export default Vue.extend({
  name: "OrdersList",
  components: {
    ErrorModal,
    Icon,
    Table,
    SideBar,
    SearchBar,
    Filters
  },
  data: function() {
    return {
      localize,
      scrolledToBottom: false,
      Icons,
      modal: false,
      fadeStyle: {
        filter: "blur(7px)"
      },
      // deviceStiteFilterItems: [],
      statusFilterItems: ["Planned", "Shipped", "Delivered", "Provisioned"].map(
        (v: string) => {
          return {
            value: v,
            field: "status",
            actionDispatchString: `${Modules.ORDERS}/${OrderActions.SET_FILTERS}`
          };
        }
      ),
      tableHeaders: [
        {
          title: "Order Seq #",
          field: "id",
          dataCellOverrideComponent: (
            cellData: unknown,
            defaultStyleClasses: string,
            rowData: unknown
          ): unknown => {
            return `<div class="${defaultStyleClasses} text-textSecondary">
                <router-link to="${ROUTES.ORDER_DETAILS_BASE}/${(rowData as {
              [key: string]: unknown;
            }).id as string}">${cellData}</router-link>
            </div>`;
          }
        },
        {
          title: "Submission",
          field: "createdAt",
          dataCellOverrideComponent: (
            cellData: unknown,
            defaultStyleClasses: string
          ): unknown => {
            return `<div class="${defaultStyleClasses}">
              ${dateTimeFormater(cellData as string)}
            </div>`;
          }
        },
        { title: "Location", field: "deviceSite" },
        // { title: "Total Price", field: "deliveryDate" },
        {
          title: "Current Stage",
          field: "status",
          dataCellOverrideComponent: (
            cellData: unknown,
            defaultStyleClasses: string
          ) => {
            const displayCellDeviceStatus = function(data: unknown) {
              switch (data) {
                case "Ordered":
                  return "quaternary";
                case "Planned":
                  return "neutral";
                case "Shipped":
                  return "processing";
                case "Delivered":
                  return "secondary";
                case "Provisioned":
                  return "textTertiary";
                default:
                  return "primary";
              }
            };
            const newCell = cellData === "Ordered" ? "Planned" : cellData;
            const cellColor = displayCellDeviceStatus(newCell);
            return `<div class="${defaultStyleClasses} chip">
              <div class="chip__img rounded-full bg-${cellColor}"></div>
              <div class="chip__text text-${cellColor}">${newCell}</div>
              </div>
            `;
          }
        }
      ]
    };
  },
  methods: {
    clearErrors() {
      this.$store.dispatch(`${Modules.ORDERS}/${OrderActions.RESET_ERRORS}`);

      this.$emit("clicked");
    },
    modalOpen(x: boolean) {
      this.modal = x;
    },
    onScroll() {
      // const zoom = ((window.outerWidth - 10) / window.innerWidth) * 100;

      window.ontouchmove = window.onmousewheel = window.onscroll = () => {
        this.scrolledToBottom =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight >=
          document.documentElement.offsetHeight; // replace it with your code

        // console.log(`Zoom:${zoom} Scroll:${this.scrolledToBottom}`);
        if (this.scrolledToBottom) {
          this.$store.dispatch(`${Modules.ORDERS}/${OrderActions.ATTACH}`);
        }
      };
    }
  },
  mounted: function() {
    this.onScroll();
    this.$store.dispatch(`${Modules.ORDERS}/${OrderActions.GET_ALL}`);
    this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.GET_SITES}`);
  },
  beforeDestroy: function() {
    window.ontouchmove = window.onmousewheel = window.onscroll = null;
  },
  computed: {
    ...mapGetters(Modules.ORDERS, [
      OrderGetters.GET_SET_OF_ORDERS,
      OrderGetters.GET_ALL_ORDERS,
      OrderGetters.GET_ORDER_FILTER_ITEMS,
      OrderGetters.GET_ERRORS
    ]),
    deviceStiteFilterItems: function(): {
      value: string;
      filed: string;
      actionDispatchString: string;
    }[] {
      return this.$store.getters[
        `${Modules.DEVICE}/${DeviceGetters.GET_ALL_SITES}`
      ].map((v: { name: string }) => {
        return {
          value: v.name,
          field: "deviceSite",
          actionDispatchString: `${Modules.ORDERS}/${OrderActions.SET_FILTERS}`
        };
      });
    },
    onPaginationDispatchString: function() {
      return `${Modules.ORDERS}/${OrderActions.SET_PAGINATION}`;
    },
    ROUTES() {
      return ROUTES;
    }
  }
});
</script>
