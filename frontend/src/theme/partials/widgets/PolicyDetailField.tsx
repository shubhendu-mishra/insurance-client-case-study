/* eslint-disable jsx-a11y/anchor-is-valid */
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
  title: string;
  value: string;
  icon: IconDefinition;
  iconColor?: string;
};

const PolicyDetailField: React.FC<Props> = (props) => {
  const spanProperties: React.CSSProperties = {
    backgroundColor: props.iconColor,
    height: "3rem",
    width: "3rem",
    padding: "0.7rem",
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
          <h5 className="fw-bold">{props.title}</h5>
          {props.value}
        </div>
      </div>
    </div>
  );
};

export { PolicyDetailField };
