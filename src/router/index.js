import { createWebHistory, createRouter } from "vue-router";
import { getUserState } from '@/modules/firebase'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component:  () => import('../views/Home.vue'), meta: { title: 'Home' } },
  //{ path: '/overlay', component: () => import('@/views/OverLay.vue'), meta: { title: 'Overlays', secure: true } },
  { path: '/games', component: () => import('@/views/Games.vue'), meta: { title: 'Games', secure: true } },
  { path: '/profile', component: () => import('@/views/Profile.vue'), meta: { title: 'Profile', secure: true } },
  { path: '/signup', component: () => import('@/components/auth/Signup.vue'), meta: { title: 'Sign Up' } },
  {
    path: '/about',
    meta: { title: 'About' },
    component: () => import('@/views/About.vue'),
  },
  { name: 'login', path: '/login',  component: () => import('@/components/auth/Login.vue'), meta: { title: 'Sign In' }  },
  { path: '/:path(.*)', component: () => import('@/views/NotFound.vue'), meta: { title: 'Not Found' }  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isSecure = to.matched.some(record => record.meta.secure)
  const isAuth = await getUserState()
  
  if (isSecure && !isAuth) {
    const loginpath = window.location.pathname;
    next({ name: 'login', query: { from: loginpath }})
  } else {
    next()
  }  
})

export default router;
