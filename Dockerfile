# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Определяем аргумент сборки для токена
ARG PACKAGES_TOKEN

# Копируем конфиги зависимостей
COPY package.json package-lock.json .npmrc ./

# Устанавливаем зависимости
# Передаем аргумент в переменную окружения, чтобы .npmrc мог его подхватить
RUN PACKAGES_TOKEN=${PACKAGES_TOKEN} npm ci

# Копируем исходный код
COPY . .

# Собираем Nuxt приложение
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Устанавливаем production режим
ENV NODE_ENV=production
# HOST=0.0.0.0 обязателен для доступа к контейнеру извне
ENV HOST=0.0.0.0
ENV PORT=5000

# Копируем только артефакты сборки из builder
COPY --from=builder /app/.output ./.output

# Открываем порт
EXPOSE 5000

# Запускаем сервер
CMD ["node", ".output/server/index.mjs"]
