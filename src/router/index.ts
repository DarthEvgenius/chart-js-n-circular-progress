import { createRouter, createWebHistory } from 'vue-router'

import CirclePage from '@/pages/CirclePage.vue'
import ChartPage from '@/pages/ChartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: CirclePage, name: 'circle' },
    { path: '/chart', component: ChartPage, name: 'chart' },
  ],
})

export default router
