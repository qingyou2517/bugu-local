<template>
  <div>
    <ul class="types">
      <li :class="value==='-' && 'selected'"
          @click="selectType('-')">支出
      </li>
      <li :class="value==='+' && 'selected'"
          @click="selectType('+')">收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component,Prop} from 'vue-property-decorator';

@Component
//上面告知了这是组件，那么下面type和selectType分别会被处理为data和methods
export default class Types extends Vue {
  @Prop(String) readonly value!: string;

  selectType(type: string) { // type必须是'-'或'+'
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.$emit('update:value', type);
  }
}
</script>

<style lang='scss' scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>