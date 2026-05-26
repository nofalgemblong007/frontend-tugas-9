<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Rentals</h1>
          <p class="text-slate-500">Manage rental transactions</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <i class="bi bi-hourglass-split text-xl text-amber-600"></i>
            </div>
            <div>
              <p class="text-sm text-slate-500">Pending</p>
              <p class="text-2xl font-bold text-slate-800">{{ pendingCount }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <i class="bi bi-check-circle text-xl text-emerald-600"></i>
            </div>
            <div>
              <p class="text-sm text-slate-500">Active</p>
              <p class="text-2xl font-bold text-slate-800">{{ activeCount }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <i class="bi bi-arrow-return-left text-xl text-blue-600"></i>
            </div>
            <div>
              <p class="text-sm text-slate-500">Returned</p>
              <p class="text-2xl font-bold text-slate-800">{{ returnedCount }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <i class="bi bi-currency-dollar text-xl text-purple-600"></i>
            </div>
            <div>
              <p class="text-sm text-slate-500">Revenue</p>
              <p class="text-2xl font-bold text-slate-800">Rp {{ formatPrice(totalRevenue) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2">
          <i class="bi bi-search text-slate-400"></i>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search rentals..." 
            class="flex-1 border-none outline-none text-sm bg-transparent"
          />
        </div>
        <div class="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button 
            @click="statusFilter = ''" 
            :class="['px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap', statusFilter === '' ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50']"
          >
            All
          </button>
          <button 
            @click="statusFilter = 'pending'" 
            :class="['px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap', statusFilter === 'pending' ? 'bg-amber-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50']"
          >
            Pending
          </button>
          <button 
            @click="statusFilter = 'active'" 
            :class="['px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap', statusFilter === 'active' ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50']"
          >
            Active
          </button>
          <button 
            @click="statusFilter = 'returned'" 
            :class="['px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap', statusFilter === 'returned' ? 'bg-blue-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50']"
          >
            Returned
          </button>
        </div>
      </div>

      <!-- Rentals Table -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Product</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Rental Date</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Return Date</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr 
                v-for="rental in filteredRentals" 
                :key="rental.id"
                class="hover:bg-slate-50 transition-colors"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <i :class="['text-lg text-slate-600', rental.icon]"></i>
                    </div>
                    <span class="font-medium text-slate-800">{{ rental.product }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div>
                    <p class="font-medium text-slate-800">{{ rental.customer }}</p>
                    <p class="text-xs text-slate-500">{{ rental.email }}</p>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ rental.rentalDate }}</td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ rental.returnDate }}</td>
                <td class="px-6 py-4 font-bold text-slate-800">Rp {{ formatPrice(rental.amount) }}</td>
                <td class="px-6 py-4">
                  <span :class="['px-3 py-1 rounded-full text-xs font-medium capitalize', rental.statusClass]">
                    {{ rental.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button 
                      v-if="rental.status === 'pending'"
                      @click="approveRental(rental.id)"
                      class="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      v-if="rental.status === 'pending'"
                      @click="rejectRental(rental.id)"
                      class="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                    <button 
                      v-if="rental.status === 'active'"
                      @click="returnRental(rental.id)"
                      class="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors"
                    >
                      Return
                    </button>
                    <span v-if="rental.status === 'returned'" class="text-xs text-slate-400">-</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredRentals.length === 0" class="bg-white rounded-2xl border border-slate-100 p-12 text-center">
        <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <i class="bi bi-inbox text-2xl text-slate-400"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-800">No rentals found</h3>
        <p class="text-slate-500 mt-1">Try adjusting your search or filters</p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import AdminLayout from '../layouts/AdminLayout.vue';

const showToast = inject('showToast');
const searchQuery = ref('');
const statusFilter = ref('');

const rentals = ref([
  { id: 1, product: 'MacBook Pro M1 14"', customer: 'Ahmad Fauzi', email: 'ahmad@email.com', rentalDate: 'Dec 20, 2024', returnDate: 'Dec 25, 2024', amount: 1500000, status: 'pending', statusClass: 'bg-amber-100 text-amber-700', icon: 'bi bi-laptop' },
  { id: 2, product: 'Canon EOS R5', customer: 'Siti Rahayu', email: 'siti@email.com', rentalDate: 'Dec 18, 2024', returnDate: 'Dec 22, 2024', amount: 2500000, status: 'active', statusClass: 'bg-emerald-100 text-emerald-700', icon: 'bi bi-camera' },
  { id: 3, product: 'Sony A7IV', customer: 'Budi Santoso', email: 'budi@email.com', rentalDate: 'Dec 15, 2024', returnDate: 'Dec 18, 2024', amount: 1800000, status: 'returned', statusClass: 'bg-blue-100 text-blue-700', icon: 'bi bi-camera' },
  { id: 4, product: 'iPad Pro 12.9"', customer: 'Diana Putri', email: 'diana@email.com', rentalDate: 'Dec 10, 2024', returnDate: 'Dec 15, 2024', amount: 800000, status: 'returned', statusClass: 'bg-blue-100 text-blue-700', icon: 'bi bi-tablet' },
  { id: 5, product: 'MacBook Air M2', customer: 'Eko Prasetyo', email: 'eko@email.com', rentalDate: 'Dec 22, 2024', returnDate: 'Dec 27, 2024', amount: 1200000, status: 'pending', statusClass: 'bg-amber-100 text-amber-700', icon: 'bi bi-laptop' },
  { id: 6, product: 'DJI Mavic 3', customer: 'Fitriani', email: 'fitri@email.com', rentalDate: 'Dec 12, 2024', returnDate: 'Dec 16, 2024', amount: 2000000, status: 'returned', statusClass: 'bg-blue-100 text-blue-700', icon: 'bi bi-camera' },
  { id: 7, product: 'AirPods Pro 2', customer: 'Hendra', email: 'hendra@email.com', rentalDate: 'Dec 19, 2024', returnDate: 'Dec 21, 2024', amount: 150000, status: 'active', statusClass: 'bg-emerald-100 text-emerald-700', icon: 'bi bi-headphones' },
  { id: 8, product: 'iPhone 15 Pro', customer: 'Indra', email: 'indra@email.com', rentalDate: 'Dec 21, 2024', returnDate: 'Dec 26, 2024', amount: 900000, status: 'pending', statusClass: 'bg-amber-100 text-amber-700', icon: 'bi bi-phone' },
]);

const pendingCount = computed(() => rentals.value.filter(r => r.status === 'pending').length);
const activeCount = computed(() => rentals.value.filter(r => r.status === 'active').length);
const returnedCount = computed(() => rentals.value.filter(r => r.status === 'returned').length);
const totalRevenue = computed(() => rentals.value.filter(r => r.status === 'returned').reduce((sum, r) => sum + r.amount, 0));

const filteredRentals = computed(() => {
  return rentals.value.filter(r => {
    const matchSearch = r.product.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                     r.customer.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatus = !statusFilter.value || r.status === statusFilter.value;
    return matchSearch && matchStatus;
  });
});

const formatPrice = (price) => new Intl.NumberFormat('id-ID').format(price);

const approveRental = (id) => {
  const rental = rentals.value.find(r => r.id === id);
  if (rental) {
    rental.status = 'active';
    rental.statusClass = 'bg-emerald-100 text-emerald-700';
    showToast('Rental approved', 'success');
  }
};

const rejectRental = (id) => {
  const rental = rentals.value.find(r => r.id === id);
  if (rental) {
    rental.status = 'rejected';
    rental.statusClass = 'bg-red-100 text-red-700';
    showToast('Rental rejected', 'success');
  }
};

const returnRental = (id) => {
  const rental = rentals.value.find(r => r.id === id);
  if (rental) {
    rental.status = 'returned';
    rental.statusClass = 'bg-blue-100 text-blue-700';
    showToast('Product returned', 'success');
  }
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
</style>