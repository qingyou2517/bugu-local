<template>
  <!--     点击链接切换路由-->
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name='money'/>
      记账
    </router-link>
    |
    <router-link to="/labels" class="item" active-class="selected">
      <!--上面 labels 是路由，下面 label 是svg名字-->
      <Icon name='label'/>
      栏目
    </router-link>
    |
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name='statistics'/>
      统计
    </router-link>
  </nav>
</template>

<script lang='ts'>
// import x from '@/assets/icons/money.svg';

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
    font-size: 12px;

    > .item {
      width: 33.33%;
      // 居中
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 2px 0;
      // 引入svg时，svg-sprite-loader把svg转换成的symbol里自带class='icon'
      // 可以在浏览器里看symbol标签
      // 当然，也可以自己加上class
      .icon {
        width: 32px;
        height: 32px;
      }
    }

    > .item.selected {
      color: $color-highlight;
    }
  }
</style>