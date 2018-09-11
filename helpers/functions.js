const randomNumberInRange = (start, end) => {
  if (start > end) {
    let temp = end;
    end = start;
    start = temp;
  }
  return Math.floor(Math.random() * (1 + end - start)) + start;
};

const formatNumberWithTwoFloatPoint = floatNumber => {
  const NUMBER_FLOAT_POINT = 2;
  return floatNumber.toFixed(NUMBER_FLOAT_POINT);
};

const getNewVolume = previousVolume => {
  const START = 10;
  const END = 30;
  return previousVolume + randomNumberInRange(START, END);
};

const getNewPriceFromCurrentPrice = currentPrice => {
  const MIN_PERCENT = 95;
  const MAX_PERCENT = 105;
  const rawFloatPrice = parseFloat(
    randomNumberInRange(
      currentPrice * MIN_PERCENT,
      currentPrice * MAX_PERCENT
    ) / 100
  );
  return formatNumberWithTwoFloatPoint(rawFloatPrice);
};

const modifyPriceAndVolume = rowData => {
  return {
    ...rowData,
    lastestPrice: getNewPriceFromCurrentPrice(rowData.lastestPrice),
    lastestVolume: getNewVolume(rowData.lastestVolume)
  };
};

const modifyChange = rowData => {
  return {
    ...rowData,
    change: formatNumberWithTwoFloatPoint(
      rowData.lastestPrice - rowData.originalPrice
    )
  };
};

const modifyChangePercent = rowData => {
  return {
    ...rowData,
    "%change": formatNumberWithTwoFloatPoint(
      (rowData.change * 100) / rowData.originalPrice
    )
  };
};

const modifyStatus = rowData => {
  let status = "";
  return {
    ...rowData,
    status: rowData.change >= 0 ? "increase" : "decrease"
  };
};

module.exports = {
  getNewVolume,
  getNewPriceFromCurrentPrice,
  formatNumberWithTwoFloatPoint,
  modifyPriceAndVolume,
  modifyChange,
  modifyChangePercent,
  modifyStatus
};
