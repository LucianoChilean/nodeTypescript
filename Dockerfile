FROM node:21-alpine as dev
WORKDIR /app
COPY package.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate
CMD ["npm","run","dev"]


