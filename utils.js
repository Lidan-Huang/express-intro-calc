const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  if(!strNums) {
    return "Numbers are required";
  }
  let convertedNums = [];
  for(let item of strNums) {
    let num = Number(item);
    if(num === NaN) {
      return `${item} is not a number`;
    } else {
      convertedNums.push(num);
    }
  }

  return convertedNums;
}


module.exports = { convertStrNums };