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
    },
    {
      path: '/admin/tourist-information',
      name: 'admin/tourist-information',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/TouristInformation.vue')
    },
    {
      path: '/admin/tourist-information/:id',
      name: 'admin/tourist-information/:id',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Tourist/Edit.vue')
    },
    {
      path: '/admin/attractions',
      name: 'admin/attractions',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Attractions.vue')
    },
    {
      path: '/admin/attractions/add',
      name: 'admin/attractions/add',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Attractions/Add.vue')
    },
    {
      path: '/admin/attractions/:id',
      name: 'admin/attractions/:id',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Attractions/Edit.vue')
    },
    {
      path: '/admin/activities',
      name: 'admin/activities',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Activities.vue')
    },
    {
      path: '/admin/activities/add',
      name: 'admin/activities/add',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Activities/Add.vue')
    },
    {
      path: '/admin/activities/:id',
      name: 'admin/activities/:id',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Activities/Edit.vue')
    },
    {
      path: '/admin/arrivals',
      name: 'admin/arrivals',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Arrivals.vue')
    },
    {
      path: '/admin/papers/arrivals',
      name: 'admin/papers/arrivals',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/papers/Arrivals.vue')
    },
    {
      path: '/admin/management',
      name: 'admin/management',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/AdminManagement.vue')
    },
    {
      path: '/admin/add',
      name: 'admin/add',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Admin/Add.vue')
    },
    {
      path: '/admin/:id',
      name: 'admin/:id',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/Admin/Edit.vue')
    },
    {
      path: '/recommender',
      name: 'recommender',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Recommender.vue')
    },
    {
      path: '/activity-info/:id',
      name: 'activity-info/:id',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ActivitiesInfo/Info.vue')
    },
    {
      path: '/attraction-info/:id',
      name: 'attraction-info/:id',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AttractionInfo/Info.vue')
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
