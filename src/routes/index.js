import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import Game from '@/views/Game.vue';

Vue.use(Router);

const PageNotFound = () => import('../views/PageNotFound.vue');

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: Home,
    name: 'home',
  },
  {
    path: '/game',
    component: Game,
    name: 'game',
  },
  {
    path: '*',
    component: PageNotFound,
    name: 'page-not-found',
  },
  ],
});
