<template>
  <div class="line-chart">
    <div class="line-chart__header line-chart__header--light">
      <div class="line-chart__header__section">
        <div class="line-chart__header__text line-chart__header__text--light">
          {{ localize("users", "lang-en") }}
        </div>
        <div
          class="line-chart__header__subtext line-chart__header__subtext--light"
        >
          12
        </div>
      </div>
      <div class="line-chart__header__section">
        <div class="line-chart__header__text line-chart__header__text--light">
          {{ localize("rateOfIncrease", "lang-en") }}
        </div>
        <div
          class="line-chart__header__subtext line-chart__header__subtext--light"
        >
          +12%
        </div>
      </div>
      <div class="line-chart__header__section">
        <div class="line-chart__header__text line-chart__header__text--light">
          {{ localize("devicePerformance", "lang-en") }}
        </div>
        <div
          class="line-chart__header__subtext line-chart__header__subtext--light"
        >
          {{ localize("thisMonth", "lang-en") }}
        </div>
      </div>
    </div>
    <hr />
    <div class="line-chart__chart"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as echart from "echarts/core";
import {
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";

import localize from "@/localization/languages";

export default Vue.extend({
  name: "LineChart",
  props: {
    chartData: {
      default: [] as number[][]
    }
  },
  watch: {
    chartData: function(newVal: number[][]) {
      // watch it

      const newSeries = [...this.option.series];
      newSeries[0].data = newVal[0];

      const newYAxis = { ...this.option.yAxis };
      const maxSet1 = Math.max(...newVal[0]);
      const maxSet2 = Math.max(...newVal[1]);
      newYAxis.max = (maxSet1 > maxSet2 ? maxSet1 : maxSet2) + 2;

      this.$data.myChart.setOption({
        ...this.option,
        series: newSeries,
        yAxis: newYAxis
      });
    }
  },
  data: function() {
    return {
      localize,
      myChart: {} as never,
      option: {
        legend: {
          data: ["XRv 9000", "CSR 1000V"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        backgroundColor: "#FAFAFA",
        tooltip: {
          trigger: "axis"
          // formatter: "{value}",
          // show: true,
          // z: 10
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          splitLine: {
            show: true
          },
          boundaryGap: false
        },
        yAxis: {
          type: "value",
          max:
            Math.max(
              ...(Math.max(...this.chartData[0]) >
              Math.max(...this.chartData[1])
                ? this.chartData[0]
                : this.chartData[1])
            ) + 2,
          splitLine: {
            show: false
          },
          boundaryGap: false
        },
        series: [
          {
            name: "XRv 9000",
            itemStyle: {
              color: "#295CD4"
            },
            areaStyle: {
              color: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#fafafa"
                },
                {
                  offset: 1,
                  color: "#E5F6F6"
                }
              ])
            },
            data: this.chartData[1],
            type: "line",
            smooth: true
          },
          {
            name: "CSR 1000V",
            itemStyle: {
              color: "#295CD4"
            },
            areaStyle: {
              color: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#295CD4"
                },
                {
                  offset: 1,
                  color: "#E5F6F6"
                }
              ])
            },
            data: this.chartData[0],
            type: "line",
            smooth: true
          }
        ]
      }
    };
  },
  beforeUpdate: function() {
    this.$data.myChart.setOption(this.$data.option);
  },
  mounted: function() {
    echart.use([
      GridComponent,
      LineChart,
      ToolboxComponent,
      SVGRenderer,
      LegendComponent,
      TooltipComponent
    ]);

    const element = this.$el.querySelector(".line-chart__chart");
    if (!element) {
      return;
    }
    this.$data.myChart = echart.init(element as HTMLElement, "light", {
      renderer: "svg",
      height: 318
    });

    this.$data.myChart.setOption(this.$data.option);
  }
});
</script>
