const { fusionInstance } = require("./fusion");

// wmatic: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
// usdt:  0xc2132D05D31c914a87C6611C10748AEb04B58e8F
async function updateOrder(orderHash) {
  try {
    const orderDetails = await fusionInstance.getOrderStatus(orderHash);

    console.log("order details ", orderDetails);
    // const makerAddress = "0x8BD0e959E9a7273D465ac74d427Ecc8AAaCa55D8";

    // const nodeUrl = "https://polygon-rpc.com/";
    // const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
    // const sleepSwapContract = new ethers.Contract(
    //   "0xC92E8bdf79f0507f65a392b0ab4667716BFE0110",
    //   [],
    //   provider
    // );

    return { success: true, data: response, message: "Order updateOrder" };
  } catch (error) {
    console.log("failed to updateOrder order", error);
    return {
      success: false,
      message: "Failed to updateOrder order ",
      data: null,
    };
  }
}

module.exports = { updateOrder };
