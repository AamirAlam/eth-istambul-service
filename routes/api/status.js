const express = require("express");
const { queryPendingOrders } = require("../../services/GraphQueries");
const { getCurrentBlockTimestampWithRetry } = require("../../services/helper");
// const { execute } = require("../../services/runOrder");
const router = express.Router();

router.get("/status", async (req, res) => {
  try {
    const blockTime = await getCurrentBlockTimestampWithRetry();
    console.log("blocktime ", blockTime);
    const orders = await queryPendingOrders(blockTime);
    // console.log("orders ", orders);

    // const reciept = await execute([2]);
    const orderIds = orders?.map((ele) => ele?.orderId);
    return res.status(200).json({ blockTime, orderIds });
  } catch (error) {
    console.log("error ", error);
    return res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
});

module.exports = router;
