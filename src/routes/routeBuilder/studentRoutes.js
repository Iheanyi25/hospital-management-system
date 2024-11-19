import { AcademicFeesRouter, MainRouter } from "../routers/index";
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
	import("../../pages/student/AcademicFees/SchoolFees/pages/Default/default")
);
const LazySelectSession = lazy(() =>
	import(
		"../../pages/student/AcademicFees/SchoolFees/pages/SelectSession/selectSession"
	)
);
const LazyGenerateSchoolFeesInvoice = lazy(() =>
	import(
		"../../pages/student/AcademicFees/SchoolFees/pages/GenerateSchoolFeesInvoice/generateSchoolFeesInvoice"
	)
);
const LazyPrintSchoolFeesInvoice = lazy(() =>
	import(
		"../../pages/student/AcademicFees/SchoolFees/pages/PrintSchoolFeesInvoice/PrintSchoolFeesInvoice"
	)
);
const LazyPrintSchoolFeesReceipt = lazy(() =>
	import(
		"../../pages/student/AcademicFees/SchoolFees/pages/PrintSchoolFeesReceipt/printSchoolFeesReciept"
	)
);
const LazyAcceptanceFeeDefault = lazy(() =>
	import("../../pages/student/AcademicFees/Acceptance/pages/Default/default")
);
const LazyGenerateAcceptanceFeeInvoice = lazy(() =>
	import(
		"../../pages/student/AcademicFees/Acceptance/pages/GenerateAcceptanceFeeInvoice/generateAcceptanceFeeInvoice"
	)
);
const LazyViewAcceptanceInvoice = lazy(() =>
	import(
		"../../pages/student/AcademicFees/Acceptance/pages/ViewAcceptanceInvoice/viewAcceptanceInvoice"
	)
);
const LazyAcceptanceLetter = lazy(() =>
	import(
		"../../pages/student/AcademicFees/Acceptance/pages/AcceptanceLetter/acceptanceLetter"
	)
);
const LazyAcceptanceLetterPG = lazy(() =>
	import(
		"../../pages/student/AcademicFees/Acceptance/pages/AcceptanceLetterPG/acceptanceLetterPG"
	)
);
const LazyAcceptanceFeeReceipt = lazy(() =>
	import(
		"../../pages/student/AcademicFees/Acceptance/pages/PrintAcceptanceFeeReceipt/printAcceptanceFeeReciept"
	)
);
const LazyDevelopmentLevyDefault = lazy(() =>
	import("../../pages/student/DevelopmentLevy/pages/Default/default")
);
const LazyGenerateDevelopmentLevyInvoice = lazy(() =>
	import(
		"../../pages/student/DevelopmentLevy/pages/GenerateAcceptanceFeeInvoice/generateAcceptanceFeeInvoice"
	)
);
const LazyViewDevelopmentLevyInvoice = lazy(() =>
	import(
		"../../pages/student/DevelopmentLevy/pages/ViewAcceptanceInvoice/viewAcceptanceInvoice"
	)
);
const LazyDevelopmentLevyLetter = lazy(() =>
	import(
		"../../pages/student/DevelopmentLevy/pages/AcceptanceLetter/acceptanceLetter"
	)
);

const LazyViewAcceptanceJubepLetter = lazy(() =>
	import(
		"../../pages/student/AcademicFees/Acceptance/pages/AcceptanceLetterJupeb/acceptanceLetterJupeb"
	)
);

