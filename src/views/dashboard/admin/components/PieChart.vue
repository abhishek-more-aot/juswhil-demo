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

@Component({
  name: 'PieChart'
})
export default class extends mixins(ResizeMixin) {
  @Prop({ default: 'chart' }) private className!: string;
  @Prop({ default: '100%' }) private width!: string;
  @Prop({ default: '300px' }) private height!: string;
  private data:any

  created() {

  }

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
    this.data = data.categories
    const categoryNames:any[] = []
    await this.data.forEach((category:any) => {
      categoryNames.push(category.name)
    })

    this.chart = echarts.init(this.$el as HTMLDivElement, 'macarons')
    this.chart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: categoryNames
      },
      series: [
        {
          name: 'Videos per category',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: this.data,
          animationEasing: 'cubicInOut',
          animationDuration: 2600
        }
      ]
    } as EChartOption<EChartOption.SeriesPie>)
  }
}
</script>
