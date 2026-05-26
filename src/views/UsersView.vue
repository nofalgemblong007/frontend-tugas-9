<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Users</h1>
          <p class="text-slate-500">Manage registered users</p>
        </div>
        <button class="px-4 py-2.5 bg-emerald-500 rounded-xl text-white hover:bg-emerald-600 text-sm font-medium shadow-lg shadow-emerald-500/30">
          <i class="bi bi-plus-lg mr-2"></i>Add User
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <i class="bi bi-people text-xl text-blue-600"></i>
            </div>
            <div>
              <p class="text-sm text-slate-500">Total Users</p>
              <p class="text-2xl font-bold text-slate-800">{{ users.length }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <i class="bi bi-person-check text-xl text-emerald-600"></i>
            </div>
            <div>
              <p class="text-sm text-slate-500">Owners</p>
              <p class="text-2xl font-bold text-slate-800">{{ ownersCount }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <i class="bi bi-person-heart text-xl text-purple-600"></i>
            </div>
            <div>
              <p class="text-sm text-slate-500">Renters</p>
              <p class="text-2xl font-bold text-slate-800">{{ rentersCount }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search & Filter -->
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2">
          <i class="bi bi-search text-slate-400"></i>
          <input v-model="searchQuery" type="text" placeholder="Search users..." class="flex-1 border-none outline-none text-sm bg-transparent" />
        </div>
        <select v-model="roleFilter" class="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600">
          <option value="">All Roles</option>
          <option value="owner">Owner</option>
          <option value="renter">Renter</option>
        </select>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">User</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Email</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Role</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Joined</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-semibold">
                      {{ user.name.charAt(0) }}
                    </div>
                    <span class="font-medium text-slate-800">{{ user.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ user.email }}</td>
                <td class="px-6 py-4">
                  <span :class="['px-3 py-1 rounded-full text-xs font-medium', user.roleClass]">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">{{ user.joined }}</td>
                <td class="px-6 py-4">
                  <span :class="['px-3 py-1 rounded-full text-xs font-medium', user.statusClass]">
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
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
import { ref, computed, inject } from 'vue';
import AdminLayout from '../layouts/AdminLayout.vue';

const showToast = inject('showToast');
const searchQuery = ref('');
const roleFilter = ref('');

const users = ref([
  { id: 1, name: 'John Doe', email: 'john@email.com', role: 'owner', roleClass: 'bg-emerald-100 text-emerald-700', joined: 'Dec 1, 2024', status: 'active', statusClass: 'bg-emerald-100 text-emerald-700' },
  { id: 2, name: 'Jane Smith', email: 'jane@email.com', role: 'renter', roleClass: 'bg-blue-100 text-blue-700', joined: 'Dec 5, 2024', status: 'active', statusClass: 'bg-emerald-100 text-emerald-700' },
  { id: 3, name: 'Bob Wilson', email: 'bob@email.com', role: 'owner', roleClass: 'bg-emerald-100 text-emerald-700', joined: 'Dec 8, 2024', status: 'active', statusClass: 'bg-emerald-100 text-emerald-700' },
  { id: 4, name: 'Alice Brown', email: 'alice@email.com', role: 'renter', roleClass: 'bg-blue-100 text-blue-700', joined: 'Dec 10, 2024', status: 'inactive', statusClass: 'bg-slate-100 text-slate-700' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@email.com', role: 'renter', roleClass: 'bg-blue-100 text-blue-700', joined: 'Dec 12, 2024', status: 'active', statusClass: 'bg-emerald-100 text-emerald-700' },
  { id: 6, name: 'Eva Martinez', email: 'eva@email.com', role: 'owner', roleClass: 'bg-emerald-100 text-emerald-700', joined: 'Dec 15, 2024', status: 'active', statusClass: 'bg-emerald-100 text-emerald-700' },
]);

const ownersCount = computed(() => users.value.filter(u => u.role === 'owner').length);
const rentersCount = computed(() => users.value.filter(u => u.role === 'renter').length);

const filteredUsers = computed(() => {
  return users.value.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchRole = !roleFilter.value || u.role === roleFilter.value;
    return matchSearch && matchRole;
  });
});
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
</style>