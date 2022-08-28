<template>
  <div class="nav-wrapper">
    <div class="content">
      <!--Layout的插槽：组件引入Layout时，Layout包裹的内容插入slot-->
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang='ts'>
export default {
  name: 'Layout'
};
</script>

<!--加scoped，只影响对应那几个标签-->
<style lang='scss' scoped>
.nav-wrapper{
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content{
  border: 1px solid blue;
  overflow: auto;
  flex-grow: 1;
}
</style>