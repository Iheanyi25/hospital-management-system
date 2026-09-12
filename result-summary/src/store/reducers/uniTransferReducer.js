import { INITIAL_DATE } from "../../utils/constants";
import { formatDateFromAPI } from "../../utils/formatDate";
import { CLEAR_APPLICATION_DATA, SAVE_UNI_TRANSFER_INFO } from "../constant";

export const uniTransferApplicationInitialState = (data) => {
	return {
		personalInfoResponse: {
			id: data?.personalInfoResponse?.id ?? null,
			surname: data?.personalInfoResponse?.surname,
			firstname: data?.personalInfoResponse?.firstname,
			middlename: data?.personalInfoResponse?.middlename,
			...(data?.personalInfoResponse?.genderId && {
				genderId: {
					value: data?.personalInfoResponse?.genderId,
					label: data?.personalInfoResponse?.gender
				}
			}),
			...(data?.personalInfoResponse?.dateOfBirth && {
				dateOfBirth:
					data?.personalInfoResponse?.dateOfBirth === INITIAL_DATE
						? ""
						: formatDateFromAPI(
								data?.personalInfoResponse?.dateOfBirth
						  )
			}),
			session: data?.personalInfoResponse?.session,
			...(data?.personalInfoResponse?.country && {
				countryId: {
					value: data?.personalInfoResponse?.countryId,
					label: data?.personalInfoResponse?.country
				}
			}),
			...(data?.personalInfoResponse?.stateId && {
				stateId: {
					value: data?.personalInfoResponse?.stateId,
					label: data?.personalInfoResponse?.state
				}
			}),
			...(data?.personalInfoResponse?.lgaId && {
				lgaId: {
					value: data?.personalInfoResponse?.lgaId,
					label: data?.personalInfoResponse?.lga
				}
			}),
			mobileNumber: data?.personalInfoResponse?.mobileNumber,
			email: data?.personalInfoResponse?.email,
			contactAddress: data?.personalInfoResponse?.contactAddress,
			...(data?.personalInfoResponse?.maritalStatusId && {
				maritalStatusId: {
					value: data?.personalInfoResponse?.maritalStatusId,
					label: data?.personalInfoResponse?.maritalStatus
				}
			}),
			appliedToUniversity:
				data?.personalInfoResponse?.appliedToUniversity,
			appliedToUniversityDate:
				data?.personalInfoResponse?.appliedToUniversityDate,
			offeredAdmission: data?.personalInfoResponse?.offeredAdmission,
			departmentId: data?.personalInfoResponse?.departmentId,
			scholarshipDetails: data?.personalInfoResponse?.scholarshipDetails,
			paymentPlan: data?.personalInfoResponse?.paymentPlan
		},
		studentTypeId: data?.studentTypeId,
		regNumber: data?.regNumber,
		passport: data?.passport,
		applicantId: data?.applicantId,
		applicationTypeId: data?.applicationTypeId,
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
		educationalRecords: data?.qualificationDetailResponse?.map((x) => ({
			schoolName: x?.schoolName,
			countryId: {
				label: x?.country,
				value: x?.countryId
			},
			yearFrom: formatDateFromAPI(x?.yearFrom),
			yearTo: formatDateFromAPI(x?.yearTo),
			certificate: x?.certificate
		})),
		programmeInfo: data?.programmeInfoResponse
	};
};

export const uniTransferReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_UNI_TRANSFER_INFO:
			return action.payload;
		case CLEAR_APPLICATION_DATA:
			return {};
		default:
			return state;
	}
};
 