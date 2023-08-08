import { formatDateFromAPI } from "../../utils/formatDate";
import { SAVE_STUDENT_DATA } from "../constant";

export const initialState = (data) => ({
	PersonalData: {
		Surname: data?.lastname,
		Firstname: data?.firstname,
		Middlename: data?.middlename,
		...(data?.genderId && {
			Gender: {
				value: data?.genderId,
				label: data?.gender
			}
		}),
		DateOfBirth: formatDateFromAPI(data?.dateOfBirth),
		...(data?.countryId && {
			CountryId: {
				value: data?.countryId,
				label: data?.country
			}
		}),
		...(data?.stateId && {
			StateId: {
				value: data?.stateId,
				label: data?.state
			}
		}),
		...(data?.lgaId && {
			LgaId: {
				value: data?.lgaId,
				label: data?.lga
			}
		}),
		HomeTown: data?.homeTown ?? "",
		PermanentAddress: data?.permanentAddress,
		Email: data?.email,
		MobileNo: data?.mobileNumber,
		ContactAddress: data?.contactAddress
	},
	ProgrammeDetail: {
		MatricNumber: data?.regNumber,
		JambRegNumber: data?.regNumber,
		DepartmentId: {
			value: data?.departmentId,
			label: data?.department
		},
		DepartmentOptionId: {
			value: data?.departmentOptionId ?? "",
			label: data?.departmentOption ?? "NONE"
		},
		EntryYearId: {
			value: data?.sessionId,
			label: data?.session
		},
		StudentTypeId: {
			value: data?.studentTypeId,
			label: data?.studentType
		},
		StudentModeOfEntryId: {
			value: data?.studentModeOfEntryId,
			label: data?.studentModeOfEntry
		},
		StudentModeOfStudyId: {
			value: data?.studentModeOfEntryId,
			label: data?.studentModeOfEntry
		},
		SessionId: {
			value: data?.sessionId,
			label: data?.session
		},
		...(data?.programmeId && {
			ProgrammeId: {
				value: data?.programmeId,
				label: data?.programme
			}
		})
	},
	NextOfKin: {
		Fullname: data?.nextOfKin?.fullname,
		Address: data?.nextOfKin?.address,
		PhoneNo: data?.nextOfKin?.mobileNumber,
		Email: data?.nextOfKin?.email,
		...(data?.nextOfKin?.relationshipId && {
			Relationship: {
				value: data?.nextOfKin?.relationshipId,
				label: data?.nextOfKin?.relationship
			}
		})
	},
	StudentPassport: { Passport: data?.passport },
	Sponsor: {},
	MedicalRecords: [],
	isPassportValid: !!data?.passport,
	isPersonalDataValid: false,
	isProgrammeDetailValid: false,
	isSponsorValid: false,
	isNextOfKinValid: false
});

export const createStudentReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_STUDENT_DATA:
			return action.payload;
		default:
			return state;
	}
};
