#!/bin/bash
set -e

# Asegurar permisos en carpetas de almacenamiento y cache
mkdir -p storage/framework/{sessions,views,cache} storage/logs bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Generar cache de configuración y rutas si la APP_KEY está presente
if [ -n "$APP_KEY" ]; then
    echo "Optimizando configuración de Laravel..."
    php artisan config:cache || true
    php artisan route:cache || true
fi

# Si se indica AUTO_MIGRATE=true en las variables de entorno, ejecutar migraciones
if [ "$AUTO_MIGRATE" = "true" ]; then
    echo "Ejecutando migraciones de base de datos..."
    php artisan migrate --force || true

    if [ "$AUTO_SEED" = "true" ]; then
        echo "Poblando base de datos con Seeder inicial..."
        php artisan db:seed --force || true
    fi
fi

PORT="${PORT:-8000}"
echo "Iniciando LimpyGo Backend en el puerto ${PORT}..."

# Iniciar el servidor web de Laravel escuchando en 0.0.0.0 y el puerto asignado por Render
exec php artisan serve --host=0.0.0.0 --port="${PORT}"
