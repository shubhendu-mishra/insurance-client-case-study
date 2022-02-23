/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarCrash,
  faGasPump,
  faHouseChimneyCrack,
  faMapLocationDot,
  faMoneyBill,
  faPen,
  faRing,
  faUserDoctor,
  faUserInjured,
  faVanShuttle,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { PolicyDetailField } from "../../../theme/partials/widgets/PolicyDetailField";
import {
  faAddressCard,
  faBook,
  faUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { PolicyCustomerDetails } from "../../models/InsuranceModel";
import {
  getPoliciesByPolicyId,
  updatePolicyDetails,
} from "../../services/PolicyCRUD";
import { PolicyEditField } from "../../../theme/partials/widgets/PolicyEditField";
import { isFrozen } from "immer/dist/internal";

type Props = {};

type PolicyViewUrlParams = {
  policyId?: string;
};

const EditPolicy: React.FC<Props> = (props) => {
  const [policy, setPolicy] = useState<PolicyCustomerDetails>();
  const { policyId }: PolicyViewUrlParams = useParams();

  const [showPremiumError, setShowPremiumError] = useState(false);
  const [showPremiumTypeError, setShowPremiumTypeError] = useState(false);
  const navigate = useNavigate();

  const getTrueOrFalse = (value: string, marriage_check: boolean) => {
    if (!marriage_check) {
      if (value === "1") {
        return "Yes";
      } else {
        return "No";
      }
    } else {
      if (value === "1") {
        return "Married";
      } else {
        return "Unmarried";
      }
    }
  };

  useEffect(() => {
    if (policyId) {
      getPoliciesByPolicyId(policyId)
        .then(({ data }) => {
          console.log(data);
          setPolicy(data);
        })
        .catch(() => {
          console.error("Error while fetching policy by policy id");
        });
    }
  }, [policyId]);

  const cancelBtnHandler = () => {
    navigate("/policy/view/" + policyId);
  };

  const saveBtnHandler = () => {
    console.log(policy);
    if (policy && !showPremiumError && !showPremiumTypeError)
      updatePolicyDetails(policy).then(({ data }) => {
        navigate("/policy/view/" + policyId);
      });
  };

  const premiumChangeHandler = (premium: string) => {
    console.log(premium);
    if (!parseInt(premium)) {
      setShowPremiumTypeError(true);
      return;
    } else {
      setShowPremiumTypeError(false);

      if (Number(premium) > 1000000) {
        setShowPremiumError(true);
      } else {
        if (premium) {
          setShowPremiumError(false);
          const updatedPolicyDetails = {
            ...policy?.PolicyDetails,
            premium: Number(premium),
          };
          setPolicy({ ...policy, PolicyDetails: updatedPolicyDetails });
        }
      }
    }
  };

  const dropdownChangeHandler = (
    value: string,
    field: string,
    parent: string
  ) => {
    console.log(value + " ------ " + field);
    value === "Yes" || value === "Married" ? (value = "1") : (value = value);
    value === "No" || value === "Unmarried" ? (value = "0") : (value = value);
    if (parent === "PolicyDetails") {
      const updatedPolicyDetails = { ...policy?.PolicyDetails, [field]: value };
      setPolicy({ ...policy, PolicyDetails: updatedPolicyDetails });
    } else if (parent === "CustomerDetails") {
      const updatedCustomerDetails = {
        ...policy?.CustomerDetails,
        [field]: value,
      };
      setPolicy({ ...policy, CustomerDetails: updatedCustomerDetails });
    }
  };

  return (
    <div className="container mt-2">
      <div className="d-flex flex-column row">
        <div className="d-flex flex-row col-12">
          <h3 className="d-flex flex-grow-1 fw-bold">
            Edit Policy - {policyId}
          </h3>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={cancelBtnHandler}
          >
            <FontAwesomeIcon icon={faPen} scale={2} />
            <span className="ms-2">Cancel</span>
          </button>
          <button
            type="button"
            className="btn btn-success ms-4"
            onClick={saveBtnHandler}
            disabled={showPremiumError || showPremiumTypeError}
          >
            <FontAwesomeIcon className="text-white" icon={faPen} scale={2} />
            <span className="ms-2 text-white">Save</span>
          </button>
        </div>
        <div className="row">
          <PolicyDetailField
            title="Policy ID"
            value={policy?.PolicyDetails?.policy_id || ""}
            icon={faBook}
            iconColor="#5048E5"
          />
          <PolicyDetailField
            title="Customer ID"
            value={policy?.CustomerDetails?.customer_id || ""}
            icon={faUser}
            iconColor="#5048E5"
          />
          <PolicyDetailField
            title="Date Of Purchase"
            value={policy?.PolicyDetails?.date_of_purchase || ""}
            icon={faCalendarDays}
            iconColor="#5048E5"
          />
          <PolicyEditField
            title="Fuel"
            fieldName="fuel"
            value={policy?.PolicyDetails?.fuel || ""}
            icon={faGasPump}
            iconColor="#5048E5"
            type="select"
            dropdownOptions={["CNG", "Petrol", "Diesel"]}
            dropdownChangeHandler={dropdownChangeHandler}
            parent="PolicyDetails"
          />
          <PolicyEditField
            title="Vehicle Segment"
            fieldName="vehicle_segment"
            value={policy?.PolicyDetails?.vehicle_segment || ""}
            icon={faVanShuttle}
            iconColor="#5048E5"
            type="select"
            dropdownOptions={["A", "B", "C"]}
            dropdownChangeHandler={dropdownChangeHandler}
            parent="PolicyDetails"
          />
          <PolicyEditField
            title="Premium"
            fieldName="premium"
            value={policy?.PolicyDetails?.premium?.toString() || ""}
            icon={faMoneyBill}
            iconColor="#5048E5"
            type="input"
            parent="PolicyDetails"
            showPremiumError={showPremiumError}
            premiumChangeHandler={premiumChangeHandler}
            showPremiumTypeError={showPremiumTypeError}
          />
          <PolicyEditField
            title="Bodily Injury Liability"
            fieldName="bodily_injury_liability"
            value={getTrueOrFalse(
              policy?.PolicyDetails?.body_injury_liability?.toString() || "",
              false
            )}
            icon={faUserDoctor}
            iconColor="#5048E5"
            type="select"
            dropdownOptions={["Yes", "No"]}
            dropdownChangeHandler={dropdownChangeHandler}
            parent="PolicyDetails"
          />
          <PolicyEditField
            title="Personal Injury Protection"
            fieldName="personal_injury_protection"
            value={getTrueOrFalse(
              policy?.PolicyDetails?.personal_injury_protection?.toString() ||
                "",
              false
            )}
            icon={faUserInjured}
            iconColor="#5048E5"
            type="select"
            dropdownOptions={["Yes", "No"]}
            dropdownChangeHandler={dropdownChangeHandler}
            parent="PolicyDetails"
          />
          <PolicyEditField
            title="Property Damage Liability"
            fieldName="property_damage_liability"
            value={getTrueOrFalse(
              policy?.PolicyDetails?.personal_injury_protection?.toString() ||
                "",
              false
            )}
            icon={faHouseChimneyCrack}
            iconColor="#5048E5"
            type="select"
            dropdownOptions={["Yes", "No"]}
            dropdownChangeHandler={dropdownChangeHandler}
            parent="PolicyDetails"
          />
          <PolicyEditField
            title="Collision"
            fieldName="collision"
            value={getTrueOrFalse(
              policy?.PolicyDetails?.collision?.toString() || "",
              false
            )}
            icon={faCarCrash}
            iconColor="#5048E5"
            type="select"
            dropdownOptions={["Yes", "No"]}
            dropdownChangeHandler={dropdownChangeHandler}
            parent="PolicyDetails"
          />
          <PolicyEditField
            title="Comprehensive"
            fieldName="comprehensive"
            value={getTrueOrFalse(
              policy?.PolicyDetails?.comprehensive?.toString() || "",
              false
            )}
            icon={faCarCrash}
            iconColor="#5048E5"
            type="select"
            dropdownOptions={["Yes", "No"]}
            dropdownChangeHandler={dropdownChangeHandler}
            parent="PolicyDetails"
          />
          <PolicyEditField
            title="Customer Gender"
            fieldName="customer_gender"
            value={policy?.CustomerDetails?.customer_gender || ""}
            icon={faVenusMars}
            iconColor="#5048E5"
            type="select"
            dropdownOptions={["Male", "Female"]}
            dropdownChangeHandler={dropdownChangeHandler}
            parent="CustomerDetails"
          />
          <PolicyEditField
            title="Customer Income Range"
            fieldName="customer_income_range"
            value={policy?.CustomerDetails?.customer_income_group || ""}
            icon={faMoneyBill}
            iconColor="#5048E5"
            type="select"
            dropdownOptions={["0- $25K", "$25-$70K", ">$70K"]}
            dropdownChangeHandler={dropdownChangeHandler}
            parent="CustomerDetails"
          />
          <PolicyEditField
            title="Customer Region"
            fieldName="customer_region"
            value={policy?.CustomerDetails?.customer_region || ""}
            icon={faMapLocationDot}
            iconColor="#5048E5"
            type="select"
            dropdownOptions={["North", "East", "South", "West"]}
            dropdownChangeHandler={dropdownChangeHandler}
            parent="CustomerDetails"
          />
          <PolicyEditField
            title="Customer Marital Status"
            fieldName="customer_marital_status"
            value={getTrueOrFalse(
              policy?.CustomerDetails?.customer_marital_status?.toString() ||
                "",
              true
            )}
            icon={faRing}
            iconColor="#5048E5"
            type="select"
            dropdownOptions={["Married", "Unmarried"]}
            dropdownChangeHandler={dropdownChangeHandler}
            parent="CustomerDetails"
          />
        </div>
      </div>
    </div>
  );
};

export { EditPolicy };
