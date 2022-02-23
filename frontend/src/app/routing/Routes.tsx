/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../theme/layout/MasterLayout";
import { PrivateRoutes } from "./PrivateRoutes";

const InsuranceRoutes: FC = () => {
  const isAuthorized = true;

  return (
    <>
      <MasterLayout>
        <PrivateRoutes />
      </MasterLayout>
    </>
  );
};

export { InsuranceRoutes };
