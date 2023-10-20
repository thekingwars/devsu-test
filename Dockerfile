FROM node:20.5.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:latest

COPY --from=build /app/dist/devsu-test /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
