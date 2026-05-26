<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Eco-Share</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Produk</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/rentals">Peminjaman</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="handleLogout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const emit = defineEmits(['logout']);

const handleLogout = () => {
  emit('logout');
};
</script>

<style scoped>
.navbar {
  padding: 1rem 0;
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #667eea;
}
</style>