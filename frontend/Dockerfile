# --- BUILD STAGE ---
FROM node:20-alpine AS builder
WORKDIR /app

# Accept build-time args for Vite
ARG VITE_BACKEND_URL
ARG VITE_RAZORPAY_KEY_ID

# Make them available to the build environment
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_RAZORPAY_KEY_ID=${VITE_RAZORPAY_KEY_ID}

# copy package manifests first for caching
COPY package*.json ./
# use npm ci to install exact deps
RUN npm ci

COPY . .
RUN npm run build

# --- PRODUCTION STAGE ---
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
