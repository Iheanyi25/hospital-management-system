import {
	SharedRouter,
	PreviewRouter,
	UnathorisedRouter
} from "../routers/index";
import ForgotPassword from "../../pages/shared/ForgotPassword";
import { lazy } from "react";

const LazyHome = lazy(() => import("../../pages/shared/Home/home"));
const LazyLogin = lazy(() => import("../../pages/shared/Login/login"));
const LazyResetPassword = lazy(() =>
	import("../../pages/shared/ResetPassword")
);
const LazyVerifyAccount = lazy(() =>
	import("../../pages/shared/VerifyAccount")
);
const LazyCreateProfile = lazy(() =>
	import("../../pages/shared/CreateProfile/createProfille")
);
const LazyOtpVerfication = lazy(() =>
	import("../../pages/shared/OtpVerfication")
);
const LazyImpersonationLogin = lazy(() =>
	import("../../pages/shared/ImpersonationLogin")
);
const LazyVerifyConfirmation = lazy(() =>
	import("../../pages/shared/VerifyConfirmation")
);
const LazyGenerateJupebStudentsPaymentInvoice = lazy(() =>
	import(
		"../../pages/shared/JupebStudents/pages/GenerateJupebStudentsPaymentInvoice/generateJupebStudentsPaymentInvoice"
	)
);
const LazyJupebStudentsInvoice = lazy(() =>
	import(
		"../../pages/shared/JupebStudents/pages/Invoice/JupebStudentsInvoice"
	)
);
const LazyGenerateJambPaymentInvoice = lazy(() =>
	import(
		"../../pages/shared/JambStudents/pages/GenerateJambPaymentInvoice/generateJambPaymentInvoice"
	)
);
const LazyGenerateCSEInvoice = lazy(() =>
	import(
		"../../pages/shared/CSEInvoiceGeneration/pages/GenerateCSEInvoice/generateCSEInvoice"
	)
);
const LazyJambStudentsInvoice = lazy(() =>
	import("../../pages/shared/JambStudents/pages/Invoice/jambStudentsInvoice")
);
const LazyCSEInvoice = lazy(() =>
	import("../../pages/shared/CSEInvoiceGeneration/pages/Invoice/CSEInvoice")
);
const LazyJupebApplicationLogin = lazy(() =>
	import("../../pages/shared/JupebApplication/jupebApplicationLogin")
);
const LazyJupebApplication = lazy(() =>
	import("../../pages/shared/JupebApplication/jupebApplication")
);
const LazyJupebApplicationPreview = lazy(() =>
	import("../../pages/shared/JupebApplication/jupebApplicationPreview")
);
const LazyPutmeLogin = lazy(() =>
	import("../../pages/shared/PUTMEApplication/putmeLogin")
);
const LazyPutmeApplication = lazy(() =>
	import("../../pages/shared/PUTMEApplication/putmeApplication")
);
const LazyPutmeApplicationDetails = lazy(() =>
	import(
		"../../pages/shared/PUTMEApplication/PutmeApplicationDetails/putmeApplicationDetails"
	)
);
const LazyPutmePreview = lazy(() =>
	import("../../pages/shared/PUTMEApplication/putmePreview")
);
// const LazyProspectiveStudents = lazy(() =>
// 	import("../../pages/shared/ProspectiveStudents/prospectiveStudents")
// );
const LazyAdmissionStatusInvoice = lazy(() =>
	import(
		"../../pages/shared/ProspectiveStudents/components/AdmissionStatusInvoice/admissionStatusInvoice"
	)
);
const LazyUnauthorized = lazy(() =>
	import("../../pages/shared/Unauthorized/unauthorized")
);
const LazyPGLogin = lazy(() =>
	import("../../pages/shared/PGApplication/pgLogin")
);
const LazyPGApplication = lazy(() =>
	import("../../pages/shared/PGApplication/pgApplication")
);
const LazyPGReprintLogin = lazy(() =>
	import("../../pages/shared/PGApplication/pgReprintLogin")
);
const LazyPGApplicationDetails = lazy(() =>
	import(
		"../../pages/shared/PGApplication/PGApplicationDetails/pgApplicationDetails"
	)
);
const LazyPGReferenceForm = lazy(() =>
	import("../../pages/shared/PGApplication/pgReferenceForm")
);
const LazyGenerateOtherStudentsPaymentInvoice = lazy(() =>
	import(
		"../../pages/shared/OtherStudents/pages/GenerateOtherStudentsPaymentInvoice/generateOtherStudentsPaymentInvoice"
	)
);
const LazyOtherStudentsInvoice = lazy(() =>
	import(
		"../../pages/shared/OtherStudents/pages/Invoice/otherStudentsInvoice"
	)
);

const LazyCenterOfSafetyApplication = lazy(() =>
	import(
		"../../pages/shared/CenterOfSafetyApplication/centerOfSafetyApplication"
	)
);

