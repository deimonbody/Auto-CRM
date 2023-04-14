import React from "react";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { PATHES } from "@src/common/enum";
import SideBar from "../shared/SideBar/SideBar";

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const PageLayout: React.FC<IProps> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="page-layout">
      <div />
      {pathname === PATHES.LOGIN_PAGE ||
      pathname === PATHES.REGISTER_PAGE ? null : (
        <SideBar />
      )}
      {children}
    </div>
  );
};

export default React.memo(PageLayout);
