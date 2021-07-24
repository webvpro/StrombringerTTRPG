import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import SignIn from './views/SignIn.vue'
import Overlay from './views/Overlay.vue'
import LiveOverlay from './views/LiveOverlay.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/overlay', component: Overlay, meta: { title: 'Overlays' } },
  { path: '/liveoverlay', component: LiveOverlay },
  {
    path: '/about',
    meta: { title: 'About' },
    component: About,
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue')
  },
  { path: '/login', component: SignIn },
  { path: '/:path(.*)', component: NotFound },
]
