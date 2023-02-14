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

body {
  line-height: 1.5;
  font-family: $font-hei;
  font-size: 16px;
  background: #f5f5f5;
}

// index.html中的div#app被vue的template代替了
// 所以要用#app，还要在template里的div里额外加上id
#app {
  // 这两句样式适用iphone
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  max-width: 500px;
  margin: 0 auto;
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

//element-ui：prompt 输入提交
.el-message-box{
  width: 260px;
}

//element-ui：alert 消息弹出框
.el-message {
  top: 20px !important;
  min-width: 100px !important;
}

</style>
