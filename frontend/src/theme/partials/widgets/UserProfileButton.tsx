import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faBell } from "@fortawesome/free-solid-svg-icons";
import React, { FC } from "react";

const UserProfileButton: FC = () => {
  return (
    <div className="align-items-stretch">
      <div className="" id="header_menu" data-kt-menu="true">
        <FontAwesomeIcon icon={faUserGroup} scale={2} />

        <FontAwesomeIcon icon={faBell} scale={2} />
      </div>
    </div>
  );
};

export { UserProfileButton };
