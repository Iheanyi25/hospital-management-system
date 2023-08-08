import {
	AdmissionListRouter,
	ApplicationReportsRouter,
	ApplicationsRouter,
	CourseMangementRouter,
	FeesAssignmentRouter,
	InvoiceRouter,
	// HostelRouter,
	LecturerManagementRouter,
	MainRouter,
	ReportsRouter,
	ResultManagementRouter,
	StudentManagementRouter,
	UnathorisedRouter,
	UserManagementRouter
} from "../routers";
import { lazy } from "react";

const LazyDashboard = lazy(() =>
	import("../../pages/shared/Dashboard/dashboard")
);
const LazyChangePassword = lazy(() =>
	import("../../pages/shared/ChangePassword/changePassword")
);
const LazyJupebReports = lazy(() =>
	import("../../pages/superAdmin/Reports/pages/JupebReports/jupebReports")
);
const LazyApplicationPaymentReport = lazy(() =>
	import("../../pages/superAdmin/Reports/pages/ApplicationPaymentReport/applicationPaymentReport")
);
const LazyPutmeReports = lazy(() =>
	import("../../pages/superAdmin/Reports/pages/PutmeReports/putmeReports")
);
const LazyPGReports = lazy(() =>
	import("../../pages/superAdmin/Reports/pages/PGReports/pgReports")
);
const LazyManageUsers = lazy(() =>
	import(
		"../../pages/superAdmin/UserManagement/pages/ManageUsers/manageUsers"
	)
);
const LazyManageRoles = lazy(() =>
	import(
		"../../pages/superAdmin/UserManagement/pages/ManageRoles/manageRoles"
	)
);
const LazyManageMenus = lazy(() =>
	import(
		"../../pages/superAdmin/UserManagement/pages/ManageMenus/manageMenus"
	)
);
const LazyViewAllStudents = lazy(() =>
	import(
		"../../pages/superAdmin/StudentManagement/EditStudentProfile/ViewAllStudents"
	)
);
const LazyMenuManagement = lazy(() =>
	import(
		"../../pages/superAdmin/UserManagement/pages/ManageMenus/menuManagement"
	)
);
const LazyUserClaimManagement = lazy(() =>
	import(
		"../../pages/superAdmin/UserManagement/pages/ManageMenus/userClaimManagement"
	)
);
const LazyEditProfile = lazy(() =>
	import(
		"../../pages/superAdmin/StudentManagement/EditStudentProfile/EditProfile/editProfile"
	)
);
const LazyClearStudents = lazy(() =>
	import(
		"../../pages/superAdmin/StudentManagement/ClearStudents/clearStudents"
	)
);

const LazyUnauthorized = lazy(() =>
	import("../../pages/shared/Unauthorized/unauthorized")
);

const LazyAdmissionList = lazy(() =>
	import("../../pages/superAdmin/AdmissionList/ViewAdmissionList")
);

const LazyManageCourse = lazy(() =>
	import(
		"../../pages/superAdmin/CourseManagement/pages/ManageCourse/manageCourse"
	)
);

const LazyAssignCourse = lazy(() =>
	import(
		"../../pages/superAdmin/CourseManagement/pages/AssignCourse/assignCourse"
	)
);

const LazyManageCourseUnit = lazy(() =>
	import(
		"../../pages/superAdmin/CourseManagement/pages/ManageUnitLoad/manageUnitLoad"
	)
);

const LazyAddDropCourse = lazy(() =>
	import(
		"../../pages/superAdmin/CourseManagement/pages/AddDropCourse/addDropCourse"
	)
);

const LazyAssignCreditLoad = lazy(() =>
	import(
		"../../pages/superAdmin/CourseManagement/pages/AssignCreditLoad/assignCreditLoad"
	)
);

const LazyOpenCloseCourseRegistration = lazy(() =>
	import(
		"../../pages/superAdmin/CourseManagement/pages/OpenCloseCourseRegistration/openCloseCourseRegistration"
	)
);

