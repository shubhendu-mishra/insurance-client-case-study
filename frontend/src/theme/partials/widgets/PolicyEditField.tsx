/* eslint-disable jsx-a11y/anchor-is-valid */
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

type Props = {
  title: string;
  fieldName: string;
  value: string;
  icon: IconDefinition;
  iconColor?: string;
  type?: string;
  dropdownOptions?: Array<String>;
  dropdownChangeHandler?: Function;
  premiumChangeHandler?: Function;
  parent?: string;
  showPremiumError?: boolean;
  showPremiumTypeError?: boolean;
};

const PolicyEditField: React.FC<Props> = (props) => {
  const [value, setValue] = useState(props.value);
  const spanProperties: React.CSSProperties = {
    backgroundColor: props.iconColor,
    height: "3rem",
    width: "3rem",
    padding: "0.7rem",
  };

  const dropdownChangeHandler = (event: any, field: string) => {
    if (props.dropdownChangeHandler)
      props.dropdownChangeHandler(event.target.value, field, props.parent);
  };

  const premiumChangeHandler = (event: any) => {
    setValue(event.target.value);
    if (props.premiumChangeHandler)
      props.premiumChangeHandler(event.target.value);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const getValue = (value: string, fieldName: string) => {
    value === "Yes" || value === "Married" ? (value = "1") : (value = value);
    value === "No" || value === "Unmarried" ? (value = "0") : (value = value);
    return value;
  };

  return (
    <div className="mt-5 col-lg-4 col-xs-6">
      <div className="d-flex flex-row">
        <span className="rounded-circle" style={spanProperties}>
          <FontAwesomeIcon
            icon={props.icon}
            size="lg"
            color="white"
            className="ms-1"
          />
        </span>
        <div className=" ms-3">
          <div className="d-flex flex-column">
            <h5 className="fw-bold">{props.title}</h5>
            {props.type === "input" && (
              <input
                className={
                  `form-control` +
                  (props.showPremiumError || props.showPremiumTypeError
                    ? ` is-invalid`
                    : ` is-valid`)
                }
                type="number"
                defaultValue={getValue(props.value, props.fieldName)}
                onChange={premiumChangeHandler}
              />
            )}
            {props.type === "input" && props.showPremiumError && (
              <span className="premium-alert text-danger fw-bold fs-8">
                Premium amount cannot be more than 1,000,000
              </span>
            )}
            {props.type === "input" && props.showPremiumTypeError && (
              <span className="premium-alert text-danger fw-bold fs-8">
                Invalid premium amount
              </span>
            )}
          </div>
          {props.type === "select" && (
            <select
              onChange={(e) => {
                dropdownChangeHandler(e, props.fieldName);
              }}
              className="form-select form-control is-valid"
              aria-label="Default select example"
              defaultValue={props.value}
            >
              {props.dropdownOptions?.map((currentVal) => {
                return (
                  <option
                    key={currentVal.toString()}
                    value={currentVal.toString()}
                  >
                    {currentVal.toString()}
                  </option>
                );
              })}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export { PolicyEditField };
