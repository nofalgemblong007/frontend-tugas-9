<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Settings</h1>
        <p class="text-slate-500">Manage your account and preferences</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Settings Navigation -->
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-2">
          <nav class="space-y-1">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors', activeTab === tab.id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50']"
            >
              <i :class="tab.icon"></i>
              <span class="font-medium">{{ tab.label }}</span>
            </button>
          </nav>
        </div>

        <!-- Settings Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Profile Settings -->
          <div v-if="activeTab === 'profile'" class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 class="text-lg font-bold text-slate-800 mb-6">Profile Settings</h3>
            <div class="flex items-center gap-6 mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                {{ user?.name?.charAt(0) || 'A' }}
              </div>
              <div>
                <button class="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600">Change Photo</button>
                <p class="text-sm text-slate-500 mt-2">JPG, PNG. Max 2MB</p>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input v-model="profile.name" type="text" class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input v-model="profile.email" type="email" class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                <input v-model="profile.phone" type="tel" class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500" />
              </div>
              <button @click="saveProfile" class="px-4 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600">
                Save Changes
              </button>
            </div>
          </div>

          <!-- Password Settings -->
          <div v-if="activeTab === 'password'" class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 class="text-lg font-bold text-slate-800 mb-6">Change Password</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                <input v-model="password.current" type="password" class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                <input v-model="password.new" type="password" class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                <input v-model="password.confirm" type="password" class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500" />
              </div>
              <button @click="changePassword" class="px-4 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600">
                Update Password
              </button>
            </div>
          </div>

          <!-- App Settings -->
          <div v-if="activeTab === 'app'" class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 class="text-lg font-bold text-slate-800 mb-6">Application Settings</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <p class="font-medium text-slate-800">Email Notifications</p>
                  <p class="text-sm text-slate-500">Receive email about rental updates</p>
                </div>
                <button @click="settings.emailNotif = !settings.emailNotif" :class="['w-12 h-7 rounded-full transition-colors relative', settings.emailNotif ? 'bg-emerald-500' : 'bg-slate-200']">
                  <span :class="['absolute top-1 w-5 h-5 bg-white rounded-full transition-transform', settings.emailNotif ? 'translate-x-6' : 'translate-x-1']"></span>
                </button>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <p class="font-medium text-slate-800">Push Notifications</p>
                  <p class="text-sm text-slate-500">Receive push notifications</p>
                </div>
                <button @click="settings.pushNotif = !settings.pushNotif" :class="['w-12 h-7 rounded-full transition-colors relative', settings.pushNotif ? 'bg-emerald-500' : 'bg-slate-200']">
                  <span :class="['absolute top-1 w-5 h-5 bg-white rounded-full transition-transform', settings.pushNotif ? 'translate-x-6' : 'translate-x-1']"></span>
                </button>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <p class="font-medium text-slate-800">Dark Mode</p>
                  <p class="text-sm text-slate-500">Switch to dark theme</p>
                </div>
                <button @click="settings.darkMode = !settings.darkMode" :class="['w-12 h-7 rounded-full transition-colors relative', settings.darkMode ? 'bg-emerald-500' : 'bg-slate-200']">
                  <span :class="['absolute top-1 w-5 h-5 bg-white rounded-full transition-transform', settings.darkMode ? 'translate-x-6' : 'translate-x-1']"></span>
                </button>
              </div>
            </div>
          </div>

          <!-- Billing Settings -->
          <div v-if="activeTab === 'billing'" class="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 class="text-lg font-bold text-slate-800 mb-6">Billing Information</h3>
            <div class="p-4 bg-slate-50 rounded-xl mb-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <i class="bi bi-credit-card text-xl text-slate-600"></i>
                  </div>
                  <div>
                    <p class="font-medium text-slate-800">Visa ending in 4242</p>
                    <p class="text-sm text-slate-500">Expires 12/25</p>
                  </div>
                </div>
                <span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium">Default</span>
              </div>
            </div>
            <button class="px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-sm font-medium">
              <i class="bi bi-plus-lg mr-2"></i>Add Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from 'vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import { authService } from '../services/api.js';

const showToast = inject('showToast');
const user = ref(null);
const activeTab = ref('profile');

const tabs = [
  { id: 'profile', label: 'Profile', icon: 'bi bi-person' },
  { id: 'password', label: 'Password', icon: 'bi bi-lock' },
  { id: 'app', label: 'Application', icon: 'bi bi-gear' },
  { id: 'billing', label: 'Billing', icon: 'bi bi-credit-card' },
];

const profile = reactive({
  name: '',
  email: '',
  phone: ''
});

const password = reactive({
  current: '',
  new: '',
  confirm: ''
});

const settings = reactive({
  emailNotif: true,
  pushNotif: false,
  darkMode: false
});

const saveProfile = () => {
  showToast('Profile updated successfully', 'success');
};

const changePassword = () => {
  if (password.new !== password.confirm) {
    showToast('Passwords do not match', 'error');
    return;
  }
  showToast('Password changed successfully', 'success');
  password.current = '';
  password.new = '';
  password.confirm = '';
};

onMounted(() => {
  user.value = authService.getUser();
  if (user.value) {
    profile.name = user.value.name || '';
    profile.email = user.value.email || '';
  }
});
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
</style>