import { MainRouter } from "../routers/index";
import { lazy } from "react";

const LazyChangePassword = lazy(() =>
	import("../../pages/shared/ChangePassword/changePassword")
);
const LazyUnauthorized = lazy(() =>
	import("../../pages/shared/Unauthorized/unauthorized")
);
const LazyProfile = lazy(() => import("../../pages/student/Profile/profile"));
const LazyDashboard = lazy(() =>
	import("../../pages/student/Dashboard/dashboard")
);
const LazyDefault = lazy(() =>
	import("../../pages/student/SchoolFees/pages/Default/default")
);
const LazySelectSession = lazy(() =>
	import("../../pages/student/SchoolFees/pages/SelectSession/selectSession")
);
const LazyGenerateSchoolFeesInvoice = lazy(() =>
	import(
		"../../pages/student/SchoolFees/pages/GenerateSchoolFeesInvoice/generateSchoolFeesInvoice"
	)
);
const LazyPrintSchoolFeesInvoice = lazy(() =>
	import(
		"../../pages/student/SchoolFees/pages/PrintSchoolFeesInvoice/PrintSchoolFeesInvoice"
	)
);
const LazyPrintSchoolFeesReceipt = lazy(() =>
	import(
		"../../pages/student/SchoolFees/pages/PrintSchoolFeesReceipt/printSchoolFeesReciept"
	)
);


// const LazyPrintHostelFeesReceipt = lazy(() =>
// 	import(
// 		"../../pages/student/Hostel/PrintHostelFeesReceipt/printHostelFeesReciept"
// 	)
// );

const LazyAcceptanceFeeDefault = lazy(() =>
	import("../../pages/student/Acceptance/pages/Default/default")
);
const LazyGenerateAcceptanceFeeInvoice = lazy(() =>
	import(
		"../../pages/student/Acceptance/pages/GenerateAcceptanceFeeInvoice/generateAcceptanceFeeInvoice"
	)
);
const LazyViewAcceptanceInvoice = lazy(() =>
	import(
		"../../pages/student/Acceptance/pages/ViewAcceptanceInvoice/viewAcceptanceInvoice"
	)
);
const LazyAcceptanceLetter = lazy(() =>
	import(
		"../../pages/student/Acceptance/pages/AcceptanceLetter/acceptanceLetter"
	)
);
const LazyCourseRegistration = lazy(() =>
	import("../../pages/student/CourseRegistration/courseRegistration")
);
const LazyCoursesRegistrationStep1 = lazy(() =>
	import(
		"../../pages/student/CourseRegistration/containers/coursesRegistrationStep1"
	)
);
const LazyCoursesRegistrationStep2 = lazy(() =>
	import(
		"../../pages/student/CourseRegistration/containers/coursesRegistrationStep2"
	)
);
const LazyCourseOverview = lazy(() =>
	import("../../pages/student/CourseRegistration/containers/coursesOverview")
);

const LazySundryDefault = lazy(() =>
	import("../../pages/student/Sundry/pages/Default/default")
);
const LazySundrySession = lazy(() =>
	import("../../pages/student/Sundry/pages/SelectSession/selectSession")
);
const LazyGenerateSundryFeesInvoice = lazy(() =>
	import(
		"../../pages/student/Sundry/pages/GenerateSundryFeesInvoice/generateSundryFeesInvoice"
	)
);
const LazyPrintSundryFeesInvoice = lazy(() =>
	import(
		"../../pages/student/Sundry/pages/PrintSundryFeesInvoice/printSundryFeesInvoice"
	)
);
const LazyPrintSundryFeesReceipt = lazy(() =>
	import(
		"../../pages/student/Sundry/pages/PrintSundryFeesReceipt/printSundryFeesReceipt"
	)
);
// const LazyViewHostel = lazy(() =>
// 	import("../../pages/student/Hostel/ViewHostel/viewHostel")
// );

// const LazyViewHostel = lazy(() =>
// 	import("../../pages/student/Hostel/ViewHostel/viewHostel")
// );

// const LazyBookHostel = lazy(() =>
// 	import("../../pages/student/Hostel/BookHostel/bookHostel")
// );

// const LazySelectRoom = lazy(() =>
// 	import("../../pages/student/Hostel/SelectRoom/selectRoom")
// );

// const LazyBedSpaces = lazy(() =>
// 	import("../../pages/student/Hostel/BedSpaces/bedSpaces")
// );

// const LazyHostelInvoice = lazy(() =>
// 	import("../../pages/student/Hostel/Invoice/hostelStudentsInvoice")
// );

