<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <!--  []表示内部是变量    -->
    <li v-for="item in dataSource" :key="item.value" class="tabs-item"
        :class="liClass(item)" @click="select(item)">
      {{item.text}}
    </li>
  </ul>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem={
  text:string,
  value:string
}

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array}) dataSource!: { text: string, value: string }[];

  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;

  liClass(item:DataSourceItem){
    return {
      selected:item.value===this.value,
      [this.classPrefix+'-tabs-item']:this.classPrefix
    }
  }
  select(item:DataSourceItem){
    this.$emit('update:value',item.value)
  }
}
</script>

<style lang='scss' scoped>
.tabs {
  background: #ff898d;
  display: flex;
  text-align: center;
  font-size: 20px;
  padding: 0 72px;
  &-item {
    width: 50%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: #fff;
    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-35px);
      width: 70px;
      height: 3px;
      background: #333;
    }
  }
}
</style>