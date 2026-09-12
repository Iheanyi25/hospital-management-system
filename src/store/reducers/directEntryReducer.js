import { INITIAL_DATE } from "../../utils/constants";
import { formatDateFromAPI } from "../../utils/formatDate";
import { CLEAR_APPLICATION_DATA, DIRECT_ENTRY } from "../constant";

export const directEntryInitialState = (data) => ({
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
					: formatDateFromAPI(data?.personalInfoResponse?.dateOfBirth)
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
		...(data?.programmeInfoResponse?.departmentId && {
			department: {
				label: data?.programmeInfoResponse?.department,
				value: data?.programmeInfoResponse?.departmentId
			}
		}),
		...(data?.programmeInfoResponse?.certificateTypeId && {
			certificateType: {
				label: data?.programmeInfoResponse?.certificateType,
				value: data?.programmeInfoResponse?.certificateTypeId
			}
		}),
		...((data?.programmeInfoResponse?.directEntryGradeId ||
			data?.programmeInfoResponse?.degreeCertificateId) && {
			grade: {
				label:
					data?.programmeInfoResponse?.directEntryGrade ||
					data?.programmeInfoResponse?.directEntryCertificate,
				value:
					data?.programmeInfoResponse?.directEntryGradeId ||
					data?.programmeInfoResponse?.directEntryCertificateId
			}
		}),
		...(data?.programmeInfoResponse?.directEntryProgrammeOLevel && {
			aLevelSubjects: [
				...Object?.keys(
					data?.programmeInfoResponse?.directEntryProgrammeOLevel
						?.subjectGrade
				)?.map((key, index) => ({
					subject: {
						label: key?.toUpperCase(),
						value: Object?.keys(
							data?.programmeInfoResponse
								?.directEntryProgrammeOLevel?.subjectGradeId
						)?.[index]
					},
					grade: {
						label: data?.programmeInfoResponse
							?.directEntryProgrammeOLevel?.subjectGrade?.[key],
						value: Object?.values(
							data?.programmeInfoResponse
								?.directEntryProgrammeOLevel?.subjectGradeId
						)?.[index]
					}
				}))
			]
		}),
		cgpa: data?.programmeInfoResponse?.cgpa,
		previousSchool: data?.programmeInfoResponse?.previousSchool,
		previousCourse: data?.programmeInfoResponse?.previousCourse
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
	},
	uploadCertificate: {
		birthCertificate: data?.directEntryCertificate?.birthCertificate,
		lgaIdentification: data?.directEntryCertificate?.lgaIdentification,
		testimonials: data?.directEntryCertificate?.testimonials,
		firstSchoolLeaving:
			data?.directEntryCertificate?.firstSchoolLeavingCertificate,
		ondHndStatementOfResult:
			data?.directEntryCertificate?.ondhndStatementOfResult,
		olevelResult: data?.directEntryCertificate?.oLevelResult1
	}
});

export const directEntryReducer = (state = {}, action) => {
	switch (action.type) {
		case DIRECT_ENTRY:
			return Object.assign({}, state, {
				...action.payload
			});
		case CLEAR_APPLICATION_DATA:
			return {};
		default:
			return state;
	}
};
