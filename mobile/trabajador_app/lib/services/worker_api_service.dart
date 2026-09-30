import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../config/api_config.dart';

class WorkerApiService {
  static const String _tokenKey = 'limpygo_worker_token';

  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }

  // Iniciar sesión como trabajador
  Future<Map<String, dynamic>> login({
    String email = 'maria.limpieza@brillante.com',
    String password = 'password',
  }) async {
    try {
      final response = await http.post(
        Uri.parse(ApiConfig.login),
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: jsonEncode({'correo': email, 'password': password}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        if (data['token'] != null) {
          await saveToken(data['token']);
        }
        return {'success': true, 'data': data};
      }
      return {'success': false, 'message': 'Error de autenticación'};
    } catch (e) {
      return {'success': false, 'error': e.toString()};
    }
  }

  // Obtener las órdenes asignadas al trabajador
  Future<Map<String, dynamic>> getMisOrdenes() async {
    try {
      String? token = await getToken();
      if (token == null) {
        final loginRes = await login();
        token = loginRes['data']?['token'];
      }

      final response = await http.get(
        Uri.parse(ApiConfig.misOrdenes),
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      return {'ordenes': []};
    } catch (e) {
      return {'ordenes': []};
    }
  }

  // Actualizar estado de una orden asignada
  Future<bool> cambiarEstado({
    required String codigo,
    required String nuevoEstado,
    String? comentario,
  }) async {
    try {
      String? token = await getToken();
      if (token == null) {
        final loginRes = await login();
        token = loginRes['data']?['token'];
      }

      final response = await http.patch(
        Uri.parse(ApiConfig.cambiarEstado(codigo)),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          'estado_nuevo': nuevoEstado,
          'comentario': comentario ?? 'Estado actualizado desde la App Móvil del Trabajador',
        }),
      );

      return response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }

  // Subir evidencia fotográfica (Antes o Después)
  Future<bool> subirEvidencia({
    required String codigo,
    required String codigoArchivo, // 'ANTES' o 'DESPUES'
    required String urlArchivo,
  }) async {
    try {
      String? token = await getToken();
      if (token == null) {
        final loginRes = await login();
        token = loginRes['data']?['token'];
      }

      final response = await http.post(
        Uri.parse(ApiConfig.subirEvidencia(codigo)),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          'codigo_archivo': codigoArchivo,
          'url_archivo': urlArchivo,
        }),
      );

      return response.statusCode == 201 || response.statusCode == 200;
    } catch (e) {
      return false;
    }
  }
}
