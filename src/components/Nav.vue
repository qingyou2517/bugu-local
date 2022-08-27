<template>
  <!--     点击链接切换路由-->
  <div class="nav">
    <router-link to="/money">记账</router-link>
    |
    <router-link to="/labels">栏目</router-link>
    |
    <router-link to="/statistics">统计</router-link>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'Nav'
};
</script>

<style lang='scss' scoped>
  .nav{
    border: 1px solid red;

  }
</style>