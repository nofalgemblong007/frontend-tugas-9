<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Reports</h1>
          <p class="text-slate-500">Analytics and statistics</p>
        </div>
        <button class="px-4 py-2.5 bg-emerald-500 rounded-xl text-white hover:bg-emerald-600 text-sm font-medium shadow-lg shadow-emerald-500/30">
          <i class="bi bi-download mr-2"></i>Export Report
        </button>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-slate-500">Total Revenue</p>
              <p class="text-2xl font-bold text-slate-800 mt-1">Rp 45.2M</p>
            </div>
            <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <i class="bi bi-currency-dollar text-xl text-emerald-600"></i>
            </div>
          </div>
          <p class="text-sm text-emerald-600 mt-2"><i class="bi bi-arrow-up"></i> +18% from last month</p>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-slate-500">Total Rentals</p>
              <p class="text-2xl font-bold text-slate-800 mt-1">156</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <i class="bi bi-calendar-check text-xl text-blue-600"></i>
            </div>
          </div>
          <p class="text-sm text-emerald-600 mt-2"><i class="bi bi-arrow-up"></i> +12% from last month</p>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-slate-500">Active Users</p>
              <p class="text-2xl font-bold text-slate-800 mt-1">89</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <i class="bi bi-people text-xl text-purple-600"></i>
            </div>
          </div>
          <p class="text-sm text-emerald-600 mt-2"><i class="bi bi-arrow-up"></i> +5% from last month</p>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-slate-500">Products</p>
              <p class="text-2xl font-bold text-slate-800 mt-1">156</p>
            </div>
            <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <i class="bi bi-box-seam text-xl text-amber-600"></i>
            </div>
          </div>
          <p class="text-sm text-emerald-600 mt-2"><i class="bi bi-arrow-up"></i> +8% from last month</p>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Monthly Revenue -->
        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 class="text-lg font-bold text-slate-800 mb-6">Monthly Revenue</h3>
          <div class="h-64 flex items-end justify-between gap-2">
            <div v-for="(bar, index) in revenueData" :key="index" class="flex-1 flex flex-col items-center gap-2">
              <div class="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:from-emerald-600 hover:to-emerald-500 transition-all cursor-pointer" :style="{ height: bar.value + '%' }"></div>
              <span class="text-xs text-slate-500">{{ bar.label }}</span>
            </div>
          </div>
        </div>

        <!-- Rental Categories -->
        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 class="text-lg font-bold text-slate-800 mb-6">Rentals by Category</h3>
          <div class="space-y-4">
            <div v-for="cat in categoryData" :key="cat.name">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-slate-700">{{ cat.name }}</span>
                <span class="text-sm font-bold text-slate-800">{{ cat.value }}%</span>
              </div>
              <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 rounded-full" :style="{ width: cat.value + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Products & Customers -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Top Products -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-slate-100">
            <h3 class="text-lg font-bold text-slate-800">Top Products</h3>
          </div>
          <div class="divide-y divide-slate-100">
            <div v-for="(product, index) in topProducts" :key="index" class="px-6 py-4 flex items-center gap-4">
              <span class="text-sm font-bold text-slate-400">#{{ index + 1 }}</span>
              <div class="flex-1">
                <p class="font-medium text-slate-800">{{ product.name }}</p>
                <p class="text-sm text-slate-500">{{ product.rentals }} rentals</p>
              </div>
              <p class="font-bold text-emerald-600">Rp {{ formatPrice(product.revenue) }}</p>
            </div>
          </div>
        </div>

        <!-- Top Customers -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-slate-100">
            <h3 class="text-lg font-bold text-slate-800">Top Customers</h3>
          </div>
          <div class="divide-y divide-slate-100">
            <div v-for="(customer, index) in topCustomers" :key="index" class="px-6 py-4 flex items-center gap-4">
              <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-semibold">
                {{ customer.name.charAt(0) }}
              </div>
              <div class="flex-1">
                <p class="font-medium text-slate-800">{{ customer.name }}</p>
                <p class="text-sm text-slate-500">{{ customer.rentals }} rentals</p>
              </div>
              <p class="font-bold text-emerald-600">Rp {{ formatPrice(customer.spent) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue';
import AdminLayout from '../layouts/AdminLayout.vue';

const revenueData = ref([
  { label: 'Jan', value: 60 }, { label: 'Feb', value: 75 }, { label: 'Mar', value: 45 },
  { label: 'Apr', value: 80 }, { label: 'May', value: 65 }, { label: 'Jun', value: 90 },
  { label: 'Jul', value: 70 }, { label: 'Aug', value: 85 }, { label: 'Sep', value: 55 },
  { label: 'Oct', value: 95 }, { label: 'Nov', value: 75 }, { label: 'Dec', value: 100 },
]);

const categoryData = ref([
  { name: 'Laptop', value: 45 },
  { name: 'Camera', value: 30 },
  { name: 'Audio', value: 15 },
  { name: 'Tablet', value: 10 },
]);

const topProducts = ref([
  { name: 'MacBook Pro M1', rentals: 45, revenue: 67500000 },
  { name: 'Canon EOS R5', rentals: 32, revenue: 80000000 },
  { name: 'Sony A7IV', rentals: 28, revenue: 50400000 },
  { name: 'iPad Pro 12.9', rentals: 24, revenue: 19200000 },
  { name: 'MacBook Air M2', rentals: 20, revenue: 24000000 },
]);

const topCustomers = ref([
  { name: 'Ahmad Fauzi', rentals: 12, spent: 18000000 },
  { name: 'Siti Rahayu', rentals: 10, spent: 15000000 },
  { name: 'Budi Santoso', rentals: 8, spent: 12000000 },
  { name: 'Diana Putri', rentals: 6, spent: 9000000 },
  { name: 'Eko Prasetyo', rentals: 5, spent: 7500000 },
]);

const formatPrice = (price) => new Intl.NumberFormat('id-ID').format(price);
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
</style>