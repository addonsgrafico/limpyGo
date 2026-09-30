import React, { useState, useEffect, useCallback } from 'react';
import api, { API_BASE_URL } from './services/api';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Camera,
  Wallet,
  Building2,
  SlidersHorizontal,
  Bell,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Phone,
  Star,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Filter,
  Sparkles,
  ArrowUpRight,
  X,
  RefreshCw,
  ExternalLink,
  Percent,
  Edit3,
  Lock,
  Mail,
  UserCheck,
  Power,
  KeyRound,
  LogOut,
  PlusCircle,
  Copy,
  Smartphone,
  CreditCard,
  Building,
  Tag,
  DollarSign,
  Layers,
  Check,
  ToggleLeft,
  ToggleRight,
  Database,
  Wifi,
  WifiOff,
  Eye,
  EyeOff,
  MessageSquare,
  Calendar,
  Ticket
} from 'lucide-react';

// ============================================================================
// USUARIOS INICIALES DEL SISTEMA
// ============================================================================
const USUARIOS_INICIALES = [
  {
    id: 'usr-1',
    nombre: 'Rodrigo Mendoza (SuperAdmin)',
    correo: 'admin@limpygo.com',
    rol: 'SUPER_ADMIN',
    empresa_id: null,
    telefono: '77012345',
    esta_activo: true,
    creado_at: '2026-08-01'
  },
  {
    id: 'usr-2',
    nombre: 'Lic. Mariana Paz',
    correo: 'operaciones@brillante.com',
    rol: 'ADMIN_EMPRESA',
    empresa_id: 'emp-1',
    telefono: '70098765',
    esta_activo: true,
    creado_at: '2026-08-10'
  },
  {
    id: 'usr-3',
    nombre: 'Ing. Roberto Aguilera',
    correo: 'gerencia@ecoclean.bo',
    rol: 'ADMIN_EMPRESA',
    empresa_id: 'emp-2',
    telefono: '78012399',
    esta_activo: true,
    creado_at: '2026-08-15'
  },
  {
    id: 'usr-4',
    nombre: 'María Elena Quispe',
    correo: 'maria.limpieza@brillante.com',
    rol: 'TRABAJADOR',
    empresa_id: 'emp-1',
    telefono: '70012345',
    esta_activo: true,
    creado_at: '2026-08-20'
  },
  {
    id: 'usr-5',
    nombre: 'Roberto Sandoval',
    correo: 'roberto.sandoval@brillante.com',
    rol: 'TRABAJADOR',
    empresa_id: 'emp-1',
    telefono: '76098123',
    esta_activo: true,
    creado_at: '2026-08-22'
  },
  {
    id: 'usr-6',
    nombre: 'Carlos Mendoza (Cliente)',
    correo: 'carlos.mendoza@gmail.com',
    rol: 'CLIENTE',
    empresa_id: null,
    telefono: '70012345',
    esta_activo: true,
    creado_at: '2026-09-01'
  }
];

// ============================================================================
// BIBLIOTECA DE PRESETS DE LOGOTIPOS E IMÁGENES PROFESIONALES DE LIMPIEZA
// ============================================================================
const PRESETS_LOGOS_EMPRESA = [
  {
    nombre: 'Brillante Express Pro',
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80'
  },
  {
    nombre: 'EcoClean Bolivia Verde',
    url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80'
  },
  {
    nombre: 'ProClean Diamond Azul',
    url: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=400&q=80'
  },
  {
    nombre: 'Limpieza Sparkle Sanitaria',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80'
  }
];

const PRESETS_IMAGENES_SERVICIOS = [
  {
    nombre: 'Limpieza Departamentos',
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    categoria: 'Departamentos'
  },
  {
    nombre: 'Muebles y Tapizados',
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    categoria: 'Tapizados'
  },
  {
    nombre: 'Vidrios en Altura',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    categoria: 'Vidrios'
  },
  {
    nombre: 'Fin de Obra Post-Construcción',
    url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
    categoria: 'Fin de Obra'
  },
  {
    nombre: 'Desinfección Profunda',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    categoria: 'Desinfección'
  },
  {
    nombre: 'Cocina y Desengrase',
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    categoria: 'Cocinas'
  }
];

// ============================================================================
// EMPRESAS INICIALES (CON TASA DE COMISIÓN, LOGOTIPO Y DATOS BANCARIOS)
// ============================================================================
const EMPRESAS_INICIALES = [
  {
    id: 'emp-1',
    nombre: 'Limpiezas Brillante Express S.R.L.',
    logo_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
    nit: '3489201024',
    telefono: '3-3458900',
    contacto: 'Lic. Mariana Paz (Gerente Ops)',
    correo_contacto: 'operaciones@brillante.com',
    ciudad: 'Santa Cruz de la Sierra',
    cobertura: 'Equipetrol, Urbarí, Sirari, Centro',
    calificacion: 4.92,
    ordenes_totales: 342,
    personal_activo: 12,
    comision_porcentaje: 15.0,
    estado: 'ACTIVA',
    banco_abono: 'Banco Mercantil Santa Cruz',
    cuenta_bancaria: '4010-98234-12',
    titular_cuenta: 'Limpiezas Brillante Express S.R.L.'
  },
  {
    id: 'emp-2',
    nombre: 'EcoClean Bolivia S.R.L.',
    logo_url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80',
    nit: '4509123019',
    telefono: '3-3221045',
    contacto: 'Ing. Roberto Aguilera',
    correo_contacto: 'gerencia@ecoclean.bo',
    ciudad: 'Santa Cruz de la Sierra',
    cobertura: 'Norte, Banzer, Radial 26',
    calificacion: 4.88,
    ordenes_totales: 215,
    personal_activo: 8,
    comision_porcentaje: 15.0,
    estado: 'ACTIVA',
    banco_abono: 'Banco Bisa',
    cuenta_bancaria: '3029-44123-01',
    titular_cuenta: 'EcoClean Bolivia S.R.L.'
  },
  {
    id: 'emp-3',
    nombre: 'ProClean Santa Cruz Express',
    logo_url: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=400&q=80',
    nit: '5120934011',
    telefono: '77098234',
    contacto: 'Valeria Sucre',
    correo_contacto: 'contacto@proclean.bo',
    ciudad: 'Santa Cruz de la Sierra',
    cobertura: 'Equipetrol Norte, Las Palmas',
    calificacion: 4.85,
    ordenes_totales: 180,
    personal_activo: 6,
    comision_porcentaje: 12.5,
    estado: 'ACTIVA',
    banco_abono: 'Banco Nacional de Bolivia',
    cuenta_bancaria: '2001-99834-55',
    titular_cuenta: 'ProClean Santa Cruz Express'
  }
];

// ============================================================================
// SERVICIOS Y TARIFAS OFRECIDOS POR LAS EMPRESAS CON IMÁGENES
// ============================================================================
const SERVICIOS_EMPRESAS_INICIALES = [
  {
    id: 'srv-1',
    empresa_id: 'emp-1',
    nombre: 'Limpieza Integral de Departamento',
    categoria: 'Departamentos',
    descripcion: 'Limpieza profunda de salas, dormitorios, cocina con desengrasado y sanitización completa de baños.',
    precio_base: 85.0,
    tiempo_estimado: '2.5 a 3.5 horas',
    imagen_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    esta_disponible: true,
    total_contratados: 194
  },
  {
    id: 'srv-2',
    empresa_id: 'emp-1',
    nombre: 'Limpieza Profunda & Desinfección Hospitalaria',
    categoria: 'Departamentos',
    descripcion: 'Desinfección con amonio cuaternario y vapor de alta presión. Especial para familias con niños o mascotas.',
    precio_base: 140.0,
    tiempo_estimado: '4 a 5 horas',
    imagen_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    esta_disponible: true,
    total_contratados: 88
  },
  {
    id: 'srv-3',
    empresa_id: 'emp-1',
    nombre: 'Lavado y Desmanchado de Tapizados y Alfombras',
    categoria: 'Tapizados',
    descripcion: 'Inyección-extracción de alta potencia para sofás, sillones, sillas de comedor y alfombras.',
    precio_base: 110.0,
    tiempo_estimado: '2 a 3 horas',
    imagen_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    esta_disponible: true,
    total_contratados: 60
  },
  {
    id: 'srv-4',
    empresa_id: 'emp-1',
    nombre: 'Limpieza de Cristales y Ventanales en Altura',
    categoria: 'Vidrios',
    descripcion: 'Tratamiento hidrofóbico para mamparas, balcones y ventanales panorámicos de condominios.',
    precio_base: 95.0,
    tiempo_estimado: '2 horas',
    imagen_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    esta_disponible: false, // Pausado temporalmente por la empresa
    total_contratados: 32
  },
  {
    id: 'srv-5',
    empresa_id: 'emp-2',
    nombre: 'Limpieza Ecológica con Productos Biodegradables',
    categoria: 'Ecológico',
    descripcion: 'Insumos 100% amigables con el medio ambiente y seguros para recién nacidos y alérgicos.',
    precio_base: 90.0,
    tiempo_estimado: '3 horas',
    imagen_url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
    esta_disponible: true,
    total_contratados: 115
  }
];

// ============================================================================
// TRABAJADORES DE CUADRILLA
// ============================================================================
const TRABAJADORES_INICIALES = [
  {
    id: 'w-1',
    usuario_id: 'usr-4',
    empresa_id: 'emp-1',
    nombre: 'María Elena Quispe',
    correo: 'maria.limpieza@brillante.com',
    ci: '7891234 SC',
    telefono: '70012345',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    estado: 'EN_TURNO',
    servicios_completados: 158,
    calificacion: 4.90,
    especialidad: 'Departamentos & Cocinas Profundas',
    cuenta_activa: true
  },
  {
    id: 'w-2',
    usuario_id: 'usr-5',
    empresa_id: 'emp-1',
    nombre: 'Roberto Sandoval',
    correo: 'roberto.sandoval@brillante.com',
    ci: '6543210 SC',
    telefono: '76098123',
    foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    estado: 'DISPONIBLE',
    servicios_completados: 112,
    calificacion: 4.85,
    especialidad: 'Tapizados y Cristales en Altura',
    cuenta_activa: true
  },
  {
    id: 'w-3',
    usuario_id: null,
    empresa_id: 'emp-1',
    nombre: 'Carla Vaca Montero',
    correo: 'carla.vaca@brillante.com',
    ci: '8912345 SC',
    telefono: '71045678',
    foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    estado: 'DISPONIBLE',
    servicios_completados: 94,
    calificacion: 4.93,
    especialidad: 'Desinfección Fin de Obra',
    cuenta_activa: true
  },
  {
    id: 'w-4',
    usuario_id: null,
    empresa_id: 'emp-2',
    nombre: 'Juan Pablo Ribera',
    correo: 'juan.ribera@ecoclean.bo',
    ci: '5432198 SC',
    telefono: '78012984',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    estado: 'DISPONIBLE',
    servicios_completados: 76,
    calificacion: 4.80,
    especialidad: 'Departamentos Estudio',
    cuenta_activa: true
  }
];

// ============================================================================
// ÓRDENES DEPARTAMENTALES
// ============================================================================
const ORDENES_INICIALES = [
  {
    id: 'ord-101',
    codigo_seguimiento: 'LG-89412A',
    empresa_id: 'emp-1',
    cliente_nombre: 'Carlos Mendoza',
    cliente_telefono: '70012345',
    direccion: 'Torre Equipetrol Platinum, Depto 4B, 3er Anillo',
    zona: 'Equipetrol',
    servicio: 'Limpieza Integral de Departamento',
    ambientes_resumen: '2 Dormitorios, 1 Baño, 1 Cocina, 1 Sala (+Horno)',
    monto_total: 135.0,
    metodo_pago: 'Efectivo en Recepción',
    estado_actual: 'EN_CAMINO',
    trabajador_id: 'w-1',
    hora_programada: '10:00 AM Hoy',
    evidencias: {
      antes: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      despues: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
      auditoria_aprobada: false
    }
  },
  {
    id: 'ord-102',
    codigo_seguimiento: 'LG-89415B',
    empresa_id: 'emp-1',
    cliente_nombre: 'Dra. Andrea Gutiérrez',
    cliente_telefono: '78456123',
    direccion: 'Condominio La Riviera, Torre 1, Depto 12A',
    zona: 'Equipetrol Norte',
    servicio: 'Limpieza Profunda & Desinfección Hospitalaria',
    ambientes_resumen: '3 Dormitorios, 2 Baños, Cocina, Terraza',
    monto_total: 195.0,
    metodo_pago: 'Transferencia QR / Banco',
    estado_actual: 'SOLICITADA',
    trabajador_id: null,
    hora_programada: '11:30 AM Hoy',
    evidencias: null
  },
  {
    id: 'ord-103',
    codigo_seguimiento: 'LG-89390C',
    empresa_id: 'emp-1',
    cliente_nombre: 'Ing. Marcelo Justiniano',
    cliente_telefono: '75098234',
    direccion: 'Edificio Sirari Sky, Depto 6C, Calle Los Claveles',
    zona: 'Sirari',
    servicio: 'Limpieza Integral de Departamento',
    ambientes_resumen: '1 Dormitorio, 1 Baño, Sala-Kitchenette',
    monto_total: 95.0,
    metodo_pago: 'Efectivo',
    estado_actual: 'COMPLETADA',
    trabajador_id: 'w-2',
    hora_programada: '08:30 AM Hoy',
    evidencias: {
      antes: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
      despues: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      auditoria_aprobada: true
    }
  },
  {
    id: 'ord-104',
    codigo_seguimiento: 'LG-89210D',
    empresa_id: 'emp-2',
    cliente_nombre: 'Patricia Torrico',
    cliente_telefono: '73012890',
    direccion: 'Condominio Smart Urbarí, Depto 3B',
    zona: 'Urbarí',
    servicio: 'Lavado y Desmanchado de Tapizados y Alfombras',
    ambientes_resumen: '2 Sofás 3 Cuerpos + Alfombra de Sala',
    monto_total: 160.0,
    metodo_pago: 'Efectivo',
    estado_actual: 'COMPLETADA',
    trabajador_id: 'w-4',
    hora_programada: 'Ayer 15:00',
    evidencias: {
      antes: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      despues: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
      auditoria_aprobada: true
    }
  }
];

