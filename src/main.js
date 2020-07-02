import Vue from 'vue';
import VueMeta from 'vue-meta';
import Fragment from 'vue-fragment';

import App from './App.vue';
import router from './routes';
import Modal from './components/globals/Modal.vue';

import './registerServiceWorker';
import './assets/styles/main.scss';
import '../node_modules/purecss/build/pure-min.css';

Vue.use(VueMeta);
Vue.use(Fragment.Plugin);

Vue.component('modal', Modal);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
