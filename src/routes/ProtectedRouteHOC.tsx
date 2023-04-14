import { PATHES } from "@src/common/enum";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IProps {
  isAuth: boolean;
}

const ProtectedRouteHOC: React.FC<IProps> = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to={PATHES.LOGIN_PAGE} />;
};

export default ProtectedRouteHOC;
