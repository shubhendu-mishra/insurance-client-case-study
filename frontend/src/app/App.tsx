import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { InsuranceRoutes } from "./routing/Routes";

type Props = {
  basename: string;
};

const App: React.FC<Props> = ({ basename }) => {
  return (
    <Suspense fallback={<h1>Loading1...</h1>}>
      <BrowserRouter basename={basename}>
        <InsuranceRoutes />
      </BrowserRouter>
    </Suspense>
  );
};

export { App };
