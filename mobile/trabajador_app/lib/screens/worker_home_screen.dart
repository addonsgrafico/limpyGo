import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import '../services/worker_api_service.dart';

class WorkerHomeScreen extends StatefulWidget {
  const WorkerHomeScreen({super.key});

  @override
  State<WorkerHomeScreen> createState() => _WorkerHomeScreenState();
}

class _WorkerHomeScreenState extends State<WorkerHomeScreen> {
  final WorkerApiService _apiService = WorkerApiService();
  final ImagePicker _picker = ImagePicker();

  bool _estaDisponible = true;
  String _estadoActual = 'EN_CAMINO'; // 'EN_CAMINO' | 'LLEGUE' | 'EN_PROCESO' | 'COMPLETADA'
  bool _cargando = false;

  // Evidencias fotográficas
  String? _fotoAntesPath = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80';
  String? _fotoDespuesPath = 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80';

  // Datos del servicio activo
  final Map<String, dynamic> _ordenActiva = {
    'codigo_seguimiento': 'LG-89412A',
    'cliente_nombre': 'Carlos Mendoza',
    'cliente_telefono': '70012345',
    'direccion': 'Av. San Martín #450, Equipetrol, Depto 4B',
    'servicio': 'Limpieza General de Departamento',
    'ambientes_resumen': '2 Dormitorios, 1 Baño, 1 Cocina, 1 Sala (+Horno)',
    'monto_total': 135.0,
    'metodo_pago': 'Efectivo al Limpiador',
    'hora_programada': '10:00 AM',
  };

  // Fotos de demostración en caso de no usar cámara física
  final String _demoAntesUrl = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80';
  final String _demoDespuesUrl = 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80';

