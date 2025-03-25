FROM node:20-alpine

WORKDIR /app

# Cấu hình Yarn để tăng timeout và số lần retry
RUN yarn config set network-timeout 300000 && \
    yarn config set network-concurrency 1 && \
    yarn config set retry-number 5

# Copy package files
COPY package.json ./
COPY yarn.lock ./

# Cài đặt dependencies với --network-timeout
RUN yarn install --network-timeout 300000

# Copy toàn bộ ứng dụng
COPY . .

# Expose port (default, can be overridden by .env)
EXPOSE 3000

# Chạy server phát triển bằng yarn
CMD ["sh", "-c", "yarn dev"] 