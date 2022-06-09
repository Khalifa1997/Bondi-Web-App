<template>
  <div class="w-full">
    <div id="pie-chart"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as echart from "echarts/core";
import {
  TooltipComponent,
  LegendComponent,
  VisualMapComponent
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";

type pieChartDataType = { value: number; name: string };

export default Vue.extend({
  props: {
    pieChartData: {
      default: [] as pieChartDataType[]
    }
  },
  watch: {
    pieChartData: function(
      oldVal: pieChartDataType[],
      newVal: pieChartDataType[]
    ) {
      const newSeries = { ...this.option.series[0] };
      newSeries.data = newVal;
      this.$data.myChart.setOption({
        ...this.option,
        series: newSeries
        // visualMap: {
        //   ...this.option.visualMap,
        //   min: Math.min(...newVal),
        //   max: Math.max(...newVal)
        // }
      });
    }
  },
  data: function() {
    return {
      myChart: null,
      option: {
        backgroundColor: "#FAFAFA",
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          data: this.pieChartData.map((v: pieChartDataType) => v.name),
          right: 10,
          top: 150,
          orient: "vertical"
        },
        // visualMap: {
        //   show: false,
        //   min: Math.min(...this.pieChartData.map(v => v.value)) * -30,
        //   max: Math.max(...this.pieChartData.map(v => v.value)) + 0,
        //   inRange: {
        //     colorLightness: [0, 0.7]
        //   }
        // },
        series: [
          {
            name: "Status",
            type: "pie",
            selectedMode: "single",
            radius: [0, "50%"],
            label: {
              position: "inner",
              fontSize: 14,
              formatter: `{d}%`
            },
            labelLine: {
              show: false
            },
            // itemStyle: {
            //   color: "#295CD4"
            //   // shadowBlur: 200,
            //   // shadowColor: "rgba(0, 0, 0, 0.5)"
            // },
            data: this.pieChartData
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
      TooltipComponent,
      LegendComponent,
      VisualMapComponent,
      PieChart,
      SVGRenderer
    ]);

    const element = this.$el.querySelector("#pie-chart");
    if (!element) {
      return;
    }
    this.$data.myChart = echart.init(element as HTMLElement, "light", {
      renderer: "svg",
      height: 374
    });

    this.$data.myChart.setOption(this.$data.option);
  }
});
</script>
