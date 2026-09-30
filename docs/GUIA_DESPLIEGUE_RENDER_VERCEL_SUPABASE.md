# 🚀 Guía de Despliegue: Render, Vercel y Supabase para LimpyGo

Esta guía detalla los pasos exactos y las variables de entorno necesarias para desplegar la arquitectura completa de **LimpyGo**:
1. **Supabase**: Base de datos relacional PostgreSQL administrada.
2. **Render**: Backend API en Laravel 12 (ejecutado en contenedor Docker).
3. **Vercel**: Frontend Web SPA (Portal SaaS para Administradores y Empresas de Limpieza en Vite + React).

---

## 1. Paso 1: Configurar Supabase (Base de Datos)

1. Ingresa a [supabase.com](https://supabase.com) y crea un nuevo proyecto (ej. `limpygo-db`).
2. Elige una región cercana para menor latencia (recomendado: **São Paulo - sa-east-1**).
3. Guarda la **Database Password** que definas.
4. Una vez creado el proyecto, ve a:
   **Project Settings** ➔ **Database** ➔ Sección **Connection string** ➔ Pestaña **URI** o **Parameters**.
5. **IMPORTANTE para Render:** 
   Utiliza el **Connection Pooler (IPv4)** en modo *Transaction* (puerto 6543) o *Session* (puerto 5432).
   * Host típico: `aws-0-sa-east-1.pooler.supabase.com`
   * Puerto: `6543` (o `5432`)
   * Usuario: `postgres.[TU-PROJECT-REF]`
   * Base de datos: `postgres`
   * Password: `[TU-PASSWORD]`
   * SSL Mode: `require`

---

## 2. Paso 2: Desplegar el Backend en Render

1. Ingresa a [render.com](https://render.com) y selecciona **New +** ➔ **Web Service**.
2. Conecta tu repositorio de GitHub (`limpyGo`).
3. Configuración del servicio:
   * **Name:** `limpygo-backend`
   * **Region:** Ohio / Oregon o la más cercana a tu base de datos.
   * **Root Directory:** `backend`
   * **Environment / Runtime:** `Docker`
   * **Dockerfile Path:** `./Dockerfile`
   * **Instance Type:** `Free` (o `Starter`)
4. En la sección **Environment Variables**, agrega las siguientes variables:

| Variable | Valor Recomendado | Descripción |
|---|---|---|
| `APP_NAME` | `LimpyGo` | Nombre de la aplicación |
| `APP_ENV` | `production` | Entorno de producción |
| `APP_DEBUG` | `false` | Desactiva trazas de error públicas |
| `APP_KEY` | `base64:...` | Genera una con `php artisan key:generate --show` |
| `APP_URL` | `https://limpygo-backend.onrender.com` | Tu URL asignada en Render |
| `DB_CONNECTION` | `pgsql` | Driver PostgreSQL para Supabase |
| `DB_HOST` | `aws-0-sa-east-1.pooler.supabase.com` | Host del Pooler de Supabase |
| `DB_PORT` | `6543` | Puerto del pooler |
| `DB_DATABASE` | `postgres` | Nombre de la BD en Supabase |
| `DB_USERNAME` | `postgres.xxxxxx` | Usuario con ref del proyecto |
| `DB_PASSWORD` | `TuContraseñaSupabase` | Contraseña de Supabase |
| `DB_SSLMODE` | `require` | Obligatorio para Supabase |
| `AUTO_MIGRATE` | `true` | Ejecuta migraciones automáticamente al arrancar |
| `AUTO_SEED` | `true` | Crea usuarios, empresas, servicios y órdenes demo automáticamente |
| `FRONTEND_URL` | `https://tu-proyecto.vercel.app` | URL de tu frontend en Vercel |

5. Haz clic en **Create Web Service**.
6. **Credenciales iniciales creadas en Supabase:**
   * **SuperAdmin (Plataforma Global):** `admin@limpygo.com` / Clave: `password`
   * **Empresa Brillante Express:** `empresa@brillante.com` / Clave: `password`
   * **Empresa EcoClean Bolivia:** `empresa@ecoclean.com` / Clave: `password`
   * **Personal de Limpieza (App Móvil):** `maria.limpieza@brillante.com` / Clave: `password`
   * **Cliente Demo:** `cliente@example.com` / Clave: `password`

---

## 3. Paso 3: Desplegar el Frontend en Vercel

1. Ingresa a [vercel.com](https://vercel.com) y haz clic en **Add New...** ➔ **Project**.
2. Selecciona el repositorio `limpyGo`.
3. En la configuración del proyecto:
   * **Framework Preset:** `Vite`
   * **Root Directory:** Haz clic en *Edit* y selecciona la carpeta `frontend`.
   * **Build and Output Settings:** Dejar por defecto (`npm run build` y directorio `dist`).
4. En **Environment Variables**, agrega:
   * `VITE_API_URL`: `https://limpygo-backend.onrender.com/api/v1` (Reemplaza con tu URL real de Render).
5. Haz clic en **Deploy**.
6. Vercel desplegará la web en una URL tipo `https://limpygo.vercel.app`.
   *(Nota: Ya dejamos configurado `frontend/vercel.json` para que las rutas SPA no den error 404 al recargar).*

---

## 4. Paso 4: Ajustar la URL en la App Móvil (Flutter)

Cuando vayas a generar el APK o probar en dispositivos móviles reales, abre:
* `mobile/cliente_app/lib/config/api_config.dart`
* `mobile/trabajador_app/lib/services/worker_api_service.dart`

Cambia la URL base a la URL de Render:
```dart
static String get baseUrl => 'https://limpygo-backend.onrender.com/api/v1';
```

---

## 5. Resumen de Correcciones Aplicadas en el Código

Antes de tu despliegue, aplicamos las siguientes correcciones críticas:
1. **Driver PostgreSQL para Supabase:** Se instaló `libpq-dev` y `pdo_pgsql` en el `Dockerfile` de Laravel (anteriormente solo tenía MySQL).
2. **Sintaxis de Migraciones Compatible con Postgres:** Se corrigió la sentencia `ALTER TABLE personal_access_tokens` para soportar tanto PostgreSQL como MySQL.
3. **Configuración CORS:** Se habilitaron los patrones de dominio `*.vercel.app` y `*.onrender.com` en `backend/config/cors.php`.
4. **Empaquetado de Producción para Render:** El `Dockerfile` ahora copia el código fuente, corre `composer install` y utiliza `docker-entrypoint.sh` para adaptarse al puerto `$PORT` dinámico de Render.
5. **Enrutamiento SPA en Vercel:** Se creó `frontend/vercel.json` con reglas de reescritura para evitar errores 404.
