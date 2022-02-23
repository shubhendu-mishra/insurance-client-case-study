import { RegionCountModel } from "../models/InsuranceModel";

interface ICountByMonth {
  [key: string]: any;
}

export const getCountByRegion = (
  data: Array<RegionCountModel>,
  region: string
) => {
  const regionData = data.filter((el) => {
    return el.customer_region == region;
  });
  const monthData = regionData.map((i) => {
    const newObj: ICountByMonth = {};
    newObj[i.month] = i.count;
    return newObj;
  });

  const yearData = Array(12).fill("0");

  for (const [key, value] of Object.entries(monthData)) {
    const [currentMonth, count] = Object.entries(value)[0];
    yearData[Number(currentMonth) - 1] = count;
  }

  return yearData;
};
