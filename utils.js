const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route

  let splitNums = strNums.split(",");

  let convertedNums = [];
  for (let item of splitNums) {
    let num = Number(item);
    if (isNaN(num)) {
      return `${item} is not a number`;
    } else {
      convertedNums.push(num);
    }
  }

  return convertedNums;
}


module.exports = { convertStrNums };