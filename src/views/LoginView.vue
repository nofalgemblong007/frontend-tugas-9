<template>
  <div class="login-page">
    <div class="login-left">
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
    <div class="login-right">
      <div class="login-card">
        <div class="card-header">
          <h2>Masuk ke Akun</h2>
          <p>Silakan masuk untuk mengakses dashboard</p>
        </div>
        <form @submit.prevent="handleLogin">
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
                placeholder="Masukkan password"
                required
              />
              <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>
          <div v-if="error" class="alert alert-danger">
            <i class="bi bi-exclamation-triangle"></i>
            {{ error }}
          </div>
          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            {{ loading ? 'Masuk...' : 'Masuk' }}
          </button>
        </form>
        <div class="divider">
          <span>atau</span>
        </div>
        <p class="register-link">
          Belum punya akun? 
          <router-link to="/register">Daftar sekarang</router-link>
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

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const showPassword = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;

  try {
    const response = await authService.login({
      email: email.value,
      password: password.value,
    });

    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));

    router.push('/');
  } catch (err) {
    error.value = err.response?.data?.message || 'Login gagal. Silakan coba lagi.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');

.login-page {
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.login-left {
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

.login-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.login-card {
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
  margin-bottom: 1.5rem;
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

.register-link {
  text-align: center;
  color: #666;
}

.register-link a {
  color: #0f3460;
  font-weight: 600;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

.footer-text {
  margin-top: 1.5rem;
  color: #999;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }
  
  .login-left {
    padding: 2rem;
    text-align: center;
  }
  
  .brand-section h1 {
    font-size: 2rem;
  }
  
  .features-list {
    display: none;
  }
  
  .login-card {
    padding: 1.5rem;
  }
}
</style>