const LazySchoolFeesAssignment = lazy(() =>
	import("../../pages/superAdmin/FeesAssignment/pages/SchoolFees/schoolFees")
);

const LazySchoolFeesAssignmentEdit = lazy(() =>
	import(
		"../../pages/superAdmin/FeesAssignment/pages/SchoolFees/schoolFeesEdit"
	)
);

const LazyAcceptanceFeeAssignment = lazy(() =>
	import(
		"../../pages/superAdmin/FeesAssignment/pages/AcceptanceFee/acceptanceFee"
	)
);

const LazyPGSchoolFeesAssignment = lazy(() =>
	import(
		"../../pages/superAdmin/FeesAssignment/pages/PGSchoolFees/pgSchoolFees"
	)
);
const LazySundryFeesAssignment = lazy(() =>
	import("../../pages/superAdmin/FeesAssignment/pages/SundryFees/sundryFees")
);
const LazyAssignCourseToLecturer = lazy(() =>
	import(
		"../../pages/superAdmin/LecturerManagement/pages/CourseAssignmentToLecturer/assignCourseToLecturer"
	)
);

const LazyAssignHOD = lazy(() =>
	import(
		"../../pages/superAdmin/LecturerManagement/pages/AssignHOD/assignHOD"
	)
);

const LazyAssignDean = lazy(() =>
	import(
		"../../pages/superAdmin/LecturerManagement/pages/AssignDean/assignDean"
	)
);

const LazyLecturerUpload = lazy(() =>
	import(
		"../../pages/superAdmin/LecturerManagement/pages/LecturerUpload/lecturerUpload"
	)
);
const LazyFilterRecords = lazy(() =>
	import("../../pages/lecturer/Records/pages/FilterRecords/filterRecords")
);
const LazyViewRecords = lazy(() =>
	import("../../pages/lecturer/Records/pages/ViewRecords/viewRecords")
);
const LazyViewResults = lazy(() =>
	import("../../pages/lecturer/Records/pages/ViewResults/viewResults")
);
const LazyViewClassList = lazy(() =>
	import("../../pages/lecturer/Records/pages/ViewClassList/viewClassList")
);

const LazyNoticeBoard = lazy(() =>
	import("../../pages/superAdmin/NoticeBoard/noticeBoard")
);

const LazyClassListResultRecords = lazy(() =>
	import(
		"../../pages/superAdmin/ResultManagement/pages/CLassList/SelectRecords/selectRecords"
	)
);

const LazyClasslistViewResultsUploaded = lazy(() =>
	import(
		"../../pages/superAdmin/ResultManagement/pages/CLassList/ViewResults/viewResults"
	)
);
const LazyJambListUpload = lazy(() =>
	import("../../pages/superAdmin/Application/JambListUpload/jambListUpload")
);
const LazyDirectEntryUpload = lazy(() =>
	import(
		"../../pages/superAdmin/Application/DirectEntryUpload/directEntryUpload"
	)
);
const LazySelectCourseRecords = lazy(() =>
	import(
		"../../pages/superAdmin/ApproveCourses/pages/SelectRecords/selectRecords"
	)
);

const LazyViewCoursesRegistered = lazy(() =>
	import(
		"../../pages/superAdmin/ApproveCourses/pages/ViewCoursesRegistered/viewCoursesRegistered"
	)
);

// const LazyMangeHostel = lazy(() =>
// 	import(
// 		"../../pages/superAdmin/HostelManagement/ManageHostels/manageHostels"
// 	)
// );

// const LazyViewRooms = lazy(() =>
// 	import(
// 		"../../pages/superAdmin/HostelManagement/ManageHostels/components/viewRoom"
// 	)
// );
// const LazyViewBedspaces = lazy(() =>
// 	import(
// 		"../../pages/superAdmin/HostelManagement/ManageHostels/components/viewBedspaces"
// 	)
// );

