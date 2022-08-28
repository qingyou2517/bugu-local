<template>
  <!--     点击链接切换路由-->
  <div class="nav">
    <router-link to="/money">
      <Icon name='money'/>
      记账
    </router-link>
    |
    <router-link to="/labels">
      <!--上面 labels 是路由，下面 label 是svg名字-->
      <Icon name='label'/>
      栏目
    </router-link>
    |
    <router-link to="/statistics">
      <Icon name='statistics'/>
      统计
    </router-link>
  </div>
</template>

<script lang='ts'>
// import x from '@/assets/icons/money.svg';

export default {
  name: 'Nav'
};
</script>

<style lang='scss' scoped>
.nav {
  border: 1px solid red;

}
</style>