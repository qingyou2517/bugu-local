import Vue from 'vue';
import {Menu, MessageBox, Message, DatePicker, Tabs, TabPane, Button} from 'element-ui';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';  //如果./router是目录，则默认找它内部文件
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false;
Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Menu.name, Menu);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(Button.name, Button);

Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

new Vue({
  router,   // 等价于 router: router
  store,
  render: h => h(App)
}).$mount('#app');

window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 200);
  }, 0);
};

// // 软键盘出现前视口页面的高度
// const winHeight = window.outerHeight;
// window.onresize = function () {
//   // 软键盘出现时视口页面的高度
//   const changeHeight = window.outerHeight;
//   // 两者之差就是键盘高度：
//   // 呼出键盘，则 keyboardHeight < 0
//   // 键盘收起来后，又会调用 window.onresize，此时 keyboardHeight = 0
//   const keyboardHeight = changeHeight - winHeight;
//   const app = document.querySelector('app') as HTMLElement;
//   app.style.bottom = keyboardHeight + 'px';
//   // 当呼出键盘，就让消息框出现在软键盘上方4px的位置
//   if (keyboardHeight < 0) {
//     const messageBox = document.querySelector('.el-message-box') as HTMLElement;
//     messageBox.style.bottom = 4 - keyboardHeight + 'px';
//   }
// };
