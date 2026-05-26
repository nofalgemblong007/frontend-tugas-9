<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Products</h1>
          <p class="text-slate-500">Manage your electronics products</p>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex bg-slate-100 rounded-xl p-1">
            <button 
              @click="viewMode = 'grid'" 
              :class="['px-3 py-1.5 rounded-lg text-sm font-medium transition-all', viewMode === 'grid' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500']"
            >
              <i class="bi bi-grid-3x3-gap"></i>
            </button>
            <button 
              @click="viewMode = 'table'" 
              :class="['px-3 py-1.5 rounded-lg text-sm font-medium transition-all', viewMode === 'table' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500']"
            >
              <i class="bi bi-table"></i>
            </button>
          </div>
          <button @click="showModal = true" class="px-4 py-2.5 bg-emerald-500 rounded-xl text-white hover:bg-emerald-600 text-sm font-medium shadow-lg shadow-emerald-500/30">
            <i class="bi bi-plus-lg mr-2"></i>Add Product
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2">
          <i class="bi bi-search text-slate-400"></i>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search products..." 
            class="flex-1 border-none outline-none text-sm bg-transparent"
          />
        </div>
        <select v-model="categoryFilter" class="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600">
          <option value="">All Categories</option>
          <option value="laptop">Laptop</option>
          <option value="camera">Camera</option>
          <option value="audio">Audio</option>
          <option value="tablet">Tablet</option>
        </select>
        <select v-model="statusFilter" class="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600">
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <!-- Products Grid View -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
        >
          <div class="relative">
            <div class="h-40 bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-2xl flex items-center justify-center">
              <i :class="['text-5xl text-slate-300', product.icon]"></i>
            </div>
            <span :class="['absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium', product.statusClass]">
              {{ product.status }}
            </span>
          </div>
          <div class="p-4">
            <h3 class="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{{ product.name }}</h3>
            <p class="text-sm text-slate-500 mt-1">{{ product.category }}</p>
            <div class="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
              <div>
                <p class="text-xs text-slate-500">Price/Day</p>
                <p class="font-bold text-slate-800">Rp {{ formatPrice(product.price) }}</p>
              </div>
              <div class="flex gap-1">
                <button @click="editProduct(product)" class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
                  <i class="bi bi-pencil"></i>
                </button>
                <button @click="deleteProduct(product.id)" class="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Table View -->
      <div v-if="viewMode === 'table'" class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Product</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Category</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Price/Day</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <i :class="['text-xl text-slate-400', product.icon]"></i>
                    </div>
                    <span class="font-medium text-slate-800">{{ product.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-slate-600 capitalize">{{ product.category }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="font-medium text-slate-800">Rp {{ formatPrice(product.price) }}</span>
                </td>
                <td class="px-6 py-4">
                  <span :class="['px-3 py-1 rounded-full text-xs font-medium capitalize', product.statusClass]">
                    {{ product.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button @click="editProduct(product)" class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button @click="deleteProduct(product.id)" class="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProducts.length === 0" class="bg-white rounded-2xl border border-slate-100 p-12 text-center">
        <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <i class="bi bi-inbox text-2xl text-slate-400"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-800">No products found</h3>
        <p class="text-slate-500 mt-1">Try adjusting your search or filters</p>
      </div>

      <!-- Add/Edit Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 class="text-lg font-bold text-slate-800">{{ editingId ? 'Edit' : 'Add' }} Product</h3>
            <button @click="closeModal" class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <form @submit.prevent="saveProduct" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Product Name</label>
              <input v-model="formData.name" type="text" class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500" required />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                <select v-model="formData.category" class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500">
                  <option value="laptop">Laptop</option>
                  <option value="camera">Camera</option>
                  <option value="audio">Audio</option>
                  <option value="tablet">Tablet</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1.5">Price/Day</label>
                <input v-model.number="formData.price" type="number" class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500" required />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
              <textarea v-model="formData.description" rows="3" class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"></textarea>
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" @click="closeModal" class="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-sm font-medium">Cancel</button>
              <button type="submit" class="flex-1 px-4 py-2.5 bg-emerald-500 rounded-xl text-white hover:bg-emerald-600 text-sm font-medium">
                {{ editingId ? 'Update' : 'Save' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, inject, reactive } from 'vue';
import AdminLayout from '../layouts/AdminLayout.vue';

const showToast = inject('showToast');

const searchQuery = ref('');
const categoryFilter = ref('');
const statusFilter = ref('');
const viewMode = ref('grid');
const showModal = ref(false);
const editingId = ref(null);

const formData = reactive({
  name: '',
  category: 'laptop',
  price: 0,
  description: ''
});

const products = ref([
  { id: 1, name: 'MacBook Pro M1 14"', category: 'laptop', price: 1500000, status: 'available', statusClass: 'bg-emerald-100 text-emerald-700', icon: 'bi bi-laptop' },
  { id: 2, name: 'Canon EOS R5', category: 'camera', price: 2500000, status: 'rented', statusClass: 'bg-amber-100 text-amber-700', icon: 'bi bi-camera' },
  { id: 3, name: 'Sony A7IV', category: 'camera', price: 1800000, status: 'available', statusClass: 'bg-emerald-100 text-emerald-700', icon: 'bi bi-camera' },
  { id: 4, name: 'iPad Pro 12.9"', category: 'tablet', price: 800000, status: 'available', statusClass: 'bg-emerald-100 text-emerald-700', icon: 'bi bi-tablet' },
  { id: 5, name: 'MacBook Air M2', category: 'laptop', price: 1200000, status: 'rented', statusClass: 'bg-amber-100 text-amber-700', icon: 'bi bi-laptop' },
  { id: 6, name: 'DJI Mavic 3', category: 'camera', price: 2000000, status: 'maintenance', statusClass: 'bg-red-100 text-red-700', icon: 'bi bi-camera' },
  { id: 7, name: 'AirPods Pro 2', category: 'audio', price: 150000, status: 'available', statusClass: 'bg-emerald-100 text-emerald-700', icon: 'bi bi-headphones' },
  { id: 8, name: 'iPhone 15 Pro', category: 'tablet', price: 900000, status: 'available', statusClass: 'bg-emerald-100 text-emerald-700', icon: 'bi bi-phone' },
]);

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchCategory = !categoryFilter.value || p.category === categoryFilter.value;
    const matchStatus = !statusFilter.value || p.status === statusFilter.value;
    return matchSearch && matchCategory && matchStatus;
  });
});

const formatPrice = (price) => new Intl.NumberFormat('id-ID').format(price);

const editProduct = (product) => {
  editingId.value = product.id;
  formData.name = product.name;
  formData.category = product.category;
  formData.price = product.price;
  formData.description = product.description || '';
  showModal.value = true;
};

const deleteProduct = (id) => {
  if (confirm('Delete this product?')) {
    products.value = products.value.filter(p => p.id !== id);
    showToast('Product deleted', 'success');
  }
};

const saveProduct = () => {
  if (editingId.value) {
    const idx = products.value.findIndex(p => p.id === editingId.value);
    if (idx !== -1) {
      products.value[idx] = { ...products.value[idx], ...formData };
    }
    showToast('Product updated', 'success');
  } else {
    products.value.push({
      id: Date.now(),
      ...formData,
      status: 'available',
      statusClass: 'bg-emerald-100 text-emerald-700',
      icon: 'bi bi-box'
    });
    showToast('Product added', 'success');
  }
  closeModal();
};

const closeModal = () => {
  showModal.value = false;
  editingId.value = null;
  formData.name = '';
  formData.category = 'laptop';
  formData.price = 0;
  formData.description = '';
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
</style>