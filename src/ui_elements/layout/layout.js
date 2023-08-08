import React, { useState, createRef } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import useAuthAction from "../../custom-hooks/useAuthAction";
import { Logout } from "../../pages";
import {
	TOKEN_HOLDER,
	USER_NAME_HOLDER,
	USER_ROLE_HOLDER
} from "../../utils/constants";
import { Banner, GlobalMenu, SideMenu } from "../index";
import "./layout.css";

export const parent = createRef(null);

let menuItems = [];

const studentPaths = {
	dashboard: "/dashboard",
	profile: "/profile",
	acceptance: "/acceptance",
	"course registration": "/course_registration",
	"school fees": "/school_fees",
	results: "/results",
	sundry: "/sundry",
	// "book hostel": "/hostel"
	// hostel: "/hostel"
};

const staffPaths = {
	dashboard: "/dashboard",
	profile: "/profile",
	"admission list": "/admission_list/view",
	applications: "/applications/setup",
	"approve courses": "/approve_courses",
	"course management": "/course_management/manage_course",
	"fees assignment": "/fees_assignment/school_fees",
	"invoice management": "/invoice_management/invoice",
	"lecturer management": "/lecturer_management/lecturer_upload",
	"notice board setup": "/notice_board_management",
	"results & class list": "/records",
	reports: "/reports/jupeb_reports",
	"result management": "/results/classlist",
	"student management": "/student_management/view",
	"user management": "/user_management/users",
	"jamb list upload": "/jamb_list_upload",
	// "hostel management": "/hostel_management/manage_hostel",
	"application reports": "/app_reports/application_reports"
};

const Layout = ({ children, title, noHeader }) => {
	const [open, setOpen] = useState(false);
	const [signOutModal, setSignOutModal] = useState(false);
	const [cookies] = useCookies([
		TOKEN_HOLDER,
		USER_NAME_HOLDER,
		USER_ROLE_HOLDER
	]);
	const menuItemsFromApi = useSelector((state) => state.menuItemsData);
	const { tokenExpirationDate, impersonatorUsername, isImpersonating } =
		useSelector((state) => state.impersonatorDetails);
	const { logout } = useAuthAction();

	const { [USER_ROLE_HOLDER]: userRole, [USER_NAME_HOLDER]: userName } =
		cookies;

	switch (userRole) {
		case "student":
			menuItems = menuItemsFromApi
				.map((item) => ({
					name: item,
					path: studentPaths[item.toLowerCase()]
				}))
				.filter((item) => item.path);
			break;
		default:
			menuItems = menuItemsFromApi
				.map((item) => ({
					name: item,
					path: staffPaths[item.toLowerCase()]
				}))
				.filter((item) => item.path);
			break;
	}

	return (
		<div className="app-container">
			<section className="res-header">
				{isImpersonating && (
					<Banner
						impersonator={impersonatorUsername}
						impersonated={userName}
						date={tokenExpirationDate}
						onEndSessionClick={logout}
					/>
				)}
				<GlobalMenu
					title={title}
					openSide={() => setOpen(true)}
					setSignOutModal={setSignOutModal}
					userName={userName}
				/>
			</section>
			<section className={`${open ? "res-side" : "res-no-side"}`}>
				<div
					className="res-side-menu--background"
					onClick={() => setOpen(false)}
				></div>
				<SideMenu
					paths={menuItems}
					closeSide={() => setOpen(false)}
					setSignOutModal={setSignOutModal}
				/>
			</section>
			<div
				className={`children ${noHeader ? "no-header-tab" : ""}`}
				style={isImpersonating ? { paddingTop: "96px" } : {}}
				ref={parent}
			>
				{children}
			</div>
			<Logout
				isOpen={signOutModal}
				closeModal={() => setSignOutModal(false)}
			/>
		</div>
	);
};

export { Layout };
