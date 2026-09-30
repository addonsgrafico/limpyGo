import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../config/api_config.dart';

class ApiService {
  static const String _tokenKey = 'limpygo_client_token';

  // Guardar token de autenticación
  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
  }

  // Obtener token almacenado
  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }

  // Guardar datos del usuario
  Future<void> saveUserData(Map<String, dynamic> user) async {
    final prefs = await SharedPreferences.getInstance();
    String name = user['name'] ?? user['nombre'] ?? '';
    if (name.isEmpty && user['cliente'] != null) {
      name = '${user['cliente']['nombres'] ?? ''} ${user['cliente']['apellidos'] ?? ''}'.trim();
    }
    await prefs.setString('limpygo_user_name', name.isNotEmpty ? name : 'Cliente LimpyGo');
    await prefs.setString('limpygo_user_email', user['correo'] ?? user['email'] ?? '');
    if (user['cliente'] != null) {
      await prefs.setString('limpygo_client_id', user['cliente']['id']?.toString() ?? '');
    }
  }

  Future<Map<String, String>> getUserData() async {
    final prefs = await SharedPreferences.getInstance();
    return {
      'name': prefs.getString('limpygo_user_name') ?? '',
      'email': prefs.getString('limpygo_user_email') ?? '',
      'clientId': prefs.getString('limpygo_client_id') ?? '',
    };
  }

  // Cerrar sesión
  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
    await prefs.remove('limpygo_user_name');
    await prefs.remove('limpygo_user_email');
    await prefs.remove('limpygo_client_id');
  }

  // Iniciar sesión
  Future<Map<String, dynamic>> login({
    String email = 'cliente@example.com',
    String password = 'password',
  }) async {
    try {
      final response = await http.post(
        Uri.parse(ApiConfig.login),
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: jsonEncode({'correo': email, 'password': password}),
      );

      final data = jsonDecode(response.body);
      if (response.statusCode == 200) {
        if (data['token'] != null) {
          await saveToken(data['token']);
        }
        if (data['usuario'] != null) {
          final u = Map<String, dynamic>.from(data['usuario']);
          if (data['cliente'] != null) {
            u['cliente'] = data['cliente'];
          }
          await saveUserData(u);
        }
        return {'success': true, 'data': data};
      }
      return {'success': false, 'message': data['message'] ?? data['mensaje'] ?? 'Credenciales incorrectas'};
    } catch (e) {
      return {'success': false, 'message': 'Error de conexión: $e'};
    }
  }

  // Paso 1: Enviar código OTP al Gmail
  Future<Map<String, dynamic>> enviarOtp(String email) async {
    try {
      final response = await http.post(
        Uri.parse(ApiConfig.enviarOtpVerificacion),
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: jsonEncode({'correo': email}),
      );

      final data = jsonDecode(response.body);
      if (response.statusCode == 200) {
        return {
          'success': true,
          'message': data['message'] ?? data['mensaje'],
          'codigo_demo': data['codigo_otp_debug'] ?? data['codigo_demo'],
        };
      }
      return {
        'success': false,
        'message': data['message'] ?? data['mensaje'] ?? 'No se pudo enviar el código OTP',
      };
    } catch (e) {
      return {'success': false, 'message': 'Error de red al enviar OTP: $e'};
    }
  }

  // Paso 2: Verificar OTP y Crear Cuenta
  Future<Map<String, dynamic>> verificarOtpYRegistrar({
    required String email,
    required String codigoOtp,
    required String nombre,
    required String apellido,
    required String telefono,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse(ApiConfig.verificarOtpRegistro),
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: jsonEncode({
          'correo': email,
          'codigo_otp': codigoOtp,
          'nombres': nombre,
          'apellidos': apellido,
          'nombre': nombre,
          'apellido': apellido,
          'telefono': telefono,
          'password': password,
        }),
      );

      final data = jsonDecode(response.body);
      if (response.statusCode == 201 || response.statusCode == 200) {
        if (data['token'] != null) {
          await saveToken(data['token']);
        }
        if (data['usuario'] != null) {
          final u = Map<String, dynamic>.from(data['usuario']);
          if (data['cliente'] != null) {
            u['cliente'] = data['cliente'];
          }
          await saveUserData(u);
        }
        return {'success': true, 'data': data};
      }
      return {
        'success': false,
        'message': data['message'] ?? data['mensaje'] ?? 'Código incorrecto o expirado',
      };
    } catch (e) {
      return {'success': false, 'message': 'Error al verificar registro: $e'};
    }
  }

  // Opción 3: Inicio de Sesión Social (Google o Apple ID)
  Future<Map<String, dynamic>> socialLogin({
    required String provider,
    required String email,
    required String name,
    String? providerId,
    String? avatar,
  }) async {
    try {
      final response = await http.post(
        Uri.parse(ApiConfig.socialLogin),
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: jsonEncode({
          'provider': provider,
          'email': email,
          'name': name,
          'provider_id': providerId,
          'avatar': avatar,
        }),
      );

      final data = jsonDecode(response.body);
      if (response.statusCode == 200) {
        if (data['token'] != null) {
          await saveToken(data['token']);
        }
        if (data['usuario'] != null) {
          final u = Map<String, dynamic>.from(data['usuario']);
          if (data['cliente'] != null) {
            u['cliente'] = data['cliente'];
          }
          await saveUserData(u);
        }
        return {'success': true, 'data': data};
      }
      return {
        'success': false,
        'message': data['message'] ?? data['mensaje'] ?? 'Error en autenticación social',
      };
    } catch (e) {
      return {'success': false, 'message': 'Error en inicio social: $e'};
    }
  }

  // Obtener empresas aliadas verificadas
  Future<List<dynamic>> getEmpresas() async {
    try {
      final response = await http.get(
        Uri.parse(ApiConfig.empresas),
        headers: {'Accept': 'application/json'},
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['empresas'] ?? [];
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  // Obtener catálogo de servicios
  Future<List<dynamic>> getServicios() async {
    try {
      final response = await http.get(
        Uri.parse(ApiConfig.servicios),
        headers: {'Accept': 'application/json'},
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['servicios'] ?? [];
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  // Obtener ambientes configurables (baños, dormitorios, etc.)
  Future<List<dynamic>> getAmbientes(String servicioId) async {
    try {
      final response = await http.get(
        Uri.parse('${ApiConfig.ambientes}?servicio_id=$servicioId'),
        headers: {'Accept': 'application/json'},
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['ambientes'] ?? [];
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  // Obtener extras
  Future<List<dynamic>> getExtras(String servicioId) async {
    try {
      final response = await http.get(
        Uri.parse('${ApiConfig.extras}?servicio_id=$servicioId'),
        headers: {'Accept': 'application/json'},
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['extras'] ?? [];
      }
      return [];
    } catch (e) {
      return [];
    }
  }

  // Cotizar en tiempo real
  Future<Map<String, dynamic>?> cotizar({
    required String servicioId,
    required List<Map<String, dynamic>> ambientes,
    required List<String> extras,
    String? cuponCodigo,
  }) async {
    try {
      final response = await http.post(
        Uri.parse(ApiConfig.cotizar),
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: jsonEncode({
          'servicio_id': servicioId,
          'ambientes': ambientes,
          'extras': extras,
          'cupon_codigo': cuponCodigo,
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  // Crear orden oficial
  Future<Map<String, dynamic>> crearOrden({
    required String servicioId,
    required String direccionTexto,
    required double lat,
    required double lng,
    required List<Map<String, dynamic>> ambientes,
    required List<String> extras,
    String? cuponCodigo,
    String? notas,
  }) async {
    try {
      // Asegurar sesión
      String? token = await getToken();
      if (token == null) {
        final loginRes = await login();
        token = loginRes['data']?['token'];
      }

      // Guardar dirección
      final dirRes = await http.post(
        Uri.parse(ApiConfig.direcciones),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          'alias': 'Mi Departamento',
          'direccion_completa': direccionTexto,
          'ciudad': 'Santa Cruz de la Sierra',
          'latitud': lat,
          'longitud': lng,
          'es_predeterminada': true,
        }),
      );
      final dirData = jsonDecode(dirRes.body);
      final dirId = dirData['direccion']?['id'];

      // Crear la orden
      final ordenRes = await http.post(
        Uri.parse(ApiConfig.ordenes),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          'servicio_id': servicioId,
          'direccion_id': dirId,
          'fecha_programada': DateTime.now().toIso8601String().split('T')[0],
          'hora_programada': '10:00:00',
          'ambientes': ambientes,
          'extras': extras,
          'cupon_codigo': cuponCodigo,
          'observaciones': notas ?? 'Solicitado desde LimpyGo Mobile Flutter',
        }),
      );

      if (ordenRes.statusCode == 201 || ordenRes.statusCode == 200) {
        return {'success': true, 'orden': jsonDecode(ordenRes.body)['orden']};
      }
      return {'success': false, 'message': 'Error creando la orden'};
    } catch (e) {
      return {'success': false, 'error': e.toString()};
    }
  }

  // Consultar estado de seguimiento de la orden
  Future<Map<String, dynamic>?> getTracking(String codigo) async {
    try {
      String? token = await getToken();
      if (token == null) {
        final loginRes = await login();
        token = loginRes['data']?['token'];
      }

      final response = await http.get(
        Uri.parse(ApiConfig.detalleOrden(codigo)),
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}
