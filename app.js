const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const scheduledFunctions = require("./services/ScheduledFn");

require("dotenv").config();

//Init Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// lol
//Connect Database
// scheduledFunctions.initScheduledJobs();

const status = require("./routes/api/status");

app.use("/api/v1/", status);

module.exports = app;
