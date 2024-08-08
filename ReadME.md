## Node.js and Express Ecommerce Microservices

This project has development to improve my architeture skills, has used node, express, mongoDB, and rabbitMQ.

## Services :satellite:
### User 
  This service is responsible for login, authenticate and resgister users.
### Product 
  This service is responsible for list products and send order to rabbitMQ queue.
### Order 
  This service is responsible for consume and process orders from RabbitmMQ.

To start the application you need run all service containers, you can use the command:

`$ docker-compose up --build`

or you can start each service:

    cd user-service
    npm run dev

    cd product-service
    npm run dev

    cd order-service
    npm run dev

<img width="780" alt="Captura de Tela 2024-08-07 às 23 02 53" src="https://github.com/user-attachments/assets/4987def9-676f-4bb3-90c4-507990d3e911">
