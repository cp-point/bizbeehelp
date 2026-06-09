# Multi-stage build

# 1단계: 환경 설정 및 dependancy 설치
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

  # 2단계: next.js 실행 단계
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=build-stage /app ./

CMD ["yarn", "start"]
EXPOSE 3000