// const LazyCategoryManagement = lazy(() =>
// 	import(
// 		"../../pages/superAdmin/HostelManagement/ManageCategory/manageCategory"
// 	)
// );

const LazyApplicationSetup = lazy(() =>
	import(
		"../../pages/superAdmin/Application/ApplicationSetup/applicationSetup"
	)
);

const LazyApplicationReset = lazy(() =>
	import(
		"../../pages/superAdmin/Application/ApplicationReset/pages/applicationReset"
	)
);

const LazyDeleteInvoice = lazy(() =>
	import(
		"../../pages/superAdmin/Application/DeleteInvoice/pages/deleteInvoice"
	)
);
const LazyApplicationReports = lazy(() =>
	import(
		"../../pages/superAdmin/ApplicationReports/pages/ApplicationReports/applicationReports"
	)
);
const LazyInvoiceManagement = lazy(() =>
	import(
		"../../pages/superAdmin/InvoiceManagement/pages/InvoiceManagement/invoiceManagement"
	)
);
const LazyPaymentReports = lazy(() =>
	import("../../pages/superAdmin/Reports/pages/PaymentReports/paymentReports")
);
const LazyCourseRegReports = lazy(() =>
	import("../../pages/superAdmin/Reports/pages/CourseRegReports/courseRegReports")
);

const LazyMatricNumberGenerationReports = lazy(() =>
	import("../../pages/superAdmin/Reports/pages/MatricNumberGenerationReports/matricNumberGenerationReports")
);

const LazyResultSheet = lazy(() =>
	import(
		"../../pages/superAdmin/ResultManagement/pages/ResultSheet/viewResultSheet"
	)
);

