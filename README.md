# SWIFTAPI
Hola. Bienvenido a la API de los álbumes de Taylor Swift.
A continuación, se mostrarán instrucciones importantes referentes al funcionamiento del proyecto, empezando por cómo clonar el repositorio.

Pasos:
-Abre la terminal y usa el comando cd para cambiar a la ruta en donde desees clonar el repo.
-Una vez que hayas hecho lo anterior, copia el siguiente comando: 
git clone https://github.com/anitavf1/SWIFTAPI.git
-Cuando se termine de clonar, entra al directorio clonado con: cd SWIFAPI.

Especificaciones respecto a las tecnologías utilizadas:
Para el desarrollo de este trabajo, se utilizó typescript como lenguaje y express como FRAMEWORK. Además de Docker y MongoDB.

Requisitos previos:
Node.js: Versión mínima recomendada (22.7.5).
npm o yarn: Manejador de paquetes.
Docker
Redis: Versión mínima recomendada (4.7.0)

Instalación de dependencias:
-npm install.

Uso de Docker:
*Creación del contenedor para la base de datos (En este caso, mongodb):
docker run --name mongodb1 -p 27017:27017 -v mongo_data:/data/db -d mongo
*Creación del contenedor para la api:
docker run --name swiftapi-Dev -p 3100:3100 -d swiftapi-Dev
*Creación del contenedor de Redis:
docker run -d --name redis -p 6379:6379 redis  

Compilar el proyecto:
-npm run dev

Documentación:
La documentación fue hecha con Swagger. Para acceder a ella, es necesario escribir esta ruta.
http://localhost:3100/api-docs/





