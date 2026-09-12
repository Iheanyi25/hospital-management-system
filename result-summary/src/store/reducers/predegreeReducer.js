import { INITIAL_DATE } from "../../utils/constants";
import { formatDateFromAPI } from "../../utils/formatDate";
import { CLEAR_APPLICATION_DATA, SAVE_PRE_DEGREE_INFO } from "../constant";

export const predegreeInitialState = (data) => ({
	nameRegNoConfirmation: {},
	StudentTypeId: data?.studentTypeId,
	passport: {
		passport: data?.passport
	},
	programmeInfo: {
		...(data?.programmeInfoResponse?.departmentId && {
			department: {
				label: data?.programmeInfoResponse?.department,
				value: data?.programmeInfoResponse?.departmentId
			}
		})
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
		...(data?.personalInfoResponse?.maritalStatusId && {
			maritalStatusId: {
				label: data?.personalInfoResponse?.maritalStatus,
				value: data?.personalInfoResponse?.maritalStatusId
			}
		}),
		...(data?.personalInfoResponse?.religionId && {
			religionId: {
				label: data?.personalInfoResponse?.religion,
				value: data?.personalInfoResponse?.religionId
			}
		}),
		mobileNo: data?.personalInfoResponse?.mobileNumber,
		email: data?.personalInfoResponse?.email,
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
		contactAddress: data?.personalInfoResponse?.contactAddress,
		permanentAddress: data?.personalInfoResponse?.permanentAddress,
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
	education: data?.qualificationDetailResponse,
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

export const predegreeReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_PRE_DEGREE_INFO:
			return action.payload;
		case CLEAR_APPLICATION_DATA:
			return {};
		default:
			return state;
	}
};
