FROM node:20.10.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src

EXPOSE 8080

CMD [ "npm", "start" ]

#docker build -t backend3 .
#docker run -p 8080:8080 --name backend3-container backend3-prueba
#docker stop backend3-container
#docker rm backend3-container



## con docker hub
#docker build -t nachomatallana/backend3Hub .
#docker push nachomatallana/backend3Hub

#docker pull nachomatallana/backend3Hub
#docker run -p 8080:8080 --name backend3-container nachomatallana/backend3Hub