const NETWORK_RPC = {
  1: "https://rpc.ankr.com/eth",
  97: "https://rpc.ankr.com/bsc_testnet_chapel",
  8001: "https://rpc.ankr.com/polygon_mumbai",
  137: "https://rpc-mainnet.matic.network",
};

const CONTRACT_ADDRESSES = {
  SLEEP_SWAP: {
    80001: "0x9870bf84a216A6B7048FAB0917d8BaF5A11A650e",
    137: "0xD73624a0aaa1cc718Bea517A77868666B6082819", // polygon mainnet
    5: "0x817FC3DeCb066F79a41EF54281284c70A721004a", // goerli
  },
};

const SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/tahirahmadin/sleepswap-istanbul";

module.exports = {
  NETWORK_RPC,
  SUBGRAPH_URL,
  CONTRACT_ADDRESSES,
};
