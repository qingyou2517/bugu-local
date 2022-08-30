<template>
  <div id="app">
    <!--     路由切换视图-->
    <router-view/>
    <hr/>

  </div>
</template>

<!--App.vue定义全局的样式，所以不能有scoped-->
<style lang="scss">
  @import "~@/assets/styles/helper.scss";
  @import "~@/assets/styles/reset.scss";
  body{
    line-height: 1.5;
    font-family: $font-hei;
    font-size: 16px;
  }

  // index.html中的div#app被vue的template代替了
  // 所以要用#app，还要在template里的div里额外加上id
  #app {
    // 这两句样式适用iphone
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
