# Arquitectura de la Plataforma LimpyGo

## 1. Modelo de Negocio (Marketplace Bajo Demanda tipo Yango)
* **Comisión de LimpyGo (8%):**
  - La plataforma cobra una comisión configurable (por defecto **8.00%**) sobre el valor bruto de cada orden de limpieza finalizada.
  - La comisión se deduce automáticamente al momento de calcular las liquidaciones periódicas de cada empresa aliada.
  - El porcentaje se puede modificar individualmente para cada empresa desde el panel administrativo de SuperAdmin en Filament.
* **Empresas Aliadas:**
  - Gestionan sus propios trabajadores, sus zonas de cobertura asignadas y sus servicios.
  - Cuentan con un panel de Filament multi-tenant aislado (solo ven sus trabajadores, órdenes y liquidaciones).
* **Trabajadores:**
  - Registrados bajo una empresa aliada.
  - Únicamente tienen acceso a la app móvil de trabajadores para recibir asignaciones y subir evidencias.

---

## 2. Estructura del Monorepo
* **`backend/`**: Laravel 12 API + Filament v3 Admin Panel.
  - Autenticación con Laravel Sanctum (tokens Bearer).
  - Multi-tenancy mediante Scopes en Eloquent y políticas de acceso.
  - Motor de cálculo y cotización en tiempo real.
* **`frontend/`**: Aplicación Web React + Vite (Puerto 3000).
  - Cotizador visual de departamentos tipo Yango con selector interactivo de ambientes y extras.
  - Rastreador en vivo con timeline de 5 hitos.
  - Mobile-first, diseño oscuro moderno con acentos esmeralda y cyan.
* **`mobile/`**: Base para aplicaciones móviles de Clientes y Trabajadores.
* **`database/` (MySQL/MariaDB en Docker, Puerto 3309)**:
  - 33 migraciones con soporte para ambientes, órdenes, estados, pagos, evidencias y comisiones.
