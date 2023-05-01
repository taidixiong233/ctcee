import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@views/HomeView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Settings',
    name: 'settings',
    component: () => import('@views/SettingsView.vue'),
    children: [
      {
        path: 'basic',
        name: 'basicSttings',
        component: () => import('@views/BasicSettingsView.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@views/AboutView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
