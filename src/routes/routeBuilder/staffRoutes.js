import {
	ApplicationsRouter,
	CourseMangementRouter,
	FeesAssignmentRouter,
	InvoiceRouter,
	HostelRouter,
	LecturerManagementRouter,
	MainRouter,
	ReportsRouter,
	ResultManagementRouter,
	StudentManagementRouter,
	UnathorisedRouter,
	UserManagementRouter,
	UtilitiesRouter,
	SchoolSetupRouter
} from "../routers";
import { lazy } from "react";

const LazyDashboard = lazy(() =>
	import("../../pages/shared/Dashboard/dashboard")
);
const LazyStaffProfile = lazy(() =>
	import("../../pages/shared/Profile/profile")
);
const LazyChangePassword = lazy(() =>
	import("../../pages/shared/ChangePassword/changePassword")
);
const LazyJupebReports = lazy(() =>
	import("../../pages/superAdmin/Reports/pages/JupebReports/jupebReports")
);
const LazyPaymentReports = lazy(() =>
	import("../../pages/superAdmin/Reports/pages/PaymentReport/paymentReport")
);
const LazyPutmeReports = lazy(() =>
	import("../../pages/superAdmin/Reports/pages/PutmeReports/putmeReports")
);
const LazyManageUsers = lazy(() =>
	import(
		"../../pages/superAdmin/UserManagement/pages/ManageUsers/manageUsers"
	)
);
const LazyStudentClaimManagement = lazy(() =>
	import(
		"../../pages/superAdmin/StudentManagement/Students/StudentClaimManagement"
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
	import("../../pages/superAdmin/StudentManagement/Students/ViewAllStudents")
);
const LazyMenuManagement = lazy(() =>
	import(
		"../../pages/superAdmin/UserManagement/pages/ManageMenus/menuManagement"
	)
);
const LazyEditProfile = lazy(() =>
	import(
		"../../pages/superAdmin/StudentManagement/Students/ViewProfile/viewProfile"
	)
);
const LazyViewClearStudentsRecords = lazy(() =>
	import(
		"../../pages/superAdmin/StudentManagement/ClearStudents/viewStudentRecords"
	)
);
const LazyClearStudent = lazy(() =>
	import(
		"../../pages/superAdmin/StudentManagement/ClearStudents/clearStudent"
	)
);

const LazyUnauthorized = lazy(() =>
	import("../../pages/shared/Unauthorized/unauthorized")
);

const LazyAdmissionList = lazy(() =>
	import(
		"../../pages/superAdmin/StudentManagement/AdmissionList/ViewAdmissionList"
	)
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

const LazySchoolFeesAssignmentBulk = lazy(() =>
	import(
		"../../pages/superAdmin/FeesAssignment/pages/SchoolFees/schoolFeesBulk"
	)
);

const LazyAcceptanceFeeAssignment = lazy(() =>
	import(
		"../../pages/superAdmin/FeesAssignment/pages/AcceptanceFee/acceptanceFee"
	)
);

const LazyAcceptanceFeeAssignmentBulk = lazy(() =>
	import(
		"../../pages/superAdmin/FeesAssignment/pages/AcceptanceFee/acceptanceFeesBulk"
	)
);

const LazyPGSchoolFeesAssignment = lazy(() =>
	import(
		"../../pages/superAdmin/FeesAssignment/pages/PGSchoolFees/pgSchoolFees"
	)
);

const LazyAssignCourseToLecturer = lazy(() =>
	import(
		"../../pages/superAdmin/UserManagement/pages/CourseAssignmentToLecturer/assignCourseToLecturer"
	)
);

const LazyAssignHOD = lazy(() =>
	import("../../pages/superAdmin/UserManagement/pages/AssignHOD/assignHOD")
);

const LazyAssignDean = lazy(() =>
	import("../../pages/superAdmin/UserManagement/pages/AssignDean/assignDean")
);

const LazyAssignCourseAdviser = lazy(() =>
	import(
		"../../pages/superAdmin/UserManagement/pages/AssignCourseAdviser/assignCourseAdviser"
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
const LazyFilterClassRecords = lazy(() =>
	import("../../pages/lecturer/MyClass/pages/FilterRecords/filterRecords")
);
const LazyViewClassRecords = lazy(() =>
	import("../../pages/lecturer/MyClass/pages/ViewRecords/viewRecords")
);
const LazyViewClassResults = lazy(() =>
	import("../../pages/lecturer/MyClass/pages/ViewResults/viewResults")
);
const LazyViewStudentResult = lazy(() =>
	import("../../pages/student/Results/pages/ViewResult/viewResult")
);
const LazyNoticeBoard = lazy(() =>
	import("../../pages/superAdmin/NoticeBoard/noticeBoard")
);

const LazyClassListResultRecords = lazy(() =>
	import(
		"../../pages/superAdmin/ResultManagement/pages/CLassList/SelectRecords/selectRecords"
	)
);

const LazyCBTResultUploadRecords = lazy(() =>
	import(
		"../../pages/superAdmin/ResultManagement/pages/CBTResultUpload/SelectRecords/selectRecords"
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
const LazyPutmeResultUpload = lazy(() =>
	import(
		"../../pages/superAdmin/Application/PUtmeResultUpload/pumteResultUpload"
	)
);
const LazyPutmeResultView = lazy(() =>
	import(
		"../../pages/superAdmin/Application/PUtmeResultUpload/putmeResultView"
	)
);
// const LazyDirectEntryUpload = lazy(() =>
// 	import(
// 		"../../pages/superAdmin/Application/DirectEntryUpload/directEntryUpload"
// 	)
// );
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

const LazyUserClaimManagement = lazy(() =>
	import(
		"../../pages/superAdmin/UserManagement/pages/ManageMenus/userClaimManagement"
	)
);

const LazySundryReport = lazy(() =>
	import("../../pages/superAdmin/Reports/pages/SundryReport/sundryReport")
);

const LazyMangeHostel = lazy(() =>
	import(
		"../../pages/superAdmin/HostelManagement/ManageHostels/manageHostels"
	)
);

const LazyViewRooms = lazy(() =>
	import(
		"../../pages/superAdmin/HostelManagement/ManageHostels/components/viewRoom"
	)
);
const LazyViewBedspaces = lazy(() =>
	import(
		"../../pages/superAdmin/HostelManagement/ManageHostels/components/viewBedspaces"
	)
);

const LazyCategoryManagement = lazy(() =>
	import(
		"../../pages/superAdmin/HostelManagement/ManageCategory/manageCategory"
	)
);

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
		"../../pages/superAdmin/Reports/pages/ApplicationReports/pages/ApplicationReports/applicationReports"
	)
);
const LazyInvoiceManagement = lazy(() =>
	import(
		"../../pages/superAdmin/InvoiceManagement/pages/InvoiceManagement/invoiceManagement"
	)
);
const LazyBursaryInvoiceManagement = lazy(() =>
	import(
		"../../pages/superAdmin/InvoiceManagement/pages/bursaryInvoiceManagement/bursaryInvoiceManagement"
	)
);
const LazyDeleteSundryInvoice = lazy(() =>
	import(
		"../../pages/superAdmin/InvoiceManagement/pages/DeleteSundryInvoice/pages/deleteSundryInvoice"
	)
);
const LazyBusaryFees = lazy(() =>
	import("../../pages/superAdmin/FeesAssignment/pages/BusaryFee/busaryFees")
);

const LazyMatricNumberGenerationReports = lazy(() =>
	import(
		"../../pages/superAdmin/Reports/pages/MatricNumberGenerationReports/matricNumberGenerationReports"
	)
);

const LazyHostelReports = lazy(() =>
	import("../../pages/superAdmin/Reports/pages/HostelReports/hostelReports")
);

const LazyHostelSummaryReports = lazy(() =>
	import(
		"../../pages/superAdmin/Reports/pages/HostelSummaryReports/hostelSummaryReports"
	)
);

const LazyManageFaculties = lazy(() =>
	import("../../pages/superAdmin/SchoolSetup/ManageSchoolSetup/manageFaculty")
);

const LazyManageProgrammes = lazy(() =>
	import(
		"../../pages/superAdmin/SchoolSetup/ManageProgrammes/manageProgrammes"
	)
);

const LazyManageDepartments = lazy(() =>
	import(
		"../../pages/superAdmin/SchoolSetup/ManageSchoolSetup/manageDepartments"
	)
);
const LazyManageOptions = lazy(() =>
	import("../../pages/superAdmin/SchoolSetup/ManageSchoolSetup/manageOptions")
);

//UTILITIES

const LazyCertificateVerification = lazy(() =>
	import(
		"../../pages/superAdmin/Utilities/pages/CertificateVerification/certificateVerification"
	)
);
const LazyOlevelVerification = lazy(() =>
	import(
		"../../pages/superAdmin/Utilities/pages/OlevelVerification/pages/OlevelVerifications/olevelVerification"
	)
);
const LazyVerifyOLevel = lazy(() =>
	import(
		"../../pages/superAdmin/Utilities/pages/OlevelVerification/pages/VerifyOLevel"
	)
);

const LazyManageHostelReservation = lazy(() =>
	import(
		"../../pages/superAdmin/HostelManagement/ManageReservations/manageReservations"
	)
);

const LazyReferral = lazy(() => import("../../pages/shared/Referral/Referral"));

const LazyScholarshipManagement = lazy(() =>
	import(
		"../../pages/superAdmin/FeesAssignment/pages/ScholarshipManagement/scholarshipManagement"
	)
);
const LazyViewScholarshipStudents = lazy(() =>
	import(
		"../../pages/superAdmin/FeesAssignment/pages/ScholarshipManagement/viewScholarshipStudents"
	)
);

const LazySessionManager = lazy(() =>
	import(
		"../../pages/superAdmin/StudentManagement/SessionManager/sessionManager"
	)
);

const LazySundryFeesAssignment = lazy(() =>
	import("../../pages/superAdmin/FeesAssignment/pages/SundryFees/sundryFees")
);

const LazyOpenCloseStudentCourseReg = lazy(() =>
	import(
		"../../pages/superAdmin/CourseManagement/pages/OpenCloseStudentCourseReg/openCloseStudentCourseReg"
	)
);

const LazyOpenCloseBorrowedCourseRegistration = lazy(() =>
	import(
		"../../pages/superAdmin/CourseManagement/pages/OpenCloseBorrowedCourseRegistration/openCloseBorrowedCourseRegistration"
	)
);

const LazyNotifications = lazy(() =>
	import("../../pages/shared/Notifications/notifications")
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
		path: "/profile",
		component: LazyStaffProfile,
		exact: true,
		router: MainRouter,
		title: "Profile"
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
		path: "/reports/payment_reports",
		component: LazyPaymentReports,
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
		path: "/notifications",
		component: LazyNotifications,
		exact: true,
		router: MainRouter,
		title: "Notifications"
	},
	{
		path: "/utilities/olevel_verification",
		component: LazyOlevelVerification,
		exact: true,
		router: UtilitiesRouter,
		title: "Utilities"
	},
	{
		path: "/utilities/olevel_verification/verify_result",
		component: LazyVerifyOLevel,
		exact: true,
		router: UtilitiesRouter,
		title: "Utilities"
	},
	{
		path: "/utilities/certificate_verification",
		component: LazyCertificateVerification,
		exact: true,
		router: UtilitiesRouter,
		title: "Utilities"
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
		path: "/student_management/manage_claims",
		component: LazyStudentClaimManagement,
		exact: true,
		router: StudentManagementRouter,
		title: "Student Management"
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
		path: "/user_management/users/edit",
		component: LazyEditProfile,
		exact: true,
		router: UserManagementRouter,
		title: "User Management"
	},
	{
		path: "/student_management/admission_list",
		component: LazyAdmissionList,
		exact: true,
		router: StudentManagementRouter,
		title: "Student Management"
	},
	{
		path: "/student_management/search_admission_list",
		component: LazyAdmissionList,
		exact: true,
		title: "Student Management",
		router: StudentManagementRouter
	},
	{
		path: "/student_management/view",
		component: LazyViewAllStudents,
		exact: true,
		router: StudentManagementRouter,
		title: "Student Management"
	},
	{
		path: "/student_management/search_student",
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
		component: LazyViewClearStudentsRecords,
		exact: true,
		router: StudentManagementRouter,
		title: "Student Management"
	},
	{
		path: "/student_management/clear/view",
		component: LazyClearStudent,
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
		path: "/fees_assignment/sundry_fees",
		component: LazySundryFeesAssignment,
		exact: true,
		router: FeesAssignmentRouter,
		title: "Fees assignment"
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
		path: "/user_management/assign_courses",
		component: LazyAssignCourseToLecturer,
		exact: true,
		router: UserManagementRouter,
		title: "Assign Course To Lecturer"
	},
	{
		path: "/user_management/assign_staff/hod",
		component: LazyAssignHOD,
		exact: true,
		router: UserManagementRouter,
		title: "Assign HOD"
	},
	{
		path: "/user_management/assign_staff/dean",
		component: LazyAssignDean,
		exact: true,
		router: UserManagementRouter,
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
		path: "/user_management/assign_staff/course_adviser",
		component: LazyAssignCourseAdviser,
		exact: true,
		router: UserManagementRouter,
		title: "Assign Course Adviser"
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
		path: "/fees_assignment/school_fees/bulk",
		component: LazySchoolFeesAssignmentBulk,
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
		path: "/fees_assignment/acceptance_fees/bulk",
		component: LazyAcceptanceFeeAssignmentBulk,
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
		path: "/fees_assignment/busary_fees",
		component: LazyBusaryFees,
		exact: true,
		router: FeesAssignmentRouter,
		title: "Fees assignment"
	},
	{
		path: "/records",
		component: LazyFilterRecords,
		exact: true,
		router: MainRouter,
		title: "My Courses"
	},
	{
		path: "/records/view",
		component: LazyViewRecords,
		exact: true,
		router: MainRouter,
		title: "My Courses"
	},
	{
		path: "/records/results",
		component: LazyViewResults,
		exact: true,
		router: MainRouter,
		title: "My Courses"
	},
	{
		path: "/records/classList",
		component: LazyViewClassList,
		exact: true,
		router: MainRouter,
		title: "My Courses"
	},
	{
		path: "/class",
		component: LazyFilterClassRecords,
		exact: true,
		router: MainRouter,
		title: "My Class"
	},
	{
		path: "/class/view",
		component: LazyViewClassRecords,
		exact: true,
		router: MainRouter,
		title: "My Class"
	},
	{
		path: "/class/results",
		component: LazyViewClassResults,
		exact: true,
		router: MainRouter,
		title: "My Class"
	},
	{
		path: "/class/results/student",
		component: LazyViewStudentResult,
		exact: true,
		router: MainRouter,
		title: "My Class"
	},
	{
		path: "/class/classList",
		component: LazyViewClassList,
		exact: true,
		router: MainRouter,
		title: "My Class"
	},
	{
		path: "/class/approve_courses",
		component: LazyViewCoursesRegistered,
		exact: true,
		router: MainRouter,
		title: "Approve & Unapprove Courses"
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
		path: "/results/cbt_result_upload",
		component: LazyCBTResultUploadRecords,
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
		path: "/applications/putme_result_upload",
		component: LazyPutmeResultUpload,
		exact: true,
		router: ApplicationsRouter,
		title: "Applications"
	},
	{
		path: "/applications/putme_result_upload/view",
		component: LazyPutmeResultView,
		exact: true,
		router: ApplicationsRouter,
		title: "Applications"
	},
	// {
	// 	path: "/applications/de_list_upload",
	// 	component: LazyDirectEntryUpload,
	// 	exact: true,
	// 	router: ApplicationsRouter,
	// 	title: "Direct Entry Upload"
	// },
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
	{
		path: "/hostel_management/manage_hostel",
		component: LazyMangeHostel,
		exact: true,
		router: HostelRouter,
		title: "Hostel Management"
	},
	{
		path: "/hostel_management/manage_hostel/view_hostel",
		component: LazyViewRooms,
		exact: true,
		router: HostelRouter,
		title: "Hostel Management"
	},
	{
		path: "/hostel_management/manage_hostel/view_hostel/view_bedspaces",
		component: LazyViewBedspaces,
		exact: true,
		router: HostelRouter,
		title: "Hostel Management"
	},
	{
		path: "/hostel_management/manage_category",
		component: LazyCategoryManagement,
		exact: true,
		router: HostelRouter,
		title: "Hostel Management"
	},
	{
		path: "/reports/application_reports",
		component: LazyApplicationReports,
		exact: true,
		router: ReportsRouter,
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
		path: "/invoice_management/bursary",
		component: LazyBursaryInvoiceManagement,
		exact: true,
		router: InvoiceRouter,
		title: "Invoice Management"
	},
	{
		path: "/invoice_management/delete_sundry_invoice",
		component: LazyDeleteSundryInvoice,
		exact: true,
		router: InvoiceRouter,
		title: "Invoice Management"
	},
	{
		path: "/reports/matric_number_generation_reports",
		component: LazyMatricNumberGenerationReports,
		exact: true,
		router: ReportsRouter,
		title: "Reports"
	},
	{
		path: "/reports/hostel_reports",
		component: LazyHostelReports,
		exact: true,
		router: ReportsRouter,
		title: "Reports"
	},
	{
		path: "/reports/hostel_summary_reports",
		component: LazyHostelSummaryReports,
		exact: true,
		router: ReportsRouter,
		title: "Reports"
	},
	{
		path: "/school_setup/manage_faculty_and_department",
		component: LazyManageFaculties,
		exact: true,
		router: SchoolSetupRouter,
		title: "School Setup"
	},
	{
		path: "/school_setup/programmes",
		component: LazyManageProgrammes,
		exact: true,
		router: SchoolSetupRouter,
		title: "School Setup"
	},
	{
		path: "/school_setup/manage_faculty_and_department/department",
		component: LazyManageDepartments,
		exact: true,
		router: SchoolSetupRouter,
		title: "School Setup"
	},
	{
		path: "/school_setup/manage_faculty_and_department/department/options",
		component: LazyManageOptions,
		exact: true,
		router: SchoolSetupRouter,
		title: "School Setup"
	},
	{
		path: "/reports/sundry",
		component: LazySundryReport,
		exact: true,
		router: ReportsRouter,
		title: "Reports"
	},
	{
		path: "/user_management/users/management",
		component: LazyUserClaimManagement,
		exact: true,
		router: UserManagementRouter,
		title: "User Management"
	},
	{
		path: "/hostel_management/manage_reservation",
		component: LazyManageHostelReservation,
		exact: true,
		router: HostelRouter,
		title: "Hostel Management"
	},
	{
		path: "/referral",
		component: LazyReferral,
		exact: true,
		router: MainRouter,
		title: "Referral"
	},
	{
		path: "/student_management/session_manager",
		component: LazySessionManager,
		exact: true,
		router: StudentManagementRouter,
		title: "Session Manager"
	},
	{
		path: "/fees_assignment/scholarship_management",
		component: LazyScholarshipManagement,
		exact: true,
		router: FeesAssignmentRouter,
		title: "Scholarship Management"
	},
	{
		path: "/fees_assignment/scholarship_management/view_scholarship",
		component: LazyViewScholarshipStudents,
		exact: true,
		router: FeesAssignmentRouter,
		title: "Scholarship Management"
	},
	{
		path: "/course_management/open_student_reg",
		component: LazyOpenCloseStudentCourseReg,
		exact: true,
		router: CourseMangementRouter,
		title: "Course Management"
	},
	{
		path: "/course_management/approved_borrowed_reg",
		component: LazyOpenCloseBorrowedCourseRegistration,
		exact: true,
		router: CourseMangementRouter,
		title: "Course Management"
	}
];
