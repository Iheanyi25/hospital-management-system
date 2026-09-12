import {
	SharedRouter,
	PreviewRouter,
	UnathorisedRouter,
	SundryRouter
} from "../routers/index";
import ForgotPassword from "../../pages/shared/ForgotPassword";
import { lazy } from "react";

const LazyHome = lazy(() => import("../../pages/shared/Home/home"));
const LazyChangeEmail = lazy(() => import("../../pages/shared/ChangeEmail"));
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
const LazySundrySelection = lazy(() =>
	import("../../pages/shared/SundryPayments/pages/SundrySelection")
);
const LazyTranscript = lazy(() =>
	import("../../pages/shared/Transcript/transcript")
);
const LazyGenerateJupebStudentsPaymentInvoice = lazy(() =>
	import(
		"../../pages/shared/JupebStudents/pages/GenerateJupebStudentsPaymentInvoice/generateJupebStudentsPaymentInvoice"
	)
);
const LazyGenerateUniversityTransferPaymentInvoice = lazy(() =>
	import(
		"../../pages/shared/InterUniversityTransfer/UniTransferStudents/pages/GenerateUniTransferPaymentInvoice/generateUniTransferPaymentInvoice"
	)
);
const LazyUniTransferStudentsInvoice = lazy(() =>
	import(
		"../../pages/shared/InterUniversityTransfer/UniTransferStudents/pages/Invoice/uniTransferStudentsInvoice"
	)
);
const LazyJupebStudentsInvoice = lazy(() =>
	import(
		"../../pages/shared/JupebStudents/pages/Invoice/JupebStudentsInvoice"
	)
);
const LazyGeneratePGStudentsPaymentInvoice = lazy(() =>
	import(
		"../../pages/shared/PGStudentsInvoice/pages/GenerateStudentsPaymentInvoice/generateStudentsPaymentInvoice"
	)
);
const LazyGenerateCCEInvoice = lazy(() =>
	import(
		"../../pages/shared/CSEInvoiceGeneration/pages/GenerateCSEInvoice/generateCSEInvoice"
	)
);
const LazyGenerateJambPaymentInvoice = lazy(() =>
	import(
		"../../pages/shared/JambStudents/pages/GenerateJambPaymentInvoice/generateJambPaymentInvoice"
	)
);
const LazyGenerateHNDInvoice = lazy(() =>
	import("../../pages/shared/HNDApplication/generateHNDInvoice")
);
const LazyJambStudentsInvoice = lazy(() =>
	import("../../pages/shared/JambStudents/pages/Invoice/jambStudentsInvoice")
);
const LazyCCEInvoice = lazy(() =>
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
const LazyHNDLogin = lazy(() =>
	import("../../pages/shared/HNDApplication/hndLogin")
);
const LazyHNDApplication = lazy(() =>
	import("../../pages/shared/HNDApplication/hndApplication")
);
const LazyHNDApplicationDetails = lazy(() =>
	import(
		"../../pages/shared/HNDApplication/HndApplicationDetails/hndApplicationDetails"
	)
);
const LazyNDLogin = lazy(() =>
	import("../../pages/shared/NDApplication/ndLogin")
);
const LazyNDApplication = lazy(() =>
	import("../../pages/shared/NDApplication/ndApplication")
);
const LazyNDApplicationDetails = lazy(() =>
	import(
		"../../pages/shared/NDApplication/NDApplicationDetails/ndApplicationDetails"
	)
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
const LazySupplementaryLogin = lazy(() =>
	import("../../pages/shared/SupplementaryApplication/supplementaryLogin")
);
const LazyPreDegreeLogin = lazy(() =>
	import("../../pages/shared/PreDegreeApplication/preDegreeLogin")
);
const LazyPreDegreeApplication = lazy(() =>
	import("../../pages/shared/PreDegreeApplication/preDegreeApplication")
);
const LazyPredegreeApplicationDetails = lazy(() =>
	import(
		"../../pages/shared/PreDegreeApplication/PreDegreeApplicationDetails/preDegreeApplicationDetails"
	)
);
const LazySupplementaryApplicationDetails = lazy(() =>
	import(
		"../../pages/shared/SupplementaryApplication/SupplementaryApplicationDetails/supplementaryApplicationDetails"
	)
);
const LazySupplementaryPreview = lazy(() =>
	import("../../pages/shared/SupplementaryApplication/supplementaryPreview")
);
const LazySupplementaryApplication = lazy(() =>
	import(
		"../../pages/shared/SupplementaryApplication/supplementaryApplication"
	)
);
const LazyProspectiveStudents = lazy(() =>
	import("../../pages/shared/ProspectiveStudents/prospectiveStudents")
);
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
const LazyDiplomaLogin = lazy(() =>
	import("../../pages/shared/DiplomaApplication/diplomaLogin")
);
const LazyDiplomaApplication = lazy(() =>
	import("../../pages/shared/DiplomaApplication/diplomaApplication")
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

const LazyUniTransferLogin = lazy(() =>
	import("../../pages/shared/InterUniversityTransfer/uniTransferLogin")
);
const LazyUniTransferApplication = lazy(() =>
	import("../../pages/shared/InterUniversityTransfer/uniTransferApplication")
);
const LazyUniTransferApplicationDetails = lazy(() =>
	import(
		"../../pages/shared/InterUniversityTransfer/UniTransferApplicationDetails/uniTransferApplicationDetails"
	)
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

const LazyDirectEntryLogin = lazy(() =>
	import("../../pages/shared/DirectEntryApplication/directEntryLogin")
);

const LazyDirectEntryApplications = lazy(() =>
	import("../../pages/shared/DirectEntryApplication/directEntryApplication")
);

const LazyDirectEntryPreview = lazy(() =>
	import("../../pages/shared/DirectEntryApplication/directEntryPreview")
);

const LazySupplementaryPutmeLogin = lazy(() =>
	import(
		"../../pages/shared/SupplementaryPutmeApplication/supplementaryPutmeLogin"
	)
);

const LazySupplementaryPutmeApplications = lazy(() =>
	import(
		"../../pages/shared/SupplementaryPutmeApplication/supplementaryPutmeApplication"
	)
);

const LazySupplementaryPutmePreview = lazy(() =>
	import(
		"../../pages/shared/SupplementaryPutmeApplication/supplementaryPutmePreview"
	)
);

const LazyCCELogin = lazy(() =>
	import("../../pages/shared/CCEApplication/cceLogin")
);

const LazyCCEApplications = lazy(() =>
	import("../../pages/shared/CCEApplication/cceApplication")
);

const LazyCCEPreview = lazy(() =>
	import("../../pages/shared/CCEApplication/ccePreview")
);
const LazySundryInvoice = lazy(() =>
	import(
		"../../pages/shared/SundryPayments/pages/SundryInvoice/sundryInvoice"
	)
);
const LazyStaffRequestInvoice = lazy(() =>
	import("../../pages/shared/StaffRequest/pages/Invoice/staffRequestInvoice")
);
const LazyStaffRequestStudent = lazy(() =>
	import(
		"../../pages/shared/StaffRequest/pages/GenerateStaffRequestPaymentInvoice/generateStaffRequestPaymentInvoice"
	)
);
const LazyStaffRequestLogin = lazy(() =>
	import("../../pages/shared/StaffRequestApplication/staffRequestLogin")
);

const LazyStaffRequestApplications = lazy(() =>
	import("../../pages/shared/StaffRequestApplication/staffRequestApplication")
);

const LazyStaffRequestPreview = lazy(() =>
	import("../../pages/shared/StaffRequestApplication//staffRequestPreview")
);

const LazyDiplomaPreview = lazy(() =>
	import("../../pages/shared/DiplomaApplication/diplomaPreview")
);
const LazyPostGraduateLandingPage = lazy(() =>
	import("../../pages/shared/PostGraduateLandingPage/postGraduateLandingPage")
);
const LazyFourYearSandwichLogin = lazy(() =>
	import(
		"../../pages/shared/FourYearSandwichApplication/fourYearSandwichLogin"
	)
);
const LazyFourYearSandwichApplication = lazy(() =>
	import(
		"../../pages/shared/FourYearSandwichApplication/fourYearSandwichApplication"
	)
);
const LazyFourYearSandwichApplicationDetails = lazy(() =>
	import(
		"../../pages/shared/FourYearSandwichApplication/FourYearSandwichApplicationDetails/fourYearSandwichApplicationDetails"
	)
);
const LazyFiveYearSandwichLogin = lazy(() =>
	import(
		"../../pages/shared/FiveYearSandwichApplication/fiveYearSandwichLogin"
	)
);
const LazyFiveYearSandwichApplication = lazy(() =>
	import(
		"../../pages/shared/FiveYearSandwichApplication/fiveYearSandwichApplication"
	)
);
const LazyFiveYearSandwichApplicationDetails = lazy(() =>
	import(
		"../../pages/shared/FiveYearSandwichApplication/FiveYearSandwichApplicationDetails/fiveYearSandwichApplicationDetails"
	)
);

const LazyInvoicePutmeSlip = lazy(() =>
	import("../../pages/shared/PUTMEApplication/Invoice/putmeScreeningDetails")
);

const LazySundryPaymentHistory = lazy(() =>
	import(
		"../../pages/shared/SundryPayments/pages/PaymentHistory/paymentHistory"
	)
);

const LazyFeeReceipt = lazy(() =>
	import("../../pages/shared/SundryPayments/pages/feeReceipt")
);

const LazyCleranceForms = lazy(() => import("../../pages/shared/components"));
const LazyVerifyRemitaStatus = lazy(() =>
	import(
		"../../pages/superAdmin/InvoiceManagement/pages/VerifyRemitaStatus/pages/VerifyRemitaStatus"
	)
);
const LazyDownTime = lazy(() => import("../../pages/shared/Downtime/DownTime"));

export const sharedRoutes = [
	{
		path: "/",
		component: LazyHome,
		exact: true
	},
	{
		path: "/post_graduate_portal",
		component: LazyPostGraduateLandingPage,
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
		path: "/change_email",
		component: LazyChangeEmail,
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
		path: "/bursary_collection/all",
		router: SundryRouter,
		component: LazySundrySelection,
		exact: true
	},
	{
		path: "/sundry/transcript",
		router: SundryRouter,
		component: LazyTranscript,
		exact: true
	},
	{
		path: "/generate_jamb_students_invoice",
		component: LazyGenerateJambPaymentInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/generate_hnd_invoice",
		component: LazyGenerateHNDInvoice,
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
		path: "/generate_staff_request_invoice",
		component: LazyStaffRequestStudent,
		router: SharedRouter,
		exact: true
	},

	{
		path: "/staff_request_invoice",
		component: LazyStaffRequestInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/generate_application_invoice",
		component: LazyGenerateJupebStudentsPaymentInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/generate_inter_university_invoice",
		component: LazyGenerateUniversityTransferPaymentInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/uni_transfer_students_invoice",
		component: LazyUniTransferStudentsInvoice,
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
		path: "/pg_students_invoice",
		component: LazyGeneratePGStudentsPaymentInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/generate_cce_invoice",
		component: LazyGenerateCCEInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/cce_students_invoice",
		component: LazyCCEInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/jupeb_login",
		component: LazyJupebApplicationLogin,
		exact: true
	},

	{
		path: "/jupeb_application",
		router: SharedRouter,
		component: LazyJupebApplication,
		exact: true
	},
	{
		path: "/jupeb_application/preview",
		router: PreviewRouter,
		component: LazyJupebApplicationPreview,
		exact: true
	},
	{
		path: "/hnd_login",
		component: LazyHNDLogin,
		exact: true
	},
	{
		path: "/hnd_application",
		router: SharedRouter,
		component: LazyHNDApplication,
		exact: true
	},
	{
		path: "/hnd_application_details",
		router: SharedRouter,
		component: LazyHNDApplicationDetails,
		exact: true
	},
	{
		path: "/nd_login",
		component: LazyNDLogin,
		exact: true
	},
	{
		path: "/nd_application",
		router: SharedRouter,
		component: LazyNDApplication,
		exact: true
	},
	{
		path: "/nd_application_details",
		router: SharedRouter,
		component: LazyNDApplicationDetails,
		exact: true
	},
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
	{
		path: "/supplementary_login",
		component: LazySupplementaryLogin,
		exact: true
	},
	{
		path: "/supplementary_application",
		router: SharedRouter,
		component: LazySupplementaryApplication,
		exact: true
	},
	{
		path: "/pre_degree_login",
		component: LazyPreDegreeLogin,
		exact: true
	},
	{
		path: "/pre_degree_application",
		router: SharedRouter,
		component: LazyPreDegreeApplication,
		exact: true
	},
	{
		path: "/pre_degree_application_details",
		router: SharedRouter,
		component: LazyPredegreeApplicationDetails,
		exact: true
	},
	{
		path: "/supplementary_application_details",
		router: SharedRouter,
		component: LazySupplementaryApplicationDetails,
		exact: true
	},
	{
		path: "/supplementary_application/preview",
		router: PreviewRouter,
		component: LazySupplementaryPreview,
		exact: true
	},
	{
		path: "/putme_login",
		component: LazyPutmeLogin,
		exact: true
	},
	{
		path: "/prospective_students",
		router: SharedRouter,
		component: LazyProspectiveStudents,
		exact: true
	},
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
		path: "/pg_login",
		component: LazyPGLogin,
		exact: true
	},
	{
		path: "/diploma_login",
		component: LazyDiplomaLogin,
		exact: true
	},
	{
		path: "/diploma_application",
		router: SharedRouter,
		component: LazyDiplomaApplication,
		exact: true
	},
	{
		path: "/diploma_preview",
		router: SharedRouter,
		component: LazyDiplomaPreview,
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
		path: "/uni_transfer_login",
		component: LazyUniTransferLogin,
		exact: true
	},
	{
		path: "/uni_transfer_application",
		router: SharedRouter,
		component: LazyUniTransferApplication,
		exact: true
	},
	{
		path: "/uni_transfer_application_details",
		router: SharedRouter,
		component: LazyUniTransferApplicationDetails
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
	},
	{
		path: "/supplementary_putme_login",
		component: LazySupplementaryPutmeLogin,
		exact: true
	},
	{
		path: "/supplementary_putme_application",
		router: SharedRouter,
		component: LazySupplementaryPutmeApplications,
		exact: true
	},
	{
		path: "/supplementary_putme_application/preview",
		router: PreviewRouter,
		component: LazySupplementaryPutmePreview,

		exact: true
	},
	{
		path: "/cce_login",
		component: LazyCCELogin,
		exact: true
	},
	{
		path: "/cce_application",
		router: SharedRouter,
		component: LazyCCEApplications,
		exact: true
	},
	{
		path: "/cce_application/preview",
		router: PreviewRouter,
		component: LazyCCEPreview,

		exact: true
	},
	{
		path: "/sundry_reciepts",
		component: LazySundryInvoice,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/staff_request_login",
		component: LazyStaffRequestLogin,
		exact: true
	},
	{
		path: "/staff_request_application",
		router: SharedRouter,
		component: LazyStaffRequestApplications,
		exact: true
	},
	{
		path: "/staff_request_application/preview",
		router: PreviewRouter,
		component: LazyStaffRequestPreview,

		exact: true
	},
	{
		path: "/four_year_sandwich_login",
		component: LazyFourYearSandwichLogin,
		exact: true
	},
	{
		path: "/four_year_sandwich_application",
		router: SharedRouter,
		component: LazyFourYearSandwichApplication,
		exact: true
	},
	{
		path: "/four_year_sandwich_application_details",
		router: SharedRouter,
		component: LazyFourYearSandwichApplicationDetails
	},
	{
		path: "/five_year_sandwich_login",
		component: LazyFiveYearSandwichLogin,
		exact: true
	},
	{
		path: "/five_year_sandwich_application",
		router: SharedRouter,
		component: LazyFiveYearSandwichApplication,
		exact: true
	},
	{
		path: "/five_year_sandwich_application_details",
		router: SharedRouter,
		component: LazyFiveYearSandwichApplicationDetails
	},
	{
		path: "/invoice_generate_putme_slip",
		router: SharedRouter,
		component: LazyInvoicePutmeSlip
	},
	{
		path: "/sundry/payment_history",
		router: SundryRouter,
		component: LazySundryPaymentHistory,
		exact: true
	},
	{
		path: "/fee_receipt",
		component: LazyFeeReceipt,
		router: SharedRouter,
		exact: true
	},
	{
		path: "/components_clerance_form",
		component: LazyCleranceForms,
		exact: true
	},
	{
		path: "/verify_remita_status",
		component: LazyVerifyRemitaStatus,
		router: SharedRouter,
		exact: true,
		title: "Invoice Management"
	},
	{
		path: "/downtime",
		component: LazyDownTime,
		exact: true
	}
];
