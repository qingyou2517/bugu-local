<template>
  <div id="app">
    <!--     路由切换视图-->
    <router-view/>
    <hr/>

  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  mounted() {
    // 基于窗口的内部高度计算 1vh
    let vh = window.innerHeight * 0.01

    // 将CSS变量设置为根元素
    // --vh 相当于 1vh，css用法(如100vh)： height: calc(var(--vh, 1vh)*100)
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    // 监听 resize，窗口大小改变时重新计算
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01
      // console.log(vh);
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
  },
}
</script>

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
  &::-webkit-scrollbar {
    display: none;
  }
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
