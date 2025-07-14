# 1단계: Build React (Vite 사용)
FROM node:22-alpine AS builder

WORKDIR /app

# 패키지 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: Nginx에서 정적파일 서빙
FROM nginx:1.25-alpine

# Nginx 기본 index.html 경로로 빌드된 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 포트 설정
EXPOSE 80

# 컨테이너 실행 시 Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