export const staffRoutes = [
	//add super admin routes here
	{
		path: "/dashboard",
		component: LazyDashboard,
		exact: true,
		router: MainRouter,
		title: "Dashboard"
	},
	{
		path: "/notice_board_management",
		component: LazyNoticeBoard,
		exact: true,
		router: MainRouter,
		title: "Notice board setup"
	},
	{
		path: "/reports/jupeb_reports",
		component: LazyJupebReports,
		exact: true,
		router: ReportsRouter,
		title: "Reports"
	},
	{
		path: "/reports/application_payment_reports",
		component: LazyApplicationPaymentReport,
		exact: true,
		router: ReportsRouter,
		title: "Reports"
	},
	{
		path: "/reports/putme_reports",
		component: LazyPutmeReports,
		exact: true,
		router: ReportsRouter,
		title: "Reports"
	},
	{
		path: "/reports/pg_reports",
		component: LazyPGReports,
		exact: true,
		router: ReportsRouter,
		title: "Reports"
	},
	{
		path: "/user_management/roles",
		component: LazyManageRoles,
		exact: true,
		router: UserManagementRouter,
		title: "User Management"
	},
	{
		path: "/user_management/users",
		component: LazyManageUsers,
		exact: true,
		router: UserManagementRouter,
		title: "User Management"
	},
	{
		path: "/user_management/menus",
		component: LazyManageMenus,
		exact: true,
		router: UserManagementRouter,
		title: "User Management"
	},
	{
		path: "/user_management/menus/management",
		component: LazyMenuManagement,
		exact: true,
		router: UserManagementRouter,
		title: "User Management"
	},
	{
		path: "/user_management/users/management",
		component: LazyUserClaimManagement,
		exact: true,
		router: UserManagementRouter,
		title: "User Management"
	},
	{
		path: "/user_management/users/edit",
		component: LazyEditProfile,
		exact: true,
		router: UserManagementRouter,
		title: "User Management"
	},
	{
		path: "/student_management/view",
		component: LazyViewAllStudents,
		exact: true,
		router: StudentManagementRouter,
		title: "Student Management"
	},
	{
		path: "/student_management/view/edit",
		component: LazyEditProfile,
		exact: true,
		router: StudentManagementRouter,
		title: "Student Management"
	},
	{
		path: "/student_management/clear",
		component: LazyClearStudents,
		exact: true,
		router: StudentManagementRouter,
		title: "Student Management"
	},
	{
		path: "/change_password",
		component: LazyChangePassword,
		exact: true,
		router: MainRouter,
		title: "Change Password"
	},
	{
		path: "/no_access",
		component: LazyUnauthorized,
		exact: true,
		router: UnathorisedRouter,
		title: "Unauthorized access"
	},
	{
		path: "/admission_list/view",
		component: LazyAdmissionList,
		exact: true,
		router: AdmissionListRouter,
		title: "Admission List"
	},
	{
		path: "/admission_list/search",
		component: LazyAdmissionList,
		exact: true,
		title: "Search Admission List",
		router: AdmissionListRouter
	},
	{
		path: "/course_management/manage_course",
		component: LazyManageCourse,
		exact: true,
		router: CourseMangementRouter,
		title: "Course Management"
	},
	{
		path: "/course_management/assign_course",
		component: LazyAssignCourse,
		exact: true,
		router: CourseMangementRouter,
		title: "Course Management"
	},
	{
		path: "/course_management/manage_load",
		component: LazyManageCourseUnit,
		exact: true,
		router: CourseMangementRouter,
		title: "Course Management"
	},
	{
		path: "/course_management/add_drop",
		component: LazyAddDropCourse,
		exact: true,
		router: CourseMangementRouter,
		title: "Course Management"
	},
	{
		path: "/course_management/assign_unit",
		component: LazyAssignCreditLoad,
		exact: true,
		router: CourseMangementRouter,
		title: "Course Management"
	},
	{
		path: "/course_management/open_reg",
		component: LazyOpenCloseCourseRegistration,
		exact: true,
		router: CourseMangementRouter,
		title: "Course Management"
	},
	{
		path: "/lecturer_management/assign_courses",
		component: LazyAssignCourseToLecturer,
		exact: true,
		router: LecturerManagementRouter,
		title: "Assign Course To Lecturer"
	},
	{
		path: "/lecturer_management/assign_staff/hod",
		component: LazyAssignHOD,
		exact: true,
		router: LecturerManagementRouter,
		title: "Assign HOD"
	},
	{
		path: "/lecturer_management/assign_staff/dean",
		component: LazyAssignDean,
		exact: true,
		router: LecturerManagementRouter,
		title: "Assign Dean"
	},
	{
		path: "/lecturer_management/lecturer_upload",
		component: LazyLecturerUpload,
		exact: true,
		router: LecturerManagementRouter,
		title: "Lecturer Upload"
	},
	{
		path: "/fees_assignment/school_fees",
		component: LazySchoolFeesAssignment,
		exact: true,
		router: FeesAssignmentRouter,
		title: "Fees assignment"
	},
	{
		path: "/fees_assignment/school_fees/edit",
		component: LazySchoolFeesAssignmentEdit,
		exact: true,
		router: FeesAssignmentRouter,
		title: "Fees assignment"
	},
	{
		path: "/fees_assignment/acceptance_fees",
		component: LazyAcceptanceFeeAssignment,
		exact: true,
		router: FeesAssignmentRouter,
		title: "Fees assignment"
	},
	{
		path: "/fees_assignment/pg_school_fees",
		component: LazyPGSchoolFeesAssignment,
		exact: true,
		router: FeesAssignmentRouter,
		title: "Fees assignment"
	},
	{
		path: "/fees_assignment/sundry_fees",
		component: LazySundryFeesAssignment,
		exact: true,
		router: FeesAssignmentRouter,
		title: "Fees assignment"
	},
	{
		path: "/records",
		component: LazyFilterRecords,
		exact: true,
		router: MainRouter,
		title: "Results & Class List"
	},
	{
		path: "/records/view",
		component: LazyViewRecords,
		exact: true,
		router: MainRouter,
		title: "Results & Class List"
	},
	{
		path: "/records/results",
		component: LazyViewResults,
		exact: true,
		router: MainRouter,
		title: "Results & Class List"
	},
	{
		path: "/records/classList",
		component: LazyViewClassList,
		exact: true,
		router: MainRouter,
		title: "Results & Class List"
	},
	{
		path: "/results/classlist",
		component: LazyClassListResultRecords,
		exact: true,
		router: ResultManagementRouter,
		title: "Result Management"
	},
	{
		path: "/results/classlist/view",
		component: LazyClasslistViewResultsUploaded,
		exact: true,
		router: MainRouter,
		title: "Result Management"
	},
	{
		path: "/results/view_result_sheets",
		component: LazyResultSheet,
		exact: true,
		router: ResultManagementRouter,
		title: "Result Management"
	},
	{
		path: "/applications/setup",
		component: LazyApplicationSetup,
		exact: true,
		router: ApplicationsRouter,
		title: "Applications"
	},
	{
		path: "/applications/reset",
		component: LazyApplicationReset,
		exact: true,
		router: ApplicationsRouter,
		title: "Applications"
	},
	{
		path: "/applications/delete",
		component: LazyDeleteInvoice,
		exact: true,
		router: ApplicationsRouter,
		title: "Applications"
	},
	{
		path: "/applications/jamb_list_upload",
		component: LazyJambListUpload,
		exact: true,
		router: ApplicationsRouter,
		title: "Applications"
	},
	{
		path: "/applications/de_list_upload",
		component: LazyDirectEntryUpload,
		exact: true,
		router: ApplicationsRouter,
		title: "Direct Entry Upload"
	},
	{
		path: "/approve_courses",
		component: LazySelectCourseRecords,
		exact: true,
		router: MainRouter,
		title: "Approve & Unapprove Courses"
	},
	{
		path: "/approve_courses/view",
		component: LazyViewCoursesRegistered,
		exact: true,
		router: MainRouter,
		title: "Approve & Unapprove Courses"
	},
	// {
	// 	path: "/hostel_management/manage_hostel",
	// 	omponent: LazyMangeHostel,
	// 	exact: true,
	// 	router: HostelRouter,
	// 	title: "Hostel Management"
	// },
	// {
	// 	path: "/hostel_management/manage_hostel/view_hostel",
	// 	component: LazyViewRooms,
	// 	exact: true,
	// 	router: HostelRouter,
	// 	title: "Hostel Management"
	// },
	// {
	// 	path: "/hostel_management/manage_hostel/view_hostel/view_bedspaces",
	// 	component: LazyViewBedspaces,
	// 	exact: true,
	// 	router: HostelRouter,
	// 	title: "Hostel Management"
	// },
	// {
	// 	path: "/hostel_management/manage_category",
	// 	component: LazyCategoryManagement,
	// 	exact: true,
	// 	router: HostelRouter,
	// 	title: "Hostel Management"
	// },
	{
		path: "/app_reports/application_reports",
		component: LazyApplicationReports,
		exact: true,
		router: ApplicationReportsRouter,
		title: "Application Reports"
	},
	{
		path: "/invoice_management/invoice",
		component: LazyInvoiceManagement,
		exact: true,
		router: InvoiceRouter,
		title: "Invoice Management"
	},
	{
		path: "/reports/payment_reports",
		component: LazyPaymentReports,
		exact: true,
		router: ReportsRouter,
		title: "Reports"
	},
	{
		path: "/reports/course_reg_reports",
		component: LazyCourseRegReports,
		exact: true,
		router: ReportsRouter,
		title: "Reports"
	},
	{
		path: "/reports/matric_number_generation_reports",
		component: LazyMatricNumberGenerationReports,
		exact: true,
		router: ReportsRouter,
		title: "Reports"
	},
];
