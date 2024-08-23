import { INITIAL_DATE } from "../../utils/constants";
import { formatDateFromAPI } from "../../utils/formatDate";
import { SAVE_PUTME_INFO } from "../constant";

export const putmeInitialState = (data) => ({
	nameRegNoConfirmation: {},
	StudentTypeId: data?.studentTypeId,
	passport: {
		passport: data?.passport
	},
	programmeInfo: {
		regNo: data?.regNumber,
		utmeScore: data?.programmeInfoResponse?.utmeScore,
		utmeResultSlip: data?.programmeInfoResponse?.resultSlip,
		firstSubject: {
			label: data?.programmeInfoResponse?.firstSubject,
			value: data?.programmeInfoResponse?.firstSubjectId
		},
		secondSubject: {
			label: data?.programmeInfoResponse?.secondSubject,
			value: data?.programmeInfoResponse?.secondSubjectId
		},
		thirdSubject: {
			label: data?.programmeInfoResponse?.thirdSubject,
			value: data?.programmeInfoResponse?.thirdSubjectId
		},
		fourthSubject: {
			label: data?.programmeInfoResponse?.fourthSubject,
			value: data?.programmeInfoResponse?.fourthSubjectId
		},
		faculty: {
			label: data?.programmeInfoResponse?.faculty,
			value: data?.programmeInfoResponse?.facultyId
		},
		...(data?.programmeInfoResponse?.alternativeDepartment && {
			altDepartment: {
				label: data?.programmeInfoResponse?.alternativeDepartment,
				value: data?.programmeInfoResponse?.altDepartmentId
			}
		}),
		department: {
			label: data?.programmeInfoResponse?.department,
			value: data?.programmeInfoResponse?.departmentId
		},
		departmentOption: {
			label: data?.programmeInfoResponse?.departmentOption,
			value: data?.programmeInfoResponse?.departmentOptionId
		},
		rrr: data?.programmeInfoResponse?.rrr
	},
	personalInfo: {
		firstName: data?.personalInfoResponse?.firstname,
		middleName: data?.personalInfoResponse?.middlename,
		surName: data?.personalInfoResponse?.surname,
		...(data?.personalInfoResponse?.dateOfBirth && {
			dateOfBirth:
				data?.personalInfoResponse?.dateOfBirth === INITIAL_DATE
					? ""
					: formatDateFromAPI(data?.personalInfoResponse?.dateOfBirth)
		}),
		...(data?.personalInfoResponse?.gender && {
			sex: {
				label: data?.personalInfoResponse?.gender,
				value: data?.personalInfoResponse?.genderId
			}
		}),
		mobileNo: data?.personalInfoResponse?.mobileNumber,
		email: data?.personalInfoResponse?.email,
		disability: data?.personalInfoResponse?.disability,
		hasDisability: data?.personalInfoResponse?.disability ? "Yes" : "No",
		...(data?.personalInfoResponse?.country && {
			country: {
				label: data?.personalInfoResponse?.country,
				value: data?.personalInfoResponse?.countryId
			}
		}),
		...(data?.personalInfoResponse?.state && {
			state: {
				label: data?.personalInfoResponse?.state,
				value: data?.personalInfoResponse?.stateId
			}
		}),
		...(data?.personalInfoResponse?.lga && {
			lga: {
				label: data?.personalInfoResponse?.lga,
				value: data?.personalInfoResponse?.lgaId
			}
		}),
		homeTown: data?.personalInfoResponse?.homeTown,
		contactAddress: data?.personalInfoResponse?.contactAddress,
		sponsorFullName: data?.personalInfoResponse?.sponsorFullName,
		sponsorAddress: data?.personalInfoResponse?.sponsorContactAddress,
		sponsorMobileNo: data?.personalInfoResponse?.sponsorMobileNumber,
		...(data?.personalInfoResponse?.sponsorRelationship && {
			sponsorRelationship: {
				label: data?.personalInfoResponse?.sponsorRelationship,
				value: data?.personalInfoResponse?.sponsorRelationshipId
			}
		}),
		rrr: data?.personalInfoResponse?.rrr
	},
	oLevelResult: {
		sittings: data?.olevelResponse?.map((item) => ({
			...item,
			resultPin: item?.resultPin,
			resultPinSno: item?.resultSerialNumber,
			examNumber: item?.examNumber,
			examCentre: item?.examCenter,
			oLevelType: {
				value: item?.examinationTypeId,
				label: item?.examinationType
			},
			examYear: { value: item?.examYear, label: item?.examYear },
			subjects: [
				...Object?.keys(item?.subjectGrade).map((key, index) => ({
					subject: {
						label: key?.toUpperCase(),
						value: Object?.keys(item?.subjectGradeId)?.[index]
					},
					grade: {
						label: item?.subjectGrade?.[key],
						value: Object?.values(item?.subjectGradeId)?.[index]
					}
				}))
			]
		}))
	}
});

export const putmeReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_PUTME_INFO:
			return action.payload;
		default:
			return state;
	}
};
