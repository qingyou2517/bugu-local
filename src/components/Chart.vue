<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {EChartsOption} from 'echarts';
import * as echarts from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartsOption;
  chart?:echarts.ECharts

  mounted() {
    if (this.options === undefined) {
      return console.error('options 为空');
    }
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart .setOption(this.options);
  }
  //不能只在 mounted 时 setOption，否则切换到“支出”，chart不变；
  //应该只要options变化，就重新渲染chart
  @Watch('options')
  onOptionsChange(newValue:EChartsOption){
    this.chart!.setOption(newValue)
  }
  beforeUnmount() {
    console.log('beforeUnmount')
    if (!this.chart) {
      return
    }
    // window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = undefined
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  height: 200px;
}
</style>