  Future<void> _cambiarEstado(String nuevoEstado) async {
    setState(() => _cargando = true);

    await _apiService.cambiarEstado(
      codigo: _ordenActiva['codigo_seguimiento'],
      nuevoEstado: nuevoEstado,
    );

    if (nuevoEstado == 'COMPLETADA') {
      await _apiService.subirEvidencia(
        codigo: _ordenActiva['codigo_seguimiento'],
        codigoArchivo: 'ANTES',
        urlArchivo: _fotoAntesPath ?? _demoAntesUrl,
      );
      await _apiService.subirEvidencia(
        codigo: _ordenActiva['codigo_seguimiento'],
        codigoArchivo: 'DESPUES',
        urlArchivo: _fotoDespuesPath ?? _demoDespuesUrl,
      );
    }

    if (mounted) {
      setState(() {
        _estadoActual = nuevoEstado;
        _cargando = false;
      });

      String mensaje = '';
      if (nuevoEstado == 'LLEGUE') mensaje = '🚪 Has marcado tu llegada en portería/puerta.';
      if (nuevoEstado == 'EN_PROCESO') mensaje = '🧼 Limpieza iniciada. ¡Buen trabajo!';
      if (nuevoEstado == 'COMPLETADA') mensaje = '🎉 ¡Servicio finalizado con éxito!';

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: const Color(0xFF10B981),
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          content: Text(mensaje, style: const TextStyle(fontWeight: FontWeight.bold)),
        ),
      );
    }
  }

  Future<void> _tomarFoto(String tipo) async {
    try {
      final XFile? photo = await _picker.pickImage(source: ImageSource.camera);
      if (photo != null && mounted) {
        setState(() {
          if (tipo == 'ANTES') {
            _fotoAntesPath = photo.path;
          } else {
            _fotoDespuesPath = photo.path;
          }
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: const Color(0xFF10B981),
            behavior: SnackBarBehavior.floating,
            content: Text('📸 Evidencia de $tipo capturada.'),
          ),
        );
      }
    } catch (e) {
      setState(() {
        if (tipo == 'ANTES') {
          _fotoAntesPath = _demoAntesUrl;
        } else {
          _fotoDespuesPath = _demoDespuesUrl;
        }
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: const Color(0xFF0284C7),
            behavior: SnackBarBehavior.floating,
            content: Text('📸 Evidencia de muestra de $tipo adjuntada.'),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: const Color(0xFFF0F9FF),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.cleaning_services_rounded, color: Color(0xFF0284C7), size: 20),
            ),
            const SizedBox(width: 10),
            Text(
              'LimpyGo Profesional',
              style: GoogleFonts.outfit(color: const Color(0xFF0F172A), fontWeight: FontWeight.bold, fontSize: 17),
            ),
          ],
        ),
        actions: [
          Row(
            children: [
              Text(
                _estaDisponible ? 'Disponible' : 'Pausa',
                style: TextStyle(fontSize: 12, color: _estaDisponible ? const Color(0xFF059669) : const Color(0xFF64748B), fontWeight: FontWeight.w600),
              ),
              Switch(
                value: _estaDisponible,
                activeTrackColor: const Color(0xFFA7F3D0),
                activeThumbColor: const Color(0xFF10B981),
                onChanged: (val) => setState(() => _estaDisponible = val),
              ),
              const SizedBox(width: 8),
            ],
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Perfil del Limpiador
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFFE2E8F0)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.03),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Row(
              children: [
                Stack(
                  children: [
                    const CircleAvatar(
                      radius: 28,
                      backgroundColor: Color(0xFFE0F2FE),
                      backgroundImage: NetworkImage('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: Container(
                        width: 14,
                        height: 14,
                        decoration: BoxDecoration(
                          color: const Color(0xFF10B981),
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.white, width: 2),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'María Elena Quispe',
                        style: GoogleFonts.outfit(color: const Color(0xFF0F172A), fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 2),
                      const Text(
                        'Limpiezas Brillante Express S.R.L.',
                        style: TextStyle(color: Color(0xFF64748B), fontSize: 12),
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          const Icon(Icons.star_rounded, color: Color(0xFFF59E0B), size: 16),
                          const SizedBox(width: 4),
                          Text(
                            '4.90 • 158 servicios',
                            style: GoogleFonts.outfit(color: const Color(0xFF0F172A), fontSize: 12, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(
                    color: const Color(0xFFECFDF5),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: const Color(0xFFA7F3D0)),
                  ),
                  child: const Text('EN TURNO', style: TextStyle(color: Color(0xFF059669), fontSize: 11, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Título de Sección Servicio
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'SERVICIO ASIGNADO ACTIVO',
                style: GoogleFonts.outfit(color: const Color(0xFF475569), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 0.8),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                decoration: BoxDecoration(
                  color: const Color(0xFFF0F9FF),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: const Color(0xFFBAE6FD)),
                ),
                child: Text(
                  _ordenActiva['codigo_seguimiento'],
                  style: const TextStyle(color: Color(0xFF0284C7), fontWeight: FontWeight.bold, fontSize: 11),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),

          // Tarjeta de la Orden
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFFE2E8F0)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.04),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Cliente y contacto
                Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: const BoxDecoration(
                        color: Color(0xFFF1F5F9),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.person, color: Color(0xFF64748B), size: 22),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(_ordenActiva['cliente_nombre'], style: const TextStyle(color: Color(0xFF0F172A), fontWeight: FontWeight.bold, fontSize: 15)),
                          Text('Tel: ${_ordenActiva['cliente_telefono']}', style: const TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                        ],
                      ),
                    ),
                    Container(
                      decoration: BoxDecoration(
                        color: const Color(0xFFECFDF5),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: IconButton(
                        icon: const Icon(Icons.phone_rounded, color: Color(0xFF059669), size: 20),
                        onPressed: () {},
                      ),
                    ),
                    const SizedBox(width: 8),
                    Container(
                      decoration: BoxDecoration(
                        color: const Color(0xFFF0F9FF),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: IconButton(
                        icon: const Icon(Icons.chat_bubble_outline_rounded, color: Color(0xFF0284C7), size: 20),
                        onPressed: () {},
                      ),
                    ),
                  ],
                ),
                const Divider(color: Color(0xFFF1F5F9), height: 24),

                // Dirección
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.location_on_rounded, color: Color(0xFF0284C7), size: 20),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(_ordenActiva['direccion'], style: const TextStyle(color: Color(0xFF0F172A), fontSize: 13, fontWeight: FontWeight.w600)),
                          const SizedBox(height: 2),
                          const Text('Equipetrol Norte • Tocar timbre depto 4B', style: TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 14),

                // Detalle del trabajo
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
                      Text(_ordenActiva['servicio'], style: const TextStyle(color: Color(0xFF0284C7), fontWeight: FontWeight.bold, fontSize: 13)),
                      const SizedBox(height: 4),
                      Text(_ordenActiva['ambientes_resumen'], style: const TextStyle(color: Color(0xFF475569), fontSize: 12)),
                      const SizedBox(height: 8),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('Cobro en destino:', style: TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                          Text('${_ordenActiva['monto_total']} BOB (Efectivo)', style: const TextStyle(color: Color(0xFF059669), fontWeight: FontWeight.bold, fontSize: 13)),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 18),

                // Flujo Secuencial de Estado
                Text(
                  'ACCIONES DEL SERVICIO',
                  style: GoogleFonts.outfit(color: const Color(0xFF475569), fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 0.8),
                ),
                const SizedBox(height: 10),

                // Estado 1: En Camino
                _buildActionBtn(
                  step: '1',
                  label: 'EN CAMINO AL DEPARTAMENTO',
                  icon: Icons.directions_car_rounded,
                  color: const Color(0xFF0284C7),
                  isActive: _estadoActual == 'EN_CAMINO',
                  onTap: () => _cambiarEstado('EN_CAMINO'),
                ),

                // Estado 2: Llegué
                _buildActionBtn(
                  step: '2',
                  label: 'MARCAR LLEGADA EN RECEPCIÓN',
                  icon: Icons.meeting_room_rounded,
                  color: const Color(0xFF0284C7),
                  isActive: _estadoActual == 'LLEGUE',
                  onTap: () => _cambiarEstado('LLEGUE'),
                ),

                // Estado 3: Iniciar Limpieza
                _buildActionBtn(
                  step: '3',
                  label: 'INICIAR LIMPIEZA',
                  icon: Icons.play_arrow_rounded,
                  color: const Color(0xFF0284C7),
                  isActive: _estadoActual == 'EN_PROCESO',
                  onTap: () => _cambiarEstado('EN_PROCESO'),
                ),

                const SizedBox(height: 14),

                // Sección de Evidencias Fotográficas
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF0F9FF),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFFBAE6FD)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: const [
                          Icon(Icons.photo_camera_rounded, color: Color(0xFF0284C7), size: 18),
                          SizedBox(width: 8),
                          Text(
                            'EVIDENCIAS FOTOGRÁFICAS OBLIGATORIAS',
                            style: TextStyle(color: Color(0xFF0284C7), fontSize: 11, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Expanded(
                            child: _buildEvidenceCard(
                              label: 'Foto Antes',
                              imageUrl: _fotoAntesPath,
                              onTap: () => _tomarFoto('ANTES'),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: _buildEvidenceCard(
                              label: 'Foto Después',
                              imageUrl: _fotoDespuesPath,
                              onTap: () => _tomarFoto('DESPUES'),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // Estado 4: Finalizar Servicio
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    elevation: 3,
                  ),
                  onPressed: _cargando ? null : () => _cambiarEstado('COMPLETADA'),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.check_circle_rounded, size: 20),
                      const SizedBox(width: 8),
                      Text(
                        'FINALIZAR Y REGISTRAR EVIDENCIAS',
                        style: GoogleFonts.outfit(fontWeight: FontWeight.bold, fontSize: 14),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Resumen de Ganancias
          Text(
            'RESUMEN DE INGRESOS',
            style: GoogleFonts.outfit(color: const Color(0xFF475569), fontSize: 12, fontWeight: FontWeight.bold, letterSpacing: 0.8),
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Ganancias Hoy', style: TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                      const SizedBox(height: 4),
                      Text('270 BOB', style: GoogleFonts.outfit(color: const Color(0xFF0F172A), fontWeight: FontWeight.w900, fontSize: 20)),
                      const Text('2 limpiezas concluidas', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Propinas Directas', style: TextStyle(color: Color(0xFF64748B), fontSize: 12)),
                      const SizedBox(height: 4),
                      Text('+20 BOB', style: GoogleFonts.outfit(color: const Color(0xFF059669), fontWeight: FontWeight.w900, fontSize: 20)),
                      const Text('100% tuyas', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildEvidenceCard({
    required String label,
    required String? imageUrl,
    required VoidCallback onTap,
  }) {
    final bool hasImage = imageUrl != null && imageUrl.isNotEmpty;

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: hasImage ? const Color(0xFF10B981) : const Color(0xFFCBD5E1)),
        ),
        clipBehavior: Clip.antiAlias,
        child: Column(
          children: [
            if (hasImage)
              Stack(
                children: [
                  Image.network(
                    imageUrl,
                    height: 80,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                  Positioned(
                    top: 6,
                    right: 6,
                    child: Container(
                      padding: const EdgeInsets.all(3),
                      decoration: const BoxDecoration(
                        color: Color(0xFF10B981),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.check, size: 12, color: Colors.white),
                    ),
                  ),
                ],
              )
            else
              Container(
                height: 80,
                color: const Color(0xFFF8FAFC),
                child: const Center(
                  child: Icon(Icons.add_a_photo_outlined, color: Color(0xFF94A3B8), size: 26),
                ),
              ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(hasImage ? Icons.check_circle : Icons.camera_alt, size: 13, color: hasImage ? const Color(0xFF059669) : const Color(0xFF64748B)),
                  const SizedBox(width: 4),
                  Text(
                    label,
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: hasImage ? const Color(0xFF059669) : const Color(0xFF475569),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionBtn({
    required String step,
    required String label,
    required IconData icon,
    required Color color,
    required bool isActive,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: isActive ? color : const Color(0xFFF8FAFC),
          foregroundColor: isActive ? Colors.white : const Color(0xFF475569),
          elevation: isActive ? 2 : 0,
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          side: BorderSide(color: isActive ? color : const Color(0xFFE2E8F0)),
        ),
        onPressed: _cargando ? null : onTap,
        child: Row(
          children: [
            Container(
              width: 22,
              height: 22,
              decoration: BoxDecoration(
                color: isActive ? Colors.white.withValues(alpha: 0.25) : const Color(0xFFE2E8F0),
                shape: BoxShape.circle,
              ),
              child: Center(
                child: Text(
                  step,
                  style: TextStyle(color: isActive ? Colors.white : const Color(0xFF475569), fontSize: 11, fontWeight: FontWeight.bold),
                ),
              ),
            ),
            const SizedBox(width: 10),
            Icon(icon, size: 18, color: isActive ? Colors.white : const Color(0xFF64748B)),
            const SizedBox(width: 8),
            Text(label, style: GoogleFonts.outfit(fontSize: 12, fontWeight: FontWeight.bold)),
            const Spacer(),
            if (isActive) const Icon(Icons.check_circle_rounded, size: 18, color: Colors.white),
          ],
        ),
      ),
    );
  }
}
