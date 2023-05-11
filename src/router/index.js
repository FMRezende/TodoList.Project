import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import EditarView from '../views/EditarView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: '/', component: HomeView, name: 'home', meta: { requiresAuth: true } },
    {
      path: '/editar/:id',
      component: EditarView,
      name: 'editar',
      meta: { requiresAuth: true }
    },
    { path: '/login', component: LoginView, name: 'login' },
    { path: '/register', component: RegisterView, name: 'register' }
  ]
})

router.beforeEach(async (to) => {
  const store = useUserStore()

  if (store.user === undefined) {
    await store.fetchUser()
  }

  console.log('beforeEach')
  console.log(store.user)

  if (to.meta.requiresAuth && store.user === null) {
    return { name: 'login' }
  }
  if ((to.name === 'login' || to.name === 'signup') && store.user !== null) {
    return { name: 'home' }
  }
})

export default router
