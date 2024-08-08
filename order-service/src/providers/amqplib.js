import amqp from "amqplib";

const AMQP_URL = "amqp://guest:guest@localhost:5672";

/**
 * Conecta ao RabbitMQ e retorna a conexão.
 */
const connect = async () => {
  try {
    return await amqp.connect(AMQP_URL);
  } catch (error) {
    console.error("Erro ao conectar ao RabbitMQ:", error);
    throw error;
  }
};

/**
 * Processa uma mensagem da fila.
 */
const processMessage = (msg) => {
  if (!msg) {
    console.log("Mensagem nula recebida.");
    return false;
  }

  try {
    const data = msg.content.toString();
    console.log("Dados recebidos (raw):", data);

    const jsonData = JSON.parse(data);
    console.log("Dados processados (JSON):", jsonData);

    // Exibir propriedades específicas
    const {
      productId,
      customerId,
      paymentStatus,
      orderStatus,
      paymentMethod,
      _id,
      __v: version,
    } = jsonData;

    console.log("Product ID:", productId);
    console.log("Customer ID:", customerId);
    console.log("Payment Status:", paymentStatus);
    console.log("Order Status:", orderStatus);
    console.log("Payment Method:", paymentMethod);
    console.log("ID:", _id);
    console.log("Version:", version);

    return true;
  } catch (error) {
    console.error("Erro ao fazer parsing do JSON:", error);
    return false;
  }
};

/**
 * Consome mensagens da fila especificada.
 */
export async function consumerQueue({ queue }) {
  let connection;
  let channel;

  try {
    connection = await connect();
    channel = await connection.createChannel();

    // Garantir que a fila exista
    await channel.assertQueue(queue);

    console.log("Iniciando consumo da fila:", queue);

    // Consumir mensagens da fila
    await channel.consume(
      queue,
      (msg) => {
        if (processMessage(msg)) {
          channel.ack(msg);
        } else {
          channel.nack(msg);
        }
      },
      { noAck: false }
    );

    console.log("✅ Fila consumida:", queue);
  } catch (error) {
    console.error("Erro ao consumir a fila: ", error);
  } finally {
    if (channel) {
      try {
        await channel.close();
      } catch (closeError) {
        console.error("Erro ao fechar o canal:", closeError);
      }
    }

    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Erro ao fechar a conexão:", closeError);
      }
    }
  }
}
