import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faBell,
  faMagnifyingGlass,
  faUser,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import React, { FC, Fragment, useState } from "react";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";
import {
  searchPoliciesByCustomerId,
  searchPoliciesByPolicyId,
} from "../../../app/services/PolicyCRUD";

import { Link, useNavigate } from "react-router-dom";

interface IOption {
  id: string;
  login: string;
}

const Header: FC = () => {
  const SEARCH_URI =
    "https://localhost:8000/search_policy_by_policy_id?policy_id=";
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]) as any;
  const [searchBy, setSearchBy] = useState("Policy ID");

  const handleSearch = (query: any) => {
    setIsLoading(true);

    if (searchBy === "Policy ID") {
      searchPoliciesByPolicyId(query)
        .then(({ data }) => {
          console.log(data);
          const options = data.map((i: any) => ({
            id: String(i.policy_id),
            login: String(i.policy_id),
          }));
          if (options.length) {
            console.log(options);
            setOptions(options);
            setIsLoading(false);
          }
        })
        .catch(() => {
          console.error("Error");
        });
    } else if (searchBy === "Customer ID") {
      searchPoliciesByCustomerId(query)
        .then(({ data }) => {
          console.log(data);
          const options = data.map((i: any) => ({
            id: String(i.policy_id),
            login: String(i.policy_id),
          }));
          if (options.length) {
            console.log(options);
            setOptions(options);
            setIsLoading(false);
          }
        })
        .catch(() => {
          console.error("Error");
        });
    }
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  const spanProperties: React.CSSProperties = {
    backgroundColor: "#5048e5",
    height: "3rem",
    width: "3rem",
    padding: "0.7rem",
  };

  const navigate = useNavigate();

  const searchResultClickHandler = (policyId: string) => {
    navigate("/policy/view/" + policyId);
  };

  const searchByPolicyId = () => {
    console.log("search by policy id ");
    setSearchBy("Policy ID");
  };

  const searchByCustomerId = () => {
    console.log("search by customer id ");
    setSearchBy("Customer ID");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <Link to="/">
          <span className="rounded-circle" style={spanProperties}>
            <FontAwesomeIcon icon={faHome} size="lg" color="white" />
          </span>
        </Link>
        <form className="form-inline">
          <div className="d-flex">
            <span className="btn btn-outline-secondary border-0">
              <FontAwesomeIcon icon={faMagnifyingGlass} scale={2} />
            </span>
            <div id="searchInput">
              <AsyncTypeahead
                filterBy={filterBy}
                className="border-0"
                isLoading={isLoading}
                id="searchInput"
                labelKey="id"
                minLength={3}
                onSearch={handleSearch}
                options={options}
                placeholder={`Search for a policy using ` + searchBy + `...`}
                renderMenuItemChildren={(option) => {
                  const currentOption = option as IOption;
                  return (
                    <div
                      onClick={() => {
                        return searchResultClickHandler(currentOption.id);
                      }}
                    >
                      <Fragment>Policy ID - {currentOption.id}</Fragment>
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div className="d-flex flex-row mt-2 ms-5">
            <span className="fw-bold">Criteria:</span>
            <div className="form-check ms-4">
              <input
                className="form-check-input "
                type="radio"
                name="searchType"
                id="exampleRadios2"
                value="Policy ID"
                defaultChecked
              />
              <label
                className="form-check-label"
                htmlFor="exampleRadios2"
                onClick={searchByPolicyId}
              >
                Policy ID
              </label>
            </div>
            <div className="form-check ms-4">
              <input
                className="form-check-input"
                type="radio"
                name="searchType"
                id="exampleRadios3"
                value="Policy ID"
              />
              <label
                className="form-check-label"
                htmlFor="exampleRadios3"
                onClick={searchByCustomerId}
              >
                Customer ID
              </label>
            </div>
          </div>
        </form>
        <ul className="navbar-nav me-3">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="rounded-circle" style={spanProperties}>
                <FontAwesomeIcon icon={faUser} size="lg" color="white" />
              </span>
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <hr />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export { Header };
