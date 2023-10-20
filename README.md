# DevsuTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.8.

## Correr el servidor

### Ejecución de la aplicación en Docker

Siga estos pasos para ejecutar la aplicacion en el contenedor de Docker:

1. Abre una terminal y navega hasta la raíz del proyecto Angular (donde se encuentra el archivo `Dockerfile`).

2. Ejecuta el siguiente comando para construir la imagen de Docker:

   ```bash
   docker build -t devsu-test .

2. Ejecuta el siguiente comando para correr la imagen de Docker:

   ```bash
   docker run -p 8080:80 devsu-test

### Por ng serve

Corra el comando ng serve o npm start y dirigase a la siguiente url: `http://localhost:4200/`. Si necesitan hacer algun cambio la pagina se actualiza en tiempo real. Tome en cuenta que debe usar la version 20.5.0 de node (que es la que yo uso) siguiendo estas versiones:

``"node": "^16.14.0 || >=18.10.0",``

pueden instalar nvm para manejar las versiones en los siguientes links:

``https://midu.dev/como-instalar-node-en-mac-y-windows/``

## Test

Para correr los test solo deben correr el comando `ng test`, si desean que venga incluido con el coverage colocan `ng test --no-watch --code-coverage`.

De esa forma tendran el coverage con los test


