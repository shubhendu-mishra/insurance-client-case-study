import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { FallbackView } from "../../theme/partials";
import { EditPolicy } from "../modules/policy/EditPolicy";
import { ViewPolicy } from "../modules/policy/ViewPolicy";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardWrapper />} />
      <Route path="/policy/view/:policyId" element={<ViewPolicy />} />
      <Route path="/policy/edit/:policyId" element={<EditPolicy />} />
    </Routes>
  );
}
