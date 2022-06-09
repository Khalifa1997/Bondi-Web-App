<template>
  <div class="w-full">
    <div id="bar-chart"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as echart from "echarts/core";
import {
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";
interface IbarChartData {
  category: string[];
  colors: string[];
  data: { [key: string]: number[] };
}

export default Vue.extend({
  name: "BarChart",
  props: ["barChartData"],
  watch: {
    barChartData: function(newVal: IbarChartData) {
      // watch it

      this.$data.myChart.setOption({
        ...this.option,
        legend: {
          ...this.option.legend,
          data: Object.keys(newVal.data)
        },
        yAxis: [
          { ...this.option.yAxis[0] },
          {
            ...this.option.yAxis[1],
            max:
              Math.max(
                ...Object.keys(this.barChartData.data).map((key: string) => {
                  return Math.max(...this.barChartData.data[key]);
                })
              ) + 5
          }
        ],
        xAxis: [
          {
            type: "category",
            // data: this.barChartData.map(v => v.name),
            data: newVal.category,
            splitLine: {
              show: false
            }
          }
        ],
        series: Object.keys(newVal.data).map((key: string, index: number) => {
          return {
            itemStyle: {
              color: newVal.colors[index]
            },
            yAxisIndex: 1,
            name: key,
            type: "bar",
            data: newVal.data[key]
          };
        })
      });
    }
  },
  data: function() {
    return {
      myChart: {} as never,
      option: {
        backgroundColor: "#fafafa",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: Object.keys(this.barChartData.data),
          top: 20
        },
        grid: {
          bottom: "3%",
          containLabel: true
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: ""
            }
          },
          {
            type: "value",
            min: 0,
            max:
              Math.max(
                ...Object.keys(this.barChartData.data).map((key: string) => {
                  return Math.max(...this.barChartData.data[key]);
                })
              ) + 5,
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        xAxis: [
          {
            type: "category",
            // data: this.barChartData.map(v => v.name),
            data: this.barChartData.category,
            axisLabel: {
              interval: 0,
              rotate: 45
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: Object.keys(this.barChartData.data).map(
          (key: string, index: number) => {
            const style = this.barChartData.colors[index]
              ? {
                  itemStyle: {
                    color: this.barChartData.colors[index]
                  }
                }
              : {};
            return {
              ...style,
              yAxisIndex: 1,
              name: key,
              type: "bar",
              data: this.barChartData.data[key]
            };
          }
        )
      }
    };
  },
  beforeUpdate: function() {
    this.$data.myChart.setOption(this.$data.option);
  },
  mounted: function() {
    echart.use([
      TooltipComponent,
      GridComponent,
      VisualMapComponent,
      LegendComponent,
      BarChart,
      SVGRenderer
    ]);

    const element = this.$el.querySelector("#bar-chart");
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
