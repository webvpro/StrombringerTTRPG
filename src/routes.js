import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import SignIn from './views/SignIn.vue'
import Overlay from './views/Overlay.vue'
import LiveOverlay from './views/LiveOverlay.vue'
import Profile from './views/Profile.vue'
import SignUp from './views/SignUp.vue'

export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/overlay', component: Overlay, meta: { title: 'Overlays', secure: true } },
  { path: '/play', component: Overlay, meta: { title: 'Play', secure: true } },
  { path: '/liveoverlay', component: LiveOverlay, meta: { secure: true } },
  { path: '/profile', component: Profile, meta: { title: 'Profile', secure: true } },
  { path: '/signup', component: SignUp, meta: { title: 'Sign Up' } },
  {
    path: '/about',
    meta: { title: 'About' },
    component: About,
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue')
  },
  { name: 'login', path: '/login',  component: () => import('./views/SignIn.vue'), meta: { title: 'Sign In' }  },
  { path: '/:path(.*)', component: NotFound, meta: { title: 'Not Found' }  },
]
