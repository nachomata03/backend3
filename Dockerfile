FROM node:20.10.0

WORKDIR /app

COPY package*.json ./

RUN npm install

#COPY ./src ./src

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]

#docker build -t backend3 .
#docker run -p 8080:8080 backend3
#docker stop backend3
#docker rm backend3

#docker logs <container_id>
#docker ps -a #ver todos los contenedores




## con docker hub
#docker build -t nachomatallana/backend3Hub .
#docker push nachomatallana/backend3Hub

#docker pull nachomatallana/backend3Hub
#docker run -p 8080:8080 --name backend3-container nachomatallana/backend3Hub