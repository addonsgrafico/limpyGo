/**
 * LimpyGo Client API Service
 * Conexión completa entre el Frontend React y el Backend Laravel en Render / Supabase
 */

const getApiBaseUrl = () => {
  // 1. Variable de entorno configurada en Vercel o archivo .env
  if (import.meta.env.VITE_API_URL) {
    let url = import.meta.env.VITE_API_URL.trim();
    if (url.endsWith('/')) url = url.slice(0, -1);
    if (!url.endsWith('/api/v1') && !url.includes('/api/v1')) {
      url = `${url}/api/v1`;
    }
    return url;
  }

  // 2. Si estamos en localhost y no se definió VITE_API_URL, intentar conectar con backend local o Render
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:8000/api/v1';
  }

  // 3. Fallback a URL pública oficial de producción en Render
  return 'https://limpygo.onrender.com/api/v1';
};

export const API_BASE_URL = getApiBaseUrl();

class ApiService {
  constructor() {
    this.token = typeof window !== 'undefined' ? localStorage.getItem('limpygo_token') : null;
  }

  setToken(token) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('limpygo_token', token);
      } else {
        localStorage.removeItem('limpygo_token');
      }
    }
  }

  getToken() {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('limpygo_token');
    }
    return this.token;
  }

  async request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    const token = this.getToken();

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Manejo de token vencido o inválido
      if (response.status === 401) {
        this.setToken(null);
      }

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const error = new Error(data?.message || data?.mensaje || `Error HTTP ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      console.warn(`[LimpyGo API] Falló llamada a ${url}:`, err.message);
      throw err;
    }
  }

  // ==========================================================================
  // SALUD Y CONECTIVIDAD
  // ==========================================================================
  async checkHealth() {
    return this.request('/health', { method: 'GET' });
  }

  // ==========================================================================
  // AUTENTICACIÓN Y SESIÓN
  // ==========================================================================
  async login(correo, password = 'password') {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ correo, password })
    });
    if (data?.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async getUsuariosDemo() {
    return this.request('/auth/usuarios-demo', { method: 'GET' });
  }

  async getPerfil() {
    return this.request('/auth/perfil', { method: 'GET' });
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.setToken(null);
    }
  }

  // ==========================================================================
  // EMPRESA (PORTAL DE GESTIÓN Y OPERACIONES)
  // ==========================================================================
  async getEmpresaPerfil() {
    return this.request('/empresa/perfil', { method: 'GET' });
  }

  async updateEmpresaPerfil(payload) {
    return this.request('/empresa/perfil', {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  // Servicios y Tarifas
  async getEmpresaServicios() {
    return this.request('/empresa/servicios', { method: 'GET' });
  }

  async createEmpresaServicio(payload) {
    return this.request('/empresa/servicios', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async updateEmpresaServicio(servicioId, payload) {
    return this.request(`/empresa/servicios/${servicioId}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  async deleteEmpresaServicio(servicioId) {
    return this.request(`/empresa/servicios/${servicioId}`, {
      method: 'DELETE'
    });
  }

  // Personal y Cuadrilla
  async getEmpresaTrabajadores() {
    return this.request('/empresa/trabajadores', { method: 'GET' });
  }

  async createEmpresaTrabajador(payload) {
    return this.request('/empresa/trabajadores', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async updateEmpresaTrabajador(trabajadorId, payload) {
    return this.request(`/empresa/trabajadores/${trabajadorId}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  async deleteEmpresaTrabajador(trabajadorId) {
    return this.request(`/empresa/trabajadores/${trabajadorId}`, {
      method: 'DELETE'
    });
  }

  // Órdenes y Auditoría
  async getEmpresaOrdenes() {
    return this.request('/empresa/ordenes', { method: 'GET' });
  }

  async asignarTrabajadorOrden(codigoSeguimiento, trabajadorId) {
    return this.request(`/empresa/ordenes/${codigoSeguimiento}/asignar-trabajador`, {
      method: 'POST',
      body: JSON.stringify({ trabajador_id: trabajadorId })
    });
  }

  async aprobarEvidenciaOrden(codigoSeguimiento) {
    return this.request(`/empresa/ordenes/${codigoSeguimiento}/aprobar-evidencia`, {
      method: 'POST'
    });
  }

  // ==========================================================================
  // SUPERADMIN (PLATAFORMA LIMPYGO GLOBAL)
  // ==========================================================================
  async getAdminDashboard() {
    return this.request('/admin/dashboard', { method: 'GET' });
  }

  async getAdminEmpresas() {
    return this.request('/admin/empresas', { method: 'GET' });
  }

  async createAdminEmpresa(payload) {
    return this.request('/admin/empresas', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async updateAdminEmpresa(empresaId, payload) {
    return this.request(`/admin/empresas/${empresaId}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  async getAdminUsuarios() {
    return this.request('/admin/usuarios', { method: 'GET' });
  }

  async createAdminUsuario(payload) {
    return this.request('/admin/usuarios', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async updateAdminUsuario(usuarioId, payload) {
    return this.request(`/admin/usuarios/${usuarioId}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  async getAdminOrdenes() {
    return this.request('/admin/ordenes', { method: 'GET' });
  }

  async getAdminPoliticas() {
    return this.request('/admin/politicas', { method: 'GET' });
  }

  async updateAdminPoliticas(payload) {
    return this.request('/admin/politicas', {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }
}

export const api = new ApiService();
export default api;
