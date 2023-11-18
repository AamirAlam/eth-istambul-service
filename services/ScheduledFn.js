const CronJob = require("node-cron");

const { getCurrentBlockTimestampWithRetry } = require("./helper");
const { queryPendingOrders } = require("./GraphQueries");

exports.initScheduledJobs = () => {
  console.log("starting cron srevice");
  // cron job runs on every 1 minute to filter orders to execute based on current price
  const schedule = !process.env.CRON_SCHEDULE
    ? "*/1 * * * *"
    : process.env.CRON_SCHEDULE;
  const scheduledJobFunction = CronJob.schedule(schedule, async () => {
    console.log("add scheduled jobs here");

    // fetch pending orders that needs to be executed at current block
    const currentBlockTimestamp = await getCurrentBlockTimestampWithRetry();
    console.log("current block timestamp ", currentBlockTimestamp);

    const currentOrders = await queryPendingOrders(currentBlockTimestamp);

    // await createOrder(currentOrders?.[0]);
    console.log(
      `${currentOrders?.length} orders fetched at block time ${currentBlockTimestamp} `
    );
  });

  scheduledJobFunction.start();
};
