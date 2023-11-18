const avro = require("avsc");

module.exports = avro.Type.forSchema({
  type: "record",
  fields: [
    {
      name: "category",
      type: { type: "enum", symbols: ["DEPOSIT", "WITHDRAW"] },
    },
    {
      name: "account",
      type: "string",
    },
    {
      name: "amount",
      type: "string",
    },
    {
      name: "txnHash",
      type: "string",
    },
    {
      name: "chainId",
      type: "int",
    },
    {
      name: "retryCount",
      type: "int",
    },

    {
      name: "startedAt",
      type: "string",
    },
    {
      name: "tokenId",
      type: "string",
    },
    {
      name: "vaultId",
      type: "string",
    },
    {
      name: "note",
      type: "string",
    },
  ],
});
