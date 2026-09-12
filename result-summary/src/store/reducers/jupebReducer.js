import { JUPEP_APPLICATIONS } from "../constant";
import { INITIAL_DATE } from "../../utils/constants";

export const jupebApplicationsInitialState = (data) => {
	return {
		Id: data?.id,
		passport: { passport: data?.basicInformation?.passport },
		Lastname: data?.basicInformation?.lastname,
		Firstname: data?.basicInformation?.firstname,
		Middlename: data?.basicInformation?.middlename,
		Maidenname: data?.basicInformation?.maidenName,
		SessionId: data?.basicInformation?.sessionId,
		StudentTypeId: data?.basicInformation?.studentTypeId,
		Session: data?.basicInformation?.session,
		...(data?.basicInformation?.titleId && {
			TitleId: {
				value: data?.basicInformation?.titleId,
				label: data?.basicInformation?.title
			}
		}),
		...(data?.basicInformation?.genderId && {
			GenderId: {
				value: data?.basicInformation?.genderId,
				label: data?.basicInformation?.gender
			}
		}),
		DateOfBirth:
			data?.basicInformation?.dateOfBirth === INITIAL_DATE
				? ""
				: data?.basicInformation?.dateOfBirth,
		...(data?.basicInformation?.countryId && {
			CountryId: {
				value: data?.basicInformation?.countryId,
				label: data?.basicInformation?.country
			}
		}),
		...(data?.basicInformation?.stateId && {
			StateId: {
				value: data?.basicInformation?.stateId,
				label: data?.basicInformation?.state
			}
		}),
		...(data?.basicInformation?.lgaId && {
			LgaId: {
				value: data?.basicInformation?.lgaId,
				label: data?.basicInformation?.lga
			}
		}),
		MobileNumber: data?.basicInformation?.mobileNumber,
		PermanentAddress: data?.basicInformation?.permanentAddress,
		Email: data?.basicInformation?.email,
		Disability: data?.basicInformation?.disability,
		HasDisability: data?.basicInformation?.disability ? "Yes" : "No",
		...(data?.basicInformation?.religionId && {
			ReligionId: {
				value: data?.basicInformation?.religionId,
				label: data?.basicInformation?.religion
			}
		}),
		...(data?.basicInformation?.jupebOptionId && {
			DepartmentId: {
				value: data?.basicInformation?.jupebOptionId,
				label: data?.basicInformation?.jupebOption
			}
		}),
		...(data?.basicInformation?.jupebOptionSubjectId && {
			JupebOptionSubjectId: {
				value: data?.basicInformation?.jupebOptionSubjectId,
				label: data?.basicInformation.jupebOptionSubject
			}
		}),
		...(data?.basicInformation?.facultyId && {
			ChoiceSchoolId: {
				value: data?.basicInformation?.facultyId,
				label: data?.basicInformation?.faculty
			}
		}),
		...(data?.basicInformation?.departmentId && {
			ChoiceDepartmentId: {
				value: data?.basicInformation?.departmentId,
				label: data?.basicInformation?.department
			}
		}),
		ApplicationNumber: data?.basicInformation?.applicationNumber,
		FormCompleted: data?.basicInformation?.formCompleted,
		...(data?.basicInformation?.maritalStatus && {
			MaritalStatusId: {
				value: data?.basicInformation?.maritalStatusId,
				label: data?.basicInformation?.maritalStatus
			}
		}),
		RRR: data?.basicInformation?.rrr,
		sponsorAndReferee: {
			sponsorFullName: data?.sponsor?.fullname,
			sponsorAddress: data?.sponsor?.address,
			sponsorMobileNo: data?.sponsor?.mobileNumber,
			sponsorEmail: data?.sponsor?.email,
			...(data?.sponsor?.relationship && {
				sponsorRelationship: {
					label: data?.sponsor?.relationship,
					value: data?.sponsor?.relationshipId
				}
			}),
			refereeFullName: data?.referee?.fullname,
			refereeAddress: data?.referee?.address,
			refereeMobileNo: data?.referee?.mobileNumber,
			refereeEmail: data?.referee?.email
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
	};
};

export const jupebApplicationReducer = (state = {}, action) => {
	switch (action.type) {
		case JUPEP_APPLICATIONS:
			return action.payload;
		default:
			return state;
	}
};
