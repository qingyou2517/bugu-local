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

// // 软键盘出现前页面的高度
// const winHeight = window.outerHeight;
// window.onresize = function(){
//   // 软键盘出现时页面的高度
//   const changeHeight = window.outerHeight;
//   if(winHeight-changeHeight>40){
//     document.body.style.height=winHeight+"px";
//   }else{
//     document.body.style.height='100%';
//   }
// }

