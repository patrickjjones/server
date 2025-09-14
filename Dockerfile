FROM node:20-bullseye-slim
RUN apt-get update && apt-get install -y python3 g++ make && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json tsconfig.json ./
RUN npm install
COPY src ./src
COPY .env.example ./
RUN npx tsc
RUN npm prune --omit=dev
EXPOSE 8080
ENV PORT=8080
CMD ["node","dist/index.js"]
