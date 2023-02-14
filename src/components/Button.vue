<template>
  <button class="button" @click="$emit('click',$event)">
    <slot />
  </button>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Button extends Vue {

}
</script>

<style lang='scss' scoped>
.button {
  border: none;
  background: #f60;
  color: white;
  border-radius: 4px;
  height: 40px;
  padding: 0 16px;
  transition: transform 0.2s cubic-bezier(0.68, 0.01, 0.62, 0.6), opacity 0.08s linear;

  &:active {
    transform: scale(0.95);
    opacity: 0.5;
  }

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
}
</style>