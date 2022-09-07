import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';  //如果./router是目录，则默认找它内部文件
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

new Vue({
  router,   // 等价于 router: router
  store,
  render: h => h(App)
}).$mount('#app');
