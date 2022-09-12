<template>
  <div class="nav-wrapper" v-bind:class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" v-bind:class="classPrefix && `${classPrefix}-content`">
      <!--Layout的插槽：如Money.vue引入Layout时，Layout包裹的内容插入slot-->
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang='ts'>
export default {
  props:['classPrefix'],
  name: 'Layout'
};
</script>

<!--加scoped，只影响对应那几个标签-->
<style lang='scss' scoped>
.nav-wrapper{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content{
  overflow: auto;
  flex-grow: 1;
}
</style>