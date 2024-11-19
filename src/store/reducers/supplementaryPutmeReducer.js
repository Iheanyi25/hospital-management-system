import { INITIAL_DATE } from "../../utils/constants";
import { CLEAR_APPLICATION_DATA, SUPPLEMENTARY_PUTME } from "../constant";

export const supplementaryPutmeInitialState = (data) => ({
	passport: {
		passport: data?.passport
	},
	JambRegNumber: data?.regNumber,
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
		PermanentAddress: data?.personalInfoResponse?.contactAddress,
		MobileNo: data?.personalInfoResponse?.mobileNumber,
		Email: data?.personalInfoResponse?.email
	},
	programmeInfo: {
		regNo: data?.regNumber,
		utmeScore: data?.programmeInfoResponse?.utmeScore,
		...(data?.programmeInfoResponse?.firstSubject && {
			firstSubject: {
				label: data?.programmeInfoResponse?.firstSubject,
				value: data?.programmeInfoResponse?.firstSubjectId
			}
		}),
		...(data?.programmeInfoResponse?.secondSubject && {
			secondSubject: {
				label: data?.programmeInfoResponse?.secondSubject,
				value: data?.programmeInfoResponse?.secondSubjectId
			}
		}),
		...(data?.programmeInfoResponse?.thirdSubject && {
			thirdSubject: {
				label: data?.programmeInfoResponse?.thirdSubject,
				value: data?.programmeInfoResponse?.thirdSubjectId
			}
		}),
		...(data?.programmeInfoResponse?.fourthSubject && {
			fourthSubject: {
				label: data?.programmeInfoResponse?.fourthSubject,
				value: data?.programmeInfoResponse?.fourthSubjectId
			}
		}),
		...(data?.programmeInfoResponse?.faculty && {
			faculty: {
				label: data?.programmeInfoResponse?.faculty,
				value: data?.programmeInfoResponse?.facultyId
			}
		}),
		...(data?.programmeInfoResponse?.department && {
			department: {
				label: data?.programmeInfoResponse?.department,
				value: data?.programmeInfoResponse?.departmentId
			}
		}),
		rrr: data?.programmeInfoResponse?.rrr
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

export const supplementaryPutmeReducer = (state = {}, action) => {
	switch (action.type) {
		case SUPPLEMENTARY_PUTME:
			return Object.assign({}, state, {
				...action.payload
			});
		case CLEAR_APPLICATION_DATA:
			return {};
		default:
			return state;
	}
};
