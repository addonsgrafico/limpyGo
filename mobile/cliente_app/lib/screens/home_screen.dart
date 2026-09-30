import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:google_fonts/google_fonts.dart';
import '../services/api_service.dart';
import 'auth_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentTab = 0;
  final ApiService _apiService = ApiService();

  // Ubicación base: Equipetrol Norte, Santa Cruz de la Sierra
  final LatLng _santaCruzCoords = const LatLng(-17.7765, -63.1950);
  final MapController _mapController = MapController();

  // Estados del catálogo
  List<dynamic> _empresas = [];
  List<dynamic> _servicios = [];
  Map<String, dynamic>? _servicioSeleccionado;
  Map<String, dynamic>? _empresaSeleccionada;

  // Ambientes y extras para la cotización
  List<dynamic> _ambientes = [];
  final Map<String, int> _cantidadesAmbientes = {};
  List<dynamic> _extras = [];
  final List<String> _extrasSeleccionados = [];
  Map<String, dynamic>? _cotizacion;
  bool _loadingCotizacion = false;

  // Estado del flujo de la orden
  String _screenEstado = 'cotizar'; // 'cotizar' | 'buscando' | 'en_camino' | 'completada'
  Map<String, dynamic>? _ordenActiva;
  Map<String, dynamic>? _trabajadorAsignado;
  String _estadoOrden = 'TRABAJADOR_ASIGNADO';

  // Banco de imágenes profesionales en alta resolución para Play Store
  final Map<String, String> _imagenes = {
    'bannerHero': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    'catDeptos': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80',
    'catMuebles': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80',
    'catVidrios': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80',
    'catPostObra': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80',
    'empresaBrillante': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    'empresaEco': 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
    'empresaPro': 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=600&q=80',
    'workerAvatar': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    'evidenceBefore': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    'evidenceAfter': 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
  };

  String _filtroMarketplace = 'TODOS'; // 'TODOS' | 'SERVICIOS' | 'EMPRESAS'

  final List<Map<String, dynamic>> _serviciosPorDefecto = [
    {
      'id': 'srv-deptos',
      'nombre': 'Limpieza General de Departamento',
      'categoria': 'Departamentos',
      'descripcion': 'Limpieza profunda de dormitorios, baños, cocina, sala y aspirado integral.',
      'precio_base': 95.0,
      'precio': 95.0,
      'duracion_estimada': '2 a 3 horas',
      'empresa_nombre': 'Limpiezas Brillante Express S.R.L.',
      'imagen_url': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    },
    {
      'id': 'srv-profunda',
      'nombre': 'Limpieza Profunda & Desinfección',
      'categoria': 'Desinfección',
      'descripcion': 'Remoción intensiva de grasa, sarro en azulejos, desinfección a vapor y sanitización.',
      'precio_base': 180.0,
      'precio': 180.0,
      'duracion_estimada': '4 a 5 horas',
      'empresa_nombre': 'EcoClean Bolivia S.R.L.',
      'imagen_url': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    },
    {
      'id': 'srv-tapizados',
      'nombre': 'Lavado y Sanitización de Tapizados',
      'categoria': 'Tapizados',
      'descripcion': 'Inyección y extracción de espuma para sillones, sofás y colchones con secado rápido.',
      'precio_base': 120.0,
      'precio': 120.0,
      'duracion_estimada': '1.5 a 2 horas',
      'empresa_nombre': 'Limpiezas Brillante Express S.R.L.',
      'imagen_url': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    },
    {
      'id': 'srv-vidrios',
      'nombre': 'Limpieza de Vidrios & Ventanales',
      'categoria': 'Vidrios',
      'descripcion': 'Limpieza de cristales internos y externos con líquidos antiestáticos sin manchas.',
      'precio_base': 80.0,
      'precio': 80.0,
      'duracion_estimada': '1 a 2 horas',
      'empresa_nombre': 'EcoClean Bolivia S.R.L.',
      'imagen_url': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    },
    {
      'id': 'srv-postobra',
      'nombre': 'Limpieza Fin de Obra / Post-Construcción',
      'categoria': 'Fin de Obra',
      'descripcion': 'Eliminación de restos de cemento, yeso, pintura y acondicionamiento inicial de vivienda.',
      'precio_base': 250.0,
      'precio': 250.0,
      'duracion_estimada': '5 a 6 horas',
      'empresa_nombre': 'Limpiezas Brillante Express S.R.L.',
      'imagen_url': 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
    },
  ];

  Map<String, String> _userData = {
    'name': 'Carlos Mendoza',
    'email': 'cliente@example.com',
  };

  @override
  void initState() {
    super.initState();
    _cargarDatosIniciales();
  }

  Future<void> _cargarDatosIniciales() async {
    final empresasData = await _apiService.getEmpresas();
    final serviciosData = await _apiService.getServicios();
    final user = await _apiService.getUserData();

    if (mounted) {
      setState(() {
        if (user['name'] != null && user['name']!.isNotEmpty) {
          _userData = user;
        }
        _empresas = empresasData;
        _servicios = serviciosData;
        if (_servicios.isNotEmpty) {
          _servicioSeleccionado = _servicios[0];
          _cargarAmbientesYExtras(_servicioSeleccionado!['id']);
        }
        if (_empresas.isNotEmpty) {
          _empresaSeleccionada = _empresas[0];
        }
      });
    }
  }

  Future<void> _cargarAmbientesYExtras(String servicioId) async {
    final amb = await _apiService.getAmbientes(servicioId);
    final ext = await _apiService.getExtras(servicioId);

    if (mounted) {
      setState(() {
        _ambientes = amb;
        _extras = ext;
        for (var a in amb) {
          final nombre = a['nombre'] ?? '';
          _cantidadesAmbientes[a['id']] =
              (nombre.contains('Dormitorio') || nombre.contains('Baño') || nombre.contains('Sala')) ? 1 : 0;
        }
      });
      _actualizarCotizacion();
    }
  }

  Future<void> _actualizarCotizacion() async {
    if (_servicioSeleccionado == null) return;

    setState(() => _loadingCotizacion = true);

    final ambientesPayload = _cantidadesAmbientes.entries
        .where((e) => e.value > 0)
        .map((e) => {'ambiente_id': e.key, 'cantidad': e.value})
        .toList();

    final coti = await _apiService.cotizar(
      servicioId: _servicioSeleccionado!['id'],
      ambientes: ambientesPayload,
      extras: _extrasSeleccionados,
      cuponCodigo: 'LIMPY10',
    );

    if (mounted) {
      setState(() {
        _cotizacion = coti;
        _loadingCotizacion = false;
      });
    }
  }

  void _abrirModalConfiguracion(Map<String, dynamic> servicio, [Map<String, dynamic>? empresa]) {
    setState(() {
      _servicioSeleccionado = servicio;
      if (empresa != null) _empresaSeleccionada = empresa;
    });
    _cargarAmbientesYExtras(servicio['id']);

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => _buildModalConfiguracion(ctx),
    );
  }

  void _iniciarSolicitud() {
    Navigator.pop(context);
    setState(() {
      _currentTab = 1; // Pasa a pestaña de Mapa
      _screenEstado = 'buscando';
    });

    Future.delayed(const Duration(milliseconds: 3000), () {
      if (mounted) {
        setState(() {
          _ordenActiva = {
            'codigo_seguimiento': 'LG-89412A',
            'monto_total': _cotizacion?['costos']?['monto_total'] ?? 135,
          };
          _trabajadorAsignado = {
            'nombre': 'María Elena Quispe',
            'calificacion': '4.9',
            'empresa': _empresaSeleccionada?['nombre_comercial'] ?? 'Limpiezas Brillante Express S.R.L.',
            'eta': '6 min',
            'avatar': _imagenes['workerAvatar'],
          };
          _estadoOrden = 'EN_CAMINO';
          _screenEstado = 'en_camino';
        });

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            backgroundColor: Color(0xFF0284C7),
            content: Text('✨ ¡Limpiador asignado! María Elena va en camino a tu departamento.'),
          ),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      body: IndexedStack(
        index: _currentTab,
        children: [
          _buildMarketplaceTab(),
          _buildMapTab(),
          _buildTrackingTab(),
          _buildProfileTab(),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentTab,
        onTap: (index) => setState(() => _currentTab = index),
        backgroundColor: Colors.white,
        selectedItemColor: const Color(0xFF0284C7),
        unselectedItemColor: const Color(0xFF64748B),
        type: BottomNavigationBarType.fixed,
        selectedLabelStyle: GoogleFonts.inter(fontWeight: FontWeight.bold, fontSize: 11),
        unselectedLabelStyle: GoogleFonts.inter(fontWeight: FontWeight.w500, fontSize: 11),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_bag_outlined),
            activeIcon: Icon(Icons.shopping_bag),
            label: 'Servicios',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.map_outlined),
            activeIcon: Icon(Icons.map),
            label: 'Mapa en Vivo',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.local_shipping_outlined),
            activeIcon: Icon(Icons.local_shipping),
            label: 'Mi Orden',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            activeIcon: Icon(Icons.person),
            label: 'Cuenta',
          ),
        ],
      ),
    );
  }

  // =========================================================================
  // PESTAÑA 1: MARKETPLACE CON IMÁGENES DE ALTA CALIDAD (PLAY STORE READY)
  // =========================================================================
  Widget _buildMarketplaceTab() {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        children: [
          // Header de Ubicación
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: const Color(0xFFE0F2FE),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.location_on, color: Color(0xFF0284C7), size: 20),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('ENVIAR LIMPIEZA A', style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold)),
                    Text(
                      'Av. San Martín #450, Equipetrol',
                      style: GoogleFonts.outfit(color: const Color(0xFF0F172A), fontSize: 14, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
              CircleAvatar(
                backgroundColor: const Color(0xFFE2E8F0),
                child: const Text('CM', style: TextStyle(color: Color(0xFF0284C7), fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 16),

          // Banner Hero Fotográfico
          ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: Stack(
              children: [
                Image.network(
                  _imagenes['bannerHero']!,
                  height: 150,
                  width: double.infinity,
                  fit: BoxFit.cover,
                  errorBuilder: (_, __, ___) => Container(height: 150, color: const Color(0xFF0284C7)),
                ),
                Container(
                  height: 150,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.transparent,
                        Colors.black.withValues(alpha: 0.8),
                      ],
                    ),
                  ),
                ),
                Positioned(
                  bottom: 16,
                  left: 16,
                  right: 16,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: const Color(0xFFF59E0B),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: const Text(
                          'PROMO 10% OFF CON LIMPY10',
                          style: TextStyle(color: Colors.black, fontSize: 9, fontWeight: FontWeight.w900),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Tu departamento impecable y reluciente',
                        style: GoogleFonts.outfit(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Selector Segmentado de Exploración
          Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              color: const Color(0xFFF1F5F9),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Row(
              children: [
                _buildSegmentButton('TODOS', '🌟 Todo'),
                _buildSegmentButton('SERVICIOS', '🧹 Servicios'),
                _buildSegmentButton('EMPRESAS', '🏢 Empresas'),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Categorías con Fotografía
          Text(
            'CATEGORÍAS DE LIMPIEZA',
            style: GoogleFonts.outfit(color: const Color(0xFF475569), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 0.5),
          ),
          const SizedBox(height: 12),

          SizedBox(
            height: 112,
            child: _servicios.isNotEmpty
                ? ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: _servicios.length,
                    itemBuilder: (context, index) {
                      final s = _servicios[index];
                      final img = s['imagen_url'] ?? s['icono_url'] ?? _imagenes['catDeptos']!;
                      return _buildCategoryCard(
                        s['nombre'] ?? 'Servicio',
                        img,
                        () => _abrirModalConfiguracion(s),
                      );
                    },
                  )
                : ListView(
                    scrollDirection: Axis.horizontal,
                    children: [
                      _buildCategoryCard('Departamentos', _imagenes['catDeptos']!),
                      _buildCategoryCard('Tapizados', _imagenes['catMuebles']!),
                      _buildCategoryCard('Vidrios', _imagenes['catVidrios']!),
                      _buildCategoryCard('Fin de Obra', _imagenes['catPostObra']!),
                    ],
                  ),
          ),
          const SizedBox(height: 20),

          // =================================================================
          // SECCIÓN 1: SERVICIOS DE LIMPIEZA DISPONIBLES EN TU ZONA
          // =================================================================
          if (_filtroMarketplace != 'EMPRESAS') ...[
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'SERVICIOS DISPONIBLES EN SANTA CRUZ',
                  style: GoogleFonts.outfit(color: const Color(0xFF475569), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 0.5),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: const Color(0xFFE0F2FE),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    '${_servicios.isNotEmpty ? _servicios.length : _serviciosPorDefecto.length} opciones',
                    style: const TextStyle(color: Color(0xFF0284C7), fontSize: 11, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),

            ...(_servicios.isNotEmpty ? _servicios : _serviciosPorDefecto).map((serv) {
              final Map<String, dynamic> s = Map<String, dynamic>.from(serv);
              final String fotoUrl = s['imagen_url'] ?? s['icono_url'] ?? _imagenes['catDeptos']!;
              final rawPrecio = s['precio_base'] ?? s['precio'];
              final double precio = rawPrecio is num
                  ? rawPrecio.toDouble()
                  : (double.tryParse(rawPrecio?.toString() ?? '') ?? 95.0);
              final String categoria = s['categoria'] ?? 'Limpieza General';
              final String duracion = s['duracion_estimada'] ?? '${s['duracion_minutos'] ?? 180} min';
              final String empresaNombre = s['empresa_nombre'] ?? (_empresas.isNotEmpty ? _empresas[0]['nombre_comercial'] : 'Empresa Certificada LimpyGo');

              return Container(
                margin: const EdgeInsets.only(bottom: 16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.04),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Portada del Servicio con Badges
                    Stack(
                      children: [
                        ClipRRect(
                          borderRadius: const BorderRadius.vertical(top: Radius.circular(18)),
                          child: Image.network(
                            fotoUrl,
                            height: 135,
                            width: double.infinity,
                            fit: BoxFit.cover,
                            errorBuilder: (_, __, ___) => Container(height: 135, color: const Color(0xFFE0F2FE)),
                          ),
                        ),
                        Positioned(
                          top: 10,
                          left: 10,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: const Color(0xFF0F172A).withValues(alpha: 0.8),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              categoria.toUpperCase(),
                              style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5),
                            ),
                          ),
                        ),
                        Positioned(
                          top: 10,
                          right: 10,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.95),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Row(
                              children: [
                                const Icon(Icons.schedule, size: 12, color: Color(0xFF0284C7)),
                                const SizedBox(width: 4),
                                Text(
                                  duracion,
                                  style: const TextStyle(color: Color(0xFF0F172A), fontSize: 11, fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),

                    // Detalles y Acción
                    Padding(
                      padding: const EdgeInsets.all(14),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: Text(
                                  s['nombre'] ?? 'Servicio de Limpieza',
                                  style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.bold, color: const Color(0xFF0F172A)),
                                ),
                              ),
                              const SizedBox(width: 8),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFECFDF5),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Text(
                                  '${precio.toStringAsFixed(0)} BOB',
                                  style: const TextStyle(color: Color(0xFF059669), fontSize: 14, fontWeight: FontWeight.w900),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 6),
                          Text(
                            s['descripcion'] ?? 'Servicio especializado con personal verificado e insumos incluidos.',
                            style: const TextStyle(color: Color(0xFF64748B), fontSize: 12, height: 1.3),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 10),

                          Row(
                            children: [
                              const Icon(Icons.verified, size: 14, color: Color(0xFF0284C7)),
                              const SizedBox(width: 4),
                              Expanded(
                                child: Text(
                                  'Ofrecido por: $empresaNombre',
                                  style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF475569)),
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 12),

                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF0284C7),
                                foregroundColor: Colors.white,
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                padding: const EdgeInsets.symmetric(vertical: 12),
                              ),
                              onPressed: () {
                                final empAsociada = _empresas.isNotEmpty ? _empresas[0] : null;
                                _abrirModalConfiguracion(s, empAsociada);
                              },
                              icon: const Icon(Icons.touch_app_rounded, size: 16),
                              label: const Text('Solicitar este Servicio', style: TextStyle(fontWeight: FontWeight.bold)),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              );
            }),
            const SizedBox(height: 14),
          ],

          // Acceso rápido a Despacho en Vivo
          GestureDetector(
            onTap: () => setState(() => _currentTab = 1),
            child: Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: const Color(0xFFF0F9FF),
                border: Border.all(color: const Color(0xFFBAE6FD)),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                children: [
                  Container(
                    width: 38,
                    height: 38,
                    decoration: BoxDecoration(
                      color: const Color(0xFF0284C7),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Icon(Icons.flash_on, color: Colors.white),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Despacho Rápido en Vivo', style: GoogleFonts.outfit(color: const Color(0xFF0F172A), fontWeight: FontWeight.bold, fontSize: 13)),
                        const Text('Asignación inmediata por cercanía en Santa Cruz', style: TextStyle(color: Color(0xFF64748B), fontSize: 11)),
                      ],
                    ),
                  ),
                  const Icon(Icons.arrow_forward_ios, color: Color(0xFF0284C7), size: 14),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),

          // =================================================================
          // SECCIÓN 2: EMPRESAS ALIADAS CON MENÚ DE SERVICIOS
          // =================================================================
          if (_filtroMarketplace != 'SERVICIOS') ...[
            Text(
              'EMPRESAS DE LIMPIEZA CERTIFICADAS',
              style: GoogleFonts.outfit(color: const Color(0xFF475569), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 0.5),
            ),
            const SizedBox(height: 12),

            ..._empresas.map((emp) {
              String coverUrl = _imagenes['empresaBrillante']!;
              final nombre = emp['nombre_comercial']?.toString().toLowerCase() ?? '';
              if (nombre.contains('eco')) coverUrl = _imagenes['empresaEco']!;
              if (nombre.contains('pro')) coverUrl = _imagenes['empresaPro']!;
              final logoUrl = emp['logo_url']?.toString();
              final List<dynamic> serviciosEmpresa = (emp['servicios'] as List<dynamic>?) ?? [];

              return Container(
                margin: const EdgeInsets.only(bottom: 20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.04),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ClipRRect(
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
                      child: Image.network(
                        coverUrl,
                        height: 120,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) => Container(height: 120, color: const Color(0xFFE2E8F0)),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(14),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              if (logoUrl != null && logoUrl.isNotEmpty) ...[
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(10),
                                  child: Image.network(
                                    logoUrl,
                                    width: 38,
                                    height: 38,
                                    fit: BoxFit.cover,
                                    errorBuilder: (_, __, ___) => Container(
                                      width: 38,
                                      height: 38,
                                      decoration: BoxDecoration(
                                        color: const Color(0xFFE0F2FE),
                                        borderRadius: BorderRadius.circular(10),
                                      ),
                                      child: const Icon(Icons.business, color: Color(0xFF0284C7), size: 20),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 10),
                              ],
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      emp['nombre_comercial'] ?? 'Empresa de Limpieza',
                                      style: GoogleFonts.outfit(fontSize: 15, fontWeight: FontWeight.bold, color: const Color(0xFF0F172A)),
                                    ),
                                    Text(
                                      emp['nit'] != null && emp['nit'].toString().isNotEmpty
                                          ? 'NIT: ${emp['nit']} • Empresa Verificada'
                                          : 'Equipetrol y Urubó • Empresa Verificada',
                                      style: const TextStyle(color: Color(0xFF64748B), fontSize: 11),
                                    ),
                                  ],
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFECFDF5),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Row(
                                  children: const [
                                    Icon(Icons.star, color: Color(0xFFF59E0B), size: 14),
                                    SizedBox(width: 4),
                                    Text('4.9', style: TextStyle(color: Color(0xFF059669), fontSize: 11, fontWeight: FontWeight.bold)),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          const Text(
                            'Personal verificado con uniforme, credencial e insumos biodegradables.',
                            style: TextStyle(color: Color(0xFF64748B), fontSize: 11),
                          ),
                          const SizedBox(height: 14),

                          // Menú de Servicios Específicos de esta Empresa
                          Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: const Color(0xFFF8FAFC),
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(color: const Color(0xFFE2E8F0)),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      'SERVICIOS OFRECIDOS POR ESTA EMPRESA:',
                                      style: GoogleFonts.outfit(fontSize: 10, fontWeight: FontWeight.bold, color: const Color(0xFF475569), letterSpacing: 0.5),
                                    ),
                                    Text(
                                      '${serviciosEmpresa.isNotEmpty ? serviciosEmpresa.length : 3} disponibles',
                                      style: const TextStyle(fontSize: 10, color: Color(0xFF0284C7), fontWeight: FontWeight.bold),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 8),

                                // Lista o Chips de Servicios de la Empresa
                                ...(serviciosEmpresa.isNotEmpty
                                    ? serviciosEmpresa
                                    : [
                                        {
                                          'nombre': 'Limpieza General Express',
                                          'precio': 95,
                                          'duracion_minutos': 180,
                                          'imagen_url': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80',
                                        },
                                        {
                                          'nombre': 'Limpieza Profunda & Desinfección',
                                          'precio': 180,
                                          'duracion_minutos': 240,
                                          'imagen_url': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80',
                                        },
                                        {
                                          'nombre': 'Lavado y Sanitización de Tapizados',
                                          'precio': 120,
                                          'duracion_minutos': 120,
                                          'imagen_url': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80',
                                        }
                                      ]
                                ).map((s) {
                                  final sMap = Map<String, dynamic>.from(s);
                                  final sFoto = sMap['imagen_url'] ?? sMap['icono_url'] ?? _imagenes['catDeptos']!;
                                  final sPrecio = sMap['precio'] ?? sMap['precio_base'] ?? 95;

                                  return Container(
                                    margin: const EdgeInsets.only(bottom: 8),
                                    padding: const EdgeInsets.all(8),
                                    decoration: BoxDecoration(
                                      color: Colors.white,
                                      borderRadius: BorderRadius.circular(10),
                                      border: Border.all(color: const Color(0xFFE2E8F0)),
                                    ),
                                    child: Row(
                                      children: [
                                        ClipRRect(
                                          borderRadius: BorderRadius.circular(8),
                                          child: Image.network(
                                            sFoto,
                                            width: 44,
                                            height: 44,
                                            fit: BoxFit.cover,
                                            errorBuilder: (_, __, ___) => Container(width: 44, height: 44, color: const Color(0xFFE0F2FE)),
                                          ),
                                        ),
                                        const SizedBox(width: 10),
                                        Expanded(
                                          child: Column(
                                            crossAxisAlignment: CrossAxisAlignment.start,
                                            children: [
                                              Text(
                                                sMap['nombre'] ?? 'Servicio',
                                                style: GoogleFonts.inter(fontWeight: FontWeight.bold, fontSize: 12, color: const Color(0xFF0F172A)),
                                                maxLines: 1,
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                              Text(
                                                'Tarifa fija: $sPrecio BOB',
                                                style: const TextStyle(fontSize: 11, color: Color(0xFF059669), fontWeight: FontWeight.w700),
                                              ),
                                            ],
                                          ),
                                        ),
                                        ElevatedButton(
                                          style: ElevatedButton.styleFrom(
                                            backgroundColor: const Color(0xFF0284C7),
                                            foregroundColor: Colors.white,
                                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                                            minimumSize: Size.zero,
                                            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                          ),
                                          onPressed: () => _abrirModalConfiguracion(sMap, emp),
                                          child: const Text('Elegir', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                                        ),
                                      ],
                                    ),
                                  );
                                }),
                              ],
                            ),
                          ),
                          const SizedBox(height: 12),

                          SizedBox(
                            width: double.infinity,
                            child: OutlinedButton.icon(
                              style: OutlinedButton.styleFrom(
                                side: const BorderSide(color: Color(0xFF0284C7)),
                                foregroundColor: const Color(0xFF0284C7),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                padding: const EdgeInsets.symmetric(vertical: 12),
                              ),
                              onPressed: () {
                                if (_servicios.isNotEmpty) {
                                  _abrirModalConfiguracion(_servicios[0], emp);
                                } else {
                                  _abrirModalConfiguracion(_serviciosPorDefecto[0], emp);
                                }
                              },
                              icon: const Icon(Icons.auto_awesome, size: 16),
                              label: const Text('Cotización a Medida', style: TextStyle(fontWeight: FontWeight.bold)),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              );
            }),
          ],
        ],
      ),
    );
  }

  Widget _buildSegmentButton(String value, String label) {
    final isSelected = _filtroMarketplace == value;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _filtroMarketplace = value),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            color: isSelected ? Colors.white : Colors.transparent,
            borderRadius: BorderRadius.circular(10),
            boxShadow: isSelected
                ? [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.05),
                      blurRadius: 4,
                      offset: const Offset(0, 2),
                    ),
                  ]
                : null,
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(
              fontSize: 12,
              fontWeight: isSelected ? FontWeight.bold : FontWeight.w600,
              color: isSelected ? const Color(0xFF0284C7) : const Color(0xFF64748B),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildCategoryCard(String title, String imageUrl, [VoidCallback? onTap]) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 105,
        margin: const EdgeInsets.only(right: 12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFFE2E8F0)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.03),
              blurRadius: 6,
            ),
          ],
        ),
        child: Column(
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
              child: Image.network(
                imageUrl,
                height: 62,
                width: 105,
                fit: BoxFit.cover,
                errorBuilder: (_, __, ___) => Container(
                  height: 62,
                  color: const Color(0xFFE0F2FE),
                  child: const Center(child: Icon(Icons.cleaning_services, color: Color(0xFF0284C7), size: 24)),
                ),
              ),
            ),
            const SizedBox(height: 6),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 4),
              child: Text(
                title,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: GoogleFonts.inter(fontSize: 11, fontWeight: FontWeight.bold, color: const Color(0xFF0F172A)),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }

  // =========================================================================
  // PESTAÑA 2: MAPA EN VIVO
  // =========================================================================
  Widget _buildMapTab() {
    return Stack(
      children: [
        FlutterMap(
          mapController: _mapController,
          options: MapOptions(
            initialCenter: _santaCruzCoords,
            initialZoom: 15.0,
          ),
          children: [
            TileLayer(
              urlTemplate: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
              subdomains: const ['a', 'b', 'c', 'd'],
            ),
            MarkerLayer(
              markers: [
                Marker(
                  point: _santaCruzCoords,
                  width: 45,
                  height: 45,
                  child: Container(
                    decoration: const BoxDecoration(
                      color: Color(0xFF0284C7),
                      shape: BoxShape.circle,
                      boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 8)],
                    ),
                    child: const Icon(Icons.home, color: Colors.white, size: 24),
                  ),
                ),
                Marker(
                  point: const LatLng(-17.7748, -63.1935),
                  width: 40,
                  height: 40,
                  child: Container(
                    decoration: const BoxDecoration(
                      color: Color(0xFF10B981),
                      shape: BoxShape.circle,
                      boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 6)],
                    ),
                    child: const Icon(Icons.cleaning_services, color: Colors.white, size: 20),
                  ),
                ),
              ],
            ),
          ],
        ),

        // Floating Header
        Positioned(
          top: 50,
          left: 16,
          right: 16,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(30),
              boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 10)],
            ),
            child: Row(
              children: [
                const Icon(Icons.location_pin, color: Color(0xFF0284C7)),
                const SizedBox(width: 8),
                Expanded(
                  child: Text('Equipetrol Norte, Santa Cruz', style: GoogleFonts.outfit(fontWeight: FontWeight.bold, fontSize: 13)),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(color: const Color(0xFFECFDF5), borderRadius: BorderRadius.circular(12)),
                  child: const Text('3 cerca', style: TextStyle(fontSize: 10, color: Color(0xFF059669), fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
        ),

        // Bottom CTA de Pedido
        Positioned(
          bottom: 20,
          left: 16,
          right: 16,
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF0284C7),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              elevation: 6,
            ),
            onPressed: () {
              if (_servicios.isNotEmpty) {
                _abrirModalConfiguracion(_servicios[0]);
              }
            },
            child: const Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.cleaning_services_rounded, size: 20),
                SizedBox(width: 8),
                Text('Solicitar Limpieza Inmediata', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              ],
            ),
          ),
        ),

        // Overlay de radar cuando está buscando
        if (_screenEstado == 'buscando')
          Container(
            color: Colors.black54,
            child: Center(
              child: Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: const [
                    CircularProgressIndicator(color: Color(0xFF0284C7)),
                    SizedBox(height: 16),
                    Text('Conectando con la empresa...', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                    SizedBox(height: 6),
                    Text('Designando al personal especializado', style: TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                  ],
                ),
              ),
            ),
          ),
      ],
    );
  }

  // =========================================================================
  // PESTAÑA 3: SEGUIMIENTO Y EVIDENCIAS FOTOGRÁFICAS (ANTES Y DESPUÉS)
  // =========================================================================
  Widget _buildTrackingTab() {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(
            'SEGUIMIENTO DE SERVICIO EN VIVO',
            style: GoogleFonts.outfit(color: const Color(0xFF475569), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 0.5),
          ),
          const SizedBox(height: 14),

          // Tarjeta de Estado
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFFE2E8F0)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.03),
                  blurRadius: 10,
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.check_circle, color: Color(0xFF10B981)),
                    const SizedBox(width: 8),
                    Text('Orden: ${_ordenActiva?['codigo_seguimiento'] ?? 'LG-89412A'}', style: GoogleFonts.outfit(fontWeight: FontWeight.bold, fontSize: 15)),
                    const Spacer(),
                    Text('${_ordenActiva?['monto_total'] ?? 135} BOB', style: const TextStyle(color: Color(0xFF0284C7), fontWeight: FontWeight.w900, fontSize: 16)),
                  ],
                ),
                const Divider(height: 24),
                _buildTimelineStep('Empresa Designada', '16:30', true),
                _buildTimelineStep('Personal en Camino', '16:34', true),
                _buildTimelineStep('En Puerta / Recepción', '16:38', _estadoOrden == 'LLEGUE' || _estadoOrden == 'EN_PROCESO' || _estadoOrden == 'COMPLETADA'),
                _buildTimelineStep('Limpiando Activamente', 'En curso', _estadoOrden == 'EN_PROCESO' || _estadoOrden == 'COMPLETADA'),
                _buildTimelineStep('Finalizado con Evidencias', 'Pendiente', _estadoOrden == 'COMPLETADA'),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Ficha del Limpiador
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Row(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(50),
                  child: Image.network(
                    _imagenes['workerAvatar']!,
                    width: 54,
                    height: 54,
                    fit: BoxFit.cover,
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _trabajadorAsignado?['nombre'] ?? 'María Elena Quispe',
                        style: GoogleFonts.outfit(fontSize: 15, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        _trabajadorAsignado?['empresa'] ?? 'Limpiezas Brillante Express',
                        style: const TextStyle(color: Color(0xFF64748B), fontSize: 11),
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: const [
                          Icon(Icons.star, color: Color(0xFFF59E0B), size: 14),
                          SizedBox(width: 4),
                          Text('4.9 (158 limpiezas)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.phone, color: Color(0xFF0284C7)),
                  onPressed: () {},
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Evidencias Fotográficas de la Limpieza (Antes y Después)
          Text(
            'EVIDENCIAS FOTOGRÁFICAS CERTIFICADAS',
            style: GoogleFonts.outfit(color: const Color(0xFF475569), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 0.5),
          ),
          const SizedBox(height: 12),

          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(14),
                      child: Image.network(
                        _imagenes['evidenceBefore']!,
                        height: 110,
                        width: double.infinity,
                        fit: BoxFit.cover,
                      ),
                    ),
                    const SizedBox(height: 4),
                    const Text('⚠️ ANTES DE LIMPIAR', style: TextStyle(color: Colors.red, fontSize: 10, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(14),
                      child: Image.network(
                        _imagenes['evidenceAfter']!,
                        height: 110,
                        width: double.infinity,
                        fit: BoxFit.cover,
                      ),
                    ),
                    const SizedBox(height: 4),
                    const Text('✨ DESPUÉS (100% LIMPIO)', style: TextStyle(color: Color(0xFF059669), fontSize: 10, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTimelineStep(String label, String time, bool active) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          Icon(active ? Icons.radio_button_checked : Icons.radio_button_unchecked,
              size: 16, color: active ? const Color(0xFF0284C7) : const Color(0xFFCBD5E1)),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              label,
              style: TextStyle(
                fontSize: 13,
                fontWeight: active ? FontWeight.bold : FontWeight.normal,
                color: active ? const Color(0xFF0F172A) : const Color(0xFF94A3B8),
              ),
            ),
          ),
          Text(time, style: const TextStyle(fontSize: 11, color: Color(0xFF94A3B8))),
        ],
      ),
    );
  }

  // =========================================================================
  // PESTAÑA 4: PERFIL Y CUENTA
  // =========================================================================
  Widget _buildProfileTab() {
    final String name = _userData['name']?.isNotEmpty == true ? _userData['name']! : 'Cliente LimpyGo';
    final String email = _userData['email']?.isNotEmpty == true ? _userData['email']! : 'cliente@example.com';
    final String initials = name.split(' ').map((p) => p.isNotEmpty ? p[0] : '').take(2).join().toUpperCase();

    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Tarjeta de Perfil
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFFE2E8F0)),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF0F172A).withValues(alpha: 0.04),
                  blurRadius: 12,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 30,
                  backgroundColor: const Color(0xFFE0F2FE),
                  child: Text(
                    initials.isNotEmpty ? initials : 'LG',
                    style: const TextStyle(color: Color(0xFF0284C7), fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(name, style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold)),
                      Text(email, style: const TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                      const SizedBox(height: 4),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(color: const Color(0xFFECFDF5), borderRadius: BorderRadius.circular(6)),
                        child: const Text('Cliente VIP Verificado', style: TextStyle(fontSize: 10, color: Color(0xFF059669), fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Opciones de Configuración
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Column(
              children: [
                _buildProfileMenuItem(
                  icon: Icons.location_on_outlined,
                  title: 'Mis Direcciones Guardadas',
                  subtitle: 'Casa, Oficina, Departamento',
                  onTap: () {},
                ),
                const Divider(height: 1, indent: 56),
                _buildProfileMenuItem(
                  icon: Icons.receipt_long_outlined,
                  title: 'Historial de Servicios',
                  subtitle: 'Órdenes anteriores y facturas',
                  onTap: () => setState(() => _currentTab = 2),
                ),
                const Divider(height: 1, indent: 56),
                _buildProfileMenuItem(
                  icon: Icons.payment_outlined,
                  title: 'Métodos de Pago',
                  subtitle: 'QR Transferencia, Efectivo, Tarjeta',
                  onTap: () {},
                ),
                const Divider(height: 1, indent: 56),
                _buildProfileMenuItem(
                  icon: Icons.headset_mic_outlined,
                  title: 'Soporte y Ayuda 24/7',
                  subtitle: 'Hablar con un asesor de operaciones',
                  onTap: () {},
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Botón Cerrar Sesión
          SizedBox(
            width: double.infinity,
            height: 50,
            child: OutlinedButton.icon(
              onPressed: () async {
                final confirm = await showDialog<bool>(
                  context: context,
                  builder: (ctx) => AlertDialog(
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    title: const Text('¿Cerrar Sesión?'),
                    content: const Text('Tendrás que volver a autenticarte para solicitar servicios de limpieza.'),
                    actions: [
                      TextButton(
                        onPressed: () => Navigator.pop(ctx, false),
                        child: const Text('Cancelar'),
                      ),
                      ElevatedButton(
                        onPressed: () => Navigator.pop(ctx, true),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFEF4444),
                          foregroundColor: Colors.white,
                        ),
                        child: const Text('Cerrar Sesión'),
                      ),
                    ],
                  ),
                );

                if (confirm == true) {
                  await _apiService.logout();
                  if (mounted) {
                    Navigator.of(context).pushAndRemoveUntil(
                      MaterialPageRoute(builder: (_) => const AuthScreen()),
                      (route) => false,
                    );
                  }
                }
              },
              icon: const Icon(Icons.logout_rounded, color: Color(0xFFEF4444), size: 18),
              label: Text(
                'Cerrar Sesión',
                style: GoogleFonts.inter(
                  color: const Color(0xFFEF4444),
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
              style: OutlinedButton.styleFrom(
                side: const BorderSide(color: Color(0xFFFCA5A5)),
                backgroundColor: const Color(0xFFFEF2F2),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
          ),
          const SizedBox(height: 12),
          Center(
            child: Text(
              'LimpyGo Mobile v1.0.0 (Build 101)',
              style: GoogleFonts.inter(fontSize: 11, color: const Color(0xFF94A3B8)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileMenuItem({
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: const Color(0xFFF0F9FF),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(icon, color: const Color(0xFF0284C7), size: 20),
      ),
      title: Text(title, style: GoogleFonts.inter(fontWeight: FontWeight.w600, fontSize: 14)),
      subtitle: Text(subtitle, style: const TextStyle(fontSize: 12, color: Color(0xFF64748B))),
      trailing: const Icon(Icons.chevron_right, size: 20, color: Color(0xFF94A3B8)),
      onTap: onTap,
    );
  }

  // =========================================================================
  // MODAL DE CONFIGURACIÓN DEL SERVICIO
  // =========================================================================
  Widget _buildModalConfiguracion(BuildContext ctx) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.85,
      padding: const EdgeInsets.all(20),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      child: Column(
        children: [
          Container(width: 40, height: 4, decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(2))),
          const SizedBox(height: 14),
          if (_servicioSeleccionado != null && (_servicioSeleccionado!['imagen_url'] != null || _servicioSeleccionado!['icono_url'] != null)) ...[
            ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: Image.network(
                _servicioSeleccionado!['imagen_url'] ?? _servicioSeleccionado!['icono_url'],
                height: 110,
                width: double.infinity,
                fit: BoxFit.cover,
                errorBuilder: (_, __, ___) => const SizedBox.shrink(),
              ),
            ),
            const SizedBox(height: 12),
          ],
          Text(
            _servicioSeleccionado?['nombre'] ?? 'Personalizar Limpieza',
            style: GoogleFonts.outfit(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 14),
          Expanded(
            child: ListView(
              children: [
                // Steppers de ambientes
                ..._ambientes.map((amb) {
                  final cant = _cantidadesAmbientes[amb['id']] ?? 0;
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(amb['nombre'] ?? '', style: const TextStyle(fontWeight: FontWeight.w600)),
                        Row(
                          children: [
                            IconButton(
                              icon: const Icon(Icons.remove_circle_outline),
                              onPressed: cant > 0 ? () {
                                setState(() => _cantidadesAmbientes[amb['id']] = cant - 1);
                                _actualizarCotizacion();
                              } : null,
                            ),
                            Text('$cant', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                            IconButton(
                              icon: const Icon(Icons.add_circle_outline, color: Color(0xFF0284C7)),
                              onPressed: () {
                                setState(() => _cantidadesAmbientes[amb['id']] = cant + 1);
                                _actualizarCotizacion();
                              },
                            ),
                          ],
                        ),
                      ],
                    ),
                  );
                }),
                if (_extras.isNotEmpty) ...[
                  const Divider(height: 24),
                  const Text('Tareas Especiales Opcionales', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: _extras.map((ex) {
                      final isSelected = _extrasSeleccionados.contains(ex['id']);
                      return FilterChip(
                        label: Text('${ex['nombre']} (+${ex['precio_adicional']} BOB)', style: const TextStyle(fontSize: 11)),
                        selected: isSelected,
                        selectedColor: const Color(0xFFE0F2FE),
                        checkmarkColor: const Color(0xFF0284C7),
                        onSelected: (val) {
                          setState(() {
                            if (val) {
                              _extrasSeleccionados.add(ex['id']);
                            } else {
                              _extrasSeleccionados.remove(ex['id']);
                            }
                          });
                          _actualizarCotizacion();
                        },
                      );
                    }).toList(),
                  ),
                ],
              ],
            ),
          ),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF0284C7),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
              onPressed: _iniciarSolicitud,
              child: _loadingCotizacion
                  ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                  : Text(
                      'Confirmar Pedido (${_cotizacion?['costos']?['monto_total'] ?? 135} BOB)',
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
            ),
          ),
        ],
      ),
    );
  }
}
