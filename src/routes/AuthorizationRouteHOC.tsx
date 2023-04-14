import { PATHES } from "@src/common/enum";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IProps {
  isAuth: boolean;
}

const AuthorizationRouteHOC: React.FC<IProps> = ({ isAuth }) => {
  return isAuth ? <Navigate to={PATHES.USER_PROFILE} /> : <Outlet />;
};

export default AuthorizationRouteHOC;
