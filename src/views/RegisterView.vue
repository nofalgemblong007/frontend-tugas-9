<template>
  <div class="register-page">
    <div class="register-left">
      <div class="brand-section">
        <div class="logo">
          <i class="bi bi-recycle"></i>
        </div>
        <h1>Eco-Share</h1>
        <p class="tagline">Platform Penyewaan Alat Elektronik Bekas</p>
        <p class="description">
          Saling membantu, hemat biaya, dan lestarikan lingkungan bersama Eco-Share.
        </p>
      </div>
      <div class="features-list">
        <div class="feature-item">
          <i class="bi bi-check-circle-fill"></i>
          <span>Berbagai pilihan elektronik bekas berkualitas</span>
        </div>
        <div class="feature-item">
          <i class="bi bi-check-circle-fill"></i>
          <span>Proses penyewaan mudah dan aman</span>
        </div>
        <div class="feature-item">
          <i class="bi bi-check-circle-fill"></i>
          <span>Jadilah bagian dari gerakan hijau</span>
        </div>
      </div>
    </div>
    <div class="register-right">
      <div class="register-card">
        <div class="card-header">
          <h2>Daftar Akun Baru</h2>
          <p>Buat akun untuk mulai menyewa alat elektronik</p>
        </div>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="name">Nama Lengkap</label>
            <div class="input-wrapper">
              <i class="bi bi-person"></i>
              <input
                type="text"
                id="name"
                v-model="name"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <i class="bi bi-envelope"></i>
              <input
                type="email"
                id="email"
                v-model="email"
                placeholder="contoh@email.com"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <i class="bi bi-lock"></i>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                placeholder="Minimal 6 karakter"
                required
                minlength="6"
              />
              <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>
          <div class="form-group">
            <label for="role">Daftar sebagai</label>
            <div class="role-selector">
              <button
                type="button"
                :class="['role-btn', { active: role === 'penyewa' }]"
                @click="role = 'penyewa'"
              >
                <i class="bi bi-person"></i>
                <span>Penyewa</span>
                <small>Ingin menyewa alat elektronik</small>
              </button>
              <button
                type="button"
                :class="['role-btn', { active: role === 'pemilik' }]"
                @click="role = 'pemilik'"
              >
                <i class="bi bi-shop"></i>
                <span>Pemilik</span>
                <small>Ingin menyewakan alat elektronik</small>
              </button>
            </div>
          </div>
          <div v-if="error" class="alert alert-danger">
            <i class="bi bi-exclamation-triangle"></i>
            {{ error }}
          </div>
          <div v-if="success" class="alert alert-success">
            <i class="bi bi-check-circle"></i>
            {{ success }}
          </div>
          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            {{ loading ? 'Mendaftarkan...' : 'Daftar Sekarang' }}
          </button>
        </form>
        <div class="divider">
          <span>atau</span>
        </div>
        <p class="login-link">
          Sudah punya akun? 
          <router-link to="/login">Masuk di sini</router-link>
        </p>
      </div>
      <p class="footer-text">
        © 2024 Eco-Share. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/api.js';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('penyewa');
const error = ref('');
const success = ref('');
const loading = ref(false);
const showPassword = ref(false);

const handleRegister = async () => {
  error.value = '';
  success.value = '';
  loading.value = true;

  try {
    await authService.register({
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
    });

    success.value = 'Registrasi berhasil! Mengarahkan ke halaman login...';
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (err) {
    error.value = err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');

.register-page {
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.register-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
  color: white;
}

.brand-section {
  margin-bottom: 3rem;
}

.logo {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #00d9ff 0%, #00ff88 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 217, 255, 0.3);
}

.logo i {
  font-size: 2.5rem;
  color: #1a1a2e;
}

.brand-section h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #00d9ff 0%, #00ff88 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tagline {
  font-size: 1.25rem;
  color: #00d9ff;
  margin-bottom: 1rem;
}

.description {
  color: #a0a0a0;
  line-height: 1.6;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #d0d0d0;
}

.feature-item i {
  color: #00ff88;
  font-size: 1.25rem;
}

.register-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.register-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.card-header {
  text-align: center;
  margin-bottom: 2rem;
}

.card-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.card-header p {
  color: #666;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper i {
  position: absolute;
  left: 1rem;
  color: #999;
  font-size: 1.1rem;
}

.input-wrapper input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #0f3460;
  box-shadow: 0 0 0 3px rgba(15, 52, 96, 0.1);
}

.toggle-password {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0;
}

.toggle-password:hover {
  color: #0f3460;
}

.role-selector {
  display: flex;
  gap: 1rem;
}

.role-btn {
  flex: 1;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.role-btn i {
  font-size: 1.5rem;
  color: #999;
  margin-bottom: 0.25rem;
}

.role-btn span {
  font-weight: 600;
  color: #333;
}

.role-btn small {
  font-size: 0.75rem;
  color: #999;
}

.role-btn.active {
  border-color: #0f3460;
  background: rgba(15, 52, 96, 0.05);
}

.role-btn.active i {
  color: #0f3460;
}

.role-btn:hover {
  border-color: #0f3460;
}

.alert {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alert-danger {
  background: #fee;
  color: #c00;
  border: 1px solid #fcc;
}

.alert-success {
  background: #efe;
  color: #060;
  border: 1px solid #cfc;
}

.btn-primary {
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(15, 52, 96, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.divider {
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: #e0e0e0;
}

.divider::before { left: 0; }
.divider::after { right: 0; }

.divider span {
  color: #999;
  font-size: 0.875rem;
}

.login-link {
  text-align: center;
  color: #666;
}

.login-link a {
  color: #0f3460;
  font-weight: 600;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

.footer-text {
  margin-top: 1.5rem;
  color: #999;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .register-page {
    flex-direction: column;
  }
  
  .register-left {
    padding: 2rem;
    text-align: center;
  }
  
  .brand-section h1 {
    font-size: 2rem;
  }
  
  .features-list {
    display: none;
  }
  
  .register-card {
    padding: 1.5rem;
  }
  
  .role-selector {
    flex-direction: column;
  }
}
</style>