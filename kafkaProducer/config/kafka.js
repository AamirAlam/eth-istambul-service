const { Kafka } = require("kafkajs");

require("dotenv").config();

const kafkaClient = () => {
  try {
    return new Kafka({
      brokers: [`${process.env.HOST_IP}:9092`],
      clientId: "p2p-producer",
      ssl: false,
      sasl: {
        mechanism: "plain",
        username:
          process.env.NODE_ENV === "development"
            ? process.env.DEV_KAFKA_USERNAME
            : process.env.KAFKA_USERNAME,
        password:
          process.env.NODE_ENV === "development"
            ? process.env.DEV_KAFKA_PASSWORD
            : process.env.KAFKA_PASSWORD,
      },
    });
  } catch (error) {
    console.log("Kafka connection error", error);
  }
};

const localKafkaClient = () => {
  try {
    return new Kafka({
      brokers: [`${process.env.DEV_HOST_IP}:9092`],
      clientId: "p2p-producer",
    });
  } catch (error) {
    console.log("dev Kafka connection error", error);
  }
};

module.exports = { kafkaClient, localKafkaClient };
