From php:7.3.30

RUN apt-get update && apt-get install -yq git

RUN apt-get install -y \
        libzip-dev \
        zip \
  && docker-php-ext-install zip