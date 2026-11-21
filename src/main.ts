/**
 * Vue application entry point.
 * Creates the root App component, starts analytics, installs the router, and mounts it.
 */
import {createApp} from 'vue'
import App from '@/app.vue'
import router from '@/router'
import {startAnalytics} from '@/services/analytics'
import '@/assets/styles.css'

const app = createApp(App)

startAnalytics(app)

app.use(router).mount('#app')
