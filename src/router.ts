/**
 * Application routes.
 * History mode — firebase.json rewrites all paths to /index.html.
 */
import {createRouter, createWebHistory, isNavigationFailure} from 'vue-router'
import type {RouteLocationNormalized} from 'vue-router'
import ChamberScreen from '@/components/screens/chamber_screen.vue'
import HomeScreen from '@/components/screens/home_screen.vue'
import {findChamber} from '@/services/chamber_catalogue'
import {isTouchFirst} from '@/services/device'
import {rememberFirstEntry} from '@/services/page_history'
import {findPlaygroundChamber} from '@/services/playground'

const GAME_TITLE = 'Portal 2D' // The page title on every screen but a chamber's, and the end of a chamber's

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

/**
 * The page title for a route: a chamber's name before the game's, so a tab
 * cut short still shows which chamber it is, and the game's alone elsewhere.
 * @param route - The route arrived at
 * @returns The title
 */
function pageTitle(route: RouteLocationNormalized): string {
  const chamberNumber = Number(route.params.number)
  const entry = route.name === 'chamber'
    ? findChamber(chamberNumber)
    : route.name === 'playground' ? findPlaygroundChamber(chamberNumber) : undefined
  return entry === undefined ? GAME_TITLE : `${entry.name} · ${GAME_TITLE}`
}

// Each arrival names its page in the tab; a navigation that was stopped, such as a cancelled exit
// from a chamber, keeps the title of the page still shown, and the desktop-only notice keeps the game's
router.afterEach((to, _, failure) => {
  if (isNavigationFailure(failure) || isTouchFirst) {
    return
  }
  document.title = pageTitle(to)
})

export default router
