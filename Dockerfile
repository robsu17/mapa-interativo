FROM node:20 as build

# RUN npm install -g pnpm

WORKDIR /app

COPY package-*.json ./

COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]