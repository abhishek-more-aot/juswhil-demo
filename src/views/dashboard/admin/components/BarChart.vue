<template>
  <div
    :class="className"
    :style="{height: height, width: width}"
  />
</template>

<script lang="ts">
import echarts, { EChartOption } from 'echarts'
import { Component, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import ResizeMixin from '@/components/Charts/mixins/resize'
import { getAdminStats } from '@/api/admins'

const animationDuration = 6000

@Component({
  name: 'BarChart'
})
export default class extends mixins(ResizeMixin) {
  @Prop({ default: 'chart' }) private className!: string;
  @Prop({ default: '100%' }) private width!: string;
  @Prop({ default: '300px' }) private height!: string;
  @Prop({ default: [] }) private months!:[];
  @Prop({ default: [] }) private barChartData!:[];

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  }

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }

  private async initChart() {
    const data: any = await getAdminStats()
    const barChartData = data.users

    const yData = barChartData.counts
    const xData = barChartData.months
    this.chart = echarts.init(this.$el as HTMLDivElement, 'macarons')
    this.chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: 10,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        {
          name: 'Users',
          type: 'bar',
          stack: 'vistors',
          // barWidth: '60%',
          data: yData,
          animationDuration
        }
        // {
        //   name: 'pageB',
        //   type: 'bar',
        //   stack: 'vistors',
        //   // barWidth: '60%',
        //   data: [80, 52, 200, 334, 390, 330, 220],
        //   animationDuration
        // },
        // {
        //   name: 'pageC',
        //   type: 'bar',
        //   stack: 'vistors',
        //   // barWidth: '60%',
        //   data: [30, 52, 200, 334, 390, 330, 220],
        //   animationDuration
        // }
      ]
    } as EChartOption<EChartOption.SeriesBar>)
  }
}
</script>
