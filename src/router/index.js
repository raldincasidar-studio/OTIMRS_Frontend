import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'
import toast from '@/plugins/toast'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/personal-information-collection',
      name: 'personal-information-collection',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PersonalInformationCollection.vue')
    },
    {
      path: '/hotel-bookings',
      name: 'hotel-bookings',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HotelBookings.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Login.vue')
    },
    {
      path: '/admin/dashboard',
      name: 'admin/dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Dashboard.vue')
    }
  ]
})

// GUARDS
router.beforeEach((to, from) => {
  // ...
  // explicitly return false to cancel the navigation
  const auth = useAuthStore()
  if (to.path.startsWith('/admin/') && !auth.admin.session_id) {
    toast.fire({
      title: 'Login first!',
      icon: 'warning'
    })
    return '/admin'
  }
  if (to.path == '/admin' && auth.admin.session_id) return '/admin/dashboard'
})

export default router
