<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p class="text-slate-500">Welcome back, <span class="font-semibold text-emerald-600">{{ user?.name }}</span></p>
        </div>
        <div class="flex items-center gap-2">
          <button class="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-sm font-medium">
            <i class="bi bi-download mr-2"></i>Export
          </button>
          <button class="px-4 py-2 bg-emerald-500 rounded-xl text-white hover:bg-emerald-600 text-sm font-medium shadow-lg shadow-emerald-500/30">
            <i class="bi bi-plus mr-2"></i>Add New
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-slate-500 font-medium">{{ stat.label }}</p>
              <p class="text-2xl font-bold text-slate-800 mt-1">{{ stat.value }}</p>
              <p :class="['text-sm font-medium mt-2 flex items-center gap-1', stat.changeType === 'up' ? 'text-emerald-600' : 'text-red-600']">
                <i :class="stat.changeType === 'up' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                {{ stat.change }}
              </p>
            </div>
            <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', stat.bgClass]">
              <i :class="['text-xl', stat.iconClass]"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts & Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Revenue Chart -->
        <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-bold text-slate-800">Revenue Overview</h3>
              <p class="text-sm text-slate-500">Monthly revenue statistics</p>
            </div>
            <select class="px-3 py-1.5 bg-slate-100 rounded-lg text-sm text-slate-600 border-none outline-none">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div class="h-64 flex items-end justify-between gap-2">
            <div 
              v-for="(bar, index) in chartData" 
              :key="index"
              class="flex-1 flex flex-col items-center gap-2"
            >
              <div 
                class="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:from-emerald-600 hover:to-emerald-500 transition-all cursor-pointer"
                :style="{ height: bar.value + '%' }"
              ></div>
              <span class="text-xs text-slate-500">{{ bar.label }}</span>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 class="text-lg font-bold text-slate-800 mb-6">Recent Activity</h3>
          <div class="space-y-4">
            <div 
              v-for="(activity, index) in recentActivity" 
              :key="index"
              class="flex items-start gap-3"
            >
              <div :class="['w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', activity.bgClass]">
                <i :class="['text-lg', activity.iconClass]"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-slate-800 truncate">{{ activity.title }}</p>
                <p class="text-xs text-slate-500">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Rentals Table -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold text-slate-800">Recent Rentals</h3>
            <p class="text-sm text-slate-500">Latest rental transactions</p>
          </div>
          <router-link to="/rentals" class="text-sm font-medium text-emerald-600 hover:text-emerald-700">
            View All <i class="bi bi-arrow-right ml-1"></i>
          </router-link>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Product</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr 
                v-for="(rental, index) in recentRentals" 
                :key="index"
                class="hover:bg-slate-50 transition-colors"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <i class="bi bi-laptop text-slate-600"></i>
                    </div>
                    <span class="font-medium text-slate-800">{{ rental.product }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ rental.customer }}</td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ rental.date }}</td>
                <td class="px-6 py-4 font-medium text-slate-800">Rp {{ formatPrice(rental.amount) }}</td>
                <td class="px-6 py-4">
                  <span :class="['px-3 py-1 rounded-full text-xs font-medium', rental.statusClass]">
                    {{ rental.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import { authService } from '../services/api.js';

const showToast = inject('showToast');
const user = ref(null);

const stats = ref([
  { label: 'Total Products', value: '156', change: '+12%', changeType: 'up', iconClass: 'bi bi-box-seam', bgClass: 'bg-blue-100 text-blue-600' },
  { label: 'Active Rentals', value: '42', change: '+8%', changeType: 'up', iconClass: 'bi bi-calendar-check', bgClass: 'bg-emerald-100 text-emerald-600' },
  { label: 'Total Users', value: '89', change: '+5%', changeType: 'up', iconClass: 'bi bi-people', bgClass: 'bg-purple-100 text-purple-600' },
  { label: 'Revenue', value: 'Rp 12.5M', change: '+18%', changeType: 'up', iconClass: 'bi bi-currency-dollar', bgClass: 'bg-amber-100 text-amber-600' },
]);

const chartData = ref([
  { label: 'Jan', value: 60 },
  { label: 'Feb', value: 75 },
  { label: 'Mar', value: 45 },
  { label: 'Apr', value: 80 },
  { label: 'May', value: 65 },
  { label: 'Jun', value: 90 },
  { label: 'Jul', value: 70 },
  { label: 'Aug', value: 85 },
  { label: 'Sep', value: 55 },
  { label: 'Oct', value: 95 },
  { label: 'Nov', value: 75 },
  { label: 'Dec', value: 100 },
]);

const recentActivity = ref([
  { title: 'New rental: MacBook Pro', time: '2 minutes ago', iconClass: 'bi bi-laptop', bgClass: 'bg-blue-100 text-blue-600' },
  { title: 'User registered: John Doe', time: '15 minutes ago', iconClass: 'bi bi-person-plus', bgClass: 'bg-emerald-100 text-emerald-600' },
  { title: 'Product returned: Canon Camera', time: '1 hour ago', iconClass: 'bi bi-check-circle', bgClass: 'bg-purple-100 text-purple-600' },
  { title: 'New review received', time: '2 hours ago', iconClass: 'bi bi-star', bgClass: 'bg-amber-100 text-amber-600' },
]);

const recentRentals = ref([
  { product: 'MacBook Pro M1', customer: 'Ahmad Fauzi', date: 'Dec 20, 2024', amount: 1500000, status: 'Active', statusClass: 'bg-emerald-100 text-emerald-700' },
  { product: 'Canon EOS R5', customer: 'Siti Rahayu', date: 'Dec 19, 2024', amount: 2500000, statusClass: 'bg-blue-100 text-blue-700', status: 'Pending' },
  { product: 'Sony A7IV', customer: 'Budi Santoso', date: 'Dec 18, 2024', amount: 1800000, status: 'Returned', statusClass: 'bg-slate-100 text-slate-700' },
  { product: 'iPad Pro 12.9', customer: 'Diana Putri', date: 'Dec 17, 2024', amount: 800000, status: 'Returned', statusClass: 'bg-slate-100 text-slate-700' },
]);

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price);
};

onMounted(() => {
  user.value = authService.getUser();
});
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
</style>