import 'package:flutter/foundation.dart';

class ApiConfig {
  // URL oficial del Backend de Producción en Render
  static const String productionUrl = 'https://limpygo.onrender.com/api/v1';

  // Usar producción para el APK conectado a Render
  static String get baseUrl => productionUrl;

  static String get login => '$baseUrl/auth/login';
  static String get perfil => '$baseUrl/auth/perfil';

  // Endpoints del Trabajador
  static String get misOrdenes => '$baseUrl/trabajador/mis-ordenes';
  static String cambiarEstado(String codigo) => '$baseUrl/trabajador/ordenes/$codigo/estado';
  static String subirEvidencia(String codigo) => '$baseUrl/trabajador/ordenes/$codigo/evidencias';
}
