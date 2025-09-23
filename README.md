# Proyecto Backend3 - Mocking Pets

Este proyecto es un backend desarrollado en Node.js con Express y MongoDB, que gestiona usuarios, mascotas y adopciones.  
Incluye documentación con Swagger, tests funcionales y está dockerizado para facilitar su despliegue.

---

## 🔹 Tecnologías utilizadas

- Node.js 20
- Express
- MongoDB
- Mongoose
- Mocha + Chai + Supertest (Tests)
- Docker & Docker Compose
- Swagger (Documentación API)

---

## 🚀 Instalación y ejecución local

1. Clonar el repositorio:
```bash
git clone https://github.com/nachomatallana/backend3.git
cd backend3

Instalar dependencias:
    npm install

Crear un archivo .env.dev con las variables necesarias, por ejemplo:
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/backend3
    JWT_SECRET=tu_secreto

Ejecutar el servidor en modo desarrollo:
    npm run start:dev

Acceder a la documentación Swagger:
    http://localhost:8080/api/docs


Ejecutar los tests para todos los endpoints, incluyendo adopciones y usuarios:
    npm run test


Imagen en Dockerhub
    La imagen oficial del proyecto está disponible en Dockerhub:
        https://hub.docker.com/r/nachomatallana/backend3

Ejecutar desde Dockerhub
    docker pull nachomatallana/backend3:latest
    docker run -p 8080:8080 nachomatallana/backend3:latest       