const LazyCenterOfSafetyApplicationLogin = lazy(() =>
	import(
		"../../pages/shared/CenterOfSafetyApplication/centerOfSafetyApplicationLogin"
	)
);

const LazyCenterOfSafetyApplicationPreview = lazy(() =>
	import(
		"../../pages/shared/CenterOfSafetyApplication/centerOfSafetyApplicationPreview"
	)
);

const LazyDirectEntryLogin = lazy(() =>
	import("../../pages/shared/DirectEntryApplication/directEntryLogin")
);

const LazyDirectEntryApplications = lazy(() =>
	import("../../pages/shared/DirectEntryApplication/directEntryApplication")
);

const LazyDirectEntryPreview = lazy(() =>
	import("../../pages/shared/DirectEntryApplication/directEntryPreview")
);

export const sharedRoutes = [
	{
		path: "/",
		component: LazyHome,
		exact: true
	},
	{
		path: "/login",
		component: LazyLogin,
		exact: true
	},
	{
		path: "/forgot_password",
		component: ForgotPassword,
		exact: true
	},
	{
		path: "/reset_password",
		component: LazyResetPassword,
		exact: true
	},
	{
		path: "/verify_otp",
		component: LazyOtpVerfication,
		exact: true
	},
	{
		path: "/impersonation_login",
		component: LazyImpersonationLogin,
		exact: true
	},
	{
		path: "/verify_account",
		component: LazyVerifyAccount,
		exact: true
	},
	{
		path: "/create_profile",
		component: LazyCreateProfile,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/verify_confirmation",
		component: LazyVerifyConfirmation,
		exact: true
	},
	{
		path: "/generate_sub_degree_invoice",
		component: LazyGenerateJupebStudentsPaymentInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/jupeb_students_invoice",
		component: LazyJupebStudentsInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/generate_jamb_students_invoice",
		component: LazyGenerateJambPaymentInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/jamb_students_invoice",
		component: LazyJambStudentsInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/generate_cse_invoice",
		component: LazyGenerateCSEInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/cse_students_invoice",
		component: LazyCSEInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/sub_degree_login",
		component: LazyJupebApplicationLogin,
		exact: true
	},
	{
		path: "/sub_degree_application",
		router: SharedRouter,
		component: LazyJupebApplication,
		exact: true
	},
	{
		path: "/sub_degree_application/preview",
		router: PreviewRouter,
		component: LazyJupebApplicationPreview,
		exact: true
	},
	{ path: "/putme_login", component: LazyPutmeLogin, exact: true },
	{
		path: "/putme_application",
		router: SharedRouter,
		component: LazyPutmeApplication,
		exact: true
	},
	{
		path: "/putme_application_details",
		router: SharedRouter,
		component: LazyPutmeApplicationDetails,
		exact: true
	},
	{
		path: "/putme_application/preview",
		router: PreviewRouter,
		component: LazyPutmePreview,
		exact: true
	},
	// {
	// 	path: "/prospective_students",
	// 	router: SharedRouter,
	// 	component: LazyProspectiveStudents,
	// 	exact: true
	// },
	{
		path: "/admission_status_reciepts",
		router: SharedRouter,
		component: LazyAdmissionStatusInvoice,
		exact: true
	},
	{
		path: "/no_access",
		component: LazyUnauthorized,
		exact: true,
		router: UnathorisedRouter,
		title: "Unauthorized access"
	},
	{
		path: "/center_of_safety_login",
		component: LazyCenterOfSafetyApplicationLogin,
		exact: true
	},
	{
		path: "/center_of_safety_application",
		router: SharedRouter,
		component: LazyCenterOfSafetyApplication,
		exact: true
	},
	{
		path: "/center_of_safety_application/preview",
		router: PreviewRouter,
		component: LazyCenterOfSafetyApplicationPreview
	},
	{
		path: "/pg_login",
		component: LazyPGLogin,
		exact: true
	},
	{
		path: "/pg_application",
		router: SharedRouter,
		component: LazyPGApplication,
		exact: true
	},
	{
		path: "/pg_reprint_login",
		component: LazyPGReprintLogin,
		exact: true
	},
	{
		path: "/pg_application_details",
		router: SharedRouter,
		component: LazyPGApplicationDetails
	},
	{
		path: "/pg_referee_form",
		router: SharedRouter,
		component: LazyPGReferenceForm,
		exact: true
	},
	{
		path: "/generate_other_students_invoice",
		component: LazyGenerateOtherStudentsPaymentInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/other_students_invoice",
		component: LazyOtherStudentsInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/direct_entry_login",
		component: LazyDirectEntryLogin,
		exact: true
	},
	{
		path: "/direct_entry_application",
		router: SharedRouter,
		component: LazyDirectEntryApplications,
		exact: true
	},
	{
		path: "/direct_entry_application/preview",
		router: PreviewRouter,
		component: LazyDirectEntryPreview,

		exact: true
	}
];
