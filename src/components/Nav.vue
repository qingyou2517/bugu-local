<template>
  <!--     点击链接切换路由-->
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name='money2'/>
      记账
    </router-link>

    <router-link to="/labels" class="item" active-class="selected">
      <Icon name='label2'/>
      标签
    </router-link>

    <router-link to="/details" class="item" active-class="selected">
      <Icon name='details'/>
      明细
    </router-link>

    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics2"/>
      统计
    </router-link>
  </nav>
</template>

<script lang='ts'>
// import x from '@/assets/icons/money2.svg';

export default {
  name: 'Nav'
};
</script>

<style lang='scss' scoped>
  @import "~@/assets/styles/helper.scss";
  nav {
    display: flex;
    // box-shadow让导航栏看起像 浮起来
    @extend %outShadow;
    background: #ffffff;
    font-size: 12px;
    min-height: 54px;

    > .item {
      width: 25%;
      // 居中
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 2px 0;
      // 引入svg时，svg-sprite-loader把svg转换成的symbol里自带class='icon'
      // 可以在浏览器里看symbol标签
      // 当然，也可以自己加上class
      .icon {}
    }

    > .item.selected {
      color: $color-highlight;
    }
  }
</style>