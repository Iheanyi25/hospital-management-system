import React, { useState, createRef, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useApiGet } from "../../api/apiCall";
import { getStudentProfileUrl, getUserProfileUrl } from "../../api/urls";
import useAuthAction from "../../custom-hooks/useAuthAction";
import { Logout } from "../../pages";
import {
	TOKEN_HOLDER,
	DISPLAY_CSAT_MODAL,
	USER_NAME_HOLDER,
	USER_ROLE_HOLDER
} from "../../utils/constants";
import { Banner, GlobalMenu, SideMenu } from "../index";
import { PageLoader } from "../pageLoader/pageLoader";
import "./layout.css";
import FeedbackModal from "../feedbackModal/feedback";

export const parent = createRef(null);

export const ProfileContext = createContext();

let menuItems = [];

const staffPaths = {
	dashboard: "/dashboard",
	profile: "/profile",
	applications: "/applications/setup",
	"approve courses": "/approve_courses",
	"course management": "/course_management/manage_course",
	"fees assignment": "/fees_assignment/school_fees",
	"invoice management": "/invoice_management/invoice",
	// "lecturer management": "/lecturer_management/lecturer_upload",
	"notice board setup": "/notice_board_management",
	"my class": "/class",
	"my courses": "/records",
	reports: "/reports/payment_reports",
	utilities: "/utilities/olevel_verification",
	"result management": "/results/classlist",
	"student management": "/student_management/search_student",
	"user management": "/user_management/users",
	"jamb list upload": "/jamb_list_upload",
	"hostel management": "/hostel_management/manage_hostel",
	"application reports": "/app_reports/application_reports",
	"school setup": "/school_setup/manage_faculty_and_department",
};

const Layout = ({ children, title, noHeader }) => {
	const [open, setOpen] = useState(false);
	const [signOutModal, setSignOutModal] = useState(false);
	const [cookies] = useCookies([
		TOKEN_HOLDER,
		DISPLAY_CSAT_MODAL,
		USER_NAME_HOLDER,
		USER_ROLE_HOLDER
	]);
	const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(
		cookies[DISPLAY_CSAT_MODAL]
			? JSON.parse(cookies[DISPLAY_CSAT_MODAL])
			: false
	);
	useEffect(() => {
		cookies[DISPLAY_CSAT_MODAL] &&
			setIsFeedbackModalOpen(JSON.parse(cookies[DISPLAY_CSAT_MODAL]));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cookies[DISPLAY_CSAT_MODAL]]);

	const { data, isLoading, error } = useApiGet(
		getStudentProfileUrl({ refCode: false }),
		{
			refetchOnWindowFocus: false,
			enabled: cookies[USER_ROLE_HOLDER] === "student"
		}
	);
	const {
		data: user,
		isLoading: isLoadingUser,
		error: userError
	} = useApiGet(getUserProfileUrl("false"), {
		refetchOnWindowFocus: false,
		enabled: cookies[USER_ROLE_HOLDER] !== "student"
	});
	const [profileData, setProfileData] = useState(data?.data ?? user?.data);

	useEffect(() => {
		setProfileData(data?.data ?? user?.data);
	}, [data?.data, user?.data]);

	const isUnderGraduate = data?.data?.programmeDetail?.studentTypeId;
	const studentPaths = {
		dashboard: "/dashboard",
		profile: "/profile",
		"academic fees": "/academic_fees/school_fees",
		"development levy": "/development_levy",
		"course registration": "/course_registration",
		results: "/results",
		siwes: "/siwes",
		hostel: "/hostel",
		"lecturer appraisal": "/lecturer_appraisal"
	};
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

	if (isLoading || isLoadingUser) {
		return <PageLoader />;
	}

	if (error || userError) {
		return "An error has occurred: " + error?.message ?? userError?.message;
	}

	return (
		<ProfileContext.Provider value={{ profileData, setProfileData }}>
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
					{isFeedbackModalOpen && (
						<FeedbackModal
							isOpen={isFeedbackModalOpen}
							onClose={() => setIsFeedbackModalOpen(false)}
						/>
					)}
					<GlobalMenu
						title={title}
						openSide={() => setOpen(true)}
						setSignOutModal={setSignOutModal}
						userName={userName}
						isUnderGraduate={isUnderGraduate}
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
		</ProfileContext.Provider>
	);
};

export { Layout };
