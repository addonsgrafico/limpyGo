FROM php:8.3-cli

# Install system dependencies and php extensions needed for Laravel, Filament, MySQL & Supabase (PostgreSQL)
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    zip \
    unzip \
    libicu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd zip intl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Get Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy application files
COPY . /var/www/html

# Install dependencies if composer.json exists
RUN if [ -f composer.json ]; then \
    composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist; \
    fi

# Configure permissions for entrypoint and storage
RUN chmod +x /var/www/html/docker-entrypoint.sh \
    && mkdir -p storage/framework/{sessions,views,cache} storage/logs bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 8000 10000

ENTRYPOINT ["/var/www/html/docker-entrypoint.sh"]
