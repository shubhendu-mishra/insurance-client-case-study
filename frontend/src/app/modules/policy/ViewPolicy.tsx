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
import { useParams, useNavigate } from "react-router-dom";
import { PolicyCustomerDetails } from "../../models/InsuranceModel";
import { getPoliciesByPolicyId } from "../../services/PolicyCRUD";

type Props = {};

type PolicyViewUrlParams = {
  policyId?: string;
};

const ViewPolicy: React.FC<Props> = (props) => {
  const [policy, setPolicy] = useState<PolicyCustomerDetails>();
  const { policyId }: PolicyViewUrlParams = useParams();
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

  const editBtnHandler = () => {
    navigate("/policy/edit/" + policyId);
  };

  return (
    <div className="container mt-2">
      <div className="d-flex flex-column row">
        <div className="d-flex flex-row col-12">
          <h3 className="d-flex flex-grow-1 fw-bold">
            Policy Details - {policyId}
          </h3>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={editBtnHandler}
          >
            <FontAwesomeIcon icon={faPen} scale={2} />
            <span className="ms-2">Edit Policy</span>
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
          <PolicyDetailField
            title="Fuel"
            value={policy?.PolicyDetails?.fuel || ""}
            icon={faGasPump}
            iconColor="#5048E5"
          />
          <PolicyDetailField
            title="Vehicle Segment"
            value={policy?.PolicyDetails?.vehicle_segment || ""}
            icon={faVanShuttle}
            iconColor="#5048E5"
          />
          <PolicyDetailField
            title="Premium"
            value={policy?.PolicyDetails?.premium?.toString() || ""}
            icon={faMoneyBill}
            iconColor="#5048E5"
          />
          <PolicyDetailField
            title="Bodily Injury Liability"
            value={getTrueOrFalse(
              policy?.PolicyDetails?.body_injury_liability?.toString() || "",
              false
            )}
            icon={faUserDoctor}
            iconColor="#5048E5"
          />
          <PolicyDetailField
            title="Personal Injury Protection"
            value={getTrueOrFalse(
              policy?.PolicyDetails?.personal_injury_protection?.toString() ||
                "",
              false
            )}
            icon={faUserInjured}
            iconColor="#5048E5"
          />
          <PolicyDetailField
            title="Property Damage Liability"
            value={getTrueOrFalse(
              policy?.PolicyDetails?.personal_injury_protection?.toString() ||
                "",
              false
            )}
            icon={faHouseChimneyCrack}
            iconColor="#5048E5"
          />
          <PolicyDetailField
            title="Collision"
            value={getTrueOrFalse(
              policy?.PolicyDetails?.collision?.toString() || "",
              false
            )}
            icon={faCarCrash}
            iconColor="#5048E5"
          />
          <PolicyDetailField
            title="Compreshensive"
            value={getTrueOrFalse(
              policy?.PolicyDetails?.comprehensive?.toString() || "",
              false
            )}
            icon={faCarCrash}
            iconColor="#5048E5"
          />
          <PolicyDetailField
            title="Customer Gender"
            value={policy?.CustomerDetails?.customer_gender || ""}
            icon={faVenusMars}
            iconColor="#5048E5"
          />
          <PolicyDetailField
            title="Customer Income Range"
            value={policy?.CustomerDetails?.customer_income_group || ""}
            icon={faMoneyBill}
            iconColor="#5048E5"
          />
          <PolicyDetailField
            title="Customer Region"
            value={policy?.CustomerDetails?.customer_region || ""}
            icon={faMapLocationDot}
            iconColor="#5048E5"
          />
          <PolicyDetailField
            title="Customer Marital Status"
            value={getTrueOrFalse(
              policy?.CustomerDetails?.customer_marital_status?.toString() ||
                "",
              true
            )}
            icon={faRing}
            iconColor="#5048E5"
          />
        </div>
      </div>
    </div>
  );
};

export { ViewPolicy };
