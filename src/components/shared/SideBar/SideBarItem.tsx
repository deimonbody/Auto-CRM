import { PATHES } from "@src/common/enum";
import { ISideBarItem } from "@src/common/interface";
import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  item: ISideBarItem;
  selectItem: PATHES;
}
const SideBarItem: React.FC<IProps> = ({
  item: { path, text, IconSvg },
  selectItem,
}) => {
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
};

export default SideBarItem;
