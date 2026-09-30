import 'package:flutter/foundation.dart';

class ApiConfig {
  // Base URL adaptativa: localhost en Web/Windows y 10.0.2.2 en Emulador Android
  static String get baseUrl =>
      kIsWeb ? 'http://localhost:8000/api/v1' : 'http://10.0.2.2:8000/api/v1';

  // Rutas de autenticación
  static String get login => '$baseUrl/auth/login';
  static String get registroCliente => '$baseUrl/auth/registro-cliente';
  static String get enviarOtpVerificacion => '$baseUrl/auth/enviar-otp-verificacion';
  static String get verificarOtpRegistro => '$baseUrl/auth/verificar-otp-registro';
  static String get socialLogin => '$baseUrl/auth/social-login';
  static String get perfil => '$baseUrl/auth/perfil';

  // Rutas de catálogo y cotización
  static String get servicios => '$baseUrl/cliente/servicios';
  static String get empresas => '$baseUrl/cliente/empresas';
  static String get ambientes => '$baseUrl/cliente/ambientes';
  static String get extras => '$baseUrl/cliente/extras';
  static String get cotizar => '$baseUrl/cliente/cotizar';

  // Rutas de órdenes y seguimiento
  static String get ordenes => '$baseUrl/cliente/ordenes';
  static String get direcciones => '$baseUrl/cliente/direcciones';

  static String detalleOrden(String codigo) => '$baseUrl/cliente/ordenes/$codigo';
  static String calificarOrden(String codigo) => '$baseUrl/cliente/ordenes/$codigo/calificar';
}
