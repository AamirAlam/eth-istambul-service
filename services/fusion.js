const {
  PrivateKeyProviderConnector,
  FusionSDK,
  NetworkEnum,
} = require("@1inch/fusion-sdk");
const { default: Web3 } = require("web3");

const makerPrivateKey = process.env.PRIVATE_KEY;
const makerAddress = "0x8BD0e959E9a7273D465ac74d427Ecc8AAaCa55D8";

const nodeUrl = "https://polygon-rpc.com/";

const blockchainProvider = new PrivateKeyProviderConnector(
  makerPrivateKey,
  new Web3(nodeUrl)
);

const sdk = new FusionSDK({
  url: "https://api.1inch.dev/fusion",
  network: NetworkEnum.POLYGON,
  blockchainProvider,
  authKey: process.env.FUSION_AUTH_KEY,
});

module.exports = { fusionInstance: sdk };
