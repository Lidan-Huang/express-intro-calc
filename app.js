"use strict";
/** Simple demo Express app. */

const express = require("express");
const app = express();
const { findMean, findMedian, findMode, } = require("./stats.js");
// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { convertStrNums } = require("./utils.js");
const { query } = require("express");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  if (!req.query.nums) { throw new BadRequestError(MISSING); }

  let nums = convertStrNums(req.query.nums);
  console.log(nums);


  if (nums.includes("is not a number")) {
    throw new BadRequestError(`It's a bad request, ${nums}!`);
  } else {

    return res.json({
      operation: "mean",
      value: findMean(nums),
    });
  }
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  if (!req.query.nums) { throw new BadRequestError(MISSING); }

  let nums = convertStrNums(req.query.nums);
  console.log(nums);


  if (nums.includes("is not a number")) {
    throw new BadRequestError(`It's a bad request, ${nums}!`);
  } else {

    return res.json({
      operation: "median",
      value: findMedian(nums),
    });
  }
});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {
  if (!req.query.nums) { throw new BadRequestError(MISSING); }

  let nums = convertStrNums(req.query.nums);
  console.log(nums);


  if (nums.includes("is not a number")) {
    throw new BadRequestError(`It's a bad request, ${nums}!`);
  } else {

    return res.json({
      operation: "mode",
      value: findMode(nums),
    });
  }
});

/** Finds mean, median, mode of nums in qs: returns 
 * response: {
  operation: "all",
  mean: 12
  median: 10,
  mode: 8
} */

app.get("/all", function (req, res) {
  if (!req.query.nums) { throw new BadRequestError(MISSING); }

  let nums = convertStrNums(req.query.nums);
  console.log(nums);


  if (nums.includes("is not a number")) {
    throw new BadRequestError(`It's a bad request, ${nums}!`);

  } else {

    return res.json({
      operation: "all",
      mean: findMean(nums),
      median: findMedian(nums),
      mode: findMode(nums),
    });
  }
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;