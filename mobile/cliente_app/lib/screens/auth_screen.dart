import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../services/api_service.dart';
import 'home_screen.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> with SingleTickerProviderStateMixin {
  final ApiService _apiService = ApiService();
  late TabController _tabController;

  // Login Controllers
  final _loginEmailController = TextEditingController(text: 'cliente@example.com');
  final _loginPasswordController = TextEditingController(text: 'password');
  bool _obscureLoginPassword = true;

  // Register Controllers
  final _regNombreController = TextEditingController();
  final _regApellidoController = TextEditingController();
  final _regTelefonoController = TextEditingController();
  final _regEmailController = TextEditingController();
  final _regPasswordController = TextEditingController();
  bool _obscureRegPassword = true;

  // OTP Verification State
  final List<TextEditingController> _otpControllers = List.generate(6, (_) => TextEditingController());
  final List<FocusNode> _otpFocusNodes = List.generate(6, (_) => FocusNode());
  Timer? _resendTimer;
  int _secondsRemaining = 60;
  bool _canResend = false;

  bool _isLoading = false;

  // Palette Constants
  static const Color primarySky = Color(0xFF0284C7);
  static const Color primaryNavy = Color(0xFF0F172A);
  static const Color accentMint = Color(0xFF10B981);
  static const Color bgIce = Color(0xFFF0F9FF);
  static const Color surfaceWhite = Color(0xFFFFFFFF);
  static const Color textMuted = Color(0xFF64748B);

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _loginEmailController.dispose();
    _loginPasswordController.dispose();
    _regNombreController.dispose();
    _regApellidoController.dispose();
    _regTelefonoController.dispose();
    _regEmailController.dispose();
    _regPasswordController.dispose();
    for (var c in _otpControllers) {
      c.dispose();
    }
    for (var f in _otpFocusNodes) {
      f.dispose();
    }
    _resendTimer?.cancel();
    super.dispose();
  }

  void _showSnackBar(String message, {bool isError = false}) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            Icon(
              isError ? Icons.error_outline_rounded : Icons.check_circle_outline_rounded,
              color: Colors.white,
              size: 20,
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                message,
                style: GoogleFonts.inter(fontWeight: FontWeight.w500, fontSize: 13),
              ),
            ),
          ],
        ),
        backgroundColor: isError ? const Color(0xFFEF4444) : accentMint,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        margin: const EdgeInsets.all(16),
        duration: const Duration(seconds: 4),
      ),
    );
  }

  Future<void> _navegarAHome() async {
    if (!mounted) return;
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => const HomeScreen()),
    );
  }

  // Action: Iniciar Sesión Email / Password
  Future<void> _iniciarSesion() async {
    final email = _loginEmailController.text.trim();
    final password = _loginPasswordController.text.trim();

    if (email.isEmpty || password.isEmpty) {
      _showSnackBar('Por favor completa todos los campos', isError: true);
      return;
    }

    setState(() => _isLoading = true);
    final res = await _apiService.login(email: email, password: password);
    setState(() => _isLoading = false);

    if (res['success'] == true) {
      _showSnackBar('¡Bienvenido a LimpyGo!');
      await _navegarAHome();
    } else {
      _showSnackBar(res['message'] ?? 'Error al iniciar sesión', isError: true);
    }
  }

  // Action: Iniciar Proceso de Registro -> Enviar OTP
  Future<void> _iniciarRegistroConOtp() async {
    final nombre = _regNombreController.text.trim();
    final apellido = _regApellidoController.text.trim();
    final telefono = _regTelefonoController.text.trim();
    final email = _regEmailController.text.trim();
    final password = _regPasswordController.text.trim();

    if (nombre.isEmpty || apellido.isEmpty || telefono.isEmpty || email.isEmpty || password.isEmpty) {
      _showSnackBar('Por favor llena todos los datos requeridos', isError: true);
      return;
    }

    if (!email.contains('@') || !email.contains('.')) {
      _showSnackBar('Ingresa un correo electrónico válido', isError: true);
      return;
    }

    if (password.length < 6) {
      _showSnackBar('La contraseña debe tener al menos 6 caracteres', isError: true);
      return;
    }

    setState(() => _isLoading = true);
    final res = await _apiService.enviarOtp(email);
    setState(() => _isLoading = false);

    if (res['success'] == true) {
      _startResendTimer();
      _mostrarModalVerificacionOtp(email);
    } else {
      _showSnackBar(res['message'] ?? 'Error al enviar código de verificación', isError: true);
    }
  }

  void _startResendTimer() {
    _resendTimer?.cancel();
    setState(() {
      _secondsRemaining = 60;
      _canResend = false;
    });

    _resendTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsRemaining > 1) {
        setState(() => _secondsRemaining--);
      } else {
        timer.cancel();
        setState(() => _canResend = true);
      }
    });
  }

  // Action: Verificar OTP y finalizar registro
  Future<void> _completarRegistroOtp(String email) async {
    final otpCode = _otpControllers.map((c) => c.text).join().trim();
    if (otpCode.length < 6) {
      _showSnackBar('Ingresa los 6 dígitos del código de verificación', isError: true);
      return;
    }

    setState(() => _isLoading = true);
    final res = await _apiService.verificarOtpYRegistrar(
      email: email,
      codigoOtp: otpCode,
      nombre: _regNombreController.text.trim(),
      apellido: _regApellidoController.text.trim(),
      telefono: _regTelefonoController.text.trim(),
      password: _regPasswordController.text.trim(),
    );
    setState(() => _isLoading = false);

    if (res['success'] == true) {
      if (!mounted) return;
      Navigator.of(context).pop(); // Cierra el modal de OTP
      _showSnackBar('¡Cuenta verificada y creada con éxito!');
      await _navegarAHome();
    } else {
      _showSnackBar(res['message'] ?? 'Código incorrecto o expirado', isError: true);
    }
  }

  // Action: Iniciar Sesión Social (Google o Apple)
  Future<void> _iniciarSocial(String provider) async {
    setState(() => _isLoading = true);

    String mockEmail = provider == 'google' 
        ? 'usuario.google@gmail.com' 
        : 'usuario.apple@icloud.com';
    String mockName = provider == 'google' 
        ? 'Cliente Google Verificado' 
        : 'Cliente Apple ID';

    final res = await _apiService.socialLogin(
      provider: provider,
      email: mockEmail,
      name: mockName,
      providerId: 'sub_${DateTime.now().millisecondsSinceEpoch}',
    );

    setState(() => _isLoading = false);

    if (res['success'] == true) {
      _showSnackBar('Sesión iniciada con éxito vía ${provider == "google" ? "Google" : "Apple ID"}');
      await _navegarAHome();
    } else {
      _showSnackBar(res['message'] ?? 'Error en autenticación social', isError: true);
    }
  }

  // Action: Invitado / Demo Directo
  Future<void> _accesoInvitado() async {
    setState(() => _isLoading = true);
    // Login con cliente de demostración predeterminado
    final res = await _apiService.login(
      email: 'cliente@example.com',
      password: 'password',
    );
    setState(() => _isLoading = false);

    if (res['success'] == true) {
      _showSnackBar('Acceso en Modo Invitado concedido');
      await _navegarAHome();
    } else {
      // Si falla la red, permite entrar al HomeScreen de todas formas
      await _navegarAHome();
    }
  }

  // Modal Dialog: Verificación de Código OTP (Gmail)
  void _mostrarModalVerificacionOtp(String email) {
    // Limpiar controladores OTP
    for (var c in _otpControllers) {
      c.clear();
    }

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (modalContext) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Container(
              padding: EdgeInsets.only(
                bottom: MediaQuery.of(context).viewInsets.bottom + 24,
                top: 24,
                left: 24,
                right: 24,
              ),
              decoration: const BoxDecoration(
                color: surfaceWhite,
                borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
                boxShadow: [
                  BoxShadow(color: Colors.black12, blurRadius: 25, offset: Offset(0, -5))
                ],
              ),
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Indicador de arrastre
                    Container(
                      width: 48,
                      height: 5,
                      decoration: BoxDecoration(
                        color: Colors.grey.shade300,
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Ícono circular con badge de Gmail
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: bgIce,
                        shape: BoxShape.circle,
                        border: Border.all(color: primarySky.withValues(alpha: 0.2), width: 2),
                      ),
                      child: const Icon(
                        Icons.mark_email_read_rounded,
                        color: primarySky,
                        size: 38,
                      ),
                    ),
                    const SizedBox(height: 16),

                    Text(
                      'Verifica tu Correo',
                      style: GoogleFonts.outfit(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        color: primaryNavy,
                      ),
                    ),
                    const SizedBox(height: 8),

                    RichText(
                      textAlign: TextAlign.center,
                      text: TextSpan(
                        style: GoogleFonts.inter(fontSize: 13, color: textMuted),
                        children: [
                          const TextSpan(text: 'Enviamos un código seguro de 6 dígitos a:\n'),
                          TextSpan(
                            text: email,
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              color: primarySky,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Chip de ayuda demo
                    GestureDetector(
                      onTap: () {
                        setModalState(() {
                          final demoDigits = ['1', '2', '3', '4', '5', '6'];
                          for (int i = 0; i < 6; i++) {
                            _otpControllers[i].text = demoDigits[i];
                          }
                        });
                      },
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                        decoration: BoxDecoration(
                          color: const Color(0xFFFEF3C7),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: const Color(0xFFF59E0B).withValues(alpha: 0.4)),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.touch_app_rounded, size: 16, color: Color(0xFFD97706)),
                            const SizedBox(width: 6),
                            Text(
                              'Código universal de prueba: 123456 (Tocar para llenar)',
                              style: GoogleFonts.inter(
                                fontSize: 11,
                                fontWeight: FontWeight.w600,
                                color: const Color(0xFF92400E),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),

                    // 6 Cajas individuales de dígitos OTP
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: List.generate(6, (index) {
                        return SizedBox(
                          width: 44,
                          height: 52,
                          child: TextFormField(
                            controller: _otpControllers[index],
                            focusNode: _otpFocusNodes[index],
                            keyboardType: TextInputType.number,
                            textAlign: TextAlign.center,
                            maxLength: 1,
                            style: GoogleFonts.outfit(
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                              color: primaryNavy,
                            ),
                            decoration: InputDecoration(
                              counterText: '',
                              filled: true,
                              fillColor: bgIce,
                              contentPadding: EdgeInsets.zero,
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12),
                                borderSide: BorderSide(color: Colors.grey.shade200),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(12),
                                borderSide: const BorderSide(color: primarySky, width: 2),
                              ),
                            ),
                            onChanged: (val) {
                              if (val.isNotEmpty && index < 5) {
                                _otpFocusNodes[index + 1].requestFocus();
                              } else if (val.isEmpty && index > 0) {
                                _otpFocusNodes[index - 1].requestFocus();
                              }
                            },
                          ),
                        );
                      }),
                    ),
                    const SizedBox(height: 24),

                    // Temporizador de reenvío
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          '¿No recibiste el código? ',
                          style: GoogleFonts.inter(fontSize: 13, color: textMuted),
                        ),
                        _canResend
                            ? TextButton(
                                onPressed: () async {
                                  await _apiService.enviarOtp(email);
                                  _startResendTimer();
                                  setModalState(() {});
                                  _showSnackBar('Código reenviado');
                                },
                                style: TextButton.styleFrom(
                                  padding: EdgeInsets.zero,
                                  minimumSize: Size.zero,
                                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                ),
                                child: Text(
                                  'Reenviar',
                                  style: GoogleFonts.inter(
                                    fontSize: 13,
                                    fontWeight: FontWeight.bold,
                                    color: primarySky,
                                  ),
                                ),
                              )
                            : Text(
                                'Reenviar en ${_secondsRemaining}s',
                                style: GoogleFonts.inter(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w600,
                                  color: textMuted,
                                ),
                              ),
                      ],
                    ),
                    const SizedBox(height: 24),

                    // Botón de Confirmación y Registro
                    SizedBox(
                      width: double.infinity,
                      height: 52,
                      child: ElevatedButton(
                        onPressed: _isLoading ? null : () => _completarRegistroOtp(email),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: primarySky,
                          foregroundColor: Colors.white,
                          elevation: 0,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        ),
                        child: _isLoading
                            ? const SizedBox(
                                width: 22,
                                height: 22,
                                child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                              )
                            : Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  const Icon(Icons.verified_user_rounded, size: 20),
                                  const SizedBox(width: 8),
                                  Text(
                                    'Verificar y Crear Cuenta',
                                    style: GoogleFonts.inter(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 15,
                                    ),
                                  ),
                                ],
                              ),
                      ),
                    ),
                    const SizedBox(height: 12),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 480),
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
              child: Column(
                children: [
                  const SizedBox(height: 8),

                  // 1. BRAND HERO HEADER
                  _buildBrandHeader(),
                  const SizedBox(height: 24),

                  // 2. SEGMENTED TAB SELECTOR (Iniciar Sesión | Crear Cuenta)
                  _buildTabSwitcher(),
                  const SizedBox(height: 20),

                  // 3. TAB VIEWS EN CARD BLANCO
                  Container(
                    decoration: BoxDecoration(
                      color: surfaceWhite,
                      borderRadius: BorderRadius.circular(24),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFF0F172A).withValues(alpha: 0.06),
                          blurRadius: 20,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    padding: const EdgeInsets.all(22),
                    child: AnimatedSize(
                      duration: const Duration(milliseconds: 250),
                      child: _tabController.index == 0
                          ? _buildLoginForm()
                          : _buildRegisterForm(),
                    ),
                  ),
                  const SizedBox(height: 24),

                  // 4. SOCIAL LOGIN SECTION (Google & Apple ID)
                  _buildSocialSection(),
                  const SizedBox(height: 20),

                  // 5. GUEST / DEMO BUTTON
                  _buildGuestAccessButton(),
                  const SizedBox(height: 16),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  // --- WIDGETS PRIVADOS DE CONSTRUCCIÓN ---

  Widget _buildBrandHeader() {
    return Column(
      children: [
        // Ícono LimpyGo brillante
        Container(
          width: 68,
          height: 68,
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFF0284C7), Color(0xFF0EA5E9), Color(0xFF38BDF8)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: primarySky.withValues(alpha: 0.35),
                blurRadius: 18,
                offset: const Offset(0, 8),
              ),
            ],
          ),
          child: const Center(
            child: Icon(Icons.cleaning_services_rounded, color: Colors.white, size: 36),
          ),
        ),
        const SizedBox(height: 14),

        RichText(
          text: TextSpan(
            text: 'Limpy',
            style: GoogleFonts.outfit(
              fontSize: 28,
              fontWeight: FontWeight.w800,
              color: primaryNavy,
              letterSpacing: -0.5,
            ),
            children: const [
              TextSpan(
                text: 'Go',
                style: TextStyle(color: primarySky),
              ),
            ],
          ),
        ),
        const SizedBox(height: 6),

        Text(
          'Servicios de limpieza bajo demanda y garantizada',
          textAlign: TextAlign.center,
          style: GoogleFonts.inter(
            fontSize: 13,
            color: textMuted,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }

  Widget _buildTabSwitcher() {
    return Container(
      height: 48,
      decoration: BoxDecoration(
        color: const Color(0xFFE2E8F0).withValues(alpha: 0.6),
        borderRadius: BorderRadius.circular(14),
      ),
      padding: const EdgeInsets.all(4),
      child: TabBar(
        controller: _tabController,
        onTap: (index) => setState(() {}),
        indicator: BoxDecoration(
          color: surfaceWhite,
          borderRadius: BorderRadius.circular(10),
          boxShadow: const [
            BoxShadow(color: Colors.black12, blurRadius: 6, offset: Offset(0, 2))
          ],
        ),
        indicatorSize: TabBarIndicatorSize.tab,
        dividerColor: Colors.transparent,
        labelColor: primaryNavy,
        unselectedLabelColor: textMuted,
        labelStyle: GoogleFonts.inter(fontWeight: FontWeight.w700, fontSize: 13),
        unselectedLabelStyle: GoogleFonts.inter(fontWeight: FontWeight.w500, fontSize: 13),
        tabs: const [
          Tab(text: 'Iniciar Sesión'),
          Tab(text: 'Crear Cuenta'),
        ],
      ),
    );
  }

  // Formulario 1: Iniciar Sesión
  Widget _buildLoginForm() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Bienvenido de vuelta',
          style: GoogleFonts.outfit(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: primaryNavy,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          'Ingresa tus credenciales para administrar tus servicios',
          style: GoogleFonts.inter(fontSize: 12, color: textMuted),
        ),
        const SizedBox(height: 18),

        // Correo
        _buildTextField(
          controller: _loginEmailController,
          label: 'Correo Electrónico',
          hint: 'ejemplo@gmail.com',
          icon: Icons.alternate_email_rounded,
          keyboardType: TextInputType.emailAddress,
        ),
        const SizedBox(height: 14),

        // Contraseña
        _buildTextField(
          controller: _loginPasswordController,
          label: 'Contraseña',
          hint: '••••••••',
          icon: Icons.lock_outline_rounded,
          obscureText: _obscureLoginPassword,
          suffixIcon: IconButton(
            icon: Icon(
              _obscureLoginPassword ? Icons.visibility_outlined : Icons.visibility_off_outlined,
              size: 20,
              color: textMuted,
            ),
            onPressed: () => setState(() => _obscureLoginPassword = !_obscureLoginPassword),
          ),
        ),
        const SizedBox(height: 10),

        // Recordar / Olvido
        Align(
          alignment: Alignment.centerRight,
          child: TextButton(
            onPressed: () {
              _showSnackBar('Función de recuperación: Envía correo a soporte@limpygo.com');
            },
            style: TextButton.styleFrom(
              padding: EdgeInsets.zero,
              minimumSize: Size.zero,
              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
            ),
            child: Text(
              '¿Olvidaste tu contraseña?',
              style: GoogleFonts.inter(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: primarySky,
              ),
            ),
          ),
        ),
        const SizedBox(height: 20),

        // Botón Iniciar Sesión
        SizedBox(
          width: double.infinity,
          height: 50,
          child: ElevatedButton(
            onPressed: _isLoading ? null : _iniciarSesion,
            style: ElevatedButton.styleFrom(
              backgroundColor: primarySky,
              foregroundColor: Colors.white,
              elevation: 0,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: _isLoading
                ? const SizedBox(
                    width: 22,
                    height: 22,
                    child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                  )
                : Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.login_rounded, size: 20),
                      const SizedBox(width: 8),
                      Text(
                        'Iniciar Sesión',
                        style: GoogleFonts.inter(fontWeight: FontWeight.bold, fontSize: 14),
                      ),
                    ],
                  ),
          ),
        ),
      ],
    );
  }

  // Formulario 2: Crear Cuenta con OTP
  Widget _buildRegisterForm() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Regístrate en LimpyGo',
              style: GoogleFonts.outfit(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: primaryNavy,
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: accentMint.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  const Icon(Icons.shield_rounded, size: 13, color: accentMint),
                  const SizedBox(width: 4),
                  Text(
                    'Paso 1 de 2',
                    style: GoogleFonts.inter(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: accentMint,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          'Te enviaremos un código de seguridad a tu correo para activar tu cuenta',
          style: GoogleFonts.inter(fontSize: 12, color: textMuted),
        ),
        const SizedBox(height: 16),

        // Nombres y Apellidos en fila
        Row(
          children: [
            Expanded(
              child: _buildTextField(
                controller: _regNombreController,
                label: 'Nombres',
                hint: 'Juan',
                icon: Icons.person_outline_rounded,
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: _buildTextField(
                controller: _regApellidoController,
                label: 'Apellidos',
                hint: 'Pérez',
                icon: Icons.badge_outlined,
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),

        // Teléfono Celular
        _buildTextField(
          controller: _regTelefonoController,
          label: 'Teléfono Celular',
          hint: '+591 76543210',
          icon: Icons.phone_android_rounded,
          keyboardType: TextInputType.phone,
        ),
        const SizedBox(height: 12),

        // Correo Gmail
        _buildTextField(
          controller: _regEmailController,
          label: 'Correo Electrónico (Gmail)',
          hint: 'juan.perez@gmail.com',
          icon: Icons.email_outlined,
          keyboardType: TextInputType.emailAddress,
        ),
        const SizedBox(height: 12),

        // Contraseña
        _buildTextField(
          controller: _regPasswordController,
          label: 'Crea una Contraseña',
          hint: 'Mínimo 6 caracteres',
          icon: Icons.lock_outline_rounded,
          obscureText: _obscureRegPassword,
          suffixIcon: IconButton(
            icon: Icon(
              _obscureRegPassword ? Icons.visibility_outlined : Icons.visibility_off_outlined,
              size: 20,
              color: textMuted,
            ),
            onPressed: () => setState(() => _obscureRegPassword = !_obscureRegPassword),
          ),
        ),
        const SizedBox(height: 18),

        // Botón Continuar hacia verificación OTP
        SizedBox(
          width: double.infinity,
          height: 50,
          child: ElevatedButton(
            onPressed: _isLoading ? null : _iniciarRegistroConOtp,
            style: ElevatedButton.styleFrom(
              backgroundColor: accentMint,
              foregroundColor: Colors.white,
              elevation: 0,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: _isLoading
                ? const SizedBox(
                    width: 22,
                    height: 22,
                    child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                  )
                : Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.send_rounded, size: 18),
                      const SizedBox(width: 8),
                      Text(
                        'Continuar con Verificación OTP',
                        style: GoogleFonts.inter(fontWeight: FontWeight.bold, fontSize: 14),
                      ),
                    ],
                  ),
          ),
        ),
      ],
    );
  }

  // Form helper: Campo de texto con estilo LimpyGo
  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required String hint,
    required IconData icon,
    bool obscureText = false,
    TextInputType keyboardType = TextInputType.text,
    Widget? suffixIcon,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: GoogleFonts.inter(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: primaryNavy,
          ),
        ),
        const SizedBox(height: 6),
        TextFormField(
          controller: controller,
          obscureText: obscureText,
          keyboardType: keyboardType,
          style: GoogleFonts.inter(fontSize: 13, color: primaryNavy, fontWeight: FontWeight.w500),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: GoogleFonts.inter(fontSize: 13, color: Colors.grey.shade400),
            prefixIcon: Icon(icon, size: 20, color: textMuted),
            suffixIcon: suffixIcon,
            filled: true,
            fillColor: const Color(0xFFF8FAFC),
            contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: Colors.grey.shade200),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: primarySky, width: 1.5),
            ),
          ),
        ),
      ],
    );
  }

  // 4. Social Auth Section (Google + Apple ID)
  Widget _buildSocialSection() {
    return Column(
      children: [
        Row(
          children: [
            Expanded(child: Divider(color: Colors.grey.shade300)),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Text(
                'o continúa con',
                style: GoogleFonts.inter(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: textMuted,
                ),
              ),
            ),
            Expanded(child: Divider(color: Colors.grey.shade300)),
          ],
        ),
        const SizedBox(height: 16),

        // Botón Continuar con Google
        SizedBox(
          width: double.infinity,
          height: 48,
          child: OutlinedButton(
            onPressed: _isLoading ? null : () => _iniciarSocial('google'),
            style: OutlinedButton.styleFrom(
              backgroundColor: surfaceWhite,
              side: BorderSide(color: Colors.grey.shade300),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Simulación Icono G Multicolor
                Container(
                  padding: const EdgeInsets.all(4),
                  decoration: const BoxDecoration(
                    color: Colors.transparent,
                    shape: BoxShape.circle,
                  ),
                  child: const Text(
                    'G',
                    style: TextStyle(
                      fontFamily: 'Roboto',
                      fontWeight: FontWeight.w900,
                      fontSize: 18,
                      color: Color(0xFF4285F4),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Text(
                  'Continuar con Google',
                  style: GoogleFonts.inter(
                    fontWeight: FontWeight.w600,
                    fontSize: 13,
                    color: primaryNavy,
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 10),

        // Botón Continuar con Apple ID (Requerido por Apple para apps que usan Google Sign-In)
        SizedBox(
          width: double.infinity,
          height: 48,
          child: ElevatedButton(
            onPressed: _isLoading ? null : () => _iniciarSocial('apple'),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF000000),
              foregroundColor: Colors.white,
              elevation: 0,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(CupertinoIcons.device_phone_portrait, size: 18, color: Colors.white),
                const SizedBox(width: 8),
                Text(
                  'Continuar con Apple ID',
                  style: GoogleFonts.inter(
                    fontWeight: FontWeight.w600,
                    fontSize: 13,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  // 5. Botón de Modo Invitado / Demo
  Widget _buildGuestAccessButton() {
    return TextButton.icon(
      onPressed: _isLoading ? null : _accesoInvitado,
      icon: const Icon(Icons.arrow_forward_rounded, size: 16, color: primarySky),
      label: Text(
        'Continuar como Invitado (Modo Demo)',
        style: GoogleFonts.inter(
          fontSize: 13,
          fontWeight: FontWeight.w600,
          color: primarySky,
        ),
      ),
    );
  }
}
