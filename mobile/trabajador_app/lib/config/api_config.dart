import 'package:flutter/foundation.dart';

class ApiConfig {
  // Base URL adaptativa: localhost en Web/Windows y 10.0.2.2 en Emulador Android
  static String get baseUrl =>
      kIsWeb ? 'http://localhost:8000/api/v1' : 'http://10.0.2.2:8000/api/v1';

  static String get login => '$baseUrl/auth/login';
  static String get perfil => '$baseUrl/auth/perfil';

  // Endpoints del Trabajador
  static String get misOrdenes => '$baseUrl/trabajador/mis-ordenes';
  static String cambiarEstado(String codigo) => '$baseUrl/trabajador/ordenes/$codigo/estado';
  static String subirEvidencia(String codigo) => '$baseUrl/trabajador/ordenes/$codigo/evidencias';
}
