<template>
  <div class="numberPad">
    <div class="output">{{ output || '&nbsp;' }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">ok</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component

export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output = '0';

  inputContent(event: MouseEvent) {
    // as: 强制类型指定
    // event.target可能为空，用强制指定消除报错
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent as string;
    if (this.output.length === 16) {return;}
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    const index = this.output.indexOf('.')
    if (index >= 0) {
      const index2 = this.output.indexOf('.') + 3;
      if (this.output.length >= index2) {return;}
      if ( input === '.') {return;}
    }
    this.output += input;
  }

  remove() {
    this.output = this.output.substring(0, this.output.length - 1);
    if (this.output.length === 0) this.output = '0';
  }

  clear() {
    this.output = '0';
  }

  ok() {
    const number = parseFloat(this.output);
    this.$emit('update:value', number);
    this.$emit('submit', number);
    this.output = '0';
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/styles/helper.scss";

.numberPad {
  .output {
    @extend %innerShadow;
    background: #ffffff;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 2px 16px;
    text-align: right;

  }

  .buttons {
    @extend %clearFix;

    > button {
      width: 25%;
      height: 48px;
      float: left;
      background: transparent;
      border: none;

      &.ok {
        height: 48*2px;
        float: right;
      }

      &.zero {
        width: 25%*2;
      }

      $bg: #f5f5f5;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 1%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 1*2%);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 1*3%);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 1*4%);
      }

      &:nth-child(14) {
        background: darken($bg, 1*5%);
      }

      &:nth-child(12) {
        background: darken($bg, 1*6%);
      }
    }
  }
}
</style>