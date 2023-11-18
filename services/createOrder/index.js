const { fusionInstance } = require("../fusion");

// wmatic: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
// usdt:  0xc2132D05D31c914a87C6611C10748AEb04B58e8F
async function createOrder(fromToken, toToken, amount) {
  try {
    const makerAddress = "0xBD4B78B3968922e8A53F1d845eB3a128Adc2aA12"; //"0x8BD0e959E9a7273D465ac74d427Ecc8AAaCa55D8";
    const params = {
      fromTokenAddress: fromToken,
      toTokenAddress: toToken,
      amount: amount,
    };

    // const quote = await sdk.getQuote(params);

    // console.log("quote ", quote);

    // console.log("starting approval...");
    // const trx = await swap.approveToken(
    //   params.fromTokenAddress,
    //   makerAddress,
    //   blockchainProvider
    // );
    // console.log("starting approval...", trx);

    const response = await fusionInstance.placeOrder({
      ...params,
      walletAddress: makerAddress,
    });

    console.log("order created ", response);

    return { success: true, data: response, message: "Order created" };
  } catch (error) {
    console.log("failed to create order");
    return { success: false, message: "Failed to create order ", data: null };
  }
}

module.exports = { createOrder };
