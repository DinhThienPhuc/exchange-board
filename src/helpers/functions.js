const randomNumberInRange = (start, end) => {
  if (start > end) {
    let temp = end;
    end = start;
    start = temp;
  }
  return Math.floor(Math.random() * (1 + end - start)) + start;
};

export const formatNumberWithTwoFloatPoint = (floatNumber) => {
  const NUMBER_FLOAT_POINT = 2;
  return floatNumber.toFixed(NUMBER_FLOAT_POINT);
};

export const getNewVolume = (previousVolume) => {
  const START = 10;
  const END = 30;
  return previousVolume + randomNumberInRange(START, END);
};

export const getNewPriceFromCurrentPrice = (currentPrice) => {
  const MIN_PERCENT = 95;
  const MAX_PERCENT = 105;
  const rawFloatPrice = parseFloat(
    randomNumberInRange(
      currentPrice * MIN_PERCENT,
      currentPrice * MAX_PERCENT,
    ) / 100,
  );
  return formatNumberWithTwoFloatPoint(rawFloatPrice);
};

export const modifyPriceAndVolume = (rowData) => {
  return {
    ...rowData,
    latestPrice: getNewPriceFromCurrentPrice(rowData.latestPrice),
    latestVolume: getNewVolume(rowData.latestVolume),
  };
};

export const modifyValue = (rowData) => {
  return {
    ...rowData,
    value: parseInt(rowData.latestPrice * rowData.latestVolume, 10),
  };
};

export const modifyChange = (rowData) => {
  return {
    ...rowData,
    change: formatNumberWithTwoFloatPoint(
      rowData.latestPrice - rowData.originalPrice,
    ),
  };
};

export const modifyChangePercent = (rowData) => {
  return {
    ...rowData,
    "%change": formatNumberWithTwoFloatPoint(
      (rowData.change * 100) / rowData.originalPrice,
    ),
  };
};

export const modifyStatus = (rowData) => {
  return {
    ...rowData,
    status: rowData.change >= 0 ? "increase" : "decrease",
  };
};

export const compareValuesByProperty = (property, order = "asc") => {
  return function (a, b) {
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
