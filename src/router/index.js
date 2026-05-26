import { createRouter, createWebHistory } from 'vue-router';
import { authService } from '../services/api.js';

// Import views
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import ProductsView from '../views/ProductsView.vue';
import RentalsView from '../views/RentalsView.vue';
import UsersView from '../views/UsersView.vue';
import ReportsView from '../views/ReportsView.vue';
import SettingsView from '../views/SettingsView.vue';

// Define routes
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/rentals',
    name: 'Rentals',
    component: RentalsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersView,
    meta: { requiresAuth: true },
  },
  {
    path: '/reports',
    name: 'Reports',
    component: ReportsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsView,
    meta: { requiresAuth: true },
  },
];

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;