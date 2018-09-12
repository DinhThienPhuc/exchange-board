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

const modifyValue = rowData => {
  return {
    ...rowData,
    value: parseInt(rowData.lastestPrice * rowData.lastestVolume, 10)
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
  return {
    ...rowData,
    status: rowData.change >= 0 ? "increase" : "decrease"
  };
};

const compareValuesByProperty = (property, order = "asc") => {
  return function(a, b) {
    if (!a.hasOwnProperty(property) || !b.hasOwnProperty(property)) {
      return 0;
    }

    const varA =
      typeof a[property] === "string" ? a[property].toUpperCase() : a[property];
    const varB =
      typeof b[property] === "string" ? b[property].toUpperCase() : b[property];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

module.exports = {
  getNewVolume,
  getNewPriceFromCurrentPrice,
  formatNumberWithTwoFloatPoint,
  modifyPriceAndVolume,
  modifyValue,
  modifyChange,
  modifyChangePercent,
  modifyStatus,
  compareValuesByProperty
};