const LazyDevelopmentLevyDocumentPage = lazy(() =>
	import(
		"../../pages/student/DevelopmentLevy/pages/DocumentPage/documentPage"
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
	import("../../pages/student/AcademicFees/Sundry/pages/Default/default")
);
const LazySundrySession = lazy(() =>
	import(
		"../../pages/student/AcademicFees/Sundry/pages/SelectSession/selectSession"
	)
);
const LazyGenerateSundryFeesInvoice = lazy(() =>
	import(
		"../../pages/student/AcademicFees/Sundry/pages/GenerateSundryFeesInvoice/generateSundryFeesInvoice"
	)
);
const LazyPrintSundryFeesInvoice = lazy(() =>
	import(
		"../../pages/student/AcademicFees/Sundry/pages/PrintSundryFeesInvoice/printSundryFeesInvoice"
	)
);
const LazyPrintSundryFeesReceipt = lazy(() =>
	import(
		"../../pages/student/AcademicFees/Sundry/pages/PrintSundryFeesReceipt/printSundryFeesReceipt"
	)
);

const LazySiwes = lazy(() => import("../../pages/student/Siwes/siwes"));

const LazySiwesPrintOut = lazy(() =>
	import("../../pages/student/Siwes/siwesPrintOut")
);
const LazyViewHostel = lazy(() =>
	import("../../pages/student/Hostel/ViewHostel/viewHostel")
);

const LazyBookHostel = lazy(() =>
	import("../../pages/student/Hostel/BookHostel/bookHostel")
);

const LazySelectRoom = lazy(() =>
	import("../../pages/student/Hostel/SelectRoom/selectRoom")
);

const LazyArrearsPayment = lazy(() =>
	import("../../pages/student/Hostel/ArrearsPayment/viewAllRooms")
);

const LazyBedSpaces = lazy(() =>
	import("../../pages/student/Hostel/BedSpaces/bedSpaces")
);

const LazyHostelInvoice = lazy(() =>
	import("../../pages/student/Hostel/Invoice/hostelStudentsInvoice")
);

const LazyPrintHostelFeesReceipt = lazy(() =>
	import(
		"../../pages/student/Hostel/PrintHostelFeesReceipt/printHostelFeesReciept"
	)
);
const LazyResultsDefault = lazy(() =>
	import("../../pages/student/Results/pages/Default/default")
);
const LazyViewResult = lazy(() =>
	import("../../pages/student/Results/pages/ViewResult/viewResult")
);
const LazyPrintPreDegreeForm11 = lazy(() =>
	import(
		"../../pages/student/AcademicFees/SchoolFees/pages/PrintPreDegreeForm11/printPredDegreeForm11"
	)
);

const LazyNotifications = lazy(() =>
	import("../../pages/shared/Notifications/notifications")
);

const LazyChangeOfDegree = lazy(() =>
	import(
		"../../pages/student/AcademicFees/ChangeOfDegree/pages/Default/default"
	)
);

const LazyChangeOfDegreeSelectSession = lazy(() =>
	import(
		"../../pages/student/AcademicFees/ChangeOfDegree/pages/SelectSession/selectSession"
	)
);

const LazyGenerateChangeOfDegreeInvoice = lazy(() =>
	import(
		"../../pages/student/AcademicFees/ChangeOfDegree/pages/GenerateChangeOfDegreeInvoice/generateChangeOfDegreeInvoice"
	)
);
const LazyPrintChangeOfDegreeInvoice = lazy(() =>
	import(
		"../../pages/student/AcademicFees/ChangeOfDegree/pages/PrintChangeOfDegreeInvoice/PrintChangeOfDegreeInvoice"
	)
);

const LazyChangeOfDepartmentApplication = lazy(() =>
	import(
		"../../pages/student/ChangeOfDepartmentApplication/changeOfDepartmentApplication"
	)
);
const LazyChangeOfDepartmentApplicationDetails = lazy(() =>
	import(
		"../../pages/student/ChangeOfDepartmentApplication/changeOfDepartmentApplicationDetails/changeOfDepartmentApplicationDetails"
	)
);
const LazyExternalCoursesFeesInvoice = lazy(() =>
	import(
		"../../pages/student/CourseRegistration/containers/externalCoursesFeesInvoice"
	)
);

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
		path: "/academic_fees/school_fees",
		component: LazyDefault,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/school_fees/session",
		component: LazySelectSession,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/school_fees/generate_invoice",
		component: LazyGenerateSchoolFeesInvoice,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/school_fees/invoice",
		component: LazyPrintSchoolFeesInvoice,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/school_fees/receipt",
		component: LazyPrintSchoolFeesReceipt,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/sundry",
		component: LazySundryDefault,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/sundry/session",
		component: LazySundrySession,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/sundry/generate_invoice",
		component: LazyGenerateSundryFeesInvoice,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/sundry/invoice",
		component: LazyPrintSundryFeesInvoice,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/sundry/receipt",
		component: LazyPrintSundryFeesReceipt,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
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
		path: "/course_registration/invoice",
		component: LazyExternalCoursesFeesInvoice,
		exact: true,
		router: MainRouter,
		title: "Course Registration"
	},
	{
		path: "/academic_fees/acceptance",
		component: LazyAcceptanceFeeDefault,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/acceptance/generate_invoice",
		component: LazyGenerateAcceptanceFeeInvoice,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/acceptance/invoice/:rrr",
		component: LazyViewAcceptanceInvoice,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/acceptance/letter",
		component: LazyAcceptanceLetter,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/acceptance/jupeb",
		component: LazyViewAcceptanceJubepLetter,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/acceptance/letter_pg",
		component: LazyAcceptanceLetterPG,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/acceptance/fee_receipt",
		component: LazyAcceptanceFeeReceipt,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/school_fees/form11",
		component: LazyPrintPreDegreeForm11,
		exact: true,
		router: AcademicFeesRouter,
		title: "School Fees"
	},
	{
		path: "/development_levy",
		component: LazyDevelopmentLevyDefault,
		exact: true,
		router: MainRouter,
		title: "Development Levy"
	},
	{
		path: "/development_levy/generate_invoice",
		component: LazyGenerateDevelopmentLevyInvoice,
		exact: true,
		router: MainRouter,
		title: "Development Levy"
	},
	{
		path: "/development_levy/invoice/:rrr",
		component: LazyViewDevelopmentLevyInvoice,
		exact: true,
		router: MainRouter,
		title: "Development Levy"
	},
	{
		path: "/development_levy/letter",
		component: LazyDevelopmentLevyLetter,
		exact: true,
		router: MainRouter,
		title: "Development Levy"
	},
	{
		path: "/development_levy/document_page",
		component: LazyDevelopmentLevyDocumentPage,
		exact: true,
		router: MainRouter,
		title: "Development Levy"
	},
	{
		path: "/change_password",
		component: LazyChangePassword,
		exact: true,
		router: MainRouter,
		title: "Change Password"
	},
	{
		path: "/siwes",
		component: LazySiwes,
		exact: true,
		router: MainRouter,
		title: "Siwes"
	},
	{
		path: "/siwes/preview",
		component: LazySiwesPrintOut,
		exact: true,
		router: MainRouter,
		title: "Siwes"
	},
	{
		path: "/results",
		component: LazyResultsDefault,
		exact: true,
		router: MainRouter,
		title: "Results"
	},
	{
		path: "/results/result",
		component: LazyViewResult,
		exact: true,
		router: MainRouter,
		title: "Results"
	},
	{
		path: "/hostel",
		component: LazyViewHostel,
		exact: true,
		router: MainRouter,
		title: "Hostel"
	},
	{
		path: "/hostel/book_hostel",
		component: LazyBookHostel,
		exact: true,
		router: MainRouter,
		title: "Hostel"
	},
	{
		path: "/hostel/select_room",
		component: LazySelectRoom,
		exact: true,
		router: MainRouter,
		title: "Hostel"
	},
	{
		path: "/hostel/arrears_payment",
		component: LazyArrearsPayment,
		exact: true,
		router: MainRouter,
		title: "Hostel"
	},
	{
		path: "/hostel/bed_spaces",
		component: LazyBedSpaces,
		exact: true,
		router: MainRouter,
		title: "Hostel"
	},
	{
		path: "/hostel/invoice",
		component: LazyHostelInvoice,
		exact: true,
		router: MainRouter,
		title: "Hostel"
	},
	{
		path: "/hostel_fees/receipt",
		component: LazyPrintHostelFeesReceipt,
		exact: true,
		router: MainRouter,
		title: "Hostel Fees"
	},
	{
		path: "/notifications",
		component: LazyNotifications,
		exact: true,
		router: MainRouter,
		title: "Notifications"
	},
	{
		path: "/academic_fees/change_of_degree",
		component: LazyChangeOfDegree,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/change_of_degree/session",
		component: LazyChangeOfDegreeSelectSession,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/change_of_degree/generate_invoice",
		component: LazyGenerateChangeOfDegreeInvoice,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/academic_fees/change_of_degree/invoice",
		component: LazyPrintChangeOfDegreeInvoice,
		exact: true,
		router: AcademicFeesRouter,
		title: "Academic Fees"
	},
	{
		path: "/change_of_department_application",
		router: MainRouter,
		component: LazyChangeOfDepartmentApplication,
		exact: true
	},
	{
		path: "/change_of_department_application_details",
		router: MainRouter,
		component: LazyChangeOfDepartmentApplicationDetails
	}
];
