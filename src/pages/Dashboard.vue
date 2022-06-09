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

      <div class="dashboard" :style="modal ? fadeStyle : null">
        <!-- <div class="dashboard__title col-span-12"></div> -->
        <div class="dashboard__section">
          <div class="dashboard__line-chart dashboard__line-chart--light">
            <LineChart :chartData="lineChartData"></LineChart>
          </div>
          <div class="dashboard__side-pannel">
            <SidePannel
              :totalNumberOfDevices="GET_ALL_DEVICES.length"
              :totalNumberOfSites="GET_ALL_SITES.length"
              :totalNumberOfOrders="
                GET_ALL_ORDERS.filter(v => v.status === 'Ordered').length
              "
            ></SidePannel>
          </div>
        </div>
        <div class="dashboard__section">
          <div class="dashboard__pie-chart">
            <PieChart
              :pieChartData="[
                {
                  value: GET_ALL_ORDERS.filter(v => v.status === 'Ordered')
                    .length,
                  name: localize('ordered', 'lang-en'),
                  itemStyle: {
                    color: '#BDBDBD'
                  },
                  label: {
                    color: '#fff'
                  }
                },
                {
                  value: GET_ALL_ORDERS.filter(v => v.status === 'Provisioned')
                    .length,
                  name: localize('provisioned', 'lang-en'),
                  itemStyle: {
                    color: '#7b7f82'
                  },
                  label: {
                    color: '#fff'
                  }
                },
                {
                  value: GET_ALL_ORDERS.filter(v => v.status === 'Shipped')
                    .length,
                  name: localize('shipped', 'lang-en'),
                  itemStyle: {
                    color: '#29D459'
                  },
                  label: {
                    color: '#fff'
                  }
                },
                {
                  value: GET_ALL_ORDERS.filter(v => v.status === 'Delivered')
                    .length,
                  name: localize('delivered', 'lang-en'),
                  itemStyle: {
                    color: '#295CD4'
                  },
                  label: {
                    color: '#fff'
                  }
                },
                {
                  value: GET_ALL_ORDERS.filter(v => v.status === 'Planned')
                    .length,
                  name: localize('planned', 'lang-en'),
                  itemStyle: {
                    color: '#efc83d'
                  },
                  label: {
                    color: '#fff'
                  }
                }
              ]"
            ></PieChart>
          </div>
          <div class="dashboard__bar-chart">
            <BarChart :barChartData="getbarChartData()"></BarChart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LineChart from "@/components/LineChart.vue";
import SidePannel from "@/components/SidePannel.vue";
import PieChart from "@/components/PieChart.vue";
import BarChart from "@/components/BarChart.vue";
import { mapGetters } from "vuex";
import { Modules } from "@/store";
import { DeviceGetters } from "@/store/device/getters";
import { DeviceActions } from "@/store/device/actions";
import localize from "@/localization/languages";
import SearchBar from "@/components/SearchBar.vue";
import SideBar from "@/components/SideBar.vue";
import { OrderGetters } from "@/store/order/getters";
import { OrderActions } from "@/store/order/actions";
import { Idevice, IdeviceModel } from "@/store/device/state";
// const { mapGetters } = createNamespacedHelpers(Modules.DEVICE);

export default Vue.extend({
  components: {
    LineChart,
    SidePannel,
    PieChart,
    BarChart,
    SideBar,
    SearchBar
  },
  data: function() {
    return {
      localize,
      barChartData: {},
      pieChartData: [
        { value: 1548, name: localize("active", "lang-en") },
        { value: 775, name: localize("ordered", "lang-en") }
      ] as { value: number; name: string }[],
      lineChartData: [
        [0.9, 2.5, 8, 1, 4, 7.5, 7.3],
        [1, 3, 7, 1, 2, 6, 6]
      ] as number[][],
      barChartSalesData: [18203, 23489] as number[],
      barChartReturnData: [19325, 23438] as number[],
      modal: false,
      fadeStyle: {
        filter: "blur(7px)"
      }
    };
  },
  computed: {
    ...mapGetters(Modules.DEVICE, [
      DeviceGetters.GET_ALL_DEVICES,
      DeviceGetters.GET_ALL_SITES
    ]),
    ...mapGetters(Modules.ORDERS, [OrderGetters.GET_ALL_ORDERS])
  },
  methods: {
    getbarChartData: function() {
      const models: IdeviceModel[] = this.$store.getters[
        `${Modules.DEVICE}/${DeviceGetters.GET_MODELS}`
      ];
      const devices: Idevice[] = this.$store.getters[
        `${Modules.DEVICE}/${DeviceGetters.GET_ALL_DEVICES}`
      ];

      const categories = models.map(m => m.displayName);
      const data = {
        category: categories,
        colors: [
          "#29D459",
          "#efc83d",
          "#295CD4",
          "#7b7f82",
          "#D96464",
          "#38a169"
        ],
        data: {
          active: models.map(
            m =>
              devices.filter(
                d =>
                  m.displayName == d.model.displayName && d.status === "Active"
              ).length
          ), //online
          offline: models.map(
            m =>
              devices.filter(
                d =>
                  m.displayName == d.model.displayName && d.status === "Offline"
              ).length
          ), //offline
          planned: models.map(
            m =>
              devices.filter(
                d =>
                  m.displayName == d.model.displayName && d.status === "Planned"
              ).length
          ),
          staged: models.map(
            m =>
              devices.filter(
                d =>
                  m.displayName == d.model.displayName && d.status === "Staged"
              ).length
          ),
          failed: models.map(
            m =>
              devices.filter(
                d =>
                  m.displayName == d.model.displayName && d.status === "Failed"
              ).length
          ),
          inventory: models.map(
            m =>
              devices.filter(
                d =>
                  m.displayName == d.model.displayName &&
                  d.status === "Inventory"
              ).length
          ),
          decom: models.map(
            m =>
              devices.filter(
                d =>
                  m.displayName == d.model.displayName &&
                  d.status === "Decommissioning"
              ).length
          ),
          unknown: models.map(
            m =>
              devices.filter(
                d =>
                  m.displayName == d.model.displayName && d.status === "Unknown"
              ).length
          )
        }
      };
      return data;
    },
    modalOpen(x: boolean) {
      this.modal = x;
    }
  },
  mounted: function() {
    this.$store.dispatch(
      `${Modules.DEVICE}/${DeviceActions.GET_ALL}`,
      undefined
    );
    this.$store.dispatch(
      `${Modules.DEVICE}/${DeviceActions.GET_SITES}`,
      undefined
    );
    this.$store.dispatch(
      `${Modules.ORDERS}/${OrderActions.GET_ALL}`,
      undefined
    );
    this.$store.dispatch(
      `${Modules.DEVICE}/${DeviceActions.GET_MODELS}`,
      undefined
    );
  }
});
</script>
