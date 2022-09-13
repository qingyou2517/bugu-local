<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {EChartsOption} from 'echarts';
import * as echarts from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartsOption;

  mounted() {
    if (this.options === undefined) {
      return console.error('options 为空');
    }
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    chart.setOption(this.options);
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  height: 400px;
}
</style>