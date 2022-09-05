<template>
    <!-- 导航栏的svg不能套在div里 -->
    <svg class="icon" @click="$emit('click',$event)">
      <use v-bind:xlink:href="'#'+name" />
    </svg>

</template>

<script lang='ts'>
// eslint-disable-next-line no-undef
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);

try {
  importAll(require.context('../assets/icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}

export default {
  // 使用Icon组件的文件（Nav.vue），在使用Icon的时候传入name，作为Icon的prop
  // 配合v-bind，方便<use href="">确定使用哪个 svg
  props:['name'],
  name: 'Icon'
};
</script>

<style lang='scss' scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>