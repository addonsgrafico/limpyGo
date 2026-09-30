import React, { useState } from 'react';
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
  ToggleRight
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
    }
  ]);
  const [modalSolicitarLiquidacionOpen, setModalSolicitarLiquidacionOpen] = useState(false);
  const [montoLiquidacionInput, setMontoLiquidacionInput] = useState('');

  // GESTIÓN CONTROL DE EVIDENCIAS
  const [modalAuditarEvidenciaOpen, setModalAuditarEvidenciaOpen] = useState(false);
  const [evidenciaSeleccionada, setEvidenciaSeleccionada] = useState(null);
  const [observacionEvidenciaInput, setObservacionEvidenciaInput] = useState('');

  const [credencialesRecientesModal, setCredencialesRecientesModal] = useState(null);

  const [toastMsg, setToastMsg] = useState(null);

  const mostrarToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const currentEmpresa = empresas.find(e => e.id === currentUser.empresa_id) || empresas[0];

  // ==========================================================================
  // CONMUTADOR DE SESIÓN
  // ==========================================================================
  const handleCambiarUsuario = (usuarioId) => {
    const user = usuarios.find(u => u.id === usuarioId);
    if (!user) return;
    setCurrentUser(user);
    if (user.rol === 'SUPER_ADMIN') {
      setActiveTab('dashboard_admin');
      mostrarToast('Sesión cambiada a SuperAdmin LimpyGo (admin@limpygo.com)');
    } else {
      setActiveTab('servicios_precios');
      const emp = empresas.find(e => e.id === user.empresa_id);
      mostrarToast(`Sesión cambiada a ${emp?.nombre || 'Empresa'} (${user.correo})`);
    }
  };

  // ==========================================================================
  // GESTIÓN DE SERVICIOS Y PRECIOS POR LA EMPRESA
  // ==========================================================================
  // Lista de servicios que pertenecen a la empresa actual
  const serviciosDeLaEmpresa = serviciosEmpresas.filter(s => s.empresa_id === currentEmpresa.id);

  const handleGuardarNuevoServicio = (e) => {
    e.preventDefault();
    if (!nuevoServicioForm.nombre || !nuevoServicioForm.precio_base) return;

    const nuevo = {
      id: `srv-${Date.now()}`,
      empresa_id: currentEmpresa.id,
      nombre: nuevoServicioForm.nombre,
      categoria: nuevoServicioForm.categoria,
      descripcion: nuevoServicioForm.descripcion || 'Servicio especializado prestado por personal certificado.',
      precio_base: parseFloat(nuevoServicioForm.precio_base) || 95.0,
      tiempo_estimado: nuevoServicioForm.tiempo_estimado || '2 a 3 horas',
      imagen_url: nuevoServicioForm.imagen_url || PRESETS_IMAGENES_SERVICIOS[0].url,
      esta_disponible: true,
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
    mostrarToast(`✨ Servicio "${nuevo.nombre}" añadido con fotografía y tarifa de ${nuevo.precio_base} BOB.`);
  };

  const handleActualizarPrecioServicio = (e) => {
    e.preventDefault();
    if (!servicioAEditarPrecio) return;
    const precioNum = parseFloat(nuevoPrecioServicioInput);
    if (isNaN(precioNum) || precioNum <= 0) {
      mostrarToast('Introduce un precio válido.');
      return;
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
    mostrarToast(`💰 Servicio "${servicioAEditarPrecio.nombre}" actualizado con nueva tarifa e imagen.`);
  };

  const handleGuardarPerfilYLogoEmpresa = (e) => {
    e.preventDefault();
    setEmpresas(prev => prev.map(emp => {
      if (emp.id === currentEmpresa.id) {
        return {
          ...emp,
          nombre: logoEmpresaForm.nombre_comercial || emp.nombre,
          telefono: logoEmpresaForm.telefono || emp.telefono,
          direccion: logoEmpresaForm.direccion || emp.direccion,
          logo_url: logoEmpresaForm.logo_url || emp.logo_url,
          banco_abono: logoEmpresaForm.banco_abono || emp.banco_abono,
          cuenta_bancaria: logoEmpresaForm.cuenta_bancaria || emp.cuenta_bancaria,
          titular_cuenta: logoEmpresaForm.titular_cuenta || emp.titular_cuenta
        };
      }
      return emp;
    }));

    setModalEditarLogoEmpresaOpen(false);
    mostrarToast(`🏢 Identidad corporativa y cuenta bancaria de ${logoEmpresaForm.nombre_comercial || currentEmpresa.nombre} actualizadas con éxito.`);
  };

  const handleToggleDisponibilidadServicio = (servicioId) => {
    setServiciosEmpresas(prev => prev.map(s => {
      if (s.id === servicioId) {
        const nuevo = !s.esta_disponible;
        mostrarToast(`Servicio "${s.nombre}" ${nuevo ? 'activado' : 'pausado'} en la app móvil.`);
        return { ...s, esta_disponible: nuevo };
      }
      return s;
    }));
  };

  const handleDesvincularServicio = (servicioId) => {
    const s = serviciosEmpresas.find(item => item.id === servicioId);
    if (!window.confirm(`¿Estás seguro de remover "${s?.nombre}" del catálogo de tu empresa?`)) return;
    setServiciosEmpresas(prev => prev.filter(item => item.id !== servicioId));
    mostrarToast(`🗑️ Servicio "${s?.nombre}" desvinculado del catálogo.`);
  };

  // ==========================================================================
  // SUPERADMIN: GESTIÓN DE EMPRESAS
  // ==========================================================================
  const handleGuardarEdicionEmpresa = (e) => {
    e.preventDefault();
    if (!empresaAEditarForm) return;
    setEmpresas(prev => prev.map(emp => emp.id === empresaAEditarForm.id ? { ...emp, ...empresaAEditarForm } : emp));
    setModalEditarEmpresaOpen(false);
    mostrarToast(`🏢 Empresa "${empresaAEditarForm.nombre}" actualizada con éxito.`);
  };

  const handleToggleEstadoEmpresa = (empresaId) => {
    setEmpresas(prev => prev.map(emp => {
      if (emp.id === empresaId) {
        const nuevoEstado = emp.estado === 'ACTIVA' ? 'PAUSADA' : 'ACTIVA';
        mostrarToast(`Empresa "${emp.nombre}" ahora está ${nuevoEstado}.`);
        return { ...emp, estado: nuevoEstado };
      }
      return emp;
    }));
  };

  // ==========================================================================
  // SUPERADMIN: GESTIÓN DE USUARIOS
  // ==========================================================================
  const handleGuardarEdicionUsuario = (e) => {
    e.preventDefault();
    if (!usuarioAEditarForm) return;
    setUsuarios(prev => prev.map(u => u.id === usuarioAEditarForm.id ? { ...u, ...usuarioAEditarForm } : u));
    setModalEditarUsuarioOpen(false);
    mostrarToast(`👤 Usuario "${usuarioAEditarForm.nombre}" actualizado.`);
  };

  const handleToggleEstadoUsuario = (usuarioId) => {
    setUsuarios(prev => prev.map(u => {
      if (u.id === usuarioId) {
        const nuevo = !u.esta_activo;
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

  const handleEliminarEmpleado = (workerId) => {
    const w = trabajadores.find(t => t.id === workerId);
    if (!window.confirm(`¿Estás seguro de desvincular a ${w?.nombre}?`)) return;
    setTrabajadores(prev => prev.filter(t => t.id !== workerId));
    mostrarToast(`🗑️ Empleado ${w?.nombre} desvinculado de la empresa.`);
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
  const handleAprobarEvidencia = (ordenId) => {
    setOrdenes(prev => prev.map(o => {
      if (o.id === ordenId && o.evidencias) {
        return {
          ...o,
          evidencias: { ...o.evidencias, auditoria_aprobada: true, observacion: null }
        };
      }
      return o;
    }));
    if (modalAuditarEvidenciaOpen) setModalAuditarEvidenciaOpen(false);
    mostrarToast('✅ Evidencia de limpieza aprobada satisfactoriamente.');
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
  const handleGuardarEmpleadoPorEmpresa = (e) => {
    e.preventDefault();
    if (!nuevoEmpleadoForm.nombre || !nuevoEmpleadoForm.correo || !nuevoEmpleadoForm.ci) return;

    const nuevoUsuarioId = `usr-${Date.now()}`;
    const nuevoTrabajadorId = `w-${Date.now()}`;

    const nuevoUsuario = {
      id: nuevoUsuarioId,
      nombre: nuevoEmpleadoForm.nombre,
      correo: nuevoEmpleadoForm.correo.toLowerCase().trim(),
      rol: 'TRABAJADOR',
      empresa_id: currentEmpresa.id,
      telefono: nuevoEmpleadoForm.telefono,
      esta_activo: true,
      creado_at: new Date().toISOString().split('T')[0]
    };

    const nuevoTrabajador = {
      id: nuevoTrabajadorId,
      usuario_id: nuevoUsuarioId,
      empresa_id: currentEmpresa.id,
      nombre: nuevoEmpleadoForm.nombre,
      correo: nuevoEmpleadoForm.correo.toLowerCase().trim(),
      ci: nuevoEmpleadoForm.ci,
      telefono: nuevoEmpleadoForm.telefono,
      foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      estado: nuevoEmpleadoForm.estado_disponibilidad,
      servicios_completados: 0,
      calificacion: 5.0,
      especialidad: nuevoEmpleadoForm.especialidad,
      cuenta_activa: true
    };

    setUsuarios(prev => [...prev, nuevoUsuario]);
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

    mostrarToast(`✅ Empleado ${nuevoEmpleadoForm.nombre} creado con usuario de app móvil.`);
  };

  // ==========================================================================
  // SUPERADMIN: EMPRESAS Y USUARIOS
  // ==========================================================================
  const handleGuardarNuevaEmpresa = (e) => {
    e.preventDefault();
    if (!nuevaEmpresaForm.nombre || !nuevaEmpresaForm.nit) return;

    const nueva = {
      id: `emp-${Date.now()}`,
      nombre: nuevaEmpresaForm.nombre,
      nit: nuevaEmpresaForm.nit,
      telefono: nuevaEmpresaForm.telefono || '3-3450000',
      contacto: nuevaEmpresaForm.contacto || 'Administrador',
      correo_contacto: nuevaEmpresaForm.correo_contacto || 'contacto@empresa.bo',
      ciudad: 'Santa Cruz de la Sierra',
      cobertura: 'Equipetrol, Urbarí, Sirari, Centro',
      calificacion: 5.0,
      ordenes_totales: 0,
      personal_activo: 0,
      comision_porcentaje: parseFloat(nuevaComisionInput) || 15.0,
      estado: 'ACTIVA',
      banco_abono: 'Banco Mercantil Santa Cruz',
      cuenta_bancaria: '4010-99000-00',
      titular_cuenta: nuevaEmpresaForm.nombre
    };

    setEmpresas(prev => [nueva, ...prev]);
    setModalNuevaEmpresaOpen(false);
    mostrarToast(`🏢 Empresa "${nueva.nombre}" registrada exitosamente.`);
  };

  const handleGuardarComision = (e) => {
    e.preventDefault();
    if (!empresaAEditar) return;
    const tasa = parseFloat(nuevaComisionInput);
    if (isNaN(tasa) || tasa < 0 || tasa > 100) {
      mostrarToast('Introduce un porcentaje válido entre 0 y 100.');
      return;
    }
    setEmpresas(prev => prev.map(emp => emp.id === empresaAEditar.id ? { ...emp, comision_porcentaje: tasa } : emp));
    setModalEditarComisionOpen(false);
    setEmpresaAEditar(null);
    mostrarToast(`Tasa de comisión de "${empresaAEditar.nombre}" actualizada a ${tasa}%.`);
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

  const handleConfirmarAsignacion = () => {
    if (!trabajadorElegidoId || !ordenSeleccionadaParaAsignar) return;

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
    mostrarToast(`✅ Limpiador ${workerObj?.nombre} asignado a la orden ${ordenSeleccionadaParaAsignar.codigo_seguimiento}`);
  };

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
            /* Menú SuperAdmin */
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

              <div className="nav-section-label" style={{ marginTop: 12 }}>POLÍTICAS & COMISIONES</div>

              <button
                className={`nav-item ${activeTab === 'comisiones_reglas' ? 'active' : ''}`}
                onClick={() => setActiveTab('comisiones_reglas')}
              >
                <Percent size={18} />
                <span>Comisiones e Intereses</span>
              </button>
            </>
          ) : (
            /* Menú Empresa de Limpieza */
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

              <div className="nav-section-label" style={{ marginTop: 12 }}>CATÁLOGO & PRECIOS</div>

              {/* PESTAÑA CLAVE: SERVICIOS Y TARIFAS DE LA EMPRESA */}
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

              <div className="nav-section-label" style={{ marginTop: 12 }}>GESTIÓN DE PERSONAL</div>

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

              <div className="nav-section-label" style={{ marginTop: 12 }}>FINANZAS & AJUSTES</div>

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

        {/* Footer del Sidebar con Usuario Autenticado */}
        <div className="sidebar-footer">
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, marginBottom: 6 }}>
            USUARIO ACTIVO:
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
    </div>
  );
}
