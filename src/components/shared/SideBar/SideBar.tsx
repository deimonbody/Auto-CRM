import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { ReactComponent as BurgerSVG } from "@images/burger.svg";
import { ReactComponent as CloseSVG } from "@images/close.svg";
import { ReactComponent as TripSVG } from "@images/plane.svg";
import { ReactComponent as AdminPanelSVG } from "@images/usersTable.svg";
import { ReactComponent as ProfileSVG } from "@images/profile.svg";
import { ReactComponent as LogoutSVG } from "@images/exit.svg";

import { PATHES } from "@src/common/enum";
import { Link, useLocation } from "react-router-dom";
import { useAdmin } from "@src/hooks/useAdmin";
import { useDidUpdateEffect } from "@src/hooks/useDidUpdateEffect";
import { useAppDispatch } from "@src/store/hooks";
import { logoutUser } from "@src/store/user/actions";

interface ISideBarItem {
  path: PATHES;
  IconSvg: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
}

const sideBarItems: ISideBarItem[] = [
  {
    path: PATHES.USER_PROFILE,
    IconSvg: ProfileSVG,
    text: "Profile Page",
  },
  {
    path: PATHES.ADMIN_PAGE,
    IconSvg: AdminPanelSVG,
    text: "Admin Page",
  },
  {
    path: PATHES.CREATE_TRIP_PAGE,
    IconSvg: TripSVG,
    text: "Trips Page",
  },
];

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(PATHES.USER_PROFILE);
  const { pathname } = useLocation();
  const isAdmin = useAdmin();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectItem(pathname as PATHES);
  }, [pathname]);

  useDidUpdateEffect(() => {
    const sideBar = ref.current as HTMLDivElement;
    if (isOpen) {
      sideBar.style.animation =
        "openSideBar 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)  forwards";
    } else {
      sideBar.style.animation =
        "closeSideBar 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)  forwards";
    }
  }, [isOpen]);

  const changeSideBar = () => {
    setIsOpen((prev) => !prev);
  };

  const logoutUserHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="sideBar d-flex flex-column align-items-center" ref={ref}>
      <div className="sideBar__toogle" onClick={changeSideBar}>
        {isOpen ? <CloseSVG /> : <BurgerSVG />}
      </div>
      <div className="sideBar__body d-flex flex-column mt-3">
        {sideBarItems.map(({ text, path, IconSvg }) => {
          if (path === PATHES.ADMIN_PAGE && !isAdmin) {
            return null;
          }
          return (
            <Link
              to={path}
              className={`sideBar__item d-flex align-items-center text-white text-decoration-none ${
                path === selectItem ? "sideBar__item--active" : ""
              }`}
              key={path}
            >
              <div className="sideBar__item-icon">
                <IconSvg />
              </div>
              <p>{text}</p>
            </Link>
          );
        })}
        <div
          className="sideBar__item d-flex align-items-center sideBar__item--logout"
          onClick={logoutUserHandler}
        >
          <div className="sideBar__item-icon">
            <LogoutSVG />
          </div>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SideBar);
