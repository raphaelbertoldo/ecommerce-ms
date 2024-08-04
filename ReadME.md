## Para rodar a aplicação basta inicar todos os serviços com 'npm run dev'

O rabbitMQ também deve ser inciado pois será usado o paradigma de FILAS para a criação de pedidos desse sistema.
em Dockerfile do serviço de produtos temos o script de criação do container do rabbitmq usando uma imagem padrão e recomendada.

'docker build -t my-rabbitmq .'

Ápos a criação do container, starte o mesmo:

'docker run -d --name my-rabbitmq -p 5672:5672 -p 15672:15672 my-rabbitmq'
docker run -d --name my-rabbitmq -p 5672:5672 -p 15672:15672 \
 -e RABBITMQ_DEFAULT_USER=myuser \
 -e RABBITMQ_DEFAULT_PASS=mypassword \
 rabbitmq:3-management-alpine

Ápos isso conseguimos fazer o uso do RabbitMQ e dos serviços disponiveis.
