import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/auth_screen.dart';
import 'screens/home_screen.dart';
import 'services/api_service.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const LimpyGoClientApp());
}

class LimpyGoClientApp extends StatelessWidget {
  const LimpyGoClientApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LimpyGo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.light,
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        primaryColor: const Color(0xFF0284C7),
        colorScheme: const ColorScheme.light(
          primary: Color(0xFF0284C7),
          secondary: Color(0xFF10B981),
          surface: Colors.white,
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          elevation: 0,
          iconTheme: IconThemeData(color: Color(0xFF0F172A)),
        ),
        textTheme: GoogleFonts.interTextTheme(ThemeData.light().textTheme),
      ),
      home: const AuthGate(),
    );
  }
}

class AuthGate extends StatefulWidget {
  const AuthGate({super.key});

  @override
  State<AuthGate> createState() => _AuthGateState();
}

class _AuthGateState extends State<AuthGate> {
  final ApiService _apiService = ApiService();
  bool _checkingAuth = true;
  bool _isAuthenticated = false;

  @override
  void initState() {
    super.initState();
    _checkToken();
  }

  Future<void> _checkToken() async {
    final token = await _apiService.getToken();
    if (mounted) {
      setState(() {
        _isAuthenticated = token != null && token.isNotEmpty;
        _checkingAuth = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_checkingAuth) {
      return const Scaffold(
        backgroundColor: Color(0xFFF8FAFC),
        body: Center(
          child: CircularProgressIndicator(
            color: Color(0xFF0284C7),
            strokeWidth: 3,
          ),
        ),
      );
    }

    // Si ya tiene sesión activa va a HomeScreen, sino a la pantalla de Auth y Onboarding
    return _isAuthenticated ? const HomeScreen() : const AuthScreen();
  }
}
