/* eslint-disable jsx-a11y/anchor-is-valid */
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
  title: string;
  number: string;
  subtitle: string;
  icon: IconDefinition;
  iconColor: string;
};

const StatsDisplayWidget: React.FC<Props> = (props) => {
  const spanProperties: React.CSSProperties = {
    backgroundColor: props.iconColor,
    height: "3rem",
    width: "3rem",
    padding: "0.7rem",
  };

  return (
    <div className="col-sm gy-4">
      <div className="card ms-4 h-75 d-inline-block py-3">
        <div className="d-flex card-body flex-row">
          <div className="d-flex flex-column">
            <div>
              <h6 className="card-subtitle mb-2 text-muted">{props.title}</h6>
              <h3 className="card-subtitle fw-bold">{props.number}</h3>
            </div>
            <div className="mt-4">
              <p className="fs-6 fw-light">{props.subtitle}</p>
            </div>
          </div>

          <span className="rounded-circle ms-4" style={spanProperties}>
            <FontAwesomeIcon
              icon={props.icon}
              size="lg"
              color="white"
              className="align-self-center"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export { StatsDisplayWidget };
