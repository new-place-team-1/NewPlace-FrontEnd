import { Routes, Route } from "react-router-dom";

import Policy from "src/templates/policy";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route path="policy/:tab" element={<Policy />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
