import {
	formatDateFromAPI,
} from "../../utils/formatDate";
import { CLEAR_APPLICATION_DATA, SAVE_DIPLOMA_INFO } from "../constant";

export const diplomaApplicationInitialState = (data) => {
	return {
		basicInformation: {
			applicantId: null,
			applicationTypeId: data?.applicationTypeId,
			surname: data?.personalInfoResponse?.surname,
			firstname: data?.personalInfoResponse?.firstname,
			middlename: data?.personalInfoResponse?.middlename,
			formCompleted: data?.formCompleted,
			passport: data?.passport,
			dateOfBirth: data?.personalInfoResponse?.dateOfBirth,
			rrr: data?.personalInfoResponse?.rrr,
			applicationNumber: data?.personalInfoResponse?.applicationNumber,
			homeTown: data?.personalInfoResponse?.homeTown,
			disability: data?.personalInfoResponse?.disability,

			...(data?.regNumber && {
				studentType: {
					value: data?.personalInfoResponse?.studentTypeId,
					label: data?.personalInfoResponse?.studentType
				}
			}),
			...(data.personalInfoResponse?.genderId && {
				gender: {
					value: data?.personalInfoResponse?.genderId,
					label: data?.personalInfoResponse?.gender
				}
			}),
			...(data.personalInfoResponse?.country && {
				country: {
					label: data?.personalInfoResponse?.country,
					value: data?.personalInfoResponse?.countryId
				}
			}),
			...(data.personalInfoResponse?.state && {
				state: {
					value: data?.personalInfoResponse?.stateId,
					label: data?.personalInfoResponse?.state
				}
			}),
			...(data.personalInfoResponse?.lga && {
				lga: {
					value: data?.personalInfoResponse?.lgaId,
					label: data?.personalInfoResponse?.lga
				}
			}),
			contactAddress: data?.personalInfoResponse?.contactAddress,
			permanentAddress: data?.personalInfoResponse?.permanentAddress,
			sponsorFullName: data?.personalInfoResponse?.sponsorFullName,
			sponsorContactAddress:
				data?.personalInfoResponse?.sponsorContactAddress,
			sponsorMobileNumber:
				data?.personalInfoResponse?.sponsorMobileNumber,
			...(data.personalInfoResponse?.sponsorRelationship && {
				sponsorRelationship: {
					value: data?.personalInfoResponse?.sponsorRelationshipId,
					label: data?.personalInfoResponse?.sponsorRelationship
				}
			}),
			...(data.personalInfoResponse?.religion && {
				religion: {
					value: data?.personalInfoResponse?.sponsorRelationshipId,
					label: data?.personalInfoResponse?.sponsorRelationship
				}
			}),
			...(data.personalInfoResponse?.maritalStatus && {
				maritalStatus: {
					value: data?.personalInfoResponse?.maritalStatusId,
					label: data?.personalInfoResponse?.maritalStatus
				}
			}),
			email: data?.personalInfoResponse?.email,
			mobileNumber: data?.personalInfoResponse?.mobileNumber,
			...(data.personalInfoResponse?.session && {
				session: {
					value: data?.personalInfoResponse?.sessionId,
					label: data?.personalInfoResponse?.session
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
		},

		programme: {
			faculty: {
				value: data?.programmeInfoResponse?.facultyId,
				label: data?.programmeInfoResponse?.faculty
			},
			...(data.programmeInfoResponse?.department && {
				department: {
					value: data?.programmeInfoResponse?.departmentId,
					label: data?.programmeInfoResponse?.department
				}
			}),
			...(data.programmeInfoResponse?.departmentOption && {
				departmentOption: {
					value: data?.programmeInfoResponse?.departmentOptionId,
					label: data?.programmeInfoResponse?.departmentOption
				}
			})
		},
		...(data?.qualificationDetailResponse && {
			educationalRecords: data?.qualificationDetailResponse.map(
				(item) => ({
					...item,
					yearFrom: formatDateFromAPI(item?.yearFrom),
					yearTo: formatDateFromAPI(item?.yearTo),
					countryId: {
						label: item?.country,
						value: item?.countryId
					}
				})
			)
		}),

		...(data?.employmentResponse && {
			employmentInfo: data?.employmentResponse.map((item) => ({
				...item,
				yearFrom: formatDateFromAPI(item?.yearFrom),
				yearTo: formatDateFromAPI(item?.yearTo)
			}))
		})
	};
};

export const diplomaApplicationReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_DIPLOMA_INFO:
			return action.payload;
		case CLEAR_APPLICATION_DATA:
			return {};
		default:
			return state;
	}
};