export const studentRoutes = [
	{
		path: "/profile",
		component: LazyProfile,
		exact: true,
		router: MainRouter,
		title: "Profile"
	},
	{
		path: "/dashboard",
		component: LazyDashboard,
		exact: true,
		router: MainRouter,
		title: "Dashboard"
	},
	{
		path: "/no_access",
		component: LazyUnauthorized,
		exact: true,
		router: MainRouter,
		title: "Unauthorized access"
	},
	{
		path: "/school_fees",
		component: LazyDefault,
		exact: true,
		router: MainRouter,
		title: "School Fees"
	},
	{
		path: "/school_fees/session",
		component: LazySelectSession,
		exact: true,
		router: MainRouter,
		title: "School Fees"
	},
	{
		path: "/school_fees/generate_invoice",
		component: LazyGenerateSchoolFeesInvoice,
		exact: true,
		router: MainRouter,
		title: "School Fees"
	},
	{
		path: "/school_fees/invoice",
		component: LazyPrintSchoolFeesInvoice,
		exact: true,
		router: MainRouter,
		title: "School Fees"
	},
	{
		path: "/school_fees/receipt",
		component: LazyPrintSchoolFeesReceipt,
		exact: true,
		router: MainRouter,
		title: "School Fees"
	},

	{
		path: "/sundry",
		component: LazySundryDefault,
		exact: true,
		router: MainRouter,
		title: "Sundry"
	},
	{
		path: "/sundry/session",
		component: LazySundrySession,
		exact: true,
		router: MainRouter,
		title: "Sundry"
	},
	{
		path: "/sundry/generate_invoice",
		component: LazyGenerateSundryFeesInvoice,
		exact: true,
		router: MainRouter,
		title: "Sundry"
	},
	{
		path: "/sundry/invoice",
		component: LazyPrintSundryFeesInvoice,
		exact: true,
		router: MainRouter,
		title: "Sundry"
	},
	{
		path: "/sundry/receipt",
		component: LazyPrintSundryFeesReceipt,
		exact: true,
		router: MainRouter,
		title: "Sundry"
	},
	{
		path: "/course_registration",
		component: LazyCourseRegistration,
		exact: true,
		router: MainRouter,
		title: "Course Registration"
	},
	{
		path: "/course_registration/session",
		component: LazyCoursesRegistrationStep1,
		exact: true,
		router: MainRouter,
		title: "Course Registration"
	},
	{
		path: "/course_registration/register",
		component: LazyCoursesRegistrationStep2,
		exact: true,
		router: MainRouter,
		title: "Course Registration"
	},
	{
		path: "/course_registration/view",
		component: LazyCourseOverview,
		exact: true,
		router: MainRouter,
		title: "Course Registration"
	},
	{
		path: "/acceptance",
		component: LazyAcceptanceFeeDefault,
		exact: true,
		router: MainRouter,
		title: "Acceptance"
	},
	{
		path: "/acceptance/generate_invoice",
		component: LazyGenerateAcceptanceFeeInvoice,
		exact: true,
		router: MainRouter,
		title: "Acceptance"
	},
	{
		path: "/acceptance/invoice/:rrr",
		component: LazyViewAcceptanceInvoice,
		exact: true,
		router: MainRouter,
		title: "Acceptance"
	},
	{
		path: "/acceptance/letter",
		component: LazyAcceptanceLetter,
		exact: true,
		router: MainRouter,
		title: "Acceptance"
	},
	{
		path: "/change_password",
		component: LazyChangePassword,
		exact: true,
		router: MainRouter,
		title: "Change Password"
	},
	// {
	// 	path: "/hostel",
	// 	component: LazyViewHostel,
	// 	exact: true,
	// 	router: MainRouter,
	// 	title: "Hostel"
	// },
	// {
	// 	path: "/hostel/book_hostel",
	// 	component: LazyBookHostel,
	// 	exact: true,
	// 	router: MainRouter,
	// 	title: "Hostel"
	// },
	// {
	// 	path: "/hostel/select_room",
	// 	component: LazySelectRoom,
	// 	exact: true,
	// 	router: MainRouter,
	// 	title: "Hostel"
	// },
	// {
	// 	path: "/hostel/bed_spaces",
	// 	component: LazyBedSpaces,
	// 	exact: true,
	// 	router: MainRouter,
	// 	title: "Hostel"
	// },
	// {
	// 	path: "/hostel/invoice",
	// 	component: LazyHostelInvoice,
	// 	exact: true,
	// 	router: MainRouter,
	// 	title: "Hostel"
	// },
	// {
	// 	path: "/hostel_fees/receipt",
	// 	component: LazyPrintHostelFeesReceipt,
	// 	exact: true,
	// 	router: MainRouter,
	// 	title: "Hostel Fees"
	// }
];
