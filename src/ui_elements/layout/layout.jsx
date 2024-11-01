import React, { useState, createRef } from "react";
// import { useCookies } from "react-cookie";
// import { useSelector } from "react-redux";
// import { Logout } from "../../pages";
// import {
// 	TOKEN_HOLDER,
// 	USER_NAME_HOLDER,
// 	USER_ROLE_HOLDER
// } from "../../utils/constants";
import { GlobalMenu, SideMenu } from "../index";
import "./layout.css";

export const parent = createRef(null);

// let menuItems = [];

const Layout = ({ children, title, noHeader }) => {
  const [open, setOpen] = useState(false);
  // const [signOutModal, setSignOutModal] = useState(false);
  // const [cookies] = useCookies([
  // 	TOKEN_HOLDER,
  // 	USER_NAME_HOLDER,
  // 	USER_ROLE_HOLDER
  // ]);
  // const menuItemsFromApi = useSelector((state) => state.menuItemsData);
  // const { [USER_ROLE_HOLDER]: userRole, [USER_NAME_HOLDER]: userName } =
  // 	cookies;

  // switch (userRole) {
  // 	case "student":
  // 		menuItems = menuItemsFromApi
  // 			.map((item) => ({
  // 				name: item,
  // 				path: studentPaths[item.toLowerCase()]
  // 			}))
  // 			.filter((item) => item.path);
  // 		break;
  // 	default:
  // 		menuItems = menuItemsFromApi
  // 			.map((item) => ({
  // 				name: item,
  // 				path: staffPaths[item.toLowerCase()]
  // 			}))
  // 			.filter((item) => item.path);
  // 		break;
  // }

  return (
    <div className="app-container">
      <section className="res-header">
        <GlobalMenu
          title={title}
          openSide={() => setOpen(true)}
        //   setSignOutModal={setSignOutModal}
        //   userName={userName}
        />
      </section>
      <section className={`${open ? "res-side" : "res-no-side"}`}>
        <div
          className="res-side-menu--background"
          onClick={() => setOpen(false)}
        ></div>
        <SideMenu
          // paths={menuItems}
          closeSide={() => setOpen(false)}
        //   setSignOutModal={setSignOutModal}
        />
      </section>
      <div
        className={`children ${noHeader ? "no-header-tab" : ""}`}
        ref={parent}
      >
        {children}
      </div>
      {/* <Logout
				isOpen={signOutModal}
				closeModal={() => setSignOutModal(false)}
			/> */}
    </div>
  );
};

export { Layout };
