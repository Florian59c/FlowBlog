FROM php:8.2-fpm

# Installer des dépendances système
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    libpq-dev \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd sockets

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installer Symfony CLI (optionnel)
RUN curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Configurer le dossier de travail
WORKDIR /var/www/html

# Copier les fichiers du projet
COPY . .

# Installer les dépendances de l'application
RUN composer update
RUN composer install --no-interaction

# Changer les permissions pour le dossier var
RUN chown -R www-data:www-data /var/www/html/var

# Exposer le port 9000 pour PHP-FPM
EXPOSE 7000

# Lancer PHP-FPM
CMD ["php-fpm"]