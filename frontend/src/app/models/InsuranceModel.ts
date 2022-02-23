export interface PolicyDetailsModel {
  policy_id?: string;
  date_of_purchase?: string;
  customer_id?: number;
  fuel?: string;
  vehicle_segment?: string;
  premium?: number;
  body_injury_liability?: number;
  personal_injury_protection?: number;
  collision?: number;
  comprehensive?: number;
  [key: string]: any;
}

export interface SearchResults {
  id?: string;
}

export interface CustomerDetailsModel {
  customer_id?: string;
  customer_gender?: string;
  customer_income_group?: string;
  customer_region?: string;
  customer_marital_status?: string;
  [key: string]: any;
}

export interface PolicyCustomerDetails {
  PolicyDetails?: PolicyDetailsModel;
  CustomerDetails?: CustomerDetailsModel;
}

export interface RegionCountModel {
  count?: string;
  customer_region?: string;
  month: string;
  year?: string;
}
export interface IChartData {
  label: string;
  data: Array<string>;
  borderColor: string;
  backgroundColor: string;
  yAxisID: string;
}
