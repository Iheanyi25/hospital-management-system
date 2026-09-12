import { INITIAL_DATE } from "../../utils/constants";
import { CCE_APPLICATION, CLEAR_APPLICATION_DATA } from "../constant";

export const cceInitialState = (data) => ({
	passport: {
		passport: data?.passport
	},
	rrr: data?.personalInfoResponse?.rrr,
	...(data?.studentTypeId && {
		StudentTypeId: {
			label: data?.studentType,
			value: data?.studentTypeId
		}
	}),
	personalInfoResponse: {
		Surname: data?.personalInfoResponse?.surname,
		Firstname: data?.personalInfoResponse?.firstname,
		Middlename: data?.personalInfoResponse?.middlename,
		...(data?.personalInfoResponse?.dateOfBirth && {
			DateofBirth:
				data?.personalInfoResponse?.dateOfBirth === INITIAL_DATE
					? ""
					: data?.personalInfoResponse?.dateOfBirth
		}),
		...(data?.personalInfoResponse?.religionId && {
			Religion: {
				label: data?.personalInfoResponse?.religion,
				value: data?.personalInfoResponse?.religionId
			}
		}),
		...(data?.personalInfoResponse?.genderId && {
			GenderId: {
				label: data?.personalInfoResponse?.gender,
				value: data?.personalInfoResponse?.genderId
			}
		}),
		...(data?.personalInfoResponse?.sessionId && {
			SessionId: {
				label: data?.personalInfoResponse?.sessionId,
				value: data?.personalInfoResponse?.sessionId
			}
		}),
		...(data?.personalInfoResponse?.country && {
			CountryId: {
				label: data?.personalInfoResponse?.country,
				value: data?.personalInfoResponse?.countryId
			}
		}),
		...(data?.personalInfoResponse?.state && {
			StateId: {
				label: data?.personalInfoResponse?.state,
				value: data?.personalInfoResponse?.stateId
			}
		}),
		...(data?.personalInfoResponse?.lga && {
			LgaId: {
				label: data?.personalInfoResponse?.lga,
				value: data?.personalInfoResponse?.lgaId
			}
		}),
		ContactAddress: data?.personalInfoResponse?.contactAddress,
		PermanentAddress: data?.personalInfoResponse?.permanentAddress,
		MobileNo: data?.personalInfoResponse?.mobileNumber,
		Email: data?.personalInfoResponse?.email
	},
	programmeInfo: {
		jambScore: data?.programmeInfoResponse?.utmeScore,
		regNo: data?.regNumber,
		...(data?.programmeInfoResponse?.departmentId && {
			department: {
				label: data?.programmeInfoResponse?.department,
				value: data?.programmeInfoResponse?.departmentId
			}
		})
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

export const cceReducer = (state = {}, action) => {
	switch (action.type) {
		case CCE_APPLICATION:
			return Object.assign({}, state, {
				...action.payload
			});
		case CLEAR_APPLICATION_DATA:
			return {};
		default:
			return state;
	}
};