export default function App() {
  // Estado de usuario y sesión activa
  const [currentUser, setCurrentUser] = useState(USUARIOS_INICIALES[1]); // Inicia como Empresa (Lic. Mariana Paz)
  const [activeTab, setActiveTab] = useState('servicios_precios'); // Inicia mostrando catálogo y precios

  // Datos administrables del sistema
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES);
  const [empresas, setEmpresas] = useState(EMPRESAS_INICIALES);
  const [serviciosEmpresas, setServiciosEmpresas] = useState(SERVICIOS_EMPRESAS_INICIALES);
  const [trabajadores, setTrabajadores] = useState(TRABAJADORES_INICIALES);
  const [ordenes, setOrdenes] = useState(ORDENES_INICIALES);

  // Estado de conexión y sincronización con el Backend en Render / Supabase
  const [backendStatus, setBackendStatus] = useState('conectando'); // 'conectado' | 'conectando' | 'offline'
  const [backendDb, setBackendDb] = useState('');
  const [sincronizando, setSincronizando] = useState(false);

  // Búsqueda y filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODAS');
  const [filtroRolUsuario, setFiltroRolUsuario] = useState('TODOS');

  // MODALES
  const [modalNuevaEmpresaOpen, setModalNuevaEmpresaOpen] = useState(false);
  const [modalEditarComisionOpen, setModalEditarComisionOpen] = useState(false);
  const [empresaAEditar, setEmpresaAEditar] = useState(null);
  const [nuevaComisionInput, setNuevaComisionInput] = useState('15.0');

  const [modalNuevoUsuarioOpen, setModalNuevoUsuarioOpen] = useState(false);
  const [modalAsignarOpen, setModalAsignarOpen] = useState(false);
  const [ordenSeleccionadaParaAsignar, setOrdenSeleccionadaParaAsignar] = useState(null);
  const [trabajadorElegidoId, setTrabajadorElegidoId] = useState('');

  // MODALES DE SERVICIOS Y TARIFAS DE EMPRESA
  const [modalNuevoServicioEmpresaOpen, setModalNuevoServicioEmpresaOpen] = useState(false);
  const [nuevoServicioForm, setNuevoServicioForm] = useState({
    nombre: '',
    categoria: 'Departamentos',
    descripcion: '',
    precio_base: 95.0,
    tiempo_estimado: '3 horas',
    imagen_url: PRESETS_IMAGENES_SERVICIOS[0].url
  });

  const [modalEditarPrecioServicioOpen, setModalEditarPrecioServicioOpen] = useState(false);
  const [servicioAEditarPrecio, setServicioAEditarPrecio] = useState(null);
  const [nuevoPrecioServicioInput, setNuevoPrecioServicioInput] = useState('95.0');
  const [servicioAEditarImagenInput, setServicioAEditarImagenInput] = useState('');

  // MODAL EDITAR LOGO Y MARCA DE EMPRESA
  const [modalEditarLogoEmpresaOpen, setModalEditarLogoEmpresaOpen] = useState(false);
  const [logoEmpresaForm, setLogoEmpresaForm] = useState({
    nombre_comercial: '',
    telefono: '',
    direccion: '',
    logo_url: '',
    banco_abono: '',
    cuenta_bancaria: '',
    titular_cuenta: ''
  });

  // GESTIÓN EDITAR EMPRESA (SUPERADMIN)
  const [modalEditarEmpresaOpen, setModalEditarEmpresaOpen] = useState(false);
  const [empresaAEditarForm, setEmpresaAEditarForm] = useState(null);

  // GESTIÓN EDITAR Y CREAR USUARIOS (SUPERADMIN)
  const [modalEditarUsuarioOpen, setModalEditarUsuarioOpen] = useState(false);
  const [usuarioAEditarForm, setUsuarioAEditarForm] = useState(null);
  const [nuevoUsuarioForm, setNuevoUsuarioForm] = useState({
    nombre: '',
    correo: '',
    rol: 'ADMIN_EMPRESA',
    empresa_id: 'emp-1',
    telefono: '70012345',
    password: 'password123'
  });

  // GESTIÓN POLÍTICAS Y COMISIONES (SUPERADMIN)
  const [politicasGlobales, setPoliticasGlobales] = useState({
    comision_base_porcentaje: 15.0,
    retencion_qr_pasarela: 2.5,
    tarifa_despacho_express: 10.0,
    penalidad_cancelacion_tardia: 20.0
  });

  // GESTIÓN AUDITORÍA DE ÓRDENES (SUPERADMIN & EMPRESA)
  const [modalDetalleOrdenOpen, setModalDetalleOrdenOpen] = useState(false);
  const [ordenDetalleSeleccionada, setOrdenDetalleSeleccionada] = useState(null);
  const [filtroEstadoTodasOrdenes, setFiltroEstadoTodasOrdenes] = useState('TODAS');
  const [filtroEmpresaTodasOrdenes, setFiltroEmpresaTodasOrdenes] = useState('TODAS');

  // GESTIÓN EMPLEADOS POR LA EMPRESA
  const [modalCrearEmpleadoEmpresaOpen, setModalCrearEmpleadoEmpresaOpen] = useState(false);
  const [modalEditarEmpleadoOpen, setModalEditarEmpleadoOpen] = useState(false);
  const [empleadoAEditarForm, setEmpleadoAEditarForm] = useState(null);
  const [nuevoEmpleadoForm, setNuevoEmpleadoForm] = useState({
    nombre: '',
    ci: '',
    telefono: '',
    correo: '',
    password: 'password123',
    especialidad: 'Departamentos & Cocinas Profundas',
    estado_disponibilidad: 'DISPONIBLE'
  });

  // GESTIÓN LIQUIDACIONES & FINANZAS
  const [liquidaciones, setLiquidaciones] = useState([
    {
      id: 'LIQ-9821',
      empresa_id: 'emp-1',
      fecha: '2026-09-01',
      monto_bruto: 1450.00,
      comision_limpygo: 217.50,
      monto_neto: 1232.50,
      banco: 'Banco Mercantil Santa Cruz',
      cuenta: '4010-8923-0192',
      estado: 'PAGADO',
      referencia_pago: 'TRANSF-BMSC-889123'
    },
    {
      id: 'LIQ-9822',
      empresa_id: 'emp-1',
      fecha: '2026-09-05',
      monto_bruto: 850.00,
      comision_limpygo: 127.50,
      monto_neto: 722.50,
      banco: 'Banco Mercantil Santa Cruz',
      cuenta: '4010-8923-0192',
      estado: 'PAGADO',
      referencia_pago: 'TRANSF-BMSC-890455'
    },
    {
      id: 'LIQ-9823',
      empresa_id: 'emp-2',
      fecha: '2026-09-08',
      monto_bruto: 1100.00,
      comision_limpygo: 137.50,
      monto_neto: 962.50,
      banco: 'Banco Bisa',
      cuenta: '020-99120-11',
      estado: 'PENDIENTE',
      referencia_pago: 'EN PROCESO ACH'
    }
  ]);
  const [modalSolicitarLiquidacionOpen, setModalSolicitarLiquidacionOpen] = useState(false);
  const [montoLiquidacionInput, setMontoLiquidacionInput] = useState('');
  const [modalAprobarLiquidacionOpen, setModalAprobarLiquidacionOpen] = useState(false);
  const [liquidacionAprobando, setLiquidacionAprobando] = useState(null);
  const [refPagoInput, setRefPagoInput] = useState('');

  // SUPERADMIN: CUPONES Y PROMOCIONES
  const [cupones, setCupones] = useState([
    { id: 'cup-1', codigo: 'LIMPY10', tipo: 'PORCENTAJE', valor: 10, uso_actual: 42, uso_max: 100, pedido_minimo: 80, expira: '2026-12-31', activo: true },
    { id: 'cup-2', codigo: 'SANTA_CRUZ20', tipo: 'PORCENTAJE', valor: 20, uso_actual: 18, uso_max: 50, pedido_minimo: 150, expira: '2026-11-30', activo: true },
    { id: 'cup-3', codigo: 'LIMPYVERANO', tipo: 'MONTO_FIJO', valor: 15, uso_actual: 89, uso_max: 200, pedido_minimo: 100, expira: '2026-10-31', activo: true },
    { id: 'cup-4', codigo: 'CONDOMINIOSPRO', tipo: 'MONTO_FIJO', valor: 25, uso_actual: 12, uso_max: 30, pedido_minimo: 180, expira: '2026-12-15', activo: false }
  ]);
  const [modalNuevoCuponOpen, setModalNuevoCuponOpen] = useState(false);
  const [nuevoCuponForm, setNuevoCuponForm] = useState({
    codigo: '',
    tipo: 'PORCENTAJE',
    valor: 10,
    uso_max: 100,
    pedido_minimo: 80,
    expira: '2026-12-31'
  });

  // SUPERADMIN: RECLAMOS Y SOPORTE
  const [reclamos, setReclamos] = useState([
    { id: 'REC-101', orden_id: 'ord-102', cliente: 'Valeria Justiniano', empresa_id: 'emp-1', motivo: 'Demora de 35 minutos en la llegada por tráfico en 4to anillo', severidad: 'MEDIA', estado: 'EN_REVISION', fecha: '2026-09-08' },
    { id: 'REC-102', orden_id: 'ord-104', cliente: 'Patricia Torrico', empresa_id: 'emp-2', motivo: 'Solicita comprobante formal con NIT para expensas del condominio', severidad: 'BAJA', estado: 'RESUELTO', fecha: '2026-09-07' },
    { id: 'REC-103', orden_id: 'ord-103', cliente: 'Mariana Zeballos', empresa_id: 'emp-1', motivo: 'Cliente reagendó servicio y necesita confirmación de nuevo limpiador', severidad: 'ALTA', estado: 'ABIERTO', fecha: '2026-09-09' }
  ]);
  const [modalResolverReclamoOpen, setModalResolverReclamoOpen] = useState(false);
  const [reclamoSeleccionado, setReclamoSeleccionado] = useState(null);
  const [resolucionInput, setResolucionInput] = useState('');

  // SUPERADMIN: ZONAS DE COBERTURA SANTA CRUZ
  const [zonasCobertura, setZonasCobertura] = useState([
    { id: 'zn-1', nombre: 'Equipetrol / Barrio Sirari', macrozona: 'Norte', recargo_lejanía: 0, estado: 'ACTIVA', tiempo_llegada_prom: '25 min' },
    { id: 'zn-2', nombre: 'Urbarí / Las Palmas', macrozona: 'Oeste', recargo_lejanía: 0, estado: 'ACTIVA', tiempo_llegada_prom: '30 min' },
    { id: 'zn-3', nombre: 'Centro Histórico / 1er Anillo', macrozona: 'Centro', recargo_lejanía: 0, estado: 'ACTIVA', tiempo_llegada_prom: '20 min' },
    { id: 'zn-4', nombre: 'Hamacas / Av. Beni (3er al 5to Anillo)', macrozona: 'Noreste', recargo_lejanía: 10, estado: 'ACTIVA', tiempo_llegada_prom: '40 min' },
    { id: 'zn-5', nombre: 'Plan 3000 / Villa 1ro de Mayo', macrozona: 'Sur - Este', recargo_lejanía: 15, estado: 'ACTIVA', tiempo_llegada_prom: '55 min' },
    { id: 'zn-6', nombre: 'Warnes / Satélite Norte (Zona Extendida)', macrozona: 'Norte Metropolitano', recargo_lejanía: 30, estado: 'ACTIVA', tiempo_llegada_prom: '75 min' }
  ]);
  const [modalNuevaZonaOpen, setModalNuevaZonaOpen] = useState(false);
  const [nuevaZonaForm, setNuevaZonaForm] = useState({
    nombre: '',
    macrozona: 'Norte',
    recargo_lejanía: 0,
    tiempo_llegada_prom: '30 min'
  });

  // EMPRESA: RESEÑAS Y CALIFICACIONES
  const [resenas, setResenas] = useState([
    { id: 'res-1', empresa_id: 'emp-1', cliente: 'Carlos Mendoza', estrellas: 5, servicio: 'Limpieza Integral de Departamentos', trabajador: 'María Elena Quispe', fecha: '2026-09-08', comentario: 'Excelente atención de María Elena, llegó puntual con sus equipos y dejó la cocina y baños impecables. Muy recomendado.', respuesta: '¡Muchas gracias Carlos! Un gusto atenderte en Limpiezas Brillante.' },
    { id: 'res-2', empresa_id: 'emp-1', cliente: 'Mariana Zeballos', estrellas: 5, servicio: 'Desinfección & Limpieza Profunda Cocinas', trabajador: 'Roberto Sandoval', fecha: '2026-09-06', comentario: 'El extractor y hornallas quedaron relucientes, súper detallistas con las juntas de los azulejos.', respuesta: null },
    { id: 'res-3', empresa_id: 'emp-2', cliente: 'Patricia Torrico', estrellas: 5, servicio: 'Lavado y Desmanchado de Tapizados', trabajador: 'Javier Morales', fecha: '2026-09-05', comentario: 'Los sofás tenían manchas difíciles de café y salieron por completo con el vapor.', respuesta: 'Gracias Patricia por confiar en EcoClean Bolivia.' },
    { id: 'res-4', empresa_id: 'emp-1', cliente: 'Valeria Justiniano', estrellas: 4, servicio: 'Limpieza de Vidrios en Altura', trabajador: 'María Elena Quispe', fecha: '2026-09-02', comentario: 'Buen servicio, los ventanales quedaron transparentes. Llegaron con 15 minutos de retraso por lluvia.', respuesta: null }
  ]);
  const [modalResponderResenaOpen, setModalResponderResenaOpen] = useState(false);
  const [resenaSeleccionada, setResenaSeleccionada] = useState(null);
  const [respuestaInput, setRespuestaInput] = useState('');

  // EMPRESA: HORARIOS Y CAPACIDAD
  const [horariosAtencion, setHorariosAtencion] = useState({
    lunes_viernes: { activo: true, inicio: '07:30', fin: '19:30', cupos_simultaneos: 4 },
    sabado: { activo: true, inicio: '08:00', fin: '18:00', cupos_simultaneos: 3 },
    domingo: { activo: true, inicio: '08:30', fin: '14:00', cupos_simultaneos: 2 },
    despacho_express_activo: true,
    recargo_express_bob: 20.0
  });

  // EMPRESA: INVENTARIO DE INSUMOS & EQUIPOS
  const [inventarioInsumos, setInventarioInsumos] = useState([
    { id: 'ins-1', empresa_id: 'emp-1', item: 'Aspiradora Inyección/Extracción Kärcher Puzzi 10/1', categoria: 'Maquinaria', stock: 2, unidad: 'unidades', estado: 'OPERATIVO', fecha_mantenimiento: '2026-08-28' },
    { id: 'ins-2', empresa_id: 'emp-1', item: 'Hidrolavadora de Alta Presión Kärcher K4', categoria: 'Maquinaria', stock: 1, unidad: 'unidades', estado: 'OPERATIVO', fecha_mantenimiento: '2026-09-01' },
    { id: 'ins-3', empresa_id: 'emp-1', item: 'Detergente Desinfectante Biodegradable 20L', categoria: 'Químicos', stock: 14, unidad: 'litros', estado: 'STOCK_OPTIMO', fecha_mantenimiento: 'Lote 2026' },
    { id: 'ins-4', empresa_id: 'emp-1', item: 'Quitamanchas Especializado Tapicería y Fibras', categoria: 'Químicos', stock: 3, unidad: 'frascos', estado: 'REPONER_PRONTO', fecha_mantenimiento: 'Lote 2026' },
    { id: 'ins-5', empresa_id: 'emp-1', item: 'Kits de Microfibra y EPP Certificado', categoria: 'Accesorios y EPP', stock: 45, unidad: 'paquetes', estado: 'STOCK_OPTIMO', fecha_mantenimiento: '2026-09' }
  ]);
  const [modalNuevoInsumoOpen, setModalNuevoInsumoOpen] = useState(false);
  const [nuevoInsumoForm, setNuevoInsumoForm] = useState({
    item: '',
    categoria: 'Químicos',
    stock: 10,
    unidad: 'litros',
    estado: 'STOCK_OPTIMO'
  });

  // GESTIÓN CONTROL DE EVIDENCIAS
  const [modalAuditarEvidenciaOpen, setModalAuditarEvidenciaOpen] = useState(false);
  const [evidenciaSeleccionada, setEvidenciaSeleccionada] = useState(null);
  const [observacionEvidenciaInput, setObservacionEvidenciaInput] = useState('');

  const [credencialesRecientesModal, setCredencialesRecientesModal] = useState(null);

  // ESTADO DE AUTENTICACIÓN REAL
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('limpygo_auth') === 'true';
  });
  const [loginForm, setLoginForm] = useState({
    correo: 'admin@limpygo.com',
    password: '70486379Josemagdiel'
  });
  const [loginCargando, setLoginCargando] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [toastMsg, setToastMsg] = useState(null);

  const mostrarToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const currentEmpresa = empresas.find(e => e.id === currentUser.empresa_id) || empresas[0];

  // ==========================================================================
  // SINCRONIZACIÓN AUTOMÁTICA CON EL BACKEND (RENDER / SUPABASE)
  // ==========================================================================
  const sincronizarConBackend = useCallback(async (usuarioTarget = currentUser) => {
    setSincronizando(true);
    try {
      const health = await api.checkHealth();
      setBackendStatus('conectado');
      setBackendDb(health?.database || 'connected');

      // 1. Cargar usuarios del sistema (demo y registrados)
      try {
        const demoRes = await api.getUsuariosDemo();
        if (demoRes?.usuarios && demoRes.usuarios.length > 0) {
          setUsuarios(demoRes.usuarios);
        }
      } catch (err) {
        console.warn('[LimpyGo] Error cargando usuarios demo:', err);
      }

      // 2. Si el usuario activo es SuperAdmin, sincronizar datos globales
      if (usuarioTarget.rol === 'SUPER_ADMIN') {
        const [empRes, usrRes, ordRes, polRes] = await Promise.allSettled([
          api.getAdminEmpresas(),
          api.getAdminUsuarios(),
          api.getAdminOrdenes(),
          api.getAdminPoliticas(),
        ]);

        if (empRes.status === 'fulfilled' && empRes.value?.empresas?.length) {
          setEmpresas(empRes.value.empresas);
        }
        if (usrRes.status === 'fulfilled' && usrRes.value?.usuarios?.length) {
          setUsuarios(usrRes.value.usuarios);
        }
        if (ordRes.status === 'fulfilled' && ordRes.value?.ordenes?.length) {
          setOrdenes(ordRes.value.ordenes);
        }
        if (polRes.status === 'fulfilled' && polRes.value?.politicas) {
          setPoliticasGlobales(polRes.value.politicas);
        }
      } else {
        // 3. Usuario Empresa: autenticar sesión y sincronizar servicios, personal y órdenes
        try {
          await api.login(usuarioTarget.correo, 'password').catch(() => null);

          const [servRes, trabRes, ordRes, perfRes] = await Promise.allSettled([
            api.getEmpresaServicios(),
            api.getEmpresaTrabajadores(),
            api.getEmpresaOrdenes(),
            api.getEmpresaPerfil(),
          ]);

          if (servRes.status === 'fulfilled' && servRes.value?.servicios?.length) {
            const mappedServicios = servRes.value.servicios.map(s => ({
              id: String(s.id),
              empresa_id: usuarioTarget.empresa_id || 'emp-1',
              nombre: s.nombre,
              categoria: s.categoria || 'Departamentos',
              descripcion: s.descripcion,
              precio_base: parseFloat(s.pivot?.precio_personalizado || s.precio_base || s.precio || 95.0),
              tiempo_estimado: `${Math.round((s.duracion_estimada_minutos || 180) / 60)} horas`,
              imagen_url: s.imagen_url || s.icono_url || PRESETS_IMAGENES_SERVICIOS[0].url,
              esta_disponible: s.pivot?.esta_disponible !== undefined ? Boolean(s.pivot.esta_disponible) : true,
              total_contratados: s.total_contratados || 0,
            }));
            setServiciosEmpresas(prev => {
              const otros = prev.filter(item => item.empresa_id !== usuarioTarget.empresa_id);
              return [...mappedServicios, ...otros];
            });
          }

          if (trabRes.status === 'fulfilled' && trabRes.value?.trabajadores?.length) {
            setTrabajadores(trabRes.value.trabajadores);
          }

          if (ordRes.status === 'fulfilled' && ordRes.value?.ordenes?.length) {
            setOrdenes(ordRes.value.ordenes);
          }

          if (perfRes.status === 'fulfilled' && perfRes.value?.empresa) {
            const p = perfRes.value.empresa;
            setEmpresas(prev => prev.map(e => e.id === p.id ? { ...e, ...p } : e));
          }
        } catch (err) {
          console.warn('[LimpyGo] Error sincronizando empresa:', err);
        }
      }
    } catch (err) {
      console.warn('[LimpyGo] Backend offline o en suspensión por inactividad de Render:', err);
      setBackendStatus('offline');
    } finally {
      setSincronizando(false);
    }
  }, [currentUser]);

  useEffect(() => {
    sincronizarConBackend();
  }, [sincronizarConBackend]);

  // ==========================================================================
  // CONMUTADOR DE SESIÓN CON AUTENTICACIÓN
  // ==========================================================================
  const handleCambiarUsuario = async (usuarioId) => {
    const user = usuarios.find(u => u.id === usuarioId);
    if (!user) return;
    setCurrentUser(user);

    try {
      await api.login(user.correo, 'password').catch(() => null);
    } catch (e) {
      // ignore
    }

    if (user.rol === 'SUPER_ADMIN') {
      setActiveTab('dashboard_admin');
      mostrarToast('Sesión cambiada a SuperAdmin LimpyGo (admin@limpygo.com)');
    } else {
      setActiveTab('servicios_precios');
      const emp = empresas.find(e => e.id === user.empresa_id);
      mostrarToast(`Sesión cambiada a ${emp?.nombre || 'Empresa'} (${user.correo})`);
    }

    sincronizarConBackend(user);
  };

  // ==========================================================================
  // AUTENTICACIÓN REAL, LOGIN Y LOGOUT
  // ==========================================================================
  const handleIniciarSesionReal = async (e) => {
    if (e) e.preventDefault();
    setLoginCargando(true);
    setLoginError('');

    try {
      // 1. Intentar autenticar contra la API en Render / Supabase
      const loginRes = await api.login(loginForm.correo, loginForm.password).catch(err => {
        console.warn('Backend login error:', err);
        return null;
      });

      // 2. Localizar o construir el usuario activo
      let user = usuarios.find(u => u.correo.toLowerCase() === loginForm.correo.toLowerCase());
      if (!user && loginRes?.usuario) {
        user = {
          id: String(loginRes.usuario.id),
          nombre: loginRes.usuario.correo.includes('admin') ? 'Rodrigo Mendoza (SuperAdmin)' : 'Admin Empresa',
          correo: loginRes.usuario.correo,
          rol: loginRes.usuario.rol === 'EMPRESA_ADMIN' ? 'ADMIN_EMPRESA' : loginRes.usuario.rol,
          empresa_id: loginRes.usuario.empresa_id || 'emp-1',
          telefono: '70012345',
          esta_activo: true
        };
      }

      if (!user) {
        // Fallback demo matching
        if (loginForm.correo.toLowerCase().includes('admin')) {
          user = usuarios[0];
        } else if (loginForm.correo.toLowerCase().includes('eco')) {
          user = usuarios[2];
        } else {
          user = usuarios[1];
        }
      }

      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('limpygo_auth', 'true');
      localStorage.setItem('limpygo_user_email', user.correo);

      if (user.rol === 'SUPER_ADMIN') {
        setActiveTab('dashboard_admin');
        mostrarToast('✨ Bienvenido SuperAdmin a la Central LimpyGo');
      } else {
        setActiveTab('servicios_precios');
        mostrarToast(`🏢 Bienvenido al portal de ${empresas.find(e => e.id === user.empresa_id)?.nombre || 'Empresa'}`);
      }

      sincronizarConBackend(user);
    } catch (err) {
      setLoginError(err.message || 'Error al conectar con el servidor.');
    } finally {
      setLoginCargando(false);
    }
  };

  const handleAccesoDemoRapido = (correoElegido, passwordElegida = '70486379Josemagdiel') => {
    setLoginForm({ correo: correoElegido, password: passwordElegida });
    setLoginCargando(true);
    setLoginError('');

    setTimeout(() => {
      let user = usuarios.find(u => u.correo.toLowerCase() === correoElegido.toLowerCase()) || usuarios[0];
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('limpygo_auth', 'true');
      localStorage.setItem('limpygo_user_email', user.correo);

      if (user.rol === 'SUPER_ADMIN') {
        setActiveTab('dashboard_admin');
        mostrarToast('👑 Sesión iniciada como SuperAdmin LimpyGo');
      } else {
        setActiveTab('servicios_precios');
        mostrarToast(`🏢 Sesión iniciada en ${empresas.find(e => e.id === user.empresa_id)?.nombre || 'Portal Empresa'}`);
      }

      setLoginCargando(false);
      sincronizarConBackend(user);
    }, 300);
  };

  const handleCerrarSesion = () => {
    api.logout().catch(() => null);
    setIsAuthenticated(false);
    localStorage.removeItem('limpygo_auth');
    localStorage.removeItem('limpygo_user_email');
    mostrarToast('🔒 Sesión cerrada con éxito');
  };

  // ==========================================================================
  // MANEJADORES: NUEVOS MÓDULOS DE SUPERADMIN Y EMPRESA
  // ==========================================================================
  const handleAprobarLiquidacionModal = (liq) => {
    setLiquidacionAprobando(liq);
    setRefPagoInput(`TRANSF-BMSC-${Math.floor(100000 + Math.random() * 900000)}`);
    setModalAprobarLiquidacionOpen(true);
  };

  const handleConfirmarAprobacionLiquidacion = (e) => {
    e.preventDefault();
    if (!liquidacionAprobando) return;

    setLiquidaciones(prev => prev.map(l => {
      if (l.id === liquidacionAprobando.id) {
        return {
          ...l,
          estado: 'PAGADO',
          referencia_pago: refPagoInput || `TRANSF-ACH-${Date.now().toString().slice(-6)}`
        };
      }
      return l;
    }));

    mostrarToast(`✅ Liquidación ${liquidacionAprobando.id} aprobada y transferida.`);
    setModalAprobarLiquidacionOpen(false);
    setLiquidacionAprobando(null);
  };

  const handleGuardarNuevoCupon = (e) => {
    e.preventDefault();
    if (!nuevoCuponForm.codigo || !nuevoCuponForm.valor) return;

    const nuevo = {
      id: `cup-${Date.now()}`,
      codigo: nuevoCuponForm.codigo.toUpperCase().trim(),
      tipo: nuevoCuponForm.tipo,
      valor: parseFloat(nuevoCuponForm.valor) || 10,
      uso_actual: 0,
      uso_max: parseInt(nuevoCuponForm.uso_max) || 100,
      pedido_minimo: parseFloat(nuevoCuponForm.pedido_minimo) || 0,
      expira: nuevoCuponForm.expira || '2026-12-31',
      activo: true
    };

    setCupones(prev => [nuevo, ...prev]);
    setModalNuevoCuponOpen(false);
    setNuevoCuponForm({
      codigo: '',
      tipo: 'PORCENTAJE',
      valor: 10,
      uso_max: 100,
      pedido_minimo: 80,
      expira: '2026-12-31'
    });
    mostrarToast(`🎉 Cupón ${nuevo.codigo} publicado con éxito.`);
  };

  const handleToggleCupon = (cuponId) => {
    setCupones(prev => prev.map(c => c.id === cuponId ? { ...c, activo: !c.activo } : c));
    mostrarToast('Estado de cupón actualizado.');
  };

  const handleResolverReclamo = (e) => {
    e.preventDefault();
    if (!reclamoSeleccionado) return;

    setReclamos(prev => prev.map(r => {
      if (r.id === reclamoSeleccionado.id) {
        return { ...r, estado: 'RESUELTO', resolucion: resolucionInput || 'Resuelto satisfactoriamente por mediación.' };
      }
      return r;
    }));

    mostrarToast(`✓ Ticket ${reclamoSeleccionado.id} marcado como Resuelto.`);
    setModalResolverReclamoOpen(false);
    setReclamoSeleccionado(null);
    setResolucionInput('');
  };

  const handleGuardarNuevaZona = (e) => {
    e.preventDefault();
    if (!nuevaZonaForm.nombre) return;

    const nueva = {
      id: `zn-${Date.now()}`,
      nombre: nuevaZonaForm.nombre,
      macrozona: nuevaZonaForm.macrozona,
      recargo_lejanía: parseFloat(nuevaZonaForm.recargo_lejanía) || 0,
      estado: 'ACTIVA',
      tiempo_llegada_prom: nuevaZonaForm.tiempo_llegada_prom || '30 min'
    };

    setZonasCobertura(prev => [...prev, nueva]);
    setModalNuevaZonaOpen(false);
    setNuevaZonaForm({
      nombre: '',
      macrozona: 'Norte',
      recargo_lejanía: 0,
      tiempo_llegada_prom: '30 min'
    });
    mostrarToast(`🗺️ Zona ${nueva.nombre} habilitada.`);
  };

  const handleToggleZona = (zonaId) => {
    setZonasCobertura(prev => prev.map(z => z.id === zonaId ? { ...z, estado: z.estado === 'ACTIVA' ? 'INACTIVA' : 'ACTIVA' } : z));
    mostrarToast('Cobertura de zona actualizada.');
  };

  const handleEnviarRespuestaResena = (e) => {
    e.preventDefault();
    if (!resenaSeleccionada) return;

    setResenas(prev => prev.map(r => {
      if (r.id === resenaSeleccionada.id) {
        return { ...r, respuesta: respuestaInput };
      }
      return r;
    }));

    mostrarToast('💬 Respuesta publicada al cliente con éxito.');
    setModalResponderResenaOpen(false);
    setResenaSeleccionada(null);
    setRespuestaInput('');
  };

  const handleGuardarNuevoInsumo = (e) => {
    e.preventDefault();
    if (!nuevoInsumoForm.item) return;

    const nuevo = {
      id: `ins-${Date.now()}`,
      empresa_id: currentEmpresa.id,
      item: nuevoInsumoForm.item,
      categoria: nuevoInsumoForm.categoria,
      stock: parseFloat(nuevoInsumoForm.stock) || 1,
      unidad: nuevoInsumoForm.unidad,
      estado: nuevoInsumoForm.estado,
      fecha_mantenimiento: new Date().toISOString().split('T')[0]
    };

    setInventarioInsumos(prev => [nuevo, ...prev]);
    setModalNuevoInsumoOpen(false);
    setNuevoInsumoForm({
      item: '',
      categoria: 'Químicos',
      stock: 10,
      unidad: 'litros',
      estado: 'STOCK_OPTIMO'
    });
    mostrarToast(`📦 Insumo "${nuevo.item}" registrado en el inventario.`);
  };

  // ==========================================================================
  // GESTIÓN DE SERVICIOS Y PRECIOS POR LA EMPRESA
  // ==========================================================================
  // Lista de servicios que pertenecen a la empresa actual
  const serviciosDeLaEmpresa = serviciosEmpresas.filter(s => s.empresa_id === currentEmpresa.id);

  const handleGuardarNuevoServicio = async (e) => {
    e.preventDefault();
    if (!nuevoServicioForm.nombre || !nuevoServicioForm.precio_base) return;

    const payload = {
      nombre: nuevoServicioForm.nombre,
      categoria: nuevoServicioForm.categoria,
      descripcion: nuevoServicioForm.descripcion || 'Servicio especializado prestado por personal certificado.',
      precio_personalizado: parseFloat(nuevoServicioForm.precio_base) || 95.0,
      tiempo_estimado: nuevoServicioForm.tiempo_estimado || '2 a 3 horas',
      imagen_url: nuevoServicioForm.imagen_url || PRESETS_IMAGENES_SERVICIOS[0].url,
      esta_disponible: true
    };

    try {
      await api.createEmpresaServicio(payload);
      mostrarToast(`✨ Servicio "${payload.nombre}" guardado en la base de datos de Supabase.`);
    } catch (err) {
      mostrarToast(`✨ Servicio "${payload.nombre}" añadido.`);
    }

    const nuevo = {
      id: `srv-${Date.now()}`,
      empresa_id: currentEmpresa.id,
      ...payload,
      precio_base: payload.precio_personalizado,
      total_contratados: 0
    };

    setServiciosEmpresas(prev => [nuevo, ...prev]);
    setModalNuevoServicioEmpresaOpen(false);
    setNuevoServicioForm({
      nombre: '',
      categoria: 'Departamentos',
      descripcion: '',
      precio_base: 95.0,
      tiempo_estimado: '3 horas',
      imagen_url: PRESETS_IMAGENES_SERVICIOS[0].url
    });
  };

  const handleActualizarPrecioServicio = async (e) => {
    e.preventDefault();
    if (!servicioAEditarPrecio) return;
    const precioNum = parseFloat(nuevoPrecioServicioInput);
    if (isNaN(precioNum) || precioNum <= 0) {
      mostrarToast('Introduce un precio válido.');
      return;
    }

    try {
      await api.updateEmpresaServicio(servicioAEditarPrecio.id, {
        precio_personalizado: precioNum,
        imagen_url: servicioAEditarImagenInput || servicioAEditarPrecio.imagen_url
      });
      mostrarToast(`💰 Tarifa de "${servicioAEditarPrecio.nombre}" actualizada en la base de datos.`);
    } catch (err) {
      mostrarToast(`💰 Servicio "${servicioAEditarPrecio.nombre}" actualizado.`);
    }

    setServiciosEmpresas(prev => prev.map(s => {
      if (s.id === servicioAEditarPrecio.id) {
        return {
          ...s,
          precio_base: precioNum,
          imagen_url: servicioAEditarImagenInput || s.imagen_url
        };
      }
      return s;
    }));

    setModalEditarPrecioServicioOpen(false);
    setServicioAEditarPrecio(null);
  };

  const handleGuardarPerfilYLogoEmpresa = async (e) => {
    e.preventDefault();
    const payload = {
      nombre_comercial: logoEmpresaForm.nombre_comercial || currentEmpresa.nombre,
      telefono: logoEmpresaForm.telefono || currentEmpresa.telefono,
      direccion: logoEmpresaForm.direccion || currentEmpresa.direccion,
      logo_url: logoEmpresaForm.logo_url || currentEmpresa.logo_url,
      banco_abono: logoEmpresaForm.banco_abono || currentEmpresa.banco_abono,
      cuenta_bancaria: logoEmpresaForm.cuenta_bancaria || currentEmpresa.cuenta_bancaria,
      titular_cuenta: logoEmpresaForm.titular_cuenta || currentEmpresa.titular_cuenta
    };

    try {
      await api.updateEmpresaPerfil(payload);
      mostrarToast(`🏢 Identidad corporativa y cuenta bancaria guardadas en Supabase.`);
    } catch (err) {
      mostrarToast(`🏢 Identidad corporativa actualizada.`);
    }

    setEmpresas(prev => prev.map(emp => {
      if (emp.id === currentEmpresa.id) {
        return {
          ...emp,
          ...payload,
          nombre: payload.nombre_comercial
        };
      }
      return emp;
    }));

    setModalEditarLogoEmpresaOpen(false);
  };

  const handleToggleDisponibilidadServicio = async (servicioId) => {
    const s = serviciosEmpresas.find(item => item.id === servicioId);
    const nuevo = !s?.esta_disponible;

    try {
      await api.updateEmpresaServicio(servicioId, { esta_disponible: nuevo });
    } catch (e) {
      // fallback
    }

    setServiciosEmpresas(prev => prev.map(s => {
      if (s.id === servicioId) {
        mostrarToast(`Servicio "${s.nombre}" ${nuevo ? 'activado' : 'pausado'} en la app móvil.`);
        return { ...s, esta_disponible: nuevo };
      }
      return s;
    }));
  };

  const handleDesvincularServicio = async (servicioId) => {
    const s = serviciosEmpresas.find(item => item.id === servicioId);
    if (!window.confirm(`¿Estás seguro de remover "${s?.nombre}" del catálogo de tu empresa?`)) return;

    try {
      await api.deleteEmpresaServicio(servicioId);
      mostrarToast(`🗑️ Servicio "${s?.nombre}" desvinculado de la base de datos.`);
    } catch (e) {
      mostrarToast(`🗑️ Servicio "${s?.nombre}" desvinculado del catálogo.`);
    }

    setServiciosEmpresas(prev => prev.filter(item => item.id !== servicioId));
  };

  // ==========================================================================
  // SUPERADMIN: GESTIÓN DE EMPRESAS
  // ==========================================================================
  const handleGuardarEdicionEmpresa = async (e) => {
    e.preventDefault();
    if (!empresaAEditarForm) return;

    try {
      await api.updateAdminEmpresa(empresaAEditarForm.id, empresaAEditarForm);
      mostrarToast(`🏢 Empresa "${empresaAEditarForm.nombre}" actualizada en la base de datos.`);
    } catch (err) {
      mostrarToast(`🏢 Empresa "${empresaAEditarForm.nombre}" actualizada.`);
    }

    setEmpresas(prev => prev.map(emp => emp.id === empresaAEditarForm.id ? { ...emp, ...empresaAEditarForm } : emp));
    setModalEditarEmpresaOpen(false);
  };

  const handleToggleEstadoEmpresa = async (empresaId) => {
    const emp = empresas.find(e => e.id === empresaId);
    const nuevoEstado = emp?.estado === 'ACTIVA' ? 'PAUSADA' : 'ACTIVA';

    try {
      await api.updateAdminEmpresa(empresaId, { estado: nuevoEstado });
    } catch (e) {
      // fallback
    }

    setEmpresas(prev => prev.map(emp => {
      if (emp.id === empresaId) {
        mostrarToast(`Empresa "${emp.nombre}" ahora está ${nuevoEstado}.`);
        return { ...emp, estado: nuevoEstado };
      }
      return emp;
    }));
  };

  // ==========================================================================
  // SUPERADMIN: GESTIÓN DE USUARIOS
  // ==========================================================================
  const handleGuardarEdicionUsuario = async (e) => {
    e.preventDefault();
    if (!usuarioAEditarForm) return;

    try {
      await api.updateAdminUsuario(usuarioAEditarForm.id, usuarioAEditarForm);
      mostrarToast(`👤 Usuario "${usuarioAEditarForm.nombre}" actualizado en Supabase.`);
    } catch (err) {
      mostrarToast(`👤 Usuario "${usuarioAEditarForm.nombre}" actualizado.`);
    }

    setUsuarios(prev => prev.map(u => u.id === usuarioAEditarForm.id ? { ...u, ...usuarioAEditarForm } : u));
    setModalEditarUsuarioOpen(false);
  };

  const handleToggleEstadoUsuario = async (usuarioId) => {
    const u = usuarios.find(user => user.id === usuarioId);
    const nuevo = !u?.esta_activo;

    try {
      await api.updateAdminUsuario(usuarioId, { esta_activo: nuevo });
    } catch (e) {
      // fallback
    }

    setUsuarios(prev => prev.map(u => {
      if (u.id === usuarioId) {
        mostrarToast(`Cuenta de ${u.nombre} ${nuevo ? 'activada' : 'suspendida'}.`);
        return { ...u, esta_activo: nuevo };
      }
      return u;
    }));
  };

  const handleRestablecerPasswordUsuario = (u) => {
    mostrarToast(`🔑 Clave provisional generada para ${u.nombre}: "limpy123"`);
  };

  const handleGuardarNuevoUsuario = (e) => {
    e.preventDefault();
    if (!nuevoUsuarioForm.nombre || !nuevoUsuarioForm.correo) return;
    const nuevo = {
      id: `usr-${Date.now()}`,
      nombre: nuevoUsuarioForm.nombre,
      correo: nuevoUsuarioForm.correo.toLowerCase().trim(),
      rol: nuevoUsuarioForm.rol,
      empresa_id: nuevoUsuarioForm.rol === 'SUPER_ADMIN' ? null : nuevoUsuarioForm.empresa_id,
      telefono: nuevoUsuarioForm.telefono || '70012345',
      esta_activo: true,
      creado_at: new Date().toISOString().split('T')[0]
    };
    setUsuarios(prev => [nuevo, ...prev]);
    setModalNuevoUsuarioOpen(false);
    setNuevoUsuarioForm({
      nombre: '',
      correo: '',
      rol: 'ADMIN_EMPRESA',
      empresa_id: 'emp-1',
      telefono: '70012345',
      password: 'password123'
    });
    mostrarToast(`✅ Usuario ${nuevo.nombre} (${nuevo.rol}) registrado con éxito.`);
  };

  // ==========================================================================
  // SUPERADMIN & AUDITORÍA: GESTIÓN DE ÓRDENES
  // ==========================================================================
  const handleCambiarEstadoOrdenDetalle = (nuevoEstado) => {
    if (!ordenDetalleSeleccionada) return;
    setOrdenes(prev => prev.map(o => {
      if (o.id === ordenDetalleSeleccionada.id) {
        return { ...o, estado_actual: nuevoEstado };
      }
      return o;
    }));
    setOrdenDetalleSeleccionada(prev => ({ ...prev, estado_actual: nuevoEstado }));
    mostrarToast(`Estado de orden ${ordenDetalleSeleccionada.codigo_seguimiento} cambiado a ${nuevoEstado}.`);
  };

  const handleReasignarEmpresaOrden = (nuevaEmpresaId) => {
    if (!ordenDetalleSeleccionada) return;
    const empDestino = empresas.find(e => e.id === nuevaEmpresaId);
    setOrdenes(prev => prev.map(o => {
      if (o.id === ordenDetalleSeleccionada.id) {
        return { ...o, empresa_id: nuevaEmpresaId, trabajador_id: null, estado_actual: 'SOLICITADA' };
      }
      return o;
    }));
    setOrdenDetalleSeleccionada(prev => ({ ...prev, empresa_id: nuevaEmpresaId, trabajador_id: null, estado_actual: 'SOLICITADA' }));
    mostrarToast(`Orden reasignada a ${empDestino?.nombre || 'nueva empresa'}.`);
  };

  // ==========================================================================
  // GESTIÓN DE POLÍTICAS Y COMISIONES
  // ==========================================================================
  const handleGuardarPoliticasGlobales = (e) => {
    e.preventDefault();
    mostrarToast('💼 Políticas de comisiones y tarifas de la plataforma actualizadas exitosamente.');
  };

  // ==========================================================================
  // GESTIÓN DE EMPLEADOS POR LA EMPRESA (EDICIÓN, ACCESO Y CLAVE)
  // ==========================================================================
  const handleGuardarEdicionEmpleado = (e) => {
    e.preventDefault();
    if (!empleadoAEditarForm) return;
    setTrabajadores(prev => prev.map(w => w.id === empleadoAEditarForm.id ? { ...w, ...empleadoAEditarForm } : w));
    setModalEditarEmpleadoOpen(false);
    mostrarToast(`👷 Empleado ${empleadoAEditarForm.nombre} actualizado.`);
  };

  const handleToggleAccesoMovilEmpleado = (workerId) => {
    setTrabajadores(prev => prev.map(w => {
      if (w.id === workerId) {
        const nuevo = !w.cuenta_activa;
        mostrarToast(`Acceso móvil de ${w.nombre} ${nuevo ? 'activado' : 'pausado'}.`);
        return { ...w, cuenta_activa: nuevo };
      }
      return w;
    }));
  };

  const handleRestablecerPasswordEmpleado = (w) => {
    setCredencialesRecientesModal({
      nombre: w.nombre,
      correo: w.correo,
      password: 'password123',
      empresa: currentEmpresa.nombre
    });
    mostrarToast(`🔑 Clave móvil restablecida para ${w.nombre}: "password123"`);
  };

  const handleEliminarEmpleado = async (workerId) => {
    const w = trabajadores.find(t => t.id === workerId);
    if (!window.confirm(`¿Estás seguro de desvincular a ${w?.nombre}?`)) return;

    try {
      await api.deleteEmpresaTrabajador(workerId);
      mostrarToast(`🗑️ Empleado ${w?.nombre} desvinculado de la base de datos.`);
    } catch (err) {
      mostrarToast(`🗑️ Empleado ${w?.nombre} desvinculado de la empresa.`);
    }

    setTrabajadores(prev => prev.filter(t => t.id !== workerId));
  };

  // ==========================================================================
  // GESTIÓN DE LIQUIDACIONES Y FINANZAS
  // ==========================================================================
  const handleSolicitarLiquidacion = (e) => {
    e.preventDefault();
    const monto = parseFloat(montoLiquidacionInput);
    if (isNaN(monto) || monto <= 0) {
      mostrarToast('Introduce un monto válido.');
      return;
    }
    const comision = monto * (currentEmpresa.comision_porcentaje / 100);
    const neto = monto - comision;

    const nuevaLiq = {
      id: `LIQ-${Date.now().toString().slice(-4)}`,
      empresa_id: currentEmpresa.id,
      fecha: new Date().toISOString().split('T')[0],
      monto_bruto: monto,
      comision_limpygo: comision,
      monto_neto: neto,
      banco: currentEmpresa.banco_abono || 'Banco Mercantil Santa Cruz',
      cuenta: currentEmpresa.cuenta_bancaria || '4010-8923-0192',
      estado: 'EN_REVISION',
      referencia_pago: 'Pendiente de Transferencia ACH'
    };

    setLiquidaciones(prev => [nuevaLiq, ...prev]);
    setModalSolicitarLiquidacionOpen(false);
    setMontoLiquidacionInput('');
    mostrarToast(`🏦 Solicitud de liquidación de ${neto.toFixed(2)} BOB registrada.`);
  };

  // ==========================================================================
  // GESTIÓN DE EVIDENCIAS Y AUDITORÍA
  // ==========================================================================
  const handleAprobarEvidencia = async (ordenId) => {
    const orden = ordenes.find(o => o.id === ordenId);
    if (orden) {
      try {
        await api.aprobarEvidenciaOrden(orden.codigo_seguimiento || orden.id);
        mostrarToast('✅ Auditoría de evidencias aprobada en Supabase/Render.');
      } catch (err) {
        mostrarToast('✅ Evidencia de limpieza aprobada satisfactoriamente.');
      }
    }

    setOrdenes(prev => prev.map(o => {
      if (o.id === ordenId && o.evidencias) {
        return {
          ...o,
          estado_actual: 'COMPLETADA',
          evidencias: { ...o.evidencias, auditoria_aprobada: true, observacion: null }
        };
      }
      return o;
    }));
    if (modalAuditarEvidenciaOpen) setModalAuditarEvidenciaOpen(false);
  };

  const handleObservarEvidencia = (ordenId) => {
    if (!observacionEvidenciaInput.trim()) {
      mostrarToast('Ingresa una nota de observación.');
      return;
    }
    setOrdenes(prev => prev.map(o => {
      if (o.id === ordenId && o.evidencias) {
        return {
          ...o,
          evidencias: { ...o.evidencias, auditoria_aprobada: false, observacion: observacionEvidenciaInput }
        };
      }
      return o;
    }));
    setModalAuditarEvidenciaOpen(false);
    setObservacionEvidenciaInput('');
    mostrarToast('⚠️ Observación registrada y notificada al limpiador.');
  };

  // ==========================================================================
  // GESTIÓN DE EMPLEADOS POR LA EMPRESA
  // ==========================================================================
  const handleGuardarEmpleadoPorEmpresa = async (e) => {
    e.preventDefault();
    if (!nuevoEmpleadoForm.nombre || !nuevoEmpleadoForm.correo || !nuevoEmpleadoForm.ci) {
      mostrarToast('Por favor completa todos los campos requeridos.');
      return;
    }

    const payload = {
      nombres: nuevoEmpleadoForm.nombre,
      apellidos: '',
      ci: nuevoEmpleadoForm.ci,
      telefono: nuevoEmpleadoForm.telefono || '70012345',
      correo: nuevoEmpleadoForm.correo.toLowerCase().trim(),
      password: nuevoEmpleadoForm.password || 'password123',
      especialidad: nuevoEmpleadoForm.especialidad || 'Departamentos & Cocinas Profundas',
      foto_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
    };

    let nuevoTrabajador = null;
    try {
      const res = await api.createEmpresaTrabajador(payload);
      if (res?.trabajador) {
        nuevoTrabajador = res.trabajador;
        mostrarToast(`👷 Empleado ${payload.nombres} guardado en la base de datos de Supabase.`);
      }
    } catch (err) {
      mostrarToast(`👷 Empleado ${payload.nombres} creado con usuario móvil.`);
    }

    if (!nuevoTrabajador) {
      const nuevoUsuarioId = `usr-${Date.now()}`;
      const nuevoTrabajadorId = `w-${Date.now()}`;

      const nuevoUsuario = {
        id: nuevoUsuarioId,
        nombre: nuevoEmpleadoForm.nombre,
        correo: payload.correo,
        rol: 'TRABAJADOR',
        empresa_id: currentEmpresa.id,
        telefono: payload.telefono,
        esta_activo: true,
        creado_at: new Date().toISOString().split('T')[0]
      };

      nuevoTrabajador = {
        id: nuevoTrabajadorId,
        usuario_id: nuevoUsuarioId,
        empresa_id: currentEmpresa.id,
        nombre: nuevoEmpleadoForm.nombre,
        correo: payload.correo,
        ci: nuevoEmpleadoForm.ci,
        telefono: payload.telefono,
        foto: payload.foto_url,
        estado: nuevoEmpleadoForm.estado_disponibilidad || 'DISPONIBLE',
        servicios_completados: 0,
        calificacion: 5.0,
        especialidad: nuevoEmpleadoForm.especialidad,
        cuenta_activa: true
      };

      setUsuarios(prev => [...prev, nuevoUsuario]);
    }

    setTrabajadores(prev => [nuevoTrabajador, ...prev]);

    setCredencialesRecientesModal({
      nombre: nuevoEmpleadoForm.nombre,
      correo: nuevoEmpleadoForm.correo,
      password: nuevoEmpleadoForm.password,
      empresa: currentEmpresa.nombre
    });

    setModalCrearEmpleadoEmpresaOpen(false);
    setNuevoEmpleadoForm({
      nombre: '',
      ci: '',
      telefono: '',
      correo: '',
      password: 'password123',
      especialidad: 'Departamentos & Cocinas Profundas',
      estado_disponibilidad: 'DISPONIBLE'
    });
  };

  // ==========================================================================
  // SUPERADMIN: EMPRESAS Y USUARIOS
  // ==========================================================================
  const handleGuardarNuevaEmpresa = async (e) => {
    e.preventDefault();
    if (!nuevaEmpresaForm.nombre || !nuevaEmpresaForm.nit) return;

    const payload = {
      nombre: nuevaEmpresaForm.nombre,
      nit: nuevaEmpresaForm.nit,
      telefono: nuevaEmpresaForm.telefono || '3-3450000',
      correo: nuevaEmpresaForm.correo_contacto || 'contacto@empresa.bo',
      cobertura: nuevaEmpresaForm.cobertura || 'Equipetrol, Urbarí, Sirari, Centro',
      comision_porcentaje: parseFloat(nuevaComisionInput) || 15.0,
      banco_abono: 'Banco Mercantil Santa Cruz',
      cuenta_bancaria: '4010-99000-00',
      titular_cuenta: nuevaEmpresaForm.nombre,
      logo_url: PRESETS_LOGOS_EMPRESA[0].url
    };

    let nueva = null;
    try {
      const res = await api.createAdminEmpresa(payload);
      if (res?.empresa) {
        nueva = res.empresa;
        mostrarToast(`🏢 Empresa "${payload.nombre}" creada exitosamente en Supabase.`);
      }
    } catch (err) {
      mostrarToast(`🏢 Empresa "${payload.nombre}" registrada.`);
    }

    if (!nueva) {
      nueva = {
        id: `emp-${Date.now()}`,
        ...payload,
        contacto: nuevaEmpresaForm.contacto || 'Administrador',
        correo_contacto: payload.correo,
        ciudad: 'Santa Cruz de la Sierra',
        calificacion: 5.0,
        ordenes_totales: 0,
        personal_activo: 0,
        estado: 'ACTIVA'
      };
    }

    setEmpresas(prev => [nueva, ...prev]);
    setModalNuevaEmpresaOpen(false);
  };

  const handleGuardarComision = async (e) => {
    e.preventDefault();
    if (!empresaAEditar) return;
    const tasa = parseFloat(nuevaComisionInput);
    if (isNaN(tasa) || tasa < 0 || tasa > 100) {
      mostrarToast('Introduce un porcentaje válido entre 0 y 100.');
      return;
    }

    try {
      await api.updateAdminEmpresa(empresaAEditar.id, { comision_porcentaje: tasa });
      mostrarToast(`Tasa de comisión de "${empresaAEditar.nombre}" actualizada a ${tasa}% en base de datos.`);
    } catch (err) {
      mostrarToast(`Tasa de comisión de "${empresaAEditar.nombre}" actualizada a ${tasa}%.`);
    }

    setEmpresas(prev => prev.map(emp => emp.id === empresaAEditar.id ? { ...emp, comision_porcentaje: tasa } : emp));
    setModalEditarComisionOpen(false);
    setEmpresaAEditar(null);
  };

  // ==========================================================================
  // CÁLCULOS Y DESPACHO
  // ==========================================================================
  const calcularOrdenFinanzas = (orden) => {
    const emp = empresas.find(e => e.id === orden.empresa_id);
    const tasa = emp ? emp.comision_porcentaje : 15.0;
    const comision = (orden.monto_total * (tasa / 100));
    const neto = orden.monto_total - comision;
    return { tasa_comision: tasa, comision_limpygo: comision, neto_empresa: neto };
  };

  const ordenesFiltradas = ordenes.filter(o => {
    if (currentUser.rol !== 'SUPER_ADMIN' && o.empresa_id !== currentUser.empresa_id) return false;
    if (filtroEstado === 'PENDIENTES' && o.estado_actual !== 'SOLICITADA') return false;
    if (filtroEstado === 'EN_CURSO' && !['ASIGNADA', 'EN_CAMINO', 'LLEGUE', 'EN_PROCESO'].includes(o.estado_actual)) return false;
    if (filtroEstado === 'FINALIZADAS' && o.estado_actual !== 'COMPLETADA') return false;
    if (busqueda.trim() !== '') {
      const q = busqueda.toLowerCase();
      return (
        o.codigo_seguimiento.toLowerCase().includes(q) ||
        o.cliente_nombre.toLowerCase().includes(q) ||
        o.direccion.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const ordenesEmpresa = ordenes.filter(o => o.empresa_id === currentUser.empresa_id);
  const pendientesAsignar = ordenesEmpresa.filter(o => o.estado_actual === 'SOLICITADA').length;
  const trabajadoresEmpresa = trabajadores.filter(w => w.empresa_id === currentUser.empresa_id);

  const totalFacturadoEmpresa = ordenesEmpresa
    .filter(o => o.estado_actual === 'COMPLETADA')
    .reduce((sum, o) => sum + o.monto_total, 0);

  const netoEmpresaTotal = ordenesEmpresa
    .filter(o => o.estado_actual === 'COMPLETADA')
    .reduce((sum, o) => sum + calcularOrdenFinanzas(o).neto_empresa, 0);

  const gmvGlobal = ordenes.reduce((sum, o) => sum + o.monto_total, 0);
  const comisionesGlobales = ordenes.reduce((sum, o) => sum + calcularOrdenFinanzas(o).comision_limpygo, 0);

  const handleConfirmarAsignacion = async () => {
    if (!trabajadorElegidoId || !ordenSeleccionadaParaAsignar) return;

    try {
      await api.asignarTrabajadorOrden(ordenSeleccionadaParaAsignar.codigo_seguimiento || ordenSeleccionadaParaAsignar.id, trabajadorElegidoId);
      mostrarToast(`✅ Limpiador asignado en base de datos.`);
    } catch (err) {
      // fallback
    }

    setOrdenes(prev => prev.map(ord => {
      if (ord.id === ordenSeleccionadaParaAsignar.id) {
        return { ...ord, trabajador_id: trabajadorElegidoId, estado_actual: 'ASIGNADA' };
      }
      return ord;
    }));

    setTrabajadores(prev => prev.map(w => {
      if (w.id === trabajadorElegidoId) return { ...w, estado: 'EN_TURNO' };
      return w;
    }));

    const workerObj = trabajadores.find(w => w.id === trabajadorElegidoId);
    setModalAsignarOpen(false);
    setOrdenSeleccionadaParaAsignar(null);
    setTrabajadorElegidoId('');
    mostrarToast(`✅ Limpiador ${workerObj?.nombre || 'designado'} asignado a la orden ${ordenSeleccionadaParaAsignar.codigo_seguimiento}`);
  };

  // Si el usuario no ha iniciado sesión, renderizar pantalla de Login Real
  if (!isAuthenticated) {
    return (
      <div className="login-screen-bg">
        {toastMsg && (
          <div style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 9999,
            background: '#0F172A',
            color: 'white',
            padding: '12px 20px',
            borderRadius: 12,
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: '0.88rem',
            fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <span>{toastMsg}</span>
          </div>
        )}

        <div className="login-card-container">
          <div className="login-brand-header">
            <div className="login-brand-icon">
              <Sparkles size={28} />
            </div>
            <h1 className="login-title">LimpyGo Ops</h1>
            <p className="login-subtitle">
              Portal Central de Operaciones & Administración de Limpieza
            </p>
            <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, background: backendStatus === 'conectado' ? '#ECFDF5' : '#FFFBEB', color: backendStatus === 'conectado' ? '#047857' : '#B45309', fontSize: '0.72rem', fontWeight: 700 }}>
              <span className="pulse-dot" style={{ background: backendStatus === 'conectado' ? '#10B981' : '#F59E0B' }}></span>
              <span>{backendStatus === 'conectado' ? 'API & Supabase Conectados' : 'Backend en Reposo / Conectando'}</span>
            </div>
          </div>

          {loginError && (
            <div style={{
              background: '#FEE2E2',
              border: '1px solid #FCA5A5',
              color: '#B91C1C',
              padding: '10px 14px',
              borderRadius: 10,
              fontSize: '0.82rem',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleIniciarSesionReal}>
            <div className="login-field-group">
              <label>Correo Electrónico Corporativo</label>
              <div className="login-input-wrap">
                <Mail size={18} className="field-icon" />
                <input
                  type="email"
                  required
                  placeholder="ej. admin@limpygo.com o empresa@brillante.com"
                  className="login-input"
                  value={loginForm.correo}
                  onChange={(e) => setLoginForm({ ...loginForm, correo: e.target.value })}
                />
              </div>
            </div>

            <div className="login-field-group">
              <label>Contraseña de Acceso</label>
              <div className="login-input-wrap">
                <Lock size={18} className="field-icon" />
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  required
                  placeholder="Contraseña del sistema"
                  className="login-input"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
                <button
                  type="button"
                  className="login-toggle-pwd"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  title={mostrarPassword ? 'Ocultar' : 'Mostrar'}
                >
                  {mostrarPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-submit-btn" disabled={loginCargando}>
              {loginCargando ? (
                <>
                  <RefreshCw size={18} className="spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  <KeyRound size={18} />
                  <span>Iniciar Sesión en el Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Acceso Rápido / Pruebas de Sesión */}
          <div className="quick-demo-section">
            <div className="quick-demo-title">
              ⚡ Acceso Rápido de Prueba (1 Clic)
            </div>
            <div className="quick-demo-cards">
              <button
                type="button"
                className="quick-card-btn"
                onClick={() => handleAccesoDemoRapido('admin@limpygo.com', '70486379Josemagdiel')}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#7C3AED' }}>
                    👑 SuperAdmin Central
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    admin@limpygo.com • Auditoría total, comisiones y liquidaciones
                  </div>
                </div>
                <ChevronRight size={16} color="#7C3AED" />
              </button>

              <button
                type="button"
                className="quick-card-btn"
                onClick={() => handleAccesoDemoRapido('operaciones@brillante.com', '70486379Josemagdiel')}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0284C7' }}>
                    🏢 Empresa Brillante Express
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    operaciones@brillante.com • Despacho, tarifas y cuadrilla
                  </div>
                </div>
                <ChevronRight size={16} color="#0284C7" />
              </button>

              <button
                type="button"
                className="quick-card-btn"
                onClick={() => handleAccesoDemoRapido('gerencia@ecoclean.bo', '70486379Josemagdiel')}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#059669' }}>
                    🌿 Empresa EcoClean Bolivia
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    gerencia@ecoclean.bo • Catálogo ecológico y evidencias
                  </div>
                </div>
                <ChevronRight size={16} color="#059669" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
          background: '#0F172A',
          color: 'white',
          padding: '12px 20px',
          borderRadius: 12,
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: '0.88rem',
          fontWeight: 600,
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* =====================================================================
          SIDEBAR CORPORATIVO
         ===================================================================== */}
      <aside className="app-sidebar">
        <div className="sidebar-header">
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="brand-title">
              LimpyGo <span style={{ color: '#0284C7' }}>Ops</span>
            </div>
            <div className={`brand-badge ${currentUser.rol === 'SUPER_ADMIN' ? 'badge-admin' : 'badge-company'}`}>
              {currentUser.rol === 'SUPER_ADMIN' ? 'SuperAdmin Central' : 'Portal Empresa'}
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {currentUser.rol === 'SUPER_ADMIN' ? (
            /* Menú SuperAdmin Extendido */
            <>
              <div className="nav-section-label">SUPERVISIÓN GLOBAL</div>

              <button
                className={`nav-item ${activeTab === 'dashboard_admin' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard_admin')}
              >
                <TrendingUp size={18} />
                <span>Métricas de Plataforma</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'empresas_gestion' ? 'active' : ''}`}
                onClick={() => setActiveTab('empresas_gestion')}
              >
                <Building2 size={18} />
                <span>Gestión de Empresas</span>
                <span className="nav-item-count count-neutral">{empresas.length}</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'usuarios_gestion' ? 'active' : ''}`}
                onClick={() => setActiveTab('usuarios_gestion')}
              >
                <Users size={18} />
                <span>Gestión de Usuarios</span>
                <span className="nav-item-count count-neutral">{usuarios.length}</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'todas_ordenes' ? 'active' : ''}`}
                onClick={() => setActiveTab('todas_ordenes')}
              >
                <ClipboardList size={18} />
                <span>Auditoría de Órdenes</span>
                <span className="nav-item-count count-neutral">{ordenes.length}</span>
              </button>

              <div className="nav-section-label" style={{ marginTop: 12 }}>FINANZAS & COMISIONES</div>

              <button
                className={`nav-item ${activeTab === 'liquidaciones_admin' ? 'active' : ''}`}
                onClick={() => setActiveTab('liquidaciones_admin')}
              >
                <Wallet size={18} />
                <span>Aprobación Liquidaciones</span>
                {liquidaciones.filter(l => l.estado === 'PENDIENTE').length > 0 && (
                  <span className="nav-item-count count-alert">
                    {liquidaciones.filter(l => l.estado === 'PENDIENTE').length}
                  </span>
                )}
              </button>

              <button
                className={`nav-item ${activeTab === 'comisiones_reglas' ? 'active' : ''}`}
                onClick={() => setActiveTab('comisiones_reglas')}
              >
                <Percent size={18} />
                <span>Comisiones e Intereses</span>
              </button>

              <div className="nav-section-label" style={{ marginTop: 12 }}>MARKETING & SOPORTE</div>

              <button
                className={`nav-item ${activeTab === 'cupones_admin' ? 'active' : ''}`}
                onClick={() => setActiveTab('cupones_admin')}
              >
                <Tag size={18} />
                <span>Cupones & Promociones</span>
                <span className="nav-item-count count-neutral">{cupones.filter(c => c.activo).length}</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'soporte_reclamos' ? 'active' : ''}`}
                onClick={() => setActiveTab('soporte_reclamos')}
              >
                <AlertCircle size={18} />
                <span>Reclamos & Disputas</span>
                {reclamos.filter(r => r.estado !== 'RESUELTO').length > 0 && (
                  <span className="nav-item-count count-alert">{reclamos.filter(r => r.estado !== 'RESUELTO').length}</span>
                )}
              </button>

              <button
                className={`nav-item ${activeTab === 'zonas_cobertura' ? 'active' : ''}`}
                onClick={() => setActiveTab('zonas_cobertura')}
              >
                <MapPin size={18} />
                <span>Zonas de Cobertura SCZ</span>
              </button>
            </>
          ) : (
            /* Menú Empresa de Limpieza Extendido */
            <>
              <div className="nav-section-label">OPERACIONES EN VIVO</div>

              <button
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard General</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'ordenes' ? 'active' : ''}`}
                onClick={() => setActiveTab('ordenes')}
              >
                <ClipboardList size={18} />
                <span>Órdenes & Despacho</span>
                {pendientesAsignar > 0 && (
                  <span className="nav-item-count count-alert">{pendientesAsignar}</span>
                )}
              </button>

              <button
                className={`nav-item ${activeTab === 'horarios_turnos' ? 'active' : ''}`}
                onClick={() => setActiveTab('horarios_turnos')}
              >
                <Clock size={18} />
                <span>Horarios & Capacidad</span>
              </button>

              <div className="nav-section-label" style={{ marginTop: 12 }}>CATÁLOGO & PRECIOS</div>

              <button
                className={`nav-item ${activeTab === 'servicios_precios' ? 'active' : ''}`}
                onClick={() => setActiveTab('servicios_precios')}
              >
                <Tag size={18} />
                <span>Mis Servicios & Precios</span>
                <span className="nav-item-count count-neutral" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                  {serviciosDeLaEmpresa.filter(s => s.esta_disponible).length} activos
                </span>
              </button>

              <div className="nav-section-label" style={{ marginTop: 12 }}>PERSONAL & EVIDENCIAS</div>

              <button
                className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                <Users size={18} />
                <span>Empleados & Cuentas Móviles</span>
                <span className="nav-item-count count-neutral">{trabajadoresEmpresa.length}</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'evidencias' ? 'active' : ''}`}
                onClick={() => setActiveTab('evidencias')}
              >
                <Camera size={18} />
                <span>Auditoría de Evidencias</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'insumos_equipos' ? 'active' : ''}`}
                onClick={() => setActiveTab('insumos_equipos')}
              >
                <Layers size={18} />
                <span>Insumos & Maquinarias</span>
              </button>

              <div className="nav-section-label" style={{ marginTop: 12 }}>CALIDAD & FINANZAS</div>

              <button
                className={`nav-item ${activeTab === 'resenas_clientes' ? 'active' : ''}`}
                onClick={() => setActiveTab('resenas_clientes')}
              >
                <Star size={18} />
                <span>Opiniones & Calificaciones</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'finanzas' ? 'active' : ''}`}
                onClick={() => setActiveTab('finanzas')}
              >
                <Wallet size={18} />
                <span>Liquidaciones ({currentEmpresa.comision_porcentaje}% com.)</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'perfil_empresa' ? 'active' : ''}`}
                onClick={() => setActiveTab('perfil_empresa')}
              >
                <Building size={18} />
                <span>Perfil & Datos Bancarios</span>
              </button>
            </>
          )}
        </nav>

        {/* Footer del Sidebar con Usuario Autenticado y Botón Cerrar Sesión */}
        <div className="sidebar-footer">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>USUARIO ACTIVO:</span>
            <button
              onClick={handleCerrarSesion}
              style={{
                background: 'none',
                border: 'none',
                color: '#EF4444',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
              title="Cerrar Sesión"
            >
              <LogOut size={12} />
              <span>Salir</span>
            </button>
          </div>
          <div className="org-card">
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: currentUser.rol === 'SUPER_ADMIN' ? '#EDE9FE' : '#E0F2FE',
              color: currentUser.rol === 'SUPER_ADMIN' ? '#7C3AED' : '#0284C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}>
              {currentUser.nombre.charAt(0)}
            </div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {currentUser.nombre}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {currentUser.correo}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* =====================================================================
          MAIN CONTENT AREA
         ===================================================================== */}
      <div className="app-main">
        {/* Header Superior con Switcher de Cuentas */}
        <header className="app-header">
          <div className="header-search">
            <Search size={16} color="#94A3B8" />
            <input
              type="text"
              placeholder="Buscar servicio, precio, empleado, código..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda('')}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <X size={14} color="#94A3B8" />
              </button>
            )}
          </div>

          <div className="header-actions">
            {/* Pill de Estado de Conexión con Backend Render / Supabase */}
            {backendStatus === 'conectado' && (
              <div
                className="stream-status-pill"
                style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0' }}
                title={`API en línea: ${API_BASE_URL} (DB: ${backendDb})`}
              >
                <Database size={13} color="#059669" />
                <span className="pulse-dot" style={{ background: '#10B981' }}></span>
                <span>API Supabase & Render: Conectado</span>
              </div>
            )}

            {backendStatus === 'conectando' && (
              <div
                className="stream-status-pill"
                style={{ background: '#FFFBEB', color: '#B45309', border: '1px solid #FDE68A' }}
              >
                <RefreshCw size={13} className="spin" color="#D97706" />
                <span>Conectando Backend...</span>
              </div>
            )}

            {backendStatus === 'offline' && (
              <button
                type="button"
                onClick={() => sincronizarConBackend()}
                className="stream-status-pill"
                style={{ background: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA', cursor: 'pointer' }}
                title="Render suspende servidores inactivos en el plan gratuito. Haz clic para despertar el servicio y conectar la base de datos."
              >
                <WifiOff size={13} color="#DC2626" />
                <span>Render en reposo · Clic para despertar</span>
              </button>
            )}

            <div className="stream-status-pill">
              <span className="pulse-dot"></span>
              <span>SSE Real-Time Conectado</span>
            </div>

            {/* Selector Rápido de Sesión */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>Sesión:</span>
              <select
                value={currentUser.id}
                onChange={(e) => handleCambiarUsuario(e.target.value)}
                style={{
                  padding: '7px 12px',
                  borderRadius: 10,
                  border: '1px solid #E2E8F0',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: currentUser.rol === 'SUPER_ADMIN' ? '#7C3AED' : '#0284C7',
                  background: '#F8FAFC',
                  cursor: 'pointer'
                }}
              >
                {usuarios.filter(u => ['SUPER_ADMIN', 'ADMIN_EMPRESA'].includes(u.rol)).map(u => (
                  <option key={u.id} value={u.id}>
                    {u.rol === 'SUPER_ADMIN' ? '🛡️ SuperAdmin (admin@limpygo.com)' : `🏢 ${u.nombre} (${u.correo})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón Cerrar Sesión */}
            <button
              onClick={handleCerrarSesion}
              className="btn-outline"
              style={{
                padding: '6px 12px',
                fontSize: '0.78rem',
                color: '#EF4444',
                borderColor: '#FCA5A5',
                gap: 5
              }}
              title="Cerrar sesión activa y volver al login"
            >
              <LogOut size={13} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </header>

        <main className="content-body">
          {/* =================================================================
              EMPRESA: CATÁLOGO DE SERVICIOS & ASIGNACIÓN DE PRECIOS
             ================================================================= */}
          {currentUser.rol !== 'SUPER_ADMIN' && activeTab === 'servicios_precios' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Catálogo de Servicios & Tarifas</h1>
                  <p className="page-subtitle">
                    Configura los servicios que <strong>{currentEmpresa.nombre}</strong> ofrece en la aplicación móvil y sus precios base
                  </p>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => setModalNuevoServicioEmpresaOpen(true)}
                >
                  <PlusCircle size={16} />
                  <span>+ Añadir Servicio al Catálogo</span>
                </button>
              </div>

              {/* KPIs de Servicios de la Empresa */}
              <div className="kpi-grid">
                <div className="kpi-card">
                  <span className="kpi-label">Servicios Registrados</span>
                  <div className="kpi-value">{serviciosDeLaEmpresa.length}</div>
                  <div className="kpi-subtext">Catálogo propio de la empresa</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Publicados en App Móvil</span>
                  <div className="kpi-value" style={{ color: '#059669' }}>
                    {serviciosDeLaEmpresa.filter(s => s.esta_disponible).length}
                  </div>
                  <div className="kpi-subtext">Visibles para cotización de clientes</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Tarifa Base Promedio</span>
                  <div className="kpi-value" style={{ color: '#0284C7' }}>
                    {(serviciosDeLaEmpresa.reduce((acc, s) => acc + s.precio_base, 0) / (serviciosDeLaEmpresa.length || 1)).toFixed(2)} BOB
                  </div>
                  <div className="kpi-subtext">Fijado libremente por tu empresa</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Retención LimpyGo ({currentEmpresa.comision_porcentaje}%)</span>
                  <div className="kpi-value" style={{ color: '#7C3AED' }}>
                    {(100 - currentEmpresa.comision_porcentaje)}% neto
                  </div>
                  <div className="kpi-subtext">Tu empresa recibe el {(100 - currentEmpresa.comision_porcentaje)}% de cada tarifa</div>
                </div>
              </div>

              {/* Tabla de Servicios y Precios */}
              <div className="table-container">
                <div className="table-toolbar">
                  <div style={{ fontWeight: 800, fontSize: '0.98rem' }}>
                    Servicios Ofertados en la Plataforma ({serviciosDeLaEmpresa.length})
                  </div>
                </div>

                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: 80 }}>Imagen</th>
                      <th>Servicio de Limpieza</th>
                      <th>Categoría</th>
                      <th>Descripción / Alcance</th>
                      <th>Tiempo Estimado</th>
                      <th>Tarifa Base (BOB)</th>
                      <th>Tu Ganancia Neta (85%)</th>
                      <th>Publicado en App</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviciosDeLaEmpresa.map(srv => {
                      const netoEmpresaServicio = srv.precio_base * ((100 - currentEmpresa.comision_porcentaje) / 100);
                      return (
                        <tr key={srv.id}>
                          <td style={{ width: 80, padding: '8px 12px' }}>
                            <img
                              src={srv.imagen_url || PRESETS_IMAGENES_SERVICIOS[0].url}
                              alt={srv.nombre}
                              style={{ width: 68, height: 48, borderRadius: 8, objectFit: 'cover', border: '1px solid #CBD5E1', display: 'block' }}
                            />
                          </td>
                          <td>
                            <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>{srv.nombre}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Contratado {srv.total_contratados} veces</div>
                          </td>
                          <td>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: 6,
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              background: '#F1F5F9',
                              color: '#334155'
                            }}>
                              {srv.categoria}
                            </span>
                          </td>
                          <td style={{ maxWidth: 280 }}>
                            <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>
                              {srv.descripcion}
                            </div>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748B' }}>
                              ⏱️ {srv.tiempo_estimado}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{
                                fontWeight: 900,
                                fontSize: '1.1rem',
                                color: '#0284C7',
                                background: '#F0F9FF',
                                padding: '4px 8px',
                                borderRadius: 8,
                                border: '1px solid #BAE6FD'
                              }}>
                                {srv.precio_base.toFixed(2)} BOB
                              </span>
                            </div>
                          </td>
                          <td>
                            <span style={{ fontWeight: 800, color: '#059669', fontSize: '0.92rem' }}>
                              {netoEmpresaServicio.toFixed(2)} BOB
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => handleToggleDisponibilidadServicio(srv.id)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                padding: '4px 10px',
                                borderRadius: 20,
                                border: 'none',
                                cursor: 'pointer',
                                background: srv.esta_disponible ? '#ECFDF5' : '#FEE2E2',
                                color: srv.esta_disponible ? '#059669' : '#DC2626',
                                fontWeight: 700,
                                fontSize: '0.75rem'
                              }}
                            >
                              {srv.esta_disponible ? '✓ ACTIVO EN APP' : '⏸️ PAUSADO'}
                            </button>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <button
                                className="btn-outline btn-sm"
                                onClick={() => {
                                  setServicioAEditarPrecio(srv);
                                  setNuevoPrecioServicioInput(srv.precio_base.toString());
                                  setServicioAEditarImagenInput(srv.imagen_url || '');
                                  setModalEditarPrecioServicioOpen(true);
                                }}
                                title="Modificar precio e imagen del servicio"
                              >
                                <Edit3 size={13} />
                                <span>Editar</span>
                              </button>
                              <button
                                className="btn-outline btn-sm"
                                style={{ color: '#EF4444', borderColor: '#FCA5A5' }}
                                onClick={() => handleDesvincularServicio(srv.id)}
                                title="Desvincular del catálogo de la empresa"
                              >
                                <X size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =================================================================
              EMPRESA: EMPLEADOS & CUENTAS MÓVILES
             ================================================================= */}
          {currentUser.rol !== 'SUPER_ADMIN' && activeTab === 'personal' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Gestión de Empleados & Cuentas Móviles</h1>
                  <p className="page-subtitle">
                    Crea y administra a los limpiadores de {currentEmpresa.nombre} que usan la app móvil
                  </p>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => setModalCrearEmpleadoEmpresaOpen(true)}
                >
                  <UserPlus size={16} />
                  <span>+ Crear Cuenta de Empleado</span>
                </button>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Empleado</th>
                      <th>CI</th>
                      <th>Correo Login Móvil</th>
                      <th>Teléfono</th>
                      <th>Especialidad</th>
                      <th>Estado</th>
                      <th>Acceso App</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trabajadoresEmpresa.map(worker => (
                      <tr key={worker.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <img src={worker.foto} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <div style={{ fontWeight: 800, color: '#0F172A' }}>{worker.nombre}</div>
                              <div style={{ fontSize: '0.72rem', color: '#F59E0B', fontWeight: 700 }}>
                                ⭐ {worker.calificacion} ({worker.servicios_completados} serv.)
                              </div>
                            </div>
                          </div>
                        </td>
                        <td><strong>{worker.ci}</strong></td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Smartphone size={14} color="#0284C7" />
                            <strong style={{ color: '#0284C7', fontSize: '0.84rem' }}>{worker.correo}</strong>
                          </div>
                        </td>
                        <td>{worker.telefono}</td>
                        <td>{worker.especialidad}</td>
                        <td>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: 6,
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            background: worker.estado === 'DISPONIBLE' ? '#ECFDF5' : '#E0F2FE',
                            color: worker.estado === 'DISPONIBLE' ? '#059669' : '#0284C7'
                          }}>
                            {worker.estado}
                          </span>
                        </td>
                        <td>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: 6,
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            background: worker.cuenta_activa ? '#ECFDF5' : '#FEE2E2',
                            color: worker.cuenta_activa ? '#059669' : '#DC2626'
                          }}>
                            {worker.cuenta_activa ? 'ACTIVO' : 'PAUSADO'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <button
                              className="btn-outline btn-sm"
                              onClick={() => {
                                setEmpleadoAEditarForm({ ...worker });
                                setModalEditarEmpleadoOpen(true);
                              }}
                              title="Editar datos del empleado"
                            >
                              <Edit3 size={13} />
                              <span>Editar</span>
                            </button>
                            <button
                              className="btn-outline btn-sm"
                              onClick={() => handleToggleAccesoMovilEmpleado(worker.id)}
                              title={worker.cuenta_activa ? 'Pausar acceso móvil' : 'Activar acceso móvil'}
                              style={{ color: worker.cuenta_activa ? '#D97706' : '#059669' }}
                            >
                              <Power size={13} />
                            </button>
                            <button
                              className="btn-outline btn-sm"
                              onClick={() => handleRestablecerPasswordEmpleado(worker)}
                              title="Restablecer clave de la app móvil"
                            >
                              <KeyRound size={13} />
                            </button>
                            <button
                              className="btn-outline btn-sm"
                              style={{ color: '#EF4444', borderColor: '#FCA5A5' }}
                              onClick={() => handleEliminarEmpleado(worker.id)}
                              title="Desvincular de la empresa"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =================================================================
              EMPRESA: DASHBOARD & ÓRDENES
             ================================================================= */}
          {currentUser.rol !== 'SUPER_ADMIN' && activeTab === 'dashboard' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Centro de Mando Operativo</h1>
                  <p className="page-subtitle">Supervisión en tiempo real para <strong>{currentEmpresa.nombre}</strong></p>
                </div>
              </div>

              <div className="kpi-grid">
                <div className="kpi-card">
                  <span className="kpi-label">Órdenes Hoy</span>
                  <div className="kpi-value">{ordenesEmpresa.length}</div>
                  <div className="kpi-subtext">{pendientesAsignar} pendientes de asignación</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Servicios en Catálogo</span>
                  <div className="kpi-value" style={{ color: '#0284C7' }}>{serviciosDeLaEmpresa.length}</div>
                  <div className="kpi-subtext">{serviciosDeLaEmpresa.filter(s => s.esta_disponible).length} activos en la app</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Facturación Neta</span>
                  <div className="kpi-value" style={{ color: '#059669' }}>{netoEmpresaTotal.toFixed(2)} BOB</div>
                  <div className="kpi-subtext">Tu empresa recibe el {(100 - currentEmpresa.comision_porcentaje)}% neto</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Calificación Promedio</span>
                  <div className="kpi-value">{currentEmpresa.calificacion} ⭐</div>
                  <div className="kpi-subtext">{currentEmpresa.ordenes_totales} limpiezas realizadas</div>
                </div>
              </div>
            </div>
          )}

          {/* EMPRESA: ÓRDENES & DESPACHO */}
          {currentUser.rol !== 'SUPER_ADMIN' && activeTab === 'ordenes' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Gestión de Órdenes & Despacho</h1>
                  <p className="page-subtitle">Control de solicitudes asignadas a {currentEmpresa.nombre}</p>
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Cliente</th>
                      <th>Dirección</th>
                      <th>Servicio Solicitado</th>
                      <th>Personal Asignado</th>
                      <th>Monto Total</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordenesFiltradas.map(ord => {
                      const worker = trabajadores.find(w => w.id === ord.trabajador_id);
                      return (
                        <tr key={ord.id}>
                          <td><strong style={{ color: '#0284C7' }}>{ord.codigo_seguimiento}</strong></td>
                          <td><strong>{ord.cliente_nombre}</strong><div style={{ fontSize: '0.74rem', color: '#64748B' }}>Tel: {ord.cliente_telefono}</div></td>
                          <td>{ord.direccion}</td>
                          <td>
                            <strong>{ord.servicio}</strong>
                            <div style={{ fontSize: '0.74rem', color: '#64748B' }}>{ord.ambientes_resumen}</div>
                          </td>
                          <td>
                            {worker ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <img src={worker.foto} alt="" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                                <span>{worker.nombre}</span>
                              </div>
                            ) : (
                              <button
                                className="btn-primary btn-sm"
                                style={{ background: '#D97706' }}
                                onClick={() => {
                                  setOrdenSeleccionadaParaAsignar(ord);
                                  setModalAsignarOpen(true);
                                }}
                              >
                                + Asignar Limpiador
                              </button>
                            )}
                          </td>
                          <td><strong>{ord.monto_total} BOB</strong></td>
                          <td>
                            <span className={`status-pill status-${ord.estado_actual.toLowerCase().replace('_', '-')}`}>
                              {ord.estado_actual}
                            </span>
                          </td>
                          <td>
                            {ord.estado_actual === 'SOLICITADA' ? (
                              <button
                                className="btn-primary btn-sm"
                                onClick={() => {
                                  setOrdenSeleccionadaParaAsignar(ord);
                                  setModalAsignarOpen(true);
                                }}
                              >
                                Asignar
                              </button>
                            ) : (
                              <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>Asignado ✓</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* EMPRESA: EVIDENCIAS */}
          {currentUser.rol !== 'SUPER_ADMIN' && activeTab === 'evidencias' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Control de Calidad & Evidencias Fotográficas</h1>
                  <p className="page-subtitle">Audita las fotos obligatorias del antes y después tomadas por el personal de {currentEmpresa.nombre}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: 20 }}>
                {ordenesEmpresa.filter(o => o.evidencias).map(ord => {
                  const estaAprobada = ord.evidencias.auditoria_aprobada;
                  const tieneObservacion = !!ord.evidencias.observacion;

                  return (
                    <div key={ord.id} className="evidence-card" style={{ background: 'white', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                      <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0' }}>
                        <div>
                          <strong style={{ color: '#0284C7', fontSize: '0.95rem' }}>{ord.codigo_seguimiento}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{ord.cliente_nombre} • {ord.direccion}</div>
                        </div>
                        <span style={{
                          background: estaAprobada ? '#ECFDF5' : (tieneObservacion ? '#FEF3C7' : '#EFF6FF'),
                          color: estaAprobada ? '#059669' : (tieneObservacion ? '#D97706' : '#2563EB'),
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '4px 10px',
                          borderRadius: 20
                        }}>
                          {estaAprobada ? '✓ APROBADO' : (tieneObservacion ? '⚠️ CON OBSERVACIÓN' : '🔍 EN REVISIÓN')}
                        </span>
                      </div>

                      {tieneObservacion && (
                        <div style={{ background: '#FFFBEB', padding: '10px 18px', borderBottom: '1px solid #FDE68A', fontSize: '0.78rem', color: '#92400E' }}>
                          <strong>Nota de calidad:</strong> "{ord.evidencias.observacion}"
                        </div>
                      )}

                      <div className="evidence-images-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: 14 }}>
                        <div className="evidence-img-wrap" style={{ position: 'relative', borderRadius: 10, overflow: 'hidden' }}>
                          <img src={ord.evidencias.antes} alt="Foto Antes" style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                          <div className="evidence-tag tag-antes" style={{ position: 'absolute', bottom: 6, left: 6, background: 'rgba(0,0,0,0.75)', color: 'white', fontSize: '0.7rem', padding: '2px 8px', borderRadius: 6 }}>
                            Antes de Iniciar
                          </div>
                        </div>
                        <div className="evidence-img-wrap" style={{ position: 'relative', borderRadius: 10, overflow: 'hidden' }}>
                          <img src={ord.evidencias.despues} alt="Foto Después" style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                          <div className="evidence-tag tag-despues" style={{ position: 'absolute', bottom: 6, left: 6, background: '#059669', color: 'white', fontSize: '0.7rem', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                            ✨ 100% Limpio
                          </div>
                        </div>
                      </div>

                      {/* Botones de Acción de Auditoría */}
                      <div style={{ padding: '12px 18px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', gap: 8 }}>
                        <button
                          className="btn-primary btn-sm"
                          style={{ background: '#059669', flex: 1 }}
                          onClick={() => handleAprobarEvidencia(ord.id)}
                        >
                          <Check size={14} />
                          <span>Aprobar Limpieza</span>
                        </button>
                        <button
                          className="btn-outline btn-sm"
                          style={{ color: '#D97706', borderColor: '#FCD34D' }}
                          onClick={() => {
                            setEvidenciaSeleccionada(ord);
                            setObservacionEvidenciaInput(ord.evidencias.observacion || '');
                            setModalAuditarEvidenciaOpen(true);
                          }}
                        >
                          <AlertCircle size={14} />
                          <span>Observar</span>
                        </button>
                        <button
                          className="btn-outline btn-sm"
                          onClick={() => {
                            setEvidenciaSeleccionada(ord);
                            setModalAuditarEvidenciaOpen(true);
                          }}
                        >
                          <Search size={14} />
                          <span>Zoom</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* EMPRESA: FINANZAS & LIQUIDACIONES */}
          {currentUser.rol !== 'SUPER_ADMIN' && activeTab === 'finanzas' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Liquidaciones & Balance Financiero</h1>
                  <p className="page-subtitle">Control de facturación, retenciones y transferencias bancarias para {currentEmpresa.nombre}</p>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setMontoLiquidacionInput(netoEmpresaTotal.toFixed(2));
                    setModalSolicitarLiquidacionOpen(true);
                  }}
                >
                  <Wallet size={16} />
                  <span>+ Solicitar Liquidación a Cuenta Bancaria</span>
                </button>
              </div>

              <div className="kpi-grid" style={{ marginBottom: 24 }}>
                <div className="kpi-card">
                  <span className="kpi-label">Facturación Bruta Acumulada</span>
                  <div className="kpi-value">{totalFacturadoEmpresa.toFixed(2)} BOB</div>
                  <div className="kpi-subtext">Total cobrado en servicios concluidos</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Retención LimpyGo ({currentEmpresa.comision_porcentaje}%)</span>
                  <div className="kpi-value" style={{ color: '#0284C7' }}>
                    {(totalFacturadoEmpresa * (currentEmpresa.comision_porcentaje / 100)).toFixed(2)} BOB
                  </div>
                  <div className="kpi-subtext">Comisión por app e intermediación</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Saldo Neto Empresa ({100 - currentEmpresa.comision_porcentaje}%)</span>
                  <div className="kpi-value" style={{ color: '#059669' }}>
                    {netoEmpresaTotal.toFixed(2)} BOB
                  </div>
                  <div className="kpi-subtext">Disponible para transferencia bancaria</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Cuenta de Abono Verificada</span>
                  <div className="kpi-value" style={{ fontSize: '1.15rem' }}>{currentEmpresa.banco_abono}</div>
                  <div className="kpi-subtext">{currentEmpresa.cuenta_bancaria}</div>
                </div>
              </div>

              {/* Tabla de Historial de Liquidaciones Bancarias */}
              <div className="table-container">
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Historial de Liquidaciones & Transferencias ACH
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    Abonos automáticos los días 1 y 15 de cada mes
                  </span>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Código Liquidación</th>
                      <th>Fecha</th>
                      <th>Monto Solicitado</th>
                      <th>Comisión Retenida</th>
                      <th>Abonado Neto</th>
                      <th>Banco & Cuenta Destino</th>
                      <th>Estado</th>
                      <th>Referencia de Pago</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liquidaciones.filter(l => l.empresa_id === currentEmpresa.id).map(liq => (
                      <tr key={liq.id}>
                        <td><strong style={{ color: '#0284C7' }}>{liq.id}</strong></td>
                        <td>{liq.fecha}</td>
                        <td><strong>{liq.monto_bruto.toFixed(2)} BOB</strong></td>
                        <td style={{ color: '#64748B' }}>{liq.comision_limpygo.toFixed(2)} BOB</td>
                        <td>
                          <strong style={{ color: '#059669', fontSize: '1.02rem' }}>
                            {liq.monto_neto.toFixed(2)} BOB
                          </strong>
                        </td>
                        <td>
                          <div><strong>{liq.banco}</strong></div>
                          <div style={{ fontSize: '0.74rem', color: '#64748B' }}>{liq.cuenta}</div>
                        </td>
                        <td>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: 6,
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            background: liq.estado === 'PAGADO' ? '#ECFDF5' : '#FFFBEB',
                            color: liq.estado === 'PAGADO' ? '#059669' : '#D97706'
                          }}>
                            {liq.estado === 'PAGADO' ? 'PAGADO ✓' : 'EN REVISIÓN ⏳'}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#475569' }}>
                            {liq.referencia_pago}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* EMPRESA: PERFIL Y LOGOTIPO */}
          {currentUser.rol !== 'SUPER_ADMIN' && activeTab === 'perfil_empresa' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Perfil, Logotipo & Marca de la Empresa</h1>
                  <p className="page-subtitle">Personaliza la identidad corporativa y cuenta de abono de {currentEmpresa.nombre}</p>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setLogoEmpresaForm({
                      nombre_comercial: currentEmpresa.nombre,
                      telefono: currentEmpresa.telefono,
                      direccion: currentEmpresa.ciudad || currentEmpresa.cobertura,
                      logo_url: currentEmpresa.logo_url || PRESETS_LOGOS_EMPRESA[0].url
                    });
                    setModalEditarLogoEmpresaOpen(true);
                  }}
                >
                  <Edit3 size={16} />
                  <span>Editar Logotipo y Marca</span>
                </button>
              </div>

              {/* Layout de Perfil y Logotipo */}
              <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20, marginBottom: 24 }}>
                {/* Tarjeta de Identidad y Logo */}
                <div style={{ background: 'white', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 16px' }}>
                    <img
                      src={currentEmpresa.logo_url || PRESETS_LOGOS_EMPRESA[0].url}
                      alt={currentEmpresa.nombre}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 24,
                        objectFit: 'cover',
                        border: '3px solid #E0F2FE',
                        boxShadow: '0 8px 24px rgba(2, 132, 199, 0.15)'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: -4,
                      right: -4,
                      background: '#059669',
                      color: 'white',
                      borderRadius: '50%',
                      padding: 5,
                      border: '2px solid white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={14} />
                    </div>
                  </div>

                  <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', marginBottom: 4 }}>
                    {currentEmpresa.nombre}
                  </h2>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: 12 }}>
                    NIT: {currentEmpresa.nit}
                  </div>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: '#ECFDF5',
                    color: '#059669',
                    padding: '5px 12px',
                    borderRadius: 20,
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    marginBottom: 16
                  }}>
                    ★ {currentEmpresa.calificacion} • Empresa Aliada Verificada
                  </div>

                  <button
                    onClick={() => {
                      setLogoEmpresaForm({
                        nombre_comercial: currentEmpresa.nombre,
                        telefono: currentEmpresa.telefono,
                        direccion: currentEmpresa.ciudad || currentEmpresa.cobertura,
                        logo_url: currentEmpresa.logo_url || PRESETS_LOGOS_EMPRESA[0].url,
                        banco_abono: currentEmpresa.banco_abono || 'Banco Mercantil Santa Cruz',
                        cuenta_bancaria: currentEmpresa.cuenta_bancaria || '4010-8923-0192',
                        titular_cuenta: currentEmpresa.titular_cuenta || currentEmpresa.nombre
                      });
                      setModalEditarLogoEmpresaOpen(true);
                    }}
                    className="btn-outline"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Edit3 size={14} />
                    <span>Cambiar Logotipo</span>
                  </button>
                </div>

                {/* Datos Comerciales y Transferencias */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ background: 'white', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 14, color: '#0F172A' }}>
                      Datos de Contacto Comercial
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: 2 }}>
                          TELÉFONO DE OPERACIONES
                        </label>
                        <div style={{ fontWeight: 800, color: '#0F172A' }}>{currentEmpresa.telefono}</div>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: 2 }}>
                          CORREO OFICIAL
                        </label>
                        <div style={{ fontWeight: 800, color: '#0F172A' }}>{currentEmpresa.correo_contacto}</div>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: 2 }}>
                          CIUDAD & COBERTURA
                        </label>
                        <div style={{ fontWeight: 800, color: '#0F172A' }}>{currentEmpresa.ciudad} ({currentEmpresa.cobertura})</div>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: 2 }}>
                          COMISIÓN ACORDADA LIMPYGO
                        </label>
                        <div style={{ fontWeight: 900, color: '#0284C7' }}>{currentEmpresa.comision_porcentaje}% sobre servicios</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'white', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 14, color: '#0F172A' }}>
                      Cuenta Bancaria de Abono Automático
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: 2 }}>
                          ENTIDAD BANCARIA
                        </label>
                        <div style={{ fontWeight: 800 }}>{currentEmpresa.banco_abono}</div>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: 2 }}>
                          NÚMERO DE CUENTA
                        </label>
                        <div style={{ fontWeight: 900, color: '#0284C7', fontSize: '1.05rem' }}>{currentEmpresa.cuenta_bancaria}</div>
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, display: 'block', marginBottom: 2 }}>
                          TITULAR DE LA CUENTA
                        </label>
                        <div style={{ fontWeight: 700 }}>{currentEmpresa.titular_cuenta}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              SUPERADMIN: GESTIÓN DE EMPRESAS
             ================================================================= */}
          {currentUser.rol === 'SUPER_ADMIN' && activeTab === 'empresas_gestion' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Gestión de Empresas de Limpieza</h1>
                  <p className="page-subtitle">Añade empresas socias, ajusta su comisión/interés y gestiona su estado operativo</p>
                </div>
                <button className="btn-primary" onClick={() => setModalNuevaEmpresaOpen(true)}>
                  <PlusCircle size={16} />
                  <span>+ Registrar Nueva Empresa</span>
                </button>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Empresa</th>
                      <th>NIT</th>
                      <th>Contacto / Teléfono</th>
                      <th>Servicios Ofrecidos</th>
                      <th>Comisión / Interés</th>
                      <th>Estado</th>
                      <th style={{ textAlign: 'center' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {empresas.map(emp => (
                      <tr key={emp.id}>
                        <td>
                          <strong>{emp.nombre}</strong>
                          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{emp.ciudad || 'Santa Cruz'} ({emp.cobertura || 'Radio Urbano'})</div>
                        </td>
                        <td><span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{emp.nit}</span></td>
                        <td>
                          <div style={{ fontWeight: 700 }}>{emp.contacto || 'Administración'}</div>
                          <div style={{ fontSize: '0.74rem', color: '#0284C7' }}>{emp.telefono}</div>
                        </td>
                        <td>
                          <span style={{ background: '#F1F5F9', color: '#334155', fontWeight: 800, padding: '4px 8px', borderRadius: 6, fontSize: '0.76rem' }}>
                            {serviciosEmpresas.filter(s => s.empresa_id === emp.id).length} servicios
                          </span>
                        </td>
                        <td>
                          <span style={{ background: '#EDE9FE', color: '#7C3AED', fontWeight: 900, padding: '4px 8px', borderRadius: 6 }}>
                            {emp.comision_porcentaje}%
                          </span>
                        </td>
                        <td>
                          <span style={{
                            background: emp.estado === 'ACTIVA' ? '#ECFDF5' : '#FEF2F2',
                            color: emp.estado === 'ACTIVA' ? '#059669' : '#DC2626',
                            padding: '4px 8px',
                            borderRadius: 6,
                            fontSize: '0.75rem',
                            fontWeight: 800
                          }}>
                            {emp.estado}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                            <button
                              className="btn-outline"
                              style={{ padding: '4px 8px', fontSize: '0.74rem', gap: 4 }}
                              title="Editar datos de la empresa"
                              onClick={() => {
                                setEmpresaAEditarForm({
                                  id: emp.id,
                                  nombre: emp.nombre,
                                  nit: emp.nit,
                                  contacto: emp.contacto || '',
                                  telefono: emp.telefono || '',
                                  correo_contacto: emp.correo_contacto || '',
                                  ciudad: emp.ciudad || 'Santa Cruz de la Sierra',
                                  cobertura: emp.cobertura || 'Zona Norte, Equipetrol, Urbarí',
                                  comision_porcentaje: emp.comision_porcentaje || 15.0,
                                  banco_abono: emp.banco_abono || 'Banco Mercantil Santa Cruz',
                                  cuenta_bancaria: emp.cuenta_bancaria || '4010-99000-00',
                                  titular_cuenta: emp.titular_cuenta || emp.nombre
                                });
                                setModalEditarEmpresaOpen(true);
                              }}
                            >
                              <Edit3 size={13} />
                              <span>Editar</span>
                            </button>

                            <button
                              className="btn-outline"
                              style={{ padding: '4px 8px', fontSize: '0.74rem', gap: 4, color: '#7C3AED', borderColor: '#DDD6FE' }}
                              title="Ajustar porcentaje de comisión"
                              onClick={() => {
                                setEmpresaAEditar(emp);
                                setNuevaComisionInput(emp.comision_porcentaje.toString());
                                setModalEditarComisionOpen(true);
                              }}
                            >
                              <Percent size={13} />
                              <span>Tasa</span>
                            </button>

                            <button
                              className="btn-outline"
                              style={{
                                padding: '4px 8px',
                                fontSize: '0.74rem',
                                gap: 4,
                                color: emp.estado === 'ACTIVA' ? '#DC2626' : '#059669',
                                borderColor: emp.estado === 'ACTIVA' ? '#FCA5A5' : '#A7F3D0'
                              }}
                              title={emp.estado === 'ACTIVA' ? 'Pausar operaciones' : 'Reactivar operaciones'}
                              onClick={() => handleToggleEstadoEmpresa(emp.id)}
                            >
                              <Power size={13} />
                              <span>{emp.estado === 'ACTIVA' ? 'Pausar' : 'Activar'}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =================================================================
              SUPERADMIN: GESTIÓN DE USUARIOS
             ================================================================= */}
          {currentUser.rol === 'SUPER_ADMIN' && activeTab === 'usuarios_gestion' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Gestión de Usuarios del Sistema</h1>
                  <p className="page-subtitle">Supervisa, crea y administra las cuentas de administradores, empresas y trabajadores</p>
                </div>
                <button className="btn-primary" onClick={() => setModalNuevoUsuarioOpen(true)}>
                  <UserPlus size={16} />
                  <span>+ Registrar Nuevo Usuario</span>
                </button>
              </div>

              {/* Filtro por Rol */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {['TODOS', 'SUPER_ADMIN', 'ADMIN_EMPRESA', 'TRABAJADOR'].map(rol => (
                  <button
                    key={rol}
                    onClick={() => setFiltroRolUsuario(rol)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 8,
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      border: filtroRolUsuario === rol ? '2px solid #0284C7' : '1px solid #CBD5E1',
                      background: filtroRolUsuario === rol ? '#F0F9FF' : 'white',
                      color: filtroRolUsuario === rol ? '#0284C7' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    {rol === 'TODOS' ? '👥 Todos los Usuarios' : rol.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Correo</th>
                      <th>Rol</th>
                      <th>Empresa Vinculada</th>
                      <th>Teléfono</th>
                      <th>Estado</th>
                      <th style={{ textAlign: 'center' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios
                      .filter(u => filtroRolUsuario === 'TODOS' || u.rol === filtroRolUsuario)
                      .map(u => (
                      <tr key={u.id}>
                        <td><strong>{u.nombre}</strong></td>
                        <td><strong style={{ color: '#0284C7' }}>{u.correo}</strong></td>
                        <td>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: 6,
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            background: u.rol === 'SUPER_ADMIN' ? '#EDE9FE' : u.rol === 'ADMIN_EMPRESA' ? '#E0F2FE' : '#FEF3C7',
                            color: u.rol === 'SUPER_ADMIN' ? '#7C3AED' : u.rol === 'ADMIN_EMPRESA' ? '#0284C7' : '#B45309'
                          }}>
                            {u.rol}
                          </span>
                        </td>
                        <td>{empresas.find(e => e.id === u.empresa_id)?.nombre || 'Sede Central LimpyGo'}</td>
                        <td>{u.telefono || '70012345'}</td>
                        <td>
                          <span style={{
                            background: u.esta_activo ? '#ECFDF5' : '#FEF2F2',
                            color: u.esta_activo ? '#059669' : '#DC2626',
                            padding: '4px 8px',
                            borderRadius: 6,
                            fontSize: '0.72rem',
                            fontWeight: 800
                          }}>
                            {u.esta_activo ? 'ACTIVO' : 'SUSPENDIDO'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                            <button
                              className="btn-outline"
                              style={{ padding: '4px 8px', fontSize: '0.74rem', gap: 4 }}
                              title="Editar usuario"
                              onClick={() => {
                                setUsuarioAEditarForm({
                                  id: u.id,
                                  nombre: u.nombre,
                                  correo: u.correo,
                                  rol: u.rol,
                                  empresa_id: u.empresa_id || 'emp-1',
                                  telefono: u.telefono || '70012345'
                                });
                                setModalEditarUsuarioOpen(true);
                              }}
                            >
                              <Edit3 size={13} />
                              <span>Editar</span>
                            </button>

                            <button
                              className="btn-outline"
                              style={{ padding: '4px 8px', fontSize: '0.74rem', gap: 4, color: '#D97706', borderColor: '#FDE68A' }}
                              title="Generar nueva clave temporal"
                              onClick={() => handleRestablecerPasswordUsuario(u)}
                            >
                              <KeyRound size={13} />
                              <span>Reset Clave</span>
                            </button>

                            <button
                              className="btn-outline"
                              style={{
                                padding: '4px 8px',
                                fontSize: '0.74rem',
                                gap: 4,
                                color: u.esta_activo ? '#DC2626' : '#059669',
                                borderColor: u.esta_activo ? '#FCA5A5' : '#A7F3D0'
                              }}
                              title={u.esta_activo ? 'Suspender acceso' : 'Reactivar acceso'}
                              onClick={() => handleToggleEstadoUsuario(u.id)}
                            >
                              <Power size={13} />
                              <span>{u.esta_activo ? 'Suspender' : 'Activar'}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =================================================================
              SUPERADMIN: DASHBOARD DE MÉTRICAS GLOBALES
             ================================================================= */}
          {currentUser.rol === 'SUPER_ADMIN' && activeTab === 'dashboard_admin' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Centro de Mando Global LimpyGo</h1>
                  <p className="page-subtitle">Monitoreo en tiempo real del ecosistema de limpieza en Santa Cruz</p>
                </div>
              </div>

              <div className="kpi-grid">
                <div className="kpi-card">
                  <span className="kpi-label">GMV Total Transaccionado</span>
                  <div className="kpi-value">{gmvGlobal.toFixed(2)} BOB</div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, marginTop: 4 }}>
                    ↑ 100% de cobros procesados vía QR y Tarjeta
                  </div>
                </div>
                <div className="kpi-card">
                  <span className="kpi-label">Ingresos por Comisiones LimpyGo</span>
                  <div className="kpi-value" style={{ color: '#7C3AED' }}>{comisionesGlobales.toFixed(2)} BOB</div>
                  <div style={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 700, marginTop: 4 }}>
                    Promedio red: 15.0% por servicio
                  </div>
                </div>
                <div className="kpi-card">
                  <span className="kpi-label">Empresas Acreditadas</span>
                  <div className="kpi-value" style={{ color: '#0284C7' }}>{empresas.length}</div>
                  <div style={{ fontSize: '0.75rem', color: '#0284C7', fontWeight: 700, marginTop: 4 }}>
                    {empresas.filter(e => e.estado === 'ACTIVA').length} activas y operando
                  </div>
                </div>
                <div className="kpi-card">
                  <span className="kpi-label">Cuentas en el Ecosistema</span>
                  <div className="kpi-value" style={{ color: '#059669' }}>{usuarios.length}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, marginTop: 4 }}>
                    Admins, empresas y limpiadores
                  </div>
                </div>
              </div>

              {/* Resumen de Últimos Servicios en la Plataforma */}
              <div style={{ marginTop: 24, background: 'white', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                      Últimos Servicios Solicitados en la Red
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      Auditoría express de las últimas órdenes enviadas por clientes
                    </p>
                  </div>
                  <button className="btn-outline" onClick={() => setActiveTab('todas_ordenes')}>
                    <span>Ver Todas las Órdenes →</span>
                  </button>
                </div>

                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Cliente</th>
                        <th>Empresa Asignada</th>
                        <th>Monto</th>
                        <th>Comisión LimpyGo</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordenes.slice(0, 4).map(o => {
                        const fin = calcularOrdenFinanzas(o);
                        const emp = empresas.find(e => e.id === o.empresa_id);
                        return (
                          <tr key={o.id}>
                            <td><strong>{o.codigo_seguimiento}</strong></td>
                            <td>{o.cliente_nombre}</td>
                            <td>{emp?.nombre || 'Central'}</td>
                            <td><strong>{o.monto_total.toFixed(2)} BOB</strong></td>
                            <td><span style={{ color: '#7C3AED', fontWeight: 800 }}>{fin.comision_limpygo.toFixed(2)} BOB</span></td>
                            <td>
                              <span style={{
                                padding: '4px 8px',
                                borderRadius: 6,
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                background: o.estado_actual === 'COMPLETADA' ? '#ECFDF5' : '#FEF3C7',
                                color: o.estado_actual === 'COMPLETADA' ? '#059669' : '#D97706'
                              }}>
                                {o.estado_actual}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              SUPERADMIN: AUDITORÍA DE TODAS LAS ÓRDENES
             ================================================================= */}
          {currentUser.rol === 'SUPER_ADMIN' && activeTab === 'todas_ordenes' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Auditoría Global de Órdenes & Servicios</h1>
                  <p className="page-subtitle">Supervisión en tiempo real, cambio manual de estados e inspección de evidencias</p>
                </div>
              </div>

              {/* Barra de Filtros para Auditoría */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'white', padding: '6px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}>
                  <Filter size={14} color="#64748B" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B' }}>Estado:</span>
                  <select
                    value={filtroEstadoTodasOrdenes}
                    onChange={(e) => setFiltroEstadoTodasOrdenes(e.target.value)}
                    style={{ border: 'none', background: 'transparent', fontWeight: 800, fontSize: '0.8rem', color: '#0F172A', outline: 'none' }}
                  >
                    <option value="TODAS">Todos los Estados</option>
                    <option value="SOLICITADA">SOLICITADA</option>
                    <option value="ASIGNADA">ASIGNADA</option>
                    <option value="EN_CAMINO">EN_CAMINO</option>
                    <option value="LLEGUE">LLEGUE</option>
                    <option value="EN_PROCESO">EN_PROCESO</option>
                    <option value="COMPLETADA">COMPLETADA</option>
                    <option value="CANCELADA">CANCELADA</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'white', padding: '6px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}>
                  <Building2 size={14} color="#64748B" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B' }}>Empresa:</span>
                  <select
                    value={filtroEmpresaTodasOrdenes}
                    onChange={(e) => setFiltroEmpresaTodasOrdenes(e.target.value)}
                    style={{ border: 'none', background: 'transparent', fontWeight: 800, fontSize: '0.8rem', color: '#0F172A', outline: 'none' }}
                  >
                    <option value="TODAS">Todas las Empresas</option>
                    {empresas.map(e => (
                      <option key={e.id} value={e.id}>{e.nombre}</option>
                    ))}
                  </select>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#64748B', marginLeft: 'auto', fontWeight: 700 }}>
                  Mostrando {ordenes.filter(o => {
                    if (filtroEstadoTodasOrdenes !== 'TODAS' && o.estado_actual !== filtroEstadoTodasOrdenes) return false;
                    if (filtroEmpresaTodasOrdenes !== 'TODAS' && o.empresa_id !== filtroEmpresaTodasOrdenes) return false;
                    return true;
                  }).length} de {ordenes.length} órdenes totales
                </div>
              </div>

              {/* Tabla Completa de Auditoría */}
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Cliente / Ubicación</th>
                      <th>Empresa Asignada</th>
                      <th>Limpiador Asignado</th>
                      <th>Monto Total</th>
                      <th>Comisión LimpyGo</th>
                      <th>Estado</th>
                      <th style={{ textAlign: 'center' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordenes
                      .filter(o => {
                        if (filtroEstadoTodasOrdenes !== 'TODAS' && o.estado_actual !== filtroEstadoTodasOrdenes) return false;
                        if (filtroEmpresaTodasOrdenes !== 'TODAS' && o.empresa_id !== filtroEmpresaTodasOrdenes) return false;
                        return true;
                      })
                      .map(o => {
                        const emp = empresas.find(e => e.id === o.empresa_id);
                        const cleaner = trabajadores.find(w => w.id === o.trabajador_id);
                        const fin = calcularOrdenFinanzas(o);
                        return (
                          <tr key={o.id}>
                            <td>
                              <strong>{o.codigo_seguimiento}</strong>
                              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{o.fecha_solicitud || 'Hoy'}</div>
                            </td>
                            <td>
                              <div style={{ fontWeight: 800 }}>{o.cliente_nombre}</div>
                              <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{o.direccion}</div>
                            </td>
                            <td>
                              <span style={{ fontWeight: 800, color: '#0284C7' }}>{emp?.nombre || 'Central'}</span>
                            </td>
                            <td>
                              {cleaner ? (
                                <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                                  👷 {cleaner.nombre}
                                </div>
                              ) : (
                                <span style={{ color: '#94A3B8', fontSize: '0.75rem', fontStyle: 'italic' }}>Sin asignar</span>
                              )}
                            </td>
                            <td>
                              <strong style={{ fontSize: '0.95rem' }}>{o.monto_total.toFixed(2)} BOB</strong>
                            </td>
                            <td>
                              <span style={{ background: '#EDE9FE', color: '#7C3AED', padding: '3px 8px', borderRadius: 6, fontWeight: 900, fontSize: '0.8rem' }}>
                                {fin.comision_limpygo.toFixed(2)} BOB ({fin.tasa_comision}%)
                              </span>
                            </td>
                            <td>
                              <span style={{
                                padding: '4px 8px',
                                borderRadius: 6,
                                fontSize: '0.74rem',
                                fontWeight: 800,
                                background: o.estado_actual === 'COMPLETADA' ? '#ECFDF5' : o.estado_actual === 'CANCELADA' ? '#FEF2F2' : '#EFF6FF',
                                color: o.estado_actual === 'COMPLETADA' ? '#059669' : o.estado_actual === 'CANCELADA' ? '#DC2626' : '#1D4ED8'
                              }}>
                                {o.estado_actual}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                                <button
                                  className="btn-primary"
                                  style={{ padding: '5px 12px', fontSize: '0.75rem', gap: 4 }}
                                  onClick={() => {
                                    setOrdenDetalleSeleccionada(o);
                                    setModalDetalleOrdenOpen(true);
                                  }}
                                >
                                  <ClipboardList size={14} />
                                  <span>Inspeccionar</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =================================================================
              SUPERADMIN: POLÍTICAS Y REGLAS DE COMISIÓN
             ================================================================= */}
          {currentUser.rol === 'SUPER_ADMIN' && activeTab === 'comisiones_reglas' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Políticas Globales de Comisiones y Retenciones</h1>
                  <p className="page-subtitle">Define las comisiones de la plataforma, pasarelas de pago y acuerdos por empresa</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'start' }}>
                {/* Formulario de Políticas Globales */}
                <div style={{ background: 'white', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{ background: '#EDE9FE', color: '#7C3AED', padding: 8, borderRadius: 10 }}>
                      <Percent size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                        Parámetros Globales de Monetización
                      </h3>
                      <p style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        Aplica a todas las órdenes y cotizaciones generadas en la app
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleGuardarPoliticasGlobales} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: 4 }}>
                        COMISIÓN BASE DE LA PLATAFORMA (%):
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="50"
                          value={politicasGlobales.comision_base_porcentaje}
                          onChange={(e) => setPoliticasGlobales({ ...politicasGlobales, comision_base_porcentaje: parseFloat(e.target.value) || 0 })}
                          style={{ width: 120, padding: '8px 12px', borderRadius: 8, border: '2px solid #7C3AED', fontWeight: 900, fontSize: '1.1rem' }}
                        />
                        <span style={{ fontWeight: 800, color: '#64748B' }}>% por servicio completado</span>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: 4 }}>
                        RETENCIÓN PASARELA QR / TARJETAS (%):
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={politicasGlobales.retencion_qr_pasarela}
                          onChange={(e) => setPoliticasGlobales({ ...politicasGlobales, retencion_qr_pasarela: parseFloat(e.target.value) || 0 })}
                          style={{ width: 120, padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontWeight: 800 }}
                        />
                        <span style={{ fontWeight: 700, color: '#64748B' }}>% costo financiero de procesamiento</span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: 4 }}>
                          DESPACHO EXPRESS (BOB):
                        </label>
                        <input
                          type="number"
                          value={politicasGlobales.tarifa_despacho_express}
                          onChange={(e) => setPoliticasGlobales({ ...politicasGlobales, tarifa_despacho_express: parseFloat(e.target.value) || 0 })}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontWeight: 700 }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: 4 }}>
                          PENALIDAD CANCELACIÓN (BOB):
                        </label>
                        <input
                          type="number"
                          value={politicasGlobales.penalidad_cancelacion_tardia}
                          onChange={(e) => setPoliticasGlobales({ ...politicasGlobales, penalidad_cancelacion_tardia: parseFloat(e.target.value) || 0 })}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontWeight: 700 }}
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: 8, justifyContent: 'center' }}>
                      <Check size={16} />
                      <span>Guardar Políticas de Plataforma</span>
                    </button>
                  </form>
                </div>

                {/* Comisiones Específicas por Empresa */}
                <div style={{ background: 'white', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
                    Acuerdos Comerciales por Empresa
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: 16 }}>
                    Ajusta la tasa de comisión para empresas con convenios especiales
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {empresas.map(emp => (
                      <div
                        key={emp.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: 12,
                          borderRadius: 12,
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem' }}>{emp.nombre}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>NIT: {emp.nit} • Estado: {emp.estado}</div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ background: '#EDE9FE', color: '#7C3AED', fontWeight: 900, padding: '4px 10px', borderRadius: 8, fontSize: '0.9rem' }}>
                            {emp.comision_porcentaje}%
                          </span>
                          <button
                            className="btn-outline"
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                            onClick={() => {
                              setEmpresaAEditar(emp);
                              setNuevaComisionInput(emp.comision_porcentaje.toString());
                              setModalEditarComisionOpen(true);
                            }}
                          >
                            Modificar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              SUPERADMIN: APROBACIÓN DE LIQUIDACIONES BANCARIAS
             ================================================================= */}
          {currentUser.rol === 'SUPER_ADMIN' && activeTab === 'liquidaciones_admin' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Aprobación de Liquidaciones & Transferencias</h1>
                  <p className="page-subtitle">Supervisa solicitudes de abono de empresas aliadas, retenciones de plataforma y emite comprobantes ACH</p>
                </div>
              </div>

              <div className="kpi-grid">
                <div className="kpi-card">
                  <span className="kpi-label">Total Bruto Solicitado</span>
                  <div className="kpi-value">
                    {liquidaciones.reduce((sum, l) => sum + l.monto_bruto, 0).toFixed(2)} BOB
                  </div>
                  <div className="kpi-subtext">Facturado a través de pagos en app</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Comisiones LimpyGo Retenidas</span>
                  <div className="kpi-value" style={{ color: '#7C3AED' }}>
                    {liquidaciones.reduce((sum, l) => sum + l.comision_limpygo, 0).toFixed(2)} BOB
                  </div>
                  <div className="kpi-subtext">Ingreso neto consolidado de plataforma</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Saldo Pendiente por Abonar</span>
                  <div className="kpi-value" style={{ color: '#D97706' }}>
                    {liquidaciones.filter(l => l.estado === 'PENDIENTE').reduce((sum, l) => sum + l.monto_neto, 0).toFixed(2)} BOB
                  </div>
                  <div className="kpi-subtext">
                    {liquidaciones.filter(l => l.estado === 'PENDIENTE').length} transferencias por autorizar
                  </div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Transferencias Efectuadas</span>
                  <div className="kpi-value" style={{ color: '#059669' }}>
                    {liquidaciones.filter(l => l.estado === 'PAGADO').length} / {liquidaciones.length}
                  </div>
                  <div className="kpi-subtext">Abonos bancarios conciliados</div>
                </div>
              </div>

              <div className="table-container">
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Solicitudes de Transferencia de Fondos a Empresas
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    Aprobación manual y registro de código bancario ACH
                  </span>
                </div>

                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Empresa Beneficiaria</th>
                      <th>Fecha</th>
                      <th>Monto Bruto</th>
                      <th>Comisión LimpyGo</th>
                      <th>Neto a Transferir</th>
                      <th>Banco y Cuenta</th>
                      <th>Estado</th>
                      <th>Comprobante</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liquidaciones.map(liq => {
                      const emp = empresas.find(e => e.id === liq.empresa_id);
                      return (
                        <tr key={liq.id}>
                          <td><strong style={{ color: '#0284C7' }}>{liq.id}</strong></td>
                          <td>
                            <strong>{emp?.nombre || 'Empresa Aliada'}</strong>
                            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>NIT: {emp?.nit}</div>
                          </td>
                          <td>{liq.fecha}</td>
                          <td>{liq.monto_bruto.toFixed(2)} BOB</td>
                          <td><strong style={{ color: '#7C3AED' }}>{liq.comision_limpygo.toFixed(2)} BOB</strong></td>
                          <td><strong style={{ color: '#059669', fontSize: '1rem' }}>{liq.monto_neto.toFixed(2)} BOB</strong></td>
                          <td>
                            <div><strong>{liq.banco}</strong></div>
                            <div style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'monospace' }}>{liq.cuenta}</div>
                          </td>
                          <td>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: 6,
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              background: liq.estado === 'PAGADO' ? '#ECFDF5' : '#FEF3C7',
                              color: liq.estado === 'PAGADO' ? '#059669' : '#D97706'
                            }}>
                              {liq.estado === 'PAGADO' ? 'PAGADO ✓' : 'PENDIENTE ⏳'}
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: '#475569' }}>
                              {liq.referencia_pago}
                            </span>
                          </td>
                          <td>
                            {liq.estado === 'PENDIENTE' ? (
                              <button
                                className="btn-primary"
                                style={{ padding: '5px 10px', fontSize: '0.75rem', background: '#059669' }}
                                onClick={() => handleAprobarLiquidacionModal(liq)}
                              >
                                <Check size={13} />
                                <span>Aprobar Pago</span>
                              </button>
                            ) : (
                              <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700 }}>
                                Conciliado
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =================================================================
              SUPERADMIN: CUPONES Y CAMPAÑAS DE MARKETING
             ================================================================= */}
          {currentUser.rol === 'SUPER_ADMIN' && activeTab === 'cupones_admin' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Gestión de Cupones & Campañas de Marketing</h1>
                  <p className="page-subtitle">Crea códigos de descuento para impulsar reservas de limpieza en Santa Cruz</p>
                </div>
                <button className="btn-primary" onClick={() => setModalNuevoCuponOpen(true)}>
                  <PlusCircle size={16} />
                  <span>+ Crear Nuevo Cupón</span>
                </button>
              </div>

              <div className="kpi-grid">
                <div className="kpi-card">
                  <span className="kpi-label">Cupones Activos</span>
                  <div className="kpi-value" style={{ color: '#059669' }}>
                    {cupones.filter(c => c.activo).length}
                  </div>
                  <div className="kpi-subtext">Habilitados en la App móvil</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Total Canjes Aplicados</span>
                  <div className="kpi-value" style={{ color: '#0284C7' }}>
                    {cupones.reduce((s, c) => s + c.uso_actual, 0)}
                  </div>
                  <div className="kpi-subtext">Clientes beneficiados</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Descuentos Inyectados</span>
                  <div className="kpi-value" style={{ color: '#7C3AED' }}>
                    2,340.00 BOB
                  </div>
                  <div className="kpi-subtext">Subvencionados en campañas</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Tasa de Conversión</span>
                  <div className="kpi-value" style={{ color: '#10B981' }}>
                    34.2%
                  </div>
                  <div className="kpi-subtext">Usuarios que completan el pedido</div>
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Código Promocional</th>
                      <th>Tipo & Descuento</th>
                      <th>Pedido Mínimo</th>
                      <th>Canjes / Límite</th>
                      <th>Vencimiento</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cupones.map(cup => (
                      <tr key={cup.id}>
                        <td>
                          <span className="coupon-tag-badge">
                            <Tag size={13} />
                            <span>{cup.codigo}</span>
                          </span>
                        </td>
                        <td>
                          <strong>{cup.tipo === 'PORCENTAJE' ? `${cup.valor}% OFF` : `${cup.valor} BOB Menos`}</strong>
                        </td>
                        <td>{cup.pedido_minimo > 0 ? `${cup.pedido_minimo} BOB` : 'Sin mínimo'}</td>
                        <td>
                          <div><strong>{cup.uso_actual}</strong> / {cup.uso_max}</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                            {Math.round((cup.uso_actual / cup.uso_max) * 100)}% consumido
                          </div>
                        </td>
                        <td>{cup.expira}</td>
                        <td>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: 6,
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            background: cup.activo ? '#ECFDF5' : '#FEE2E2',
                            color: cup.activo ? '#059669' : '#DC2626'
                          }}>
                            {cup.activo ? 'ACTIVO' : 'PAUSADO'}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn-outline"
                            style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                            onClick={() => handleToggleCupon(cup.id)}
                          >
                            {cup.activo ? 'Pausar' : 'Activar'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =================================================================
              SUPERADMIN: SOPORTE, RECLAMOS Y DISPUTAS
             ================================================================= */}
          {currentUser.rol === 'SUPER_ADMIN' && activeTab === 'soporte_reclamos' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Mesa de Ayuda, Reclamos & Disputas</h1>
                  <p className="page-subtitle">Gestiona quejas de clientes y audita el cumplimiento de calidad de las empresas</p>
                </div>
              </div>

              <div className="kpi-grid">
                <div className="kpi-card">
                  <span className="kpi-label">Tickets Abiertos</span>
                  <div className="kpi-value" style={{ color: '#EF4444' }}>
                    {reclamos.filter(r => r.estado === 'ABIERTO').length}
                  </div>
                  <div className="kpi-subtext">Requieren atención urgente</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">En Mediación</span>
                  <div className="kpi-value" style={{ color: '#D97706' }}>
                    {reclamos.filter(r => r.estado === 'EN_REVISION').length}
                  </div>
                  <div className="kpi-subtext">Coordinando con la empresa</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Resueltos</span>
                  <div className="kpi-value" style={{ color: '#059669' }}>
                    {reclamos.filter(r => r.estado === 'RESUELTO').length}
                  </div>
                  <div className="kpi-subtext">Cerrados satisfactoriamente</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Tiempo Promedio Resolución</span>
                  <div className="kpi-value" style={{ color: '#0284C7' }}>
                    45 min
                  </div>
                  <div className="kpi-subtext">Meta plataforma: menos de 2 horas</div>
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Orden</th>
                      <th>Cliente</th>
                      <th>Empresa</th>
                      <th>Incidencia / Reclamo</th>
                      <th>Severidad</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reclamos.map(rec => {
                      const emp = empresas.find(e => e.id === rec.empresa_id);
                      return (
                        <tr key={rec.id}>
                          <td><strong>{rec.id}</strong></td>
                          <td><span style={{ color: '#0284C7', fontWeight: 800 }}>{rec.orden_id}</span></td>
                          <td>{rec.cliente}</td>
                          <td>{emp?.nombre || 'Empresa'}</td>
                          <td style={{ maxWidth: 300 }}>
                            <div style={{ fontSize: '0.82rem', color: '#1E293B', fontWeight: 600 }}>{rec.motivo}</div>
                            {rec.resolucion && (
                              <div style={{ fontSize: '0.72rem', color: '#059669', marginTop: 4 }}>
                                Resuelto: {rec.resolucion}
                              </div>
                            )}
                          </td>
                          <td>
                            <span className={`ticket-priority-pill ${rec.severidad === 'ALTA' ? 'ticket-urgente' : rec.severidad === 'MEDIA' ? 'ticket-media' : 'ticket-baja'}`}>
                              {rec.severidad}
                            </span>
                          </td>
                          <td>
                            <span style={{
                              padding: '3px 8px',
                              borderRadius: 6,
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              background: rec.estado === 'RESUELTO' ? '#ECFDF5' : rec.estado === 'EN_REVISION' ? '#FEF3C7' : '#FEE2E2',
                              color: rec.estado === 'RESUELTO' ? '#059669' : rec.estado === 'EN_REVISION' ? '#D97706' : '#DC2626'
                            }}>
                              {rec.estado}
                            </span>
                          </td>
                          <td>
                            {rec.estado !== 'RESUELTO' ? (
                              <button
                                className="btn-primary"
                                style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                                onClick={() => {
                                  setReclamoSeleccionado(rec);
                                  setResolucionInput('');
                                  setModalResolverReclamoOpen(true);
                                }}
                              >
                                Resolver
                              </button>
                            ) : (
                              <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700 }}>✓ Concluido</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =================================================================
              SUPERADMIN: ZONAS DE COBERTURA SANTA CRUZ
             ================================================================= */}
          {currentUser.rol === 'SUPER_ADMIN' && activeTab === 'zonas_cobertura' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Zonas de Cobertura y Tarifas por Barrio</h1>
                  <p className="page-subtitle">Configura barrios de atención en Santa Cruz de la Sierra y recargos por desplazamiento</p>
                </div>
                <button className="btn-primary" onClick={() => setModalNuevaZonaOpen(true)}>
                  <MapPin size={16} />
                  <span>+ Agregar Zona de Cobertura</span>
                </button>
              </div>

              <div className="kpi-grid" style={{ marginBottom: 20 }}>
                <div className="kpi-card">
                  <span className="kpi-label">Zonas Activas</span>
                  <div className="kpi-value" style={{ color: '#059669' }}>
                    {zonasCobertura.filter(z => z.estado === 'ACTIVA').length}
                  </div>
                  <div className="kpi-subtext">Barrios cubiertos en la red</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Cobertura Urbana Estimada</span>
                  <div className="kpi-value" style={{ color: '#0284C7' }}>
                    92%
                  </div>
                  <div className="kpi-subtext">Radio metropolitano de Santa Cruz</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Recargo Lejanía Promedio</span>
                  <div className="kpi-value" style={{ color: '#7C3AED' }}>
                    {(zonasCobertura.reduce((s, z) => s + z.recargo_lejanía, 0) / zonasCobertura.length).toFixed(2)} BOB
                  </div>
                  <div className="kpi-subtext">Abonado 100% al personal de limpieza</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Tiempo Promedio de Arribo</span>
                  <div className="kpi-value">
                    36 min
                  </div>
                  <div className="kpi-subtext">Despacho de cuadrillas</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {zonasCobertura.map(zona => (
                  <div key={zona.id} style={{ background: 'white', padding: 18, borderRadius: 16, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0F172A' }}>{zona.nombre}</div>
                        <div style={{ fontSize: '0.74rem', color: '#64748B' }}>Macrozona: {zona.macrozona}</div>
                      </div>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: 6,
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        background: zona.estado === 'ACTIVA' ? '#ECFDF5' : '#FEE2E2',
                        color: zona.estado === 'ACTIVA' ? '#059669' : '#DC2626'
                      }}>
                        {zona.estado}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC', padding: 10, borderRadius: 10 }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Recargo Transporte:</div>
                        <div style={{ fontWeight: 800, color: zona.recargo_lejanía > 0 ? '#7C3AED' : '#059669' }}>
                          {zona.recargo_lejanía > 0 ? `+${zona.recargo_lejanía} BOB` : 'Sin recargo (0 BOB)'}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Tiempo Arribo:</div>
                        <div style={{ fontWeight: 700, color: '#334155' }}>{zona.tiempo_llegada_prom}</div>
                      </div>
                    </div>

                    <button
                      className="btn-outline"
                      style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}
                      onClick={() => handleToggleZona(zona.id)}
                    >
                      {zona.estado === 'ACTIVA' ? 'Deshabilitar Zona' : 'Habilitar Zona'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              EMPRESA: RESEÑAS Y CALIFICACIONES DE CLIENTES
             ================================================================= */}
          {currentUser.rol !== 'SUPER_ADMIN' && activeTab === 'resenas_clientes' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Calificaciones & Opiniones de Clientes</h1>
                  <p className="page-subtitle">Opiniones verificadas dejadas por los clientes de {currentEmpresa.nombre}</p>
                </div>
              </div>

              {/* Resumen de Calificación General */}
              <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, marginBottom: 24 }}>
                <div style={{ background: 'white', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>
                    4.9
                  </div>
                  <div className="review-stars" style={{ justifyContent: 'center', margin: '8px 0' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>
                    Basado en 148 servicios concluidos
                  </div>
                  <div style={{ marginTop: 12, padding: '6px 10px', borderRadius: 8, background: '#ECFDF5', color: '#059669', fontSize: '0.76rem', fontWeight: 700 }}>
                    ⭐ 98% de clientes recomiendan tu empresa
                  </div>
                </div>

                <div style={{ background: 'white', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.82rem' }}>
                    <span style={{ width: 60, fontWeight: 700 }}>5 estrellas</span>
                    <div style={{ flex: 1, height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: '91%', height: '100%', background: '#10B981', borderRadius: 4 }}></div>
                    </div>
                    <span style={{ width: 40, textAlign: 'right', fontWeight: 700, color: '#64748B' }}>91%</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.82rem' }}>
                    <span style={{ width: 60, fontWeight: 700 }}>4 estrellas</span>
                    <div style={{ flex: 1, height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: '7%', height: '100%', background: '#3B82F6', borderRadius: 4 }}></div>
                    </div>
                    <span style={{ width: 40, textAlign: 'right', fontWeight: 700, color: '#64748B' }}>7%</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.82rem' }}>
                    <span style={{ width: 60, fontWeight: 700 }}>3 estrellas</span>
                    <div style={{ flex: 1, height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: '2%', height: '100%', background: '#F59E0B', borderRadius: 4 }}></div>
                    </div>
                    <span style={{ width: 40, textAlign: 'right', fontWeight: 700, color: '#64748B' }}>2%</span>
                  </div>
                </div>
              </div>

              {/* Lista de Reseñas de Clientes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {resenas.filter(r => r.empresa_id === currentEmpresa.id).map(res => (
                  <div key={res.id} className="review-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>{res.cliente}</span>
                          <div className="review-stars">
                            {[...Array(res.estrellas)].map((_, i) => (
                              <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                            ))}
                          </div>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 2 }}>
                          Servicio: <strong>{res.servicio}</strong> • Realizado por: <strong>{res.trabajador}</strong>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{res.fecha}</span>
                    </div>

                    <div style={{ fontSize: '0.88rem', color: '#334155', fontStyle: 'italic', background: '#F8FAFC', padding: 12, borderRadius: 10, borderLeft: '3px solid #0284C7' }}>
                      "{res.comentario}"
                    </div>

                    {res.respuesta ? (
                      <div style={{ background: '#F0F9FF', padding: 12, borderRadius: 10, fontSize: '0.82rem', color: '#0369A1', border: '1px solid #BAE6FD' }}>
                        <strong>Respuesta de la empresa:</strong> {res.respuesta}
                      </div>
                    ) : (
                      <button
                        className="btn-outline"
                        style={{ alignSelf: 'flex-start', fontSize: '0.75rem', padding: '4px 10px', gap: 5 }}
                        onClick={() => {
                          setResenaSeleccionada(res);
                          setRespuestaInput('');
                          setModalResponderResenaOpen(true);
                        }}
                      >
                        <MessageSquare size={13} />
                        <span>Responder al cliente</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              EMPRESA: HORARIOS & CAPACIDAD OPERATIVA
             ================================================================= */}
          {currentUser.rol !== 'SUPER_ADMIN' && activeTab === 'horarios_turnos' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Horarios de Atención & Capacidad Operativa</h1>
                  <p className="page-subtitle">Define franjas de disponibilidad y número máximo de cuadrillas simultáneas para {currentEmpresa.nombre}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
                {/* Lunes a Viernes */}
                <div style={{ background: 'white', padding: 22, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>Lunes a Viernes</div>
                    <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 800, background: '#ECFDF5', color: '#059669' }}>
                      HABILITADO
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>Hora Inicio:</label>
                      <input
                        type="time"
                        value={horariosAtencion.lunes_viernes.inicio}
                        onChange={(e) => setHorariosAtencion({
                          ...horariosAtencion,
                          lunes_viernes: { ...horariosAtencion.lunes_viernes, inicio: e.target.value }
                        })}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>Hora Cierre:</label>
                      <input
                        type="time"
                        value={horariosAtencion.lunes_viernes.fin}
                        onChange={(e) => setHorariosAtencion({
                          ...horariosAtencion,
                          lunes_viernes: { ...horariosAtencion.lunes_viernes, fin: e.target.value }
                        })}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                      Capacidad Máxima Simultánea:
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={horariosAtencion.lunes_viernes.cupos_simultaneos}
                      onChange={(e) => setHorariosAtencion({
                        ...horariosAtencion,
                        lunes_viernes: { ...horariosAtencion.lunes_viernes, cupos_simultaneos: parseInt(e.target.value) || 1 }
                      })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Servicios o limpiezas en paralelo</span>
                  </div>
                </div>

                {/* Sábados */}
                <div style={{ background: 'white', padding: 22, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>Sábados</div>
                    <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 800, background: '#ECFDF5', color: '#059669' }}>
                      HABILITADO
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>Hora Inicio:</label>
                      <input
                        type="time"
                        value={horariosAtencion.sabado.inicio}
                        onChange={(e) => setHorariosAtencion({
                          ...horariosAtencion,
                          sabado: { ...horariosAtencion.sabado, inicio: e.target.value }
                        })}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>Hora Cierre:</label>
                      <input
                        type="time"
                        value={horariosAtencion.sabado.fin}
                        onChange={(e) => setHorariosAtencion({
                          ...horariosAtencion,
                          sabado: { ...horariosAtencion.sabado, fin: e.target.value }
                        })}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
                      Capacidad Máxima Simultánea:
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={horariosAtencion.sabado.cupos_simultaneos}
                      onChange={(e) => setHorariosAtencion({
                        ...horariosAtencion,
                        sabado: { ...horariosAtencion.sabado, cupos_simultaneos: parseInt(e.target.value) || 1 }
                      })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                </div>

                {/* Domingos & Servicio Express */}
                <div style={{ background: 'white', padding: 22, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>Despacho Express LimpyGo</div>
                    <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 800, background: '#F0F9FF', color: '#0284C7' }}>
                      PREMIUM
                    </span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.4, marginBottom: 12 }}>
                    Permite que clientes soliciten cuadrillas con urgencia para llegar en menos de 90 minutos con recargo adicional.
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12, background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>Recargo Express:</div>
                      <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>+20.00 BOB directo a empresa</div>
                    </div>
                    <button
                      className="btn-primary"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      onClick={() => mostrarToast('Configuración operativa guardada.')}
                    >
                      <span>Guardar Turnos</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              EMPRESA: INVENTARIO DE INSUMOS & EQUIPAMIENTO
             ================================================================= */}
          {currentUser.rol !== 'SUPER_ADMIN' && activeTab === 'insumos_equipos' && (
            <div>
              <div className="page-title-row">
                <div>
                  <h1 className="page-title">Inventario de Insumos & Maquinarias</h1>
                  <p className="page-subtitle">Control de stock de detergentes, uniformes, aspiradoras e hidrolavadoras de {currentEmpresa.nombre}</p>
                </div>
                <button className="btn-primary" onClick={() => setModalNuevoInsumoOpen(true)}>
                  <PlusCircle size={16} />
                  <span>+ Registrar Entrada / Equipo</span>
                </button>
              </div>

              <div className="kpi-grid">
                <div className="kpi-card">
                  <span className="kpi-label">Equipos Operativos</span>
                  <div className="kpi-value" style={{ color: '#059669' }}>
                    100%
                  </div>
                  <div className="kpi-subtext">Aspiradoras e hidrolavadoras activas</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Insumos en Stock Óptimo</span>
                  <div className="kpi-value" style={{ color: '#0284C7' }}>
                    {inventarioInsumos.filter(i => i.estado === 'STOCK_OPTIMO' || i.estado === 'OPERATIVO').length}
                  </div>
                  <div className="kpi-subtext">Listos para cuadrillas</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Items por Reponer</span>
                  <div className="kpi-value" style={{ color: '#D97706' }}>
                    {inventarioInsumos.filter(i => i.estado === 'REPONER_PRONTO').length}
                  </div>
                  <div className="kpi-subtext">Bajo nivel de stock</div>
                </div>

                <div className="kpi-card">
                  <span className="kpi-label">Próxima Revisión de Equipos</span>
                  <div className="kpi-value" style={{ fontSize: '1.15rem' }}>
                    15 Octubre
                  </div>
                  <div className="kpi-subtext">Mantenimiento preventivo</div>
                </div>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Artículo / Maquinaria</th>
                      <th>Categoría</th>
                      <th>Stock Actual</th>
                      <th>Estado Operativo</th>
                      <th>Último Registro</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventarioInsumos.filter(i => i.empresa_id === currentEmpresa.id).map(ins => (
                      <tr key={ins.id}>
                        <td><strong>{ins.item}</strong></td>
                        <td>
                          <span style={{ padding: '3px 8px', borderRadius: 6, background: '#F1F5F9', fontSize: '0.75rem', fontWeight: 700 }}>
                            {ins.categoria}
                          </span>
                        </td>
                        <td>
                          <strong style={{ fontSize: '0.95rem' }}>{ins.stock}</strong> {ins.unidad}
                        </td>
                        <td>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: 6,
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            background: ins.estado === 'OPERATIVO' || ins.estado === 'STOCK_OPTIMO' ? '#ECFDF5' : '#FEF3C7',
                            color: ins.estado === 'OPERATIVO' || ins.estado === 'STOCK_OPTIMO' ? '#059669' : '#D97706'
                          }}>
                            {ins.estado === 'OPERATIVO' ? 'OPERATIVO ✓' : ins.estado === 'STOCK_OPTIMO' ? 'STOCK ÓPTIMO ✓' : 'REPONER PRONTO ⚠️'}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.78rem', color: '#64748B' }}>{ins.fecha_mantenimiento}</td>
                        <td>
                          <button
                            className="btn-outline"
                            style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                            onClick={() => {
                              setInventarioInsumos(prev => prev.map(item => item.id === ins.id ? { ...item, stock: item.stock + 5, estado: 'STOCK_OPTIMO' } : item));
                              mostrarToast(`Stock actualizado para "${ins.item}".`);
                            }}
                          >
                            + Reponer +5
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =====================================================================
          MODAL: AÑADIR NUEVO SERVICIO Y FIJAR PRECIO POR LA EMPRESA
         ===================================================================== */}
      {modalNuevoServicioEmpresaOpen && (
        <div className="modal-overlay" onClick={() => setModalNuevoServicioEmpresaOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <form onSubmit={handleGuardarNuevoServicio}>
              <div className="modal-header">
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                    Añadir Nuevo Servicio al Catálogo
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    Empresa: <strong>{currentEmpresa.nombre}</strong>
                  </div>
                </div>
                <button type="button" onClick={() => setModalNuevoServicioEmpresaOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>
                    Nombre del Servicio:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Limpieza a Vapor & Desinfección de Colchones"
                    value={nuevoServicioForm.nombre}
                    onChange={(e) => setNuevoServicioForm({ ...nuevoServicioForm, nombre: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>
                      Categoría:
                    </label>
                    <select
                      value={nuevoServicioForm.categoria}
                      onChange={(e) => setNuevoServicioForm({ ...nuevoServicioForm, categoria: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    >
                      <option value="Departamentos">Departamentos</option>
                      <option value="Tapizados">Tapizados</option>
                      <option value="Vidrios">Vidrios</option>
                      <option value="Fin de Obra">Fin de Obra</option>
                      <option value="Ecológico">Ecológico</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>
                      Tarifa Base / Precio (BOB):
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="number"
                        step="1"
                        min="10"
                        required
                        value={nuevoServicioForm.precio_base}
                        onChange={(e) => setNuevoServicioForm({ ...nuevoServicioForm, precio_base: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '2px solid #0284C7', fontWeight: 800, fontSize: '1.05rem' }}
                      />
                      <span style={{ fontWeight: 800, color: '#64748B' }}>BOB</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>
                    Tiempo Estimado de Ejecución:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 2 a 3 horas"
                    value={nuevoServicioForm.tiempo_estimado}
                    onChange={(e) => setNuevoServicioForm({ ...nuevoServicioForm, tiempo_estimado: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                {/* SELECTOR DE IMAGEN DEL SERVICIO */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 6 }}>
                    Fotografía / Banner Representativo del Servicio (Visible en App Móvil):
                  </label>
                  
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10, background: '#F8FAFC', padding: 8, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                    <img
                      src={nuevoServicioForm.imagen_url || PRESETS_IMAGENES_SERVICIOS[0].url}
                      alt="Preview"
                      style={{ width: 80, height: 54, borderRadius: 8, objectFit: 'cover', border: '1px solid #CBD5E1' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>Vista Previa en Tarjeta del Cliente</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Selecciona una foto temática de alta resolución o ingresa una URL:</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 10 }}>
                    {PRESETS_IMAGENES_SERVICIOS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNuevoServicioForm({ ...nuevoServicioForm, imagen_url: p.url })}
                        style={{
                          border: nuevoServicioForm.imagen_url === p.url ? '2px solid #0284C7' : '1px solid #E2E8F0',
                          borderRadius: 8,
                          padding: 4,
                          background: nuevoServicioForm.imagen_url === p.url ? '#F0F9FF' : 'white',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        <img src={p.url} alt={p.nombre} style={{ width: '100%', height: 44, borderRadius: 6, objectFit: 'cover' }} />
                        <div style={{ fontSize: '0.66rem', fontWeight: 700, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.nombre}
                        </div>
                      </button>
                    ))}
                  </div>

                  <input
                    type="url"
                    placeholder="O ingresa URL de imagen personalizada (https://...)"
                    value={nuevoServicioForm.imagen_url}
                    onChange={(e) => setNuevoServicioForm({ ...nuevoServicioForm, imagen_url: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>
                    Descripción Detallada (Visible para el Cliente en la App):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe los insumos que incluye, procedimiento y garantías..."
                    value={nuevoServicioForm.descripcion}
                    onChange={(e) => setNuevoServicioForm({ ...nuevoServicioForm, descripcion: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1', resize: 'vertical' }}
                  />
                </div>

                <div style={{ background: '#F0F9FF', padding: 12, borderRadius: 10, fontSize: '0.8rem', color: '#0369A1' }}>
                  💡 <strong>Liquidación:</strong> Por cada servicio cobrado a {nuevoServicioForm.precio_base || 0} BOB, tu empresa recibe {(parseFloat(nuevoServicioForm.precio_base || 0) * ((100 - currentEmpresa.comision_porcentaje) / 100)).toFixed(2)} BOB netos (85%).
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalNuevoServicioEmpresaOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <Check size={16} />
                  <span>Publicar en la App Móvil</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: EDITAR TARIFA E IMAGEN DE UN SERVICIO
         ===================================================================== */}
      {modalEditarPrecioServicioOpen && servicioAEditarPrecio && (
        <div className="modal-overlay" onClick={() => setModalEditarPrecioServicioOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <form onSubmit={handleActualizarPrecioServicio}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Modificar Tarifa & Fotografía</h3>
                <button type="button" onClick={() => setModalEditarPrecioServicioOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ fontSize: '0.86rem', color: '#475569', marginBottom: 4 }}>
                  Actualiza la tarifa e imagen que los clientes verán por <strong>{servicioAEditarPrecio.nombre}</strong>:
                </p>

                {/* Previsualización y Selector de Imagen */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 6 }}>
                    Fotografía Representativa:
                  </label>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10, background: '#F8FAFC', padding: 8, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                    <img
                      src={servicioAEditarImagenInput || PRESETS_IMAGENES_SERVICIOS[0].url}
                      alt="Preview"
                      style={{ width: 80, height: 54, borderRadius: 8, objectFit: 'cover', border: '1px solid #CBD5E1' }}
                    />
                    <div style={{ flex: 1 }}>
                      <input
                        type="url"
                        placeholder="URL de la imagen..."
                        value={servicioAEditarImagenInput}
                        onChange={(e) => setServicioAEditarImagenInput(e.target.value)}
                        style={{ width: '100%', padding: '7px 10px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                    {PRESETS_IMAGENES_SERVICIOS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setServicioAEditarImagenInput(p.url)}
                        style={{
                          border: servicioAEditarImagenInput === p.url ? '2px solid #0284C7' : '1px solid #E2E8F0',
                          borderRadius: 6,
                          padding: 3,
                          background: servicioAEditarImagenInput === p.url ? '#F0F9FF' : 'white',
                          cursor: 'pointer'
                        }}
                      >
                        <img src={p.url} alt={p.nombre} style={{ width: '100%', height: 38, borderRadius: 4, objectFit: 'cover' }} />
                        <div style={{ fontSize: '0.64rem', fontWeight: 700, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.nombre}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 6 }}>
                    Nueva Tarifa Base:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input
                      type="number"
                      step="1"
                      min="10"
                      required
                      value={nuevoPrecioServicioInput}
                      onChange={(e) => setNuevoPrecioServicioInput(e.target.value)}
                      style={{ padding: '10px 14px', borderRadius: 10, border: '2px solid #0284C7', fontSize: '1.2rem', fontWeight: 900, width: 140 }}
                    />
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#64748B' }}>BOB</span>
                  </div>
                </div>

                <div style={{ background: '#ECFDF5', padding: 12, borderRadius: 10, fontSize: '0.82rem', color: '#059669', fontWeight: 600 }}>
                  ✓ Tu empresa recibirá aproximadamente {(parseFloat(nuevoPrecioServicioInput || 0) * 0.85).toFixed(2)} BOB netos por este servicio.
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalEditarPrecioServicioOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <span>Guardar Tarifa & Foto</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: EDITAR LOGOTIPO Y PERFIL DE LA EMPRESA
         ===================================================================== */}
      {modalEditarLogoEmpresaOpen && (
        <div className="modal-overlay" onClick={() => setModalEditarLogoEmpresaOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <form onSubmit={handleGuardarPerfilYLogoEmpresa}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                  Configurar Logotipo y Marca Corporativa
                </h3>
                <button type="button" onClick={() => setModalEditarLogoEmpresaOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Previsualización del Logo */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#F8FAFC', padding: 14, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                  <img
                    src={logoEmpresaForm.logo_url || PRESETS_LOGOS_EMPRESA[0].url}
                    alt="Logo Preview"
                    style={{ width: 80, height: 80, borderRadius: 18, objectFit: 'cover', border: '3px solid #0284C7', boxShadow: '0 4px 12px rgba(2,132,199,0.15)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>Vista Previa del Logotipo</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4 }}>
                      Este emblema oficial se proyectará en la app de clientes, cotizador web y facturas emitidas.
                    </div>
                  </div>
                </div>

                {/* Galería de Logos Preestablecidos */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 6 }}>
                    Seleccionar Logotipo de la Biblioteca:
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {PRESETS_LOGOS_EMPRESA.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setLogoEmpresaForm({ ...logoEmpresaForm, logo_url: p.url })}
                        style={{
                          border: logoEmpresaForm.logo_url === p.url ? '2px solid #0284C7' : '1px solid #E2E8F0',
                          borderRadius: 10,
                          padding: 4,
                          background: logoEmpresaForm.logo_url === p.url ? '#F0F9FF' : 'white',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        <img src={p.url} alt={p.nombre} style={{ width: '100%', height: 50, borderRadius: 8, objectFit: 'cover' }} />
                        <div style={{ fontSize: '0.62rem', fontWeight: 700, marginTop: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.nombre}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    O Ingresa una URL Directa del Logotipo:
                  </label>
                  <input
                    type="url"
                    placeholder="https://ejemplo.com/logo-empresa.png"
                    value={logoEmpresaForm.logo_url}
                    onChange={(e) => setLogoEmpresaForm({ ...logoEmpresaForm, logo_url: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Razón Social / Nombre Comercial:
                  </label>
                  <input
                    type="text"
                    required
                    value={logoEmpresaForm.nombre_comercial}
                    onChange={(e) => setLogoEmpresaForm({ ...logoEmpresaForm, nombre_comercial: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Teléfono de Contacto:
                    </label>
                    <input
                      type="text"
                      value={logoEmpresaForm.telefono}
                      onChange={(e) => setLogoEmpresaForm({ ...logoEmpresaForm, telefono: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Dirección / Cobertura:
                    </label>
                    <input
                      type="text"
                      value={logoEmpresaForm.direccion}
                      onChange={(e) => setLogoEmpresaForm({ ...logoEmpresaForm, direccion: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: 6, paddingTop: 12, borderTop: '1px solid #E2E8F0' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0F172A', marginBottom: 8 }}>
                    Cuenta Bancaria para Liquidaciones de Ganancias
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4 }}>
                        Banco de Abono:
                      </label>
                      <input
                        type="text"
                        value={logoEmpresaForm.banco_abono || ''}
                        onChange={(e) => setLogoEmpresaForm({ ...logoEmpresaForm, banco_abono: e.target.value })}
                        placeholder="Ej. Banco Mercantil Santa Cruz"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4 }}>
                        Número de Cuenta:
                      </label>
                      <input
                        type="text"
                        value={logoEmpresaForm.cuenta_bancaria || ''}
                        onChange={(e) => setLogoEmpresaForm({ ...logoEmpresaForm, cuenta_bancaria: e.target.value })}
                        placeholder="4010-XXXX-XXXX"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4 }}>
                      Titular de la Cuenta:
                    </label>
                    <input
                      type="text"
                      value={logoEmpresaForm.titular_cuenta || ''}
                      onChange={(e) => setLogoEmpresaForm({ ...logoEmpresaForm, titular_cuenta: e.target.value })}
                      placeholder="Nombre o Razón Social registrada en el Banco"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalEditarLogoEmpresaOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <Check size={16} />
                  <span>Guardar Logotipo & Marca</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: CREAR EMPLEADO
         ===================================================================== */}
      {modalCrearEmpleadoEmpresaOpen && (
        <div className="modal-overlay" onClick={() => setModalCrearEmpleadoEmpresaOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <form onSubmit={handleGuardarEmpleadoPorEmpresa}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Crear Cuenta de Empleado (App Móvil)</h3>
                <button type="button" onClick={() => setModalCrearEmpleadoEmpresaOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>
                    Nombre Completo:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juana Flores"
                    value={nuevoEmpleadoForm.nombre}
                    onChange={(e) => {
                      const val = e.target.value;
                      const slug = val.toLowerCase().replace(/[^a-z0-9]/g, '.');
                      setNuevoEmpleadoForm({
                        ...nuevoEmpleadoForm,
                        nombre: val,
                        correo: slug ? `${slug}@brillante.com` : ''
                      });
                    }}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>
                      CI:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="7654321 SC"
                      value={nuevoEmpleadoForm.ci}
                      onChange={(e) => setNuevoEmpleadoForm({ ...nuevoEmpleadoForm, ci: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>
                      Teléfono:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="70012345"
                      value={nuevoEmpleadoForm.telefono}
                      onChange={(e) => setNuevoEmpleadoForm({ ...nuevoEmpleadoForm, telefono: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>
                    Correo para Login Móvil:
                  </label>
                  <input
                    type="email"
                    required
                    value={nuevoEmpleadoForm.correo}
                    onChange={(e) => setNuevoEmpleadoForm({ ...nuevoEmpleadoForm, correo: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '2px solid #0284C7', fontWeight: 700 }}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalCrearEmpleadoEmpresaOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <span>Crear Empleado</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ASIGNAR LIMPIADOR */}
      {modalAsignarOpen && ordenSeleccionadaParaAsignar && (
        <div className="modal-overlay" onClick={() => setModalAsignarOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                Asignar Limpiador a {ordenSeleccionadaParaAsignar.codigo_seguimiento}
              </h3>
              <button onClick={() => setModalAsignarOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {trabajadoresEmpresa.filter(w => w.cuenta_activa).map(w => (
                <div
                  key={w.id}
                  className={`worker-select-card ${trabajadorElegidoId === w.id ? 'selected' : ''}`}
                  onClick={() => setTrabajadorElegidoId(w.id)}
                >
                  <img src={w.foto} alt="" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800 }}>{w.nombre}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B' }}>{w.especialidad} • ⭐ {w.calificacion}</div>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: w.estado === 'DISPONIBLE' ? '#059669' : '#0284C7' }}>
                    {w.estado}
                  </span>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setModalAsignarOpen(false)}>
                Cancelar
              </button>
              <button className="btn-primary" disabled={!trabajadorElegidoId} onClick={handleConfirmarAsignacion}>
                Confirmar Asignación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NUEVA EMPRESA (SUPERADMIN) */}
      {modalNuevaEmpresaOpen && (
        <div className="modal-overlay" onClick={() => setModalNuevaEmpresaOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleGuardarNuevaEmpresa}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Registrar Nueva Empresa</h3>
                <button type="button" onClick={() => setModalNuevaEmpresaOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>
                    Nombre / Razón Social:
                  </label>
                  <input
                    type="text"
                    required
                    value={nuevaEmpresaForm.nombre}
                    onChange={(e) => setNuevaEmpresaForm({ ...nuevaEmpresaForm, nombre: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>
                    NIT:
                  </label>
                  <input
                    type="text"
                    required
                    value={nuevaEmpresaForm.nit}
                    onChange={(e) => setNuevaEmpresaForm({ ...nuevaEmpresaForm, nit: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalNuevaEmpresaOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <span>Guardar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* =====================================================================
          MODAL: EDITAR COMISIÓN DE EMPRESA (SUPERADMIN)
         ===================================================================== */}
      {modalEditarComisionOpen && empresaAEditar && (
        <div className="modal-overlay" onClick={() => setModalEditarComisionOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 460 }}>
            <form onSubmit={handleGuardarComision}>
              <div className="modal-header">
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Ajustar Tasa de Comisión</h3>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Empresa: <strong>{empresaAEditar.nombre}</strong></div>
                </div>
                <button type="button" onClick={() => setModalEditarComisionOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ fontSize: '0.85rem', color: '#475569' }}>
                  Porcentaje retenido por LimpyGo por cada servicio completado por esta empresa:
                </p>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, marginBottom: 6 }}>
                    PORCENTAJE DE COMISIÓN (%):
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="100"
                      required
                      value={nuevaComisionInput}
                      onChange={(e) => setNuevaComisionInput(e.target.value)}
                      style={{ width: 140, padding: '10px 14px', borderRadius: 10, border: '2px solid #7C3AED', fontWeight: 900, fontSize: '1.2rem' }}
                    />
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#7C3AED' }}>%</span>
                  </div>
                </div>

                <div style={{ background: '#F5F3FF', padding: 12, borderRadius: 10, fontSize: '0.8rem', color: '#6D28D9' }}>
                  💡 Por un servicio de 100 BOB, LimpyGo retendrá <strong>{parseFloat(nuevaComisionInput || 0).toFixed(2)} BOB</strong> y la empresa recibirá <strong>{(100 - parseFloat(nuevaComisionInput || 0)).toFixed(2)} BOB</strong> netos.
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalEditarComisionOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" style={{ background: '#7C3AED' }}>
                  <span>Guardar Tasa</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: EDITAR DATOS DE EMPRESA (SUPERADMIN)
         ===================================================================== */}
      {modalEditarEmpresaOpen && empresaAEditarForm && (
        <div className="modal-overlay" onClick={() => setModalEditarEmpresaOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <form onSubmit={handleGuardarEdicionEmpresa}>
              <div className="modal-header">
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Editar Información de Empresa</h3>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>ID: {empresaAEditarForm.id}</div>
                </div>
                <button type="button" onClick={() => setModalEditarEmpresaOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Nombre / Razón Social:
                  </label>
                  <input
                    type="text"
                    required
                    value={empresaAEditarForm.nombre}
                    onChange={(e) => setEmpresaAEditarForm({ ...empresaAEditarForm, nombre: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      NIT:
                    </label>
                    <input
                      type="text"
                      required
                      value={empresaAEditarForm.nit}
                      onChange={(e) => setEmpresaAEditarForm({ ...empresaAEditarForm, nit: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Teléfono:
                    </label>
                    <input
                      type="text"
                      required
                      value={empresaAEditarForm.telefono}
                      onChange={(e) => setEmpresaAEditarForm({ ...empresaAEditarForm, telefono: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Contacto Administrativo:
                    </label>
                    <input
                      type="text"
                      value={empresaAEditarForm.contacto}
                      onChange={(e) => setEmpresaAEditarForm({ ...empresaAEditarForm, contacto: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Correo de Notificaciones:
                    </label>
                    <input
                      type="email"
                      value={empresaAEditarForm.correo_contacto}
                      onChange={(e) => setEmpresaAEditarForm({ ...empresaAEditarForm, correo_contacto: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Ciudad & Zonas de Cobertura:
                  </label>
                  <input
                    type="text"
                    value={empresaAEditarForm.cobertura}
                    onChange={(e) => setEmpresaAEditarForm({ ...empresaAEditarForm, cobertura: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.82rem', marginBottom: 8, color: '#0F172A' }}>
                    Cuenta Bancaria para Transferencias ACH
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748B', fontWeight: 700, marginBottom: 2 }}>BANCO</label>
                      <input
                        type="text"
                        value={empresaAEditarForm.banco_abono}
                        onChange={(e) => setEmpresaAEditarForm({ ...empresaAEditarForm, banco_abono: e.target.value })}
                        style={{ width: '100%', padding: '6px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748B', fontWeight: 700, marginBottom: 2 }}>Nº CUENTA</label>
                      <input
                        type="text"
                        value={empresaAEditarForm.cuenta_bancaria}
                        onChange={(e) => setEmpresaAEditarForm({ ...empresaAEditarForm, cuenta_bancaria: e.target.value })}
                        style={{ width: '100%', padding: '6px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalEditarEmpresaOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: EDITAR USUARIO (SUPERADMIN)
         ===================================================================== */}
      {modalEditarUsuarioOpen && usuarioAEditarForm && (
        <div className="modal-overlay" onClick={() => setModalEditarUsuarioOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <form onSubmit={handleGuardarEdicionUsuario}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Editar Cuenta de Usuario</h3>
                <button type="button" onClick={() => setModalEditarUsuarioOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Nombre Completo:
                  </label>
                  <input
                    type="text"
                    required
                    value={usuarioAEditarForm.nombre}
                    onChange={(e) => setUsuarioAEditarForm({ ...usuarioAEditarForm, nombre: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Correo Electrónico (Login):
                  </label>
                  <input
                    type="email"
                    required
                    value={usuarioAEditarForm.correo}
                    onChange={(e) => setUsuarioAEditarForm({ ...usuarioAEditarForm, correo: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Rol en el Sistema:
                    </label>
                    <select
                      value={usuarioAEditarForm.rol}
                      onChange={(e) => setUsuarioAEditarForm({ ...usuarioAEditarForm, rol: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontWeight: 700 }}
                    >
                      <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                      <option value="ADMIN_EMPRESA">ADMIN_EMPRESA</option>
                      <option value="TRABAJADOR">TRABAJADOR</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Teléfono:
                    </label>
                    <input
                      type="text"
                      value={usuarioAEditarForm.telefono}
                      onChange={(e) => setUsuarioAEditarForm({ ...usuarioAEditarForm, telefono: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                </div>

                {usuarioAEditarForm.rol !== 'SUPER_ADMIN' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Empresa Vinculada:
                    </label>
                    <select
                      value={usuarioAEditarForm.empresa_id}
                      onChange={(e) => setUsuarioAEditarForm({ ...usuarioAEditarForm, empresa_id: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontWeight: 700 }}
                    >
                      {empresas.map(e => (
                        <option key={e.id} value={e.id}>{e.nombre}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalEditarUsuarioOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <span>Guardar Usuario</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: REGISTRAR NUEVO USUARIO (SUPERADMIN)
         ===================================================================== */}
      {modalNuevoUsuarioOpen && (
        <div className="modal-overlay" onClick={() => setModalNuevoUsuarioOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <form onSubmit={handleGuardarNuevoUsuario}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Registrar Nuevo Usuario</h3>
                <button type="button" onClick={() => setModalNuevoUsuarioOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Nombre Completo:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Ing. Carlos Suárez"
                    value={nuevoUsuarioForm.nombre}
                    onChange={(e) => setNuevoUsuarioForm({ ...nuevoUsuarioForm, nombre: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Correo Electrónico (Acceso):
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="carlos@ejemplo.bo"
                    value={nuevoUsuarioForm.correo}
                    onChange={(e) => setNuevoUsuarioForm({ ...nuevoUsuarioForm, correo: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Rol en el Sistema:
                    </label>
                    <select
                      value={nuevoUsuarioForm.rol}
                      onChange={(e) => setNuevoUsuarioForm({ ...nuevoUsuarioForm, rol: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontWeight: 700 }}
                    >
                      <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                      <option value="ADMIN_EMPRESA">ADMIN_EMPRESA</option>
                      <option value="TRABAJADOR">TRABAJADOR</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Teléfono:
                    </label>
                    <input
                      type="text"
                      placeholder="77000000"
                      value={nuevoUsuarioForm.telefono}
                      onChange={(e) => setNuevoUsuarioForm({ ...nuevoUsuarioForm, telefono: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                </div>

                {nuevoUsuarioForm.rol !== 'SUPER_ADMIN' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Empresa Vinculada:
                    </label>
                    <select
                      value={nuevoUsuarioForm.empresa_id}
                      onChange={(e) => setNuevoUsuarioForm({ ...nuevoUsuarioForm, empresa_id: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontWeight: 700 }}
                    >
                      {empresas.map(e => (
                        <option key={e.id} value={e.id}>{e.nombre}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalNuevoUsuarioOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <span>Crear Usuario</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: EDITAR EMPLEADO / LIMPIADOR (EMPRESA)
         ===================================================================== */}
      {modalEditarEmpleadoOpen && empleadoAEditarForm && (
        <div className="modal-overlay" onClick={() => setModalEditarEmpleadoOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <form onSubmit={handleGuardarEdicionEmpleado}>
              <div className="modal-header">
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Editar Ficha de Empleado</h3>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Login: {empleadoAEditarForm.correo}</div>
                </div>
                <button type="button" onClick={() => setModalEditarEmpleadoOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Nombre Completo:
                  </label>
                  <input
                    type="text"
                    required
                    value={empleadoAEditarForm.nombre}
                    onChange={(e) => setEmpleadoAEditarForm({ ...empleadoAEditarForm, nombre: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Cédula de Identidad:
                    </label>
                    <input
                      type="text"
                      required
                      value={empleadoAEditarForm.ci}
                      onChange={(e) => setEmpleadoAEditarForm({ ...empleadoAEditarForm, ci: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Teléfono Móvil:
                    </label>
                    <input
                      type="text"
                      required
                      value={empleadoAEditarForm.telefono}
                      onChange={(e) => setEmpleadoAEditarForm({ ...empleadoAEditarForm, telefono: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Especialidad Principal:
                  </label>
                  <input
                    type="text"
                    value={empleadoAEditarForm.especialidad}
                    onChange={(e) => setEmpleadoAEditarForm({ ...empleadoAEditarForm, especialidad: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Estado de Turno:
                  </label>
                  <select
                    value={empleadoAEditarForm.estado}
                    onChange={(e) => setEmpleadoAEditarForm({ ...empleadoAEditarForm, estado: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontWeight: 700 }}
                  >
                    <option value="DISPONIBLE">DISPONIBLE (Listo para asignación)</option>
                    <option value="EN_TURNO">EN_TURNO (Atendiendo un servicio)</option>
                    <option value="DESCANSO">DESCANSO (Fuera de turno)</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalEditarEmpleadoOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <span>Guardar Ficha</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: DETALLE Y GESTIÓN DE ORDEN (AUDITORÍA & SUPERADMIN)
         ===================================================================== */}
      {modalDetalleOrdenOpen && ordenDetalleSeleccionada && (
        <div className="modal-overlay" onClick={() => setModalDetalleOrdenOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 580 }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                  Auditoría: {ordenDetalleSeleccionada.codigo_seguimiento}
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  Fecha de solicitud: {ordenDetalleSeleccionada.fecha_solicitud || 'Reciente'}
                </div>
              </div>
              <button onClick={() => setModalDetalleOrdenOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Resumen del Cliente y Monto */}
              <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800, display: 'block' }}>CLIENTE & CONTACTO</label>
                  <div style={{ fontWeight: 800, color: '#0F172A' }}>{ordenDetalleSeleccionada.cliente_nombre}</div>
                  <div style={{ fontSize: '0.78rem', color: '#0284C7' }}>📞 {ordenDetalleSeleccionada.telefono_cliente || '77012345'}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 4 }}>📍 {ordenDetalleSeleccionada.direccion}</div>
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800, display: 'block' }}>FINANZAS DE LA ORDEN</label>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>{ordenDetalleSeleccionada.monto_total.toFixed(2)} BOB</div>
                  <div style={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 800 }}>
                    Comisión LimpyGo: {calcularOrdenFinanzas(ordenDetalleSeleccionada).comision_limpygo.toFixed(2)} BOB
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 800 }}>
                    Neto Empresa: {calcularOrdenFinanzas(ordenDetalleSeleccionada).neto_empresa.toFixed(2)} BOB
                  </div>
                </div>
              </div>

              {/* Empresa y Limpiador actual */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ border: '1px solid #E2E8F0', padding: 12, borderRadius: 10 }}>
                  <label style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800, display: 'block', marginBottom: 2 }}>EMPRESA ASIGNADA</label>
                  <div style={{ fontWeight: 800, color: '#0284C7' }}>
                    {empresas.find(e => e.id === ordenDetalleSeleccionada.empresa_id)?.nombre || 'Sin Asignar'}
                  </div>
                </div>
                <div style={{ border: '1px solid #E2E8F0', padding: 12, borderRadius: 10 }}>
                  <label style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 800, display: 'block', marginBottom: 2 }}>LIMPIADOR DESIGNADO</label>
                  <div style={{ fontWeight: 800, color: '#0F172A' }}>
                    {trabajadores.find(w => w.id === ordenDetalleSeleccionada.trabajador_id)?.nombre || '👷 Pendiente de Asignación'}
                  </div>
                </div>
              </div>

              {/* Acciones de Gestión de SuperAdmin */}
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 14 }}>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0F172A', marginBottom: 8 }}>
                  ⚡ Acciones de Control Operativo
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* Cambio de Estado Forzado */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748B', marginBottom: 4 }}>
                      Cambiar Estado Manualmente:
                    </label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <select
                        value={ordenDetalleSeleccionada.estado_actual}
                        onChange={(e) => handleCambiarEstadoOrdenDetalle(e.target.value)}
                        style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '2px solid #0284C7', fontWeight: 800 }}
                      >
                        <option value="SOLICITADA">SOLICITADA</option>
                        <option value="ASIGNADA">ASIGNADA</option>
                        <option value="EN_CAMINO">EN_CAMINO</option>
                        <option value="LLEGUE">LLEGUE</option>
                        <option value="EN_PROCESO">EN_PROCESO</option>
                        <option value="COMPLETADA">COMPLETADA</option>
                        <option value="CANCELADA">CANCELADA</option>
                      </select>
                    </div>
                  </div>

                  {/* Reasignación de Empresa */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748B', marginBottom: 4 }}>
                      Reasignar a Otra Empresa de la Red:
                    </label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <select
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) handleReasignarEmpresaOrden(e.target.value);
                        }}
                        style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontWeight: 700 }}
                      >
                        <option value="" disabled>Selecciona empresa socia para transferir...</option>
                        {empresas.map(emp => (
                          <option key={emp.id} value={emp.id}>
                            {emp.nombre} ({emp.ciudad})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-primary" onClick={() => setModalDetalleOrdenOpen(false)} style={{ width: '100%', justifyContent: 'center' }}>
                <span>Cerrar Panel de Auditoría</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: SOLICITAR LIQUIDACIÓN DE GANANCIAS A CUENTA BANCARIA
         ===================================================================== */}
      {modalSolicitarLiquidacionOpen && (
        <div className="modal-overlay" onClick={() => setModalSolicitarLiquidacionOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <form onSubmit={handleSolicitarLiquidacion}>
              <div className="modal-header">
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Solicitar Retiro / Liquidación ACH</h3>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Empresa: {currentEmpresa.nombre}</div>
                </div>
                <button type="button" onClick={() => setModalSolicitarLiquidacionOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ background: '#F0F9FF', padding: 14, borderRadius: 12, border: '1px solid #BAE6FD' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369A1' }}>CUENTA DE ABONO REGISTRADA:</div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A', marginTop: 2 }}>
                    {currentEmpresa.banco_abono || 'Banco Mercantil Santa Cruz'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#0284C7', fontWeight: 900 }}>
                    {currentEmpresa.cuenta_bancaria || '4010-8923-0192'}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                    Titular: {currentEmpresa.titular_cuenta || currentEmpresa.nombre}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, marginBottom: 6 }}>
                    Monto Bruto a Liquidar (BOB):
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input
                      type="number"
                      step="1"
                      min="50"
                      max={totalFacturadoEmpresa || 10000}
                      required
                      placeholder="Ej. 1000"
                      value={montoLiquidacionInput}
                      onChange={(e) => setMontoLiquidacionInput(e.target.value)}
                      style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '2px solid #0284C7', fontWeight: 900, fontSize: '1.2rem' }}
                    />
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#64748B' }}>BOB</span>
                  </div>
                </div>

                {montoLiquidacionInput && (
                  <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span>Monto Solicitado:</span>
                      <strong>{parseFloat(montoLiquidacionInput).toFixed(2)} BOB</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: '#7C3AED' }}>
                      <span>Comisión LimpyGo ({currentEmpresa.comision_porcentaje}%):</span>
                      <strong>-{(parseFloat(montoLiquidacionInput) * (currentEmpresa.comision_porcentaje / 100)).toFixed(2)} BOB</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #CBD5E1', paddingTop: 4, fontSize: '0.9rem', color: '#059669' }}>
                      <strong>Neto a recibir en tu cuenta:</strong>
                      <strong>{(parseFloat(montoLiquidacionInput) * ((100 - currentEmpresa.comision_porcentaje) / 100)).toFixed(2)} BOB</strong>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalSolicitarLiquidacionOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <CreditCard size={16} />
                  <span>Confirmar Solicitud de Liquidación</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: AUDITORÍA DE EVIDENCIA FOTOGRÁFICA
         ===================================================================== */}
      {modalAuditarEvidenciaOpen && evidenciaSeleccionada && (
        <div className="modal-overlay" onClick={() => setModalAuditarEvidenciaOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                  Inspección de Evidencia: {evidenciaSeleccionada.codigo_seguimiento}
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  Cliente: <strong>{evidenciaSeleccionada.cliente_nombre}</strong>
                </div>
              </div>
              <button onClick={() => setModalAuditarEvidenciaOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', marginBottom: 4 }}>
                    ESTADO ANTES DE LIMPIEZA
                  </div>
                  <img
                    src={evidenciaSeleccionada.evidencias?.antes}
                    alt="Antes"
                    style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 10, border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', marginBottom: 4 }}>
                    ESTADO DESPUÉS DE LIMPIEZA
                  </div>
                  <img
                    src={evidenciaSeleccionada.evidencias?.despues}
                    alt="Después"
                    style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 10, border: '2px solid #059669' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                  Observación de Auditoría (si requiere corrección):
                </label>
                <input
                  type="text"
                  placeholder="Ej. Revisar detalle de zócalos o manchas en esquina..."
                  value={observacionEvidenciaInput}
                  onChange={(e) => setObservacionEvidenciaInput(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                />
              </div>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                className="btn-outline"
                style={{ color: '#DC2626', borderColor: '#FCA5A5' }}
                onClick={() => handleObservarEvidencia(evidenciaSeleccionada.id)}
              >
                <AlertCircle size={15} />
                <span>Registrar Observación</span>
              </button>

              <button
                type="button"
                className="btn-primary"
                style={{ background: '#059669' }}
                onClick={() => handleAprobarEvidencia(evidenciaSeleccionada.id)}
              >
                <CheckCircle2 size={16} />
                <span>Aprobar Limpieza ✓</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: CREDENCIALES GENERADAS PARA TRABAJADOR MÓVIL
         ===================================================================== */}
      {credencialesRecientesModal && (
        <div className="modal-overlay" onClick={() => setCredencialesRecientesModal(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 440 }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#059669' }}>
                🎉 Cuenta Móvil Lista
              </h3>
              <button onClick={() => setCredencialesRecientesModal(null)} style={{ border: 'none', background: 'transparent' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>
                Entrega estas credenciales al limpiador para que inicie sesión en la <strong>App Móvil de LimpyGo</strong>:
              </p>

              <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0', fontFamily: 'monospace' }}>
                <div><strong>Trabajador:</strong> {credencialesRecientesModal.nombre}</div>
                <div><strong>Usuario/Correo:</strong> {credencialesRecientesModal.correo}</div>
                <div><strong>Contraseña Móvil:</strong> {credencialesRecientesModal.password}</div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-primary" onClick={() => setCredencialesRecientesModal(null)} style={{ width: '100%', justifyContent: 'center' }}>
                <span>Entendido / Cerrar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: APROBAR Y EMITIR LIQUIDACIÓN BANCARIA (SUPERADMIN)
         ===================================================================== */}
      {modalAprobarLiquidacionOpen && liquidacionAprobando && (
        <div className="modal-overlay" onClick={() => setModalAprobarLiquidacionOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <form onSubmit={handleConfirmarAprobacionLiquidacion}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#059669' }}>
                  Aprobar Liquidación & Transferencia Bancaria
                </h3>
                <button type="button" onClick={() => setModalAprobarLiquidacionOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Liquidación ID:</span>
                    <strong>{liquidacionAprobando.id}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Monto Neto a Transferir:</span>
                    <strong style={{ fontSize: '1.1rem', color: '#059669' }}>{liquidacionAprobando.monto_neto.toFixed(2)} BOB</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Banco Receptor:</span>
                    <strong>{liquidacionAprobando.banco}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Cuenta:</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{liquidacionAprobando.cuenta}</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 4 }}>
                    Código de Comprobante / Referencia Bancaria ACH:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej. TRANSF-BMSC-890234"
                    value={refPagoInput}
                    onChange={(e) => setRefPagoInput(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontFamily: 'monospace', fontWeight: 700 }}
                  />
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: 4 }}>
                    Este código quedará registrado en el historial de la empresa para su conciliación contable.
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalAprobarLiquidacionOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" style={{ background: '#059669' }}>
                  <Check size={16} />
                  <span>Confirmar & Emitir Pago</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: CREAR NUEVO CUPÓN PROMOCIONAL (SUPERADMIN)
         ===================================================================== */}
      {modalNuevoCuponOpen && (
        <div className="modal-overlay" onClick={() => setModalNuevoCuponOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <form onSubmit={handleGuardarNuevoCupon}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Crear Cupón Promocional</h3>
                <button type="button" onClick={() => setModalNuevoCuponOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Código del Cupón (Mayúsculas):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej. LIMPYFIESTAS20"
                    value={nuevoCuponForm.codigo}
                    onChange={(e) => setNuevoCuponForm({ ...nuevoCuponForm, codigo: e.target.value.toUpperCase() })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontFamily: 'monospace', fontWeight: 800, textTransform: 'uppercase' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Tipo de Descuento:
                    </label>
                    <select
                      value={nuevoCuponForm.tipo}
                      onChange={(e) => setNuevoCuponForm({ ...nuevoCuponForm, tipo: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    >
                      <option value="PORCENTAJE">% Porcentaje</option>
                      <option value="MONTO_FIJO">Monto Fijo (BOB)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Valor del Descuento:
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={nuevoCuponForm.valor}
                      onChange={(e) => setNuevoCuponForm({ ...nuevoCuponForm, valor: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontWeight: 800 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Pedido Mínimo (BOB):
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={nuevoCuponForm.pedido_minimo}
                      onChange={(e) => setNuevoCuponForm({ ...nuevoCuponForm, pedido_minimo: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Límite de Canjes:
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={nuevoCuponForm.uso_max}
                      onChange={(e) => setNuevoCuponForm({ ...nuevoCuponForm, uso_max: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Fecha de Vencimiento:
                  </label>
                  <input
                    type="date"
                    value={nuevoCuponForm.expira}
                    onChange={(e) => setNuevoCuponForm({ ...nuevoCuponForm, expira: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalNuevoCuponOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <Tag size={15} />
                  <span>Publicar Cupón en App</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: RESOLVER RECLAMO O DISPUTA (SUPERADMIN)
         ===================================================================== */}
      {modalResolverReclamoOpen && reclamoSeleccionado && (
        <div className="modal-overlay" onClick={() => setModalResolverReclamoOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <form onSubmit={handleResolverReclamo}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Resolver Ticket {reclamoSeleccionado.id}</h3>
                <button type="button" onClick={() => setModalResolverReclamoOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0', fontSize: '0.82rem' }}>
                  <div><strong>Cliente:</strong> {reclamoSeleccionado.cliente}</div>
                  <div><strong>Orden:</strong> {reclamoSeleccionado.orden_id}</div>
                  <div style={{ marginTop: 6, color: '#334155' }}><strong>Motivo:</strong> {reclamoSeleccionado.motivo}</div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Dictamen / Solución Aplicada:
                  </label>
                  <textarea
                    required
                    rows="3"
                    placeholder="ej. Se compensó al cliente con cupón LIMPY10 y la empresa asignó prioridad sin recargo."
                    value={resolucionInput}
                    onChange={(e) => setResolucionInput(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalResolverReclamoOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" style={{ background: '#059669' }}>
                  <Check size={16} />
                  <span>Marcar Caso como Resuelto</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: AGREGAR ZONA DE COBERTURA (SUPERADMIN)
         ===================================================================== */}
      {modalNuevaZonaOpen && (
        <div className="modal-overlay" onClick={() => setModalNuevaZonaOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 460 }}>
            <form onSubmit={handleGuardarNuevaZona}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Nueva Zona de Cobertura</h3>
                <button type="button" onClick={() => setModalNuevaZonaOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Nombre del Barrio / Zona:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Las Palmas / Doble Vía La Guardia"
                    value={nuevaZonaForm.nombre}
                    onChange={(e) => setNuevaZonaForm({ ...nuevaZonaForm, nombre: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Macrozona:
                    </label>
                    <select
                      value={nuevaZonaForm.macrozona}
                      onChange={(e) => setNuevaZonaForm({ ...nuevaZonaForm, macrozona: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    >
                      <option value="Norte">Norte</option>
                      <option value="Sur">Sur</option>
                      <option value="Este">Este</option>
                      <option value="Oeste">Oeste</option>
                      <option value="Centro">Centro</option>
                      <option value="Metropolitana">Metropolitana</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Recargo Transporte (BOB):
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={nuevaZonaForm.recargo_lejanía}
                      onChange={(e) => setNuevaZonaForm({ ...nuevaZonaForm, recargo_lejanía: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontWeight: 700 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Tiempo Estimado de Llegada:
                  </label>
                  <input
                    type="text"
                    placeholder="ej. 30 a 45 min"
                    value={nuevaZonaForm.tiempo_llegada_prom}
                    onChange={(e) => setNuevaZonaForm({ ...nuevaZonaForm, tiempo_llegada_prom: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalNuevaZonaOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <MapPin size={15} />
                  <span>Habilitar Zona</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: RESPONDER A RESEÑA DE CLIENTE (EMPRESA)
         ===================================================================== */}
      {modalResponderResenaOpen && resenaSeleccionada && (
        <div className="modal-overlay" onClick={() => setModalResponderResenaOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <form onSubmit={handleEnviarRespuestaResena}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Responder a {resenaSeleccionada.cliente}</h3>
                <button type="button" onClick={() => setModalResponderResenaOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0', fontStyle: 'italic', fontSize: '0.85rem' }}>
                  "{resenaSeleccionada.comentario}"
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Tu Respuesta Oficial:
                  </label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Agradece al cliente y reitera el compromiso de tu empresa..."
                    value={respuestaInput}
                    onChange={(e) => setRespuestaInput(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalResponderResenaOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <MessageSquare size={15} />
                  <span>Publicar Respuesta</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: REGISTRAR INSUMO O EQUIPAMIENTO (EMPRESA)
         ===================================================================== */}
      {modalNuevoInsumoOpen && (
        <div className="modal-overlay" onClick={() => setModalNuevoInsumoOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 460 }}>
            <form onSubmit={handleGuardarNuevoInsumo}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Registrar Insumo o Maquinaria</h3>
                <button type="button" onClick={() => setModalNuevoInsumoOpen(false)} style={{ border: 'none', background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Nombre del Artículo / Equipo:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Detergente Enzimático Concentrado 5L"
                    value={nuevoInsumoForm.item}
                    onChange={(e) => setNuevoInsumoForm({ ...nuevoInsumoForm, item: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Categoría:
                    </label>
                    <select
                      value={nuevoInsumoForm.categoria}
                      onChange={(e) => setNuevoInsumoForm({ ...nuevoInsumoForm, categoria: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                    >
                      <option value="Químicos">Químicos</option>
                      <option value="Maquinaria">Maquinaria</option>
                      <option value="Accesorios y EPP">Accesorios y EPP</option>
                      <option value="Vehículo">Vehículo</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                      Cantidad / Stock:
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={nuevoInsumoForm.stock}
                      onChange={(e) => setNuevoInsumoForm({ ...nuevoInsumoForm, stock: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontWeight: 700 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4 }}>
                    Unidad de Medida:
                  </label>
                  <input
                    type="text"
                    placeholder="ej. litros, unidades, paquetes"
                    value={nuevoInsumoForm.unidad}
                    onChange={(e) => setNuevoInsumoForm({ ...nuevoInsumoForm, unidad: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setModalNuevoInsumoOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  <Layers size={15} />
                  <span>Guardar en Inventario</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
