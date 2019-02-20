import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Settings from './views/Settings'
import Login from './views/Login'
import Collection from './views/Collection'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/collection/:id',
      name: 'collection',
      component: Collection,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login');
  }
  else if (!requiresAuth && currentUser) {
    next('home');
  }
  else {
    next();
  }
});

export default router;
