<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-slate-200 transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-0 lg:w-20',
        !sidebarOpen && 'overflow-hidden'
      ]"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center gap-3 px-4 border-b border-slate-200">
        <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <i class="bi bi-recycle text-white text-lg"></i>
        </div>
        <span v-if="sidebarOpen" class="font-bold text-slate-800 text-lg">Eco-Share</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
            isActive(item.path) 
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
          ]"
        >
          <i :class="item.icon"></i>
          <span v-if="sidebarOpen" class="font-medium">{{ item.label }}</span>
        </router-link>
      </nav>

      <!-- Collapse Button -->
      <div class="p-3 border-t border-slate-200">
        <button 
          @click="sidebarOpen = !sidebarOpen"
          class="hidden lg:flex w-full items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
        >
          <i :class="sidebarOpen ? 'bi bi-chevron-left' : 'bi bi-chevron-right'"></i>
          <span v-if="sidebarOpen" class="text-sm">Collapse</span>
        </button>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div 
      v-if="sidebarOpen && isMobile"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
    ></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Top Navbar -->
      <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
        <div class="flex items-center gap-4">
          <button 
            @click="sidebarOpen = !sidebarOpen"
            class="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <i class="bi bi-list text-xl"></i>
          </button>
          
          <!-- Search -->
          <div class="hidden md:flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-2 w-80">
            <i class="bi bi-search text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search..." 
              class="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
            />
          </div>
        </div>

        <div class="flex items-center gap-2 lg:gap-4">
          <!-- Notifications -->
          <button class="relative w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100">
            <i class="bi bi-bell text-lg"></i>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <!-- User Menu -->
          <div class="relative">
            <button 
              @click="userMenuOpen = !userMenuOpen"
              class="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-500 transition-colors"
            >
              <div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                {{ user?.name?.charAt(0) || 'A' }}
              </div>
              <span class="hidden sm:block text-sm font-medium text-slate-700">{{ user?.name || 'Admin' }}</span>
              <i class="bi bi-chevron-down text-xs text-slate-400"></i>
            </button>

            <!-- Dropdown -->
            <div 
              v-if="userMenuOpen"
              class="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
            >
              <router-link 
                to="/settings" 
                class="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                @click="userMenuOpen = false"
              >
                <i class="bi bi-person"></i> Profile
              </router-link>
              <router-link 
                to="/settings" 
                class="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                @click="userMenuOpen = false"
              >
                <i class="bi bi-gear"></i> Settings
              </router-link>
              <hr class="my-2 border-slate-200" />
              <button 
                @click="handleLogout"
                class="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <i class="bi bi-box-arrow-right"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-4 lg:p-6">
        <slot></slot>
      </main>
    </div>

    <!-- Toast -->
    <div 
      :class="[
        'fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-2xl transform transition-all duration-300 z-50',
        toast.show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      ]"
    >
      <i :class="toast.type === 'success' ? 'bi bi-check-circle text-emerald-500' : 'bi bi-exclamation-circle text-red-500'"></i>
      <span class="text-sm font-medium text-slate-700">{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { authService } from '../services/api.js';

const router = useRouter();
const route = useRoute();

const sidebarOpen = ref(true);
const userMenuOpen = ref(false);
const isMobile = ref(false);
const user = ref(null);

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
});

const menuItems = [
  { path: '/', label: 'Dashboard', icon: 'bi bi-grid-1x2 text-lg' },
  { path: '/products', label: 'Products', icon: 'bi bi-box-seam text-lg' },
  { path: '/rentals', label: 'Rentals', icon: 'bi bi-calendar-check text-lg' },
  { path: '/users', label: 'Users', icon: 'bi bi-people text-lg' },
  { path: '/reports', label: 'Reports', icon: 'bi bi-bar-chart text-lg' },
  { path: '/settings', label: 'Settings', icon: 'bi bi-gear text-lg' },
];

const isActive = (path) => {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
};

const handleLogout = () => {
  authService.logout();
  router.push('/login');
};

const showToast = (message, type = 'success') => {
  toast.message = message;
  toast.type = type;
  toast.show = true;
  setTimeout(() => {
    toast.show = false;
  }, 3000);
};

provide('showToast', showToast);

onMounted(() => {
  user.value = authService.getUser();
  
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 1024;
    if (isMobile.value) sidebarOpen.value = false;
  };
  
  checkMobile();
  window.addEventListener('resize', checkMobile);
});
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
</style>