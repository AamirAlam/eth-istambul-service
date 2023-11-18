const BigNumber = require("bignumber.js");
const { default: axios } = require("axios");
const { priceCache } = require("../services/Cache");

const BN = (value) => {
  return !value ? new BigNumber("0") : new BigNumber(value);
};

const fromWei = (tokens, decimals = 18) => {
  try {
    if (!tokens) {
      return new BigNumber(0).toString();
    }

    return new BigNumber(tokens)
      .div(new BigNumber(10).exponentiatedBy(decimals))
      .toString();
  } catch (error) {
    console.log("exeption in fromWei ", error);
    return null;
  }
};

const matchAddresses = (address1, address2) => {
  if (!address1 || !address2) {
    return false;
  }

  return (
    address1?.toString()?.toLowerCase() === address2?.toString()?.toLowerCase()
  );
};

const toWei = (tokens, decimals = 18) => {
  try {
    if (!tokens) {
      return new BigNumber(0).toString();
    }
    return new BigNumber(tokens)
      .multipliedBy(new BigNumber(10).exponentiatedBy(decimals))
      .toFixed(0)
      .toString();
  } catch (error) {
    console.log("exeption in toWei , ", error);
    return null;
  }
};

// checks if array 1 includes all the values of array2
function isArrayIncludes(array1, array2) {
  let flag = true;
  array2.forEach((item) => {
    if (!array1.includes(item)) {
      flag = false;
    }
  });

  return flag;
}

function recoverKeys(key) {
  if (!key) {
    return null;
  }
  return key.split("").reverse().join("");
}

/**
 * Checks valid number string and bignumber strings
 * @param {*} str
 * @returns
 */
function isValidNumber(str) {
  // Use the unary plus operator to convert the string to a number
  const num = +str;

  // Check if the result is a finite non-negative number or a big number
  return (
    typeof num === "number" &&
    !isNaN(num) &&
    num >= 0 &&
    (isFinite(num) || new BigNumber(str).isFinite())
  );
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPercentChange(initialPrice, newPrice) {
  return ((newPrice - initialPrice) * 100) / initialPrice;
}

async function getSimulatedPrice(tokenId) {
  await timeout(2000);
  const priceRes = {};
  priceRes[`${tokenId}`] = priceCache.get(tokenId);
  priceRes["change"] = getPercentChange("1", priceCache.get(tokenId));
  return priceRes;
}

async function getCoinPrice(tokenIds) {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds}&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`,
      { timeout: 5000, timeoutErrorMessage: "coingecko not responding!" }
    );

    // console.log("price fetch res", res.data);
    // const priceUsd = res?.data?.[tokenId]?.usd || 0;
    // console.log("converted price ", toWei(priceUsd, 8));
    // return toWei(priceUsd, 8);
    return res?.data;
  } catch (error) {
    console.log("getCoinPrice: error", error);
    return null;
  }
}

module.exports = {
  fromWei,
  toWei,
  isArrayIncludes,
  matchAddresses,
  recoverKeys,
  isValidNumber,
  getCoinPrice,
  getSimulatedPrice,
  BN,
};
