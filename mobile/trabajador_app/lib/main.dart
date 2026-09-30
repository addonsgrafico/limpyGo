import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/worker_home_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const LimpyGoWorkerApp());
}

class LimpyGoWorkerApp extends StatelessWidget {
  const LimpyGoWorkerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LimpyGo Profesionales',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.light,
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        primaryColor: const Color(0xFF0284C7),
        colorScheme: const ColorScheme.light(
          primary: Color(0xFF0284C7),
          secondary: Color(0xFF10B981),
          surface: Colors.white,
          onSurface: Color(0xFF0F172A),
        ),
        textTheme: GoogleFonts.interTextTheme(ThemeData.light().textTheme),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          foregroundColor: Color(0xFF0F172A),
          elevation: 0,
        ),
      ),
      home: const WorkerHomeScreen(),
    );
  }
}
