const { CompressionTypes } = require("kafkajs");
const { producerLogger } = require("../services/Logger");
const { kafkaClient, localKafkaClient } = require("./config/kafka");
const txnType = require("./schema/txnType.js");

require("dotenv").config();
let kafka;
if (process.env.KAFKA_ENV === "local") {
  kafka = localKafkaClient();
} else {
  kafka = kafkaClient();
}
const depositTopic = `${process.env.KAFKA_DEPOSIT_TOPIC}`;
const withdrawTopic = `${process.env.KAFKA_WITHDRAW_TOPIC}`;
const producer = kafka.producer();

const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("Producer connected !");
  } catch (e) {
    console.error(`[p2p/producer] ${e.message}`, e);
  }
};

//create message for kafka format
const createMessage = (data) => {
  const { userId, chainId, retryCount } = data;
  const {
    category,
    account,
    amount,
    txnHash = "null",
    startedAt,
    tokenId,
    vaultId = "null",
    note = "null",
  } = data.value;
  console.log(data);
  const value = {
    category: category,
    account: account,
    amount: amount,
    txnHash: txnHash,
    chainId: chainId,
    startedAt: startedAt,
    tokenId: tokenId,
    vaultId: vaultId,
    note: note,
    retryCount: retryCount,
  };
  return {
    key: userId,
    value: txnType.toBuffer(value),
  };
};

/**
 *
 * @param {*} data
 * Send message to kafka
 * example {key:"key",value:{values}}
 */
const sendMessage = async (data) => {
  try {
    const { value } = data;
    const { category } = value;
    const topic =
      category === "DEPOSIT"
        ? depositTopic
        : category === "WITHDRAW"
        ? withdrawTopic
        : "NA";

    const msgRes = await producer.send({
      topic,
      compression: CompressionTypes.GZIP,
      messages: [createMessage(data)],
    });

    if (!msgRes) {
      console.error("error sending message");
      producerLogger.error("error producing message :", data);
      return null;
    }
    producerLogger.log("produced message :", msgRes);
    return msgRes;
    // return producer
    //   .send({
    //     topic,
    //     compression: CompressionTypes.GZIP,
    //     messages: [createMessage(data)],
    //   })
    //   .then(console.log)
    //   .catch((e) => console.error(`[p2p/producer] ${e.message}`, e));
  } catch (e) {
    console.error(`[sendMessage error] ${e.message}`, e);
    producerLogger.error(`[sendMessage error] ${e.message}`, e);
    return null;
  }
};

// const errorTypes = ["unhandledRejection", "uncaughtException"];
// const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

// errorTypes.forEach((type) => {
//   process.on(type, async () => {
//     try {
//       console.log(`process.on ${type}`);
//       await producer.disconnect();
//       process.exit(0);
//     } catch (_) {
//       process.exit(1);
//     }
//   });
// });

// signalTraps.forEach((type) => {
//   process.once(type, async () => {
//     try {
//       await producer.disconnect();
//     } finally {
//       process.kill(process.pid, type);
//     }
//   });
// });

module.exports = { connectProducer, sendMessage };
