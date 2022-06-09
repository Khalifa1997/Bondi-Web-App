<template>
  <div class="home">
    <side-bar
      class="home__sidebar"
      :style="modal ? fadeStyle : null"
    ></side-bar>

    <div class="home__container">
      <search-bar
        class="home__search"
        @modalOpen="modalOpen($event)"
      ></search-bar>

      <error-modal
        v-if="GET_ERRORS.length > 0"
        @clicked="clearErrors"
        v-scroll-lock="GET_ERRORS.length > 0"
      />
      <div class="home__header" :style="modal ? fadeStyle : null">
        <div class="home__header__title">
          <icon :name="Icons.DEVICES" fill="#7B7F82" />
          <h1 class="home__header__title__text typo-xl">
            {{ localize("devices", "lang-en") }}
          </h1>
        </div>
        <div class="home__table-options">
          <Filters
            :title="`Site`"
            :filterField="`site.name`"
            :items="StieFilterItems"
            :selectedItems="GET_DEVICE_FILTER_ITEMS"
          ></Filters>
          <Filters
            :title="`Model`"
            :filterField="`model.name`"
            :items="modelFilterItems"
            :selectedItems="GET_DEVICE_FILTER_ITEMS"
          ></Filters>
        </div>
      </div>
      <Table
        :tableHeaders="this.$data.tableHeaders"
        :tableData="GET_SET_OF_DEVICES.data"
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
import { DeviceGetters } from "@/store/device/getters";
import { DeviceActions } from "@/store/device/actions";
import { createNamespacedHelpers } from "vuex";
import { ROUTES } from "@/router/routes";
import localize from "@/localization/languages";
import SideBar from "@/components/SideBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import Icon from "@/components/Icon.vue";
import { Icons } from "../IconPaths";
import { IdeviceModel } from "@/store/device/state";
import ErrorModal from "@/components/ErrorModal.vue";
import VScrollLock from "v-scroll-lock";

Vue.use(VScrollLock);

const { mapGetters } = createNamespacedHelpers(Modules.DEVICE);
export default Vue.extend({
  name: "DevicesList",
  components: {
    // Pagination,
    Icon,
    Table,
    SideBar,
    SearchBar,
    Filters,
    ErrorModal
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

      tableHeaders: [
        {
          title: "Hostname",
          field: "hostname",
          dataCellOverrideComponent: (
            cellData: unknown,
            defaultStyleClasses: string,
            rowData: unknown
          ): unknown => {
            return `<div class="${defaultStyleClasses} text-textSecondary">
                <router-link to="${ROUTES.DEVICE_DETAILS_BASE}/${(rowData as {
              [key: string]: unknown;
            }).id as string}">${cellData}</router-link>
            </div>`;
          }
        },
        { title: "Vendor", field: "model.vendor" },
        { title: "Model", field: "model.name" },
        { title: "Site", field: "site.name" },
        {
          title: "Monitor",
          field: "healthInfoUrl",
          dataCellOverrideComponent: (
            cellData: unknown,
            defaultStyleClasses: string
          ) => {
            return `<div class="${defaultStyleClasses}">
               <a ${cellData ? `href="${cellData}"` : ""} target="_blank">
                <div class="button button--sm button--squared button--light ${
                  !cellData ? "button--disabled" : ""
                }">
                  <img src="${require("@/assets/monitor.svg")}" />
                </div>
              </a>
            </div>`;
          }
        },
        {
          title: "Status",
          field: "status",
          dataCellOverrideComponent: (
            cellData: unknown,
            defaultStyleClasses: string
          ) => {
            const selectColor = function(data: unknown) {
              switch (data) {
                case "Unknown":
                  return "Unknown";
                case "Offline":
                  return "text-neutral";
                case "Active":
                  return "text-processing";
                case "Planned":
                  return "text-secondary";
                case "Staged":
                  return "text-textTertiary";
                case "Failed":
                  return "text-danger";
                case "Inventory":
                  return "text-warning";
                case "Decommissioning":
                  return "text-textTertiary";
              }
              return "text-textPrimary";
            };
            const selectColorBG = function(data: unknown) {
              switch (data) {
                case "Unknown":
                  return "Unknown";
                case "Offline":
                  return "bg-neutral";
                case "Active":
                  return "bg-processing";
                case "Planned":
                  return "bg-secondary";
                case "Staged":
                  return "bg-textTertiary";
                case "Failed":
                  return "bg-danger";
                case "Inventory":
                  return "bg-warning";
                case "Decommissioning":
                  return "bg-textTertiary";
              }
              return "bg-textPrimary";
            };
            return `<div class="${defaultStyleClasses} chip">
                <div class="chip__img ${selectColorBG(cellData)}">
                </div>
                <div class="chip__text ${selectColor(
                  cellData
                )}">${cellData}</div>
              </div>`;
          }
        }
      ]
    };
  },
  methods: {
    clearErrors() {
      this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.RESET_ERRORS}`);

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

        console.log(`Zoom: Scroll:${this.scrolledToBottom}`);
        if (this.scrolledToBottom) {
          this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.ATTACH}`);
        }
      };
    }
  },
  mounted: function() {
    this.onScroll();
    this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.GET_ALL}`);
    this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.GET_SITES}`);
    this.$store.dispatch(`${Modules.DEVICE}/${DeviceActions.GET_MODELS}`);
  },
  beforeDestroy: function() {
    window.ontouchmove = window.onmousewheel = window.onscroll = null;
  },
  computed: {
    ...mapGetters([
      DeviceGetters.GET_PAGINATION,
      DeviceGetters.GET_SET_OF_DEVICES,
      DeviceGetters.GET_ALL_DEVICES,
      DeviceGetters.GET_DEVICE_FILTER_ITEMS,
      DeviceGetters.GET_ERRORS
    ]),
    onPaginationDispatchString: function() {
      return `${Modules.DEVICE}/${DeviceActions.SET_PAGINATION}`;
    },
    modelFilterItems: function() {
      const models: IdeviceModel[] = this.$store.getters[
        `${Modules.DEVICE}/${DeviceGetters.GET_MODELS}`
      ];
      return models.map(m => {
        return {
          value: m.name,
          field: "model.name",
          actionDispatchString: `${Modules.DEVICE}/${DeviceActions.SET_FILTERS}`
        };
      });
    },
    StieFilterItems: function(): {
      value: string;
      filed: string;
      actionDispatchString: string;
    }[] {
      return this.$store.getters[
        `${Modules.DEVICE}/${DeviceGetters.GET_ALL_SITES}`
      ].map((v: { name: string }) => {
        return {
          value: v.name,
          field: "site.name",
          actionDispatchString: `${Modules.DEVICE}/${DeviceActions.SET_FILTERS}`
        };
      });
    },
    ROUTES() {
      return ROUTES;
    }
  }
});
</script>
