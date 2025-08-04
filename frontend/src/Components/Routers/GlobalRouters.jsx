import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";

/**
 * 
 * @returns {React.ReactElement}
 */
const GlobalRouters = () => {
  return (
    <Routes>
      {routes.map((route, index1) => (
        <Route key={index1} path={route.path} element={<route.element />}>
          {route.Children?.map((child, index2) => {
            return child.path === 0 ? (
              <Route key={index2} index element={<child.element />} />
            ) : (
              <Route
                key={index2}
                path={child.path}
                element={<child.element />}
              />
            );
          })}
        </Route>
      ))}
    </Routes>
  );
};

export default GlobalRouters;
