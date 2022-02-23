import axios from "axios";
import {
  PolicyCustomerDetails,
  PolicyDetailsModel,
  RegionCountModel,
} from "../models/InsuranceModel";
const API_URL = process.env.REACT_APP_API_URL || "api";

export const GET_POLICY_BY_POLICY_ID = `${API_URL}/get_policy_by_policy_id?policy_id=`;
export const SEARCH_POLICY_BY_POLICY_ID = `${API_URL}/search_policy_by_policy_id?policy_id=`;
export const SEARCH_POLICY_BY_CUSTOMER_ID = `${API_URL}/search_policy_by_customer_id?customer_id=`;
export const GET_POLICY_STATS_BY_YEAR = `${API_URL}/get_policy_stats_by_year?year=`;
export const POST_UPDATE_POLICY = `${API_URL}/update_policy`;

export function getPoliciesByPolicyId(policyId: string) {
  return axios.get<PolicyCustomerDetails>(GET_POLICY_BY_POLICY_ID + policyId);
}

export function searchPoliciesByPolicyId(policyId: string) {
  return axios.get<Array<PolicyDetailsModel>>(
    SEARCH_POLICY_BY_POLICY_ID + policyId
  );
}

export function searchPoliciesByCustomerId(customerId: string) {
  return axios.get<Array<PolicyDetailsModel>>(
    SEARCH_POLICY_BY_CUSTOMER_ID + customerId
  );
}

export function getPolicyStatsByYear(year: string) {
  return axios.get<Array<RegionCountModel>>(GET_POLICY_STATS_BY_YEAR + year);
}
export function updatePolicyDetails(
  policyCustomerDetails: PolicyCustomerDetails
) {
  return axios.post<PolicyCustomerDetails>(
    POST_UPDATE_POLICY,
    policyCustomerDetails
  );
}
