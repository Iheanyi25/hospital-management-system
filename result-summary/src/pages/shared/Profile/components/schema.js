import * as yup from "yup";
import {
	checkForCorrectPhoneNumber,
	checkIfUserIsLessThanMaximumAge,
	checkIfUserIsMoreThanMinimumAge
} from "../../../../utils/formValidations";

export const personalInformationSchema = yup.object().shape({
	TitleId: yup.mixed().required("please select your title"),
	DateOfBirth: yup
		.string()
		.required("please input your date of birth")
		.nullable()
		.test(
			"min age",
			"you have to be more than 15 years old",
			checkIfUserIsMoreThanMinimumAge
		)
		.test(
			"max age",
			"you have to be less than 80 years old",
			checkIfUserIsLessThanMaximumAge
		),
	MaritalStatusId: yup.mixed().required("please select your marital status"),
	NameOfSpouse: yup
		.string()
		.nullable()
		.when("$isMarriedRequired", (isMarriedRequired, schema) => {
			if (isMarriedRequired)
				return schema.required("please input your spouse name");
			return schema.default(null);
		}),
	NumberOfChildren: yup
		.string()
		.nullable()
		.when("$isMarriedRequired", (isMarriedRequired, schema) => {
			if (isMarriedRequired)
				return schema.required(
					"please input your no. of children under 25"
				);
			return schema.default(null);
		}),
	IsSpouseAStaff: yup
		.mixed()
		.when("$isMarriedRequired", (isMarriedRequired, schema) => {
			if (isMarriedRequired)
				return schema.required("please select 'YES' or 'NO'");
			return schema.default(null);
		}),
	ReligionId: yup.mixed().required("please select your religion"),
	CountryId: yup.mixed().required("please select your country"),
	StateId: yup.mixed().required("please select your state"),
	LgaId: yup.mixed().when("$isLGARequired", (isLGARequired, schema) => {
		if (isLGARequired) return schema.required("please select your LGA");
		return schema.default(null);
	}),
	// MobileNo: yup
	// 	.string()
	// 	.required("phone number is required")
	// 	.test(
	// 		"text number",
	// 		"invaild phone number",
	// 		checkForCorrectPhoneNumber
	// 	),
	PermanentAddress: yup
		.string()
		.required("please input an address")
		.nullable(),
	ContactAddress: yup.string().required("please input an address").nullable()
	// email: yup
	// 	.string()
	// 	.email("invalid email address")
	// 	.nullable()
});

export const medicalAndNextOfKinSchema = yup.object().shape({
	GenotypeId: yup.mixed().required("please select your genotype"),
	BloodGroupId: yup.mixed().required("please select your blood group"),
	Height: yup.string().required("please enter your height"),
	Allergies: yup.string().required("please enter your allegies"),
	DiseaseDetails: yup.string().required("please enter your disease details"),
	NextOfKinFullname: yup
		.string()
		.required("please enter next of kin fullname"),
	NextOfKinAddress: yup.string().required("please enter next of kin addess"),
	NextOfKinMobileNo: yup
		.string()
		.required("please enter next of kin mobile no.")
		.test(
			"text number",
			"invaild phone number",
			checkForCorrectPhoneNumber
		),
	NextOfKinRelationshipId: yup
		.mixed()
		.required("please select your relationship")
});

export const appointmentDetailsSchema = yup.object().shape({
	StaffType: yup.mixed().required("please select a staff type"),
	Designation: yup.mixed().required("please enter a designation"),
	SalaryStructure: yup.mixed().required("pkease select a salary structure"),
	StaffGrade: yup.mixed().required("please select a staff grade"),
	SalaryStep: yup.mixed().required("please select a salary step"),
	EmploymentStatus: yup
		.mixed()
		.required("please select an employment status"),
	DateOfFirstAppointment: yup
		.string()
		.required("please enter date of first appointment"),
	DateOfLastPromotion: yup
		.string()
		.required("please enter date of last promotion"),
	ExpectedDateOfRetirment: yup
		.string()
		.required("please enter an expected date of retirement"),
	RankOnAppointment: yup
		.mixed()
		.required("please select a rank on appointment"),
	CurrentPost: yup.mixed().required("please select a current post"),
	LengthOfService: yup.string().required("please enter a length of service"),
	PositionHeld: yup.string().required("please enter a position held"),
	UniversityCommunityService: yup
		.string()
		.required("please enter a university community srvice")
});

export const paymentDetailsSchema = yup.object().shape({
	PensionId: yup
		.mixed()
		.required("please select an pension fund adminstrator"),
	PensionNumber: yup.string().required("please enter pension number"),
	BankId: yup.mixed().required("please enter bank name"),
	AccountNumber: yup.string().required("please enter account number")
});

export const qualificationDetailsSchema = yup.object().shape({
	HighestQualification: yup
		.string()
		.required("please enter qualification obtained"),
	HighestQualificationDate: yup
		.string()
		.required("please enter date attended")
});

export const housingDetailsSchema = yup.object().shape({
	WorkOnCampusId: yup.mixed().required("select an option"),
	AccomodationTypeId: yup.mixed().required("select an option"),
	CampusLocationId: yup
		.mixed()
		.nullable()
		.when("$offCampus", (offCampus, schema) => {
			if (offCampus) return schema.required("please enter an location");
			return schema.default(null);
		}),
	Address: yup
		.string()
		.nullable()
		.when("$offCampus", (offCampus, schema) => {
			if (offCampus) return schema.required("please enter an address");
			return schema.default(null);
		}),
	LandlordName: yup
		.string()
		.nullable()
		.when("$offCampus", (offCampus, schema) => {
			if (offCampus) return schema.required("please enter landlord name");
			return schema.default(null);
		}),
	HouseType: yup
		.string()
		.nullable()
		.when("$onCampus", ($onCampus, schema) => {
			if ($onCampus) return schema.required("please enter a house type");
			return schema.default(null);
		}),
	HouseNumber: yup
		.string()
		.nullable()
		.when("$onCampus", ($onCampus, schema) => {
			if ($onCampus)
				return schema.required("please enter a house number");
			return schema.default(null);
		}),
	BoysQuaterNumber: yup
		.string()
		.nullable()
		.when("$onCampus", ($onCampus, schema) => {
			if ($onCampus)
				return schema.required("please enter a boys quater number");
			return schema.default(null);
		}),
	DateOccupied: yup
		.string()
		.nullable()
		.when("$onCampus", ($onCampus, schema) => {
			if ($onCampus)
				return schema.required("please enter a date occupied");
			return schema.default(null);
		})
});
