export const SEMESTERS = [
	{
		label: "First",
		value: "First"
	},
	{
		label: "Second",
		value: "Second"
	}
];

export const SCHOOL_DETAILS = {
	name: "Akwa Ibom State Polytechnic",
	location: "Ikot Ekpene",
	pmb: "225B Aba Rd, New GRA 500101, Ikot Ekpene, Rivers",
	shortForm: "AKWAPOLY"
};

export const PAYMENTTYPES = [
	{
		label: "Full Payment",
		value: "Full"
	},
	{
		label: "First Installment",
		value: "FirstInstallment"
	},
	{
		label: "Second Installment",
		value: "SecondInstallment"
	}
];

export const PAYMENTIDENTIFIER = {
	schoolFees: 1,
	acceptance: 2,
	hostel: 8,
	sundry: 9
};

export const PAGESIZE = {
	sm: 5,
	md: 10,
	lg: 15,
	xl: 20
};

export const SEARCH_DELAY = {
	sm: 300,
	md: 500,
	lg: 800,
	xl: 1000
};

export const INITIAL_DATE = "0001-01-01T00:00:00";

export const MINIMUM_AGE = 15;
export const MAXIMUM_AGE = 80;
export const TENECE_SUPPORT_URL = "https://teneceschoolsupport.com/";

// Authentication Constants
export const TOKEN_HOLDER = `${SCHOOL_DETAILS.shortForm}token`;
export const DISPLAY_CSAT_MODAL = `${SCHOOL_DETAILS.shortForm}displayCSATModal`;
export const USER_ROLE_HOLDER = `${SCHOOL_DETAILS.shortForm}userRole`;
export const USER_NAME_HOLDER = `${SCHOOL_DETAILS.shortForm}userName`;
export const BIRTHDAY_STATE_HOLDER = `${SCHOOL_DETAILS.shortForm}birthday`;
export const STUDENT_TYPE_HOLDER = `${SCHOOL_DETAILS.shortForm}studentType`;
export const REFRESH_TOKEN_HOLDER = `${SCHOOL_DETAILS.shortForm}refreshToken`;
export const USER_TYPES = ["lecturer", "student", "official"];

export const EXTERNAL_STUDENT_PAYMENT_DETAILS = {
	paymentPurpose: "External",
	paymentType: "Full"
};

export const STUDENT_TYPES = {
	UNDERGRADUATE: 1,
	JUPEB: 8,
	Diploma: 3,
	POSTGRADUATE: 2,
	Sandwich: 9,
	"Sandwich Diploma": 10,
	INTER_UNIVERSITY_TRANSFER: 2
};

export const APPLICATION_ID = {
	UTME: 8,
	JUPEB: 5,
	DIRECT_ENTRY: 33,
	PG: 7,
	SUPPLEMENTARY: 15,
	PRE_DEGREE: 10,
	CCE: 16,
	STAFF_REQUEST: 16,
	FOUR_YEAR_SANDWICH: 17,
	FIVE_YEAR_SANDWICH: 9,
	INTER_UNIVERSITY_TRANSFER: 2,
	DIPLOMA: 1,
	SANDWICH_PROGRAMME: 17,
	PUTME_SLIP: 24
};

export const CertificateTypeIds = {
	NCE: 3,
	ACE: 9,
	TC: 10
};

export const POST_GRADUATE_DETAILS = {
	deputyRegister: "MR. Godswill .E. Udofah, MNIM",
	correspondence: "PMB 1200 Ikot Ekpene Akwa Ibom State, Nigeria",
	correspondenceEmail: "info@akwapoly.edu.ng"
	// provost: "PROF. OBIOMA U. NJOKU",
	// provostEmail: "obioma.njoku@unn.edu.ng"
};
