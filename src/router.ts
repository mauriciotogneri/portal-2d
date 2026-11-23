/**
 * Application routes.
 * History mode — firebase.json rewrites all paths to /index.html.
 */
import {createRouter, createWebHistory} from 'vue-router'
import ChamberScreen from '@/components/screens/chamber_screen.vue'
import HomeScreen from '@/components/screens/home_screen.vue'
import {findChamber} from '@/services/chamber_catalogue'
import {rememberFirstEntry} from '@/services/page_history'
import {findPlaygroundChamber} from '@/services/playground'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeScreen,
    },
    {
      path: '/chamber/:number(\\d+)',
      name: 'chamber',
      component: ChamberScreen,
      props: (route) => ({
        list: 'campaign' as const,
        chamberNumber: Number(route.params.number),
      }),
      // An address for a chamber that does not exist falls back to the chamber list
      beforeEnter: (to) => (findChamber(Number(to.params.number)) === undefined ? {
        name: 'home',
      } : true),
    },
    // The playground chambers, outside the campaign; in production builds this address is the only
    // way in, as the home menu lists them in development only
    {
      path: '/playground/:number(\\d+)',
      name: 'playground',
      component: ChamberScreen,
      props: (route) => ({
        list: 'playground' as const,
        chamberNumber: Number(route.params.number),
      }),
      beforeEnter: (to) => (findPlaygroundChamber(Number(to.params.number)) === undefined ? {
        name: 'home',
      } : true),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: {
        name: 'home',
      },
    },
  ],
})

// The router's history has numbered the entry this page load starts on
rememberFirstEntry(router.options.history.state)

export default router
