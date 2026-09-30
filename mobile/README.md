# Aplicaciones Móviles LimpyGo (Flutter)

Este directorio contiene los proyectos móviles desarrollados en **Flutter** para el ecosistema **LimpyGo** en Santa Cruz de la Sierra, Bolivia.

---

## 🏗️ Flujo de Operación y Lógica de Negocio

1. **Cliente (`cliente_app`):**
   - El cliente explora el catálogo de servicios y empresas aliadas.
   - Configura ambientes (dormitorios, baños, cocina, sala) y adicionales.
   - Confirma el servicio. La orden se crea con estado inicial:
     `PENDIENTE_ASIGNACION_TRABAJADOR`
   - El cliente visualiza en tiempo real: *"Esperando asignación de personal por [Nombre de Empresa]"*.

2. **Empresa de Limpieza (Panel Filament / API Autogestionada):**
   - **No hay delegación ciega ni asignación automática.**
   - Cada empresa de limpieza recibe la orden en su panel y **designa manualmente** a qué trabajador de su nómina enviará al lugar.
   - Al pulsar el botón **"Designar Trabajador"**, la orden pasa a `TRABAJADOR_ASIGNADO` y queda agendada para el operario correspondiente.

3. **Trabajador (`trabajador_app`):**
   - El trabajador afiliado abre su app móvil y ve las órdenes designadas por su empresa.
   - Secuencia de estados:
     - `EN_CAMINO`: Limpiador en tránsito al departamento.
     - `LLEGUE`: Limpiador en recepción / puerta.
     - Captura y sube **Evidencias del ANTES** (foto obligatoria).
     - `EN_PROCESO`: Trabajo de limpieza activo.
     - Captura y sube **Evidencias del DESPUÉS** (foto obligatoria).
     - `COMPLETADA`: Trabajo finalizado, liberando el cobro y la liquidación.

---

## 📱 Proyectos Móviles

### 1. `cliente_app/` (App Móvil para Clientes)
- **Tecnología:** Flutter 3.x (Dart)
- **Paquetes clave:** `flutter_map`, `latlong2`, `google_fonts`, `http`, `shared_preferences`.
- **Ejecución:**
  ```bash
  cd mobile/cliente_app
  flutter pub get
  flutter run
  ```

### 2. `trabajador_app/` (App Móvil para Trabajadores / Limpiadores)
- **Tecnología:** Flutter 3.x (Dart)
- **Paquetes clave:** `flutter_map`, `image_picker`, `google_fonts`, `http`, `shared_preferences`.
- **Ejecución:**
  ```bash
  cd mobile/trabajador_app
  flutter pub get
  flutter run
  ```

---

## 🌐 Configuración de Red (API Endpoint)
- **Emulador Android:** `http://10.0.2.2:8000/api/v1`
- **Dispositivo Físico / Red Local:** `http://<IP_DE_TU_PC>:8000/api/v1` (ej. `http://192.168.0.11:8000/api/v1`)
- **Configuración central:** En `lib/config/api_config.dart` de cada proyecto.
