import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import ProfilePage from "../views/ProfilePage.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path:'/login',
    component: () => import('@/views/LogInPage.vue')
  },
  {
    path:'/signup',
    component: () => import('@/views/SignUpPage.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'   
      },
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'map',
        component: () => import('@/views/MapPage.vue')
      },
      {
        path: 'home/places/:id',
        component: () => import('@/views/DetailPlacesPage.vue')
      },
      {
        path: 'rec',
        component: () => import('@/views/RecommendPage.vue')
      },
      {
        path: 'video',
        component: () => import('@/views/VideoPage.vue')
      },
      {
        path: 'trips',
        component: () => import('@/views/TripsPage.vue')
      },{
        path: 'profile',
        component: ProfilePage
      },{
        path: 'rec/detail/:id',
        component: () => import('@/views/RecommededPlacesDetail.vue')
      },{
        path: 'trips/detail/:id',
        component: () => import('@/views/RecommededTripDetail.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
