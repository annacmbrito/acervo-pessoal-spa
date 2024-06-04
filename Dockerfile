FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/* \
    && mkdir -p /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/acervo-pessoal-spa/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]