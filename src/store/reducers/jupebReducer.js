import { JUPEP_APPLICATIONS } from "../constant";
import { INITIAL_DATE } from "../../utils/constants";

export const jupebApplicationsInitialState = (data) => {
	return {
		Id: data.id,
		passport: { passport: data?.passport },
		Lastname: data.lastname,
		Firstname: data.firstname,
		Middlename: data.middlename,
		SessionId: data.sessionId,
		StudentTypeId: data.studentTypeId,
		Session: data.session,
		...(data?.genderId && {
			GenderId: {
				value: data?.genderId,
				label: data?.gender
			}
		}),
		...(data?.bloodGroupId && {
			BloodGroupId: {
				value: data?.bloodGroupId,
				label: data?.bloodGroup
			}
		}),
		...(data?.genoTypeId && {
			GenoTypeId: {
				value: data?.genoTypeId,
				label: data?.genoType
			}
		}),
		DateOfBirth: data.dateOfBirth === INITIAL_DATE ? "" : data?.dateOfBirth,
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
		Town: data.town,
		MobileNumber: data.mobileNumber,
		PermanentAddress: data.permanentAddress,
		Email: data.email,
		...(data?.religionId && {
			ReligionId: {
				value: data?.religionId,
				label: data.religion
			}
		}),
		...(data?.jupebOptionId && {
			DepartmentId: {
				value: data?.jupebOptionId,
				label: data?.jupebOption
			}
		}),
		...(data?.jupebOptionSubjectId && {
			JupebOptionSubjectId: {
				value: data?.jupebOptionSubjectId,
				label: data.jupebOptionSubjectName
			}
		}),
		...(data?.facultyId && {
			ChoiceSchoolId: {
				value: data?.facultyId,
				label: data?.faculty
			}
		}),
		...(data?.departmentId && {
			ChoiceDepartmentId: {
				value: data?.departmentId,
				label: data?.department
			}
		}),
		ApplicationNumber: data.applicationNumber,
		Completed: data.completed,
		...(data?.maritalStatus && {
			MaritalStatusId: {
				value: data?.maritalStatusId,
				label: data?.maritalStatus
			}
		}),
		RRR: data.rrr,
		SponsorsFullname: data.nextOfKin.fullname,
		SponsorsMobileNo: data.nextOfKin.mobileNumber,
		...(data?.nextOfKin?.relationshipId && {
			SponsorsRelationship: {
				value: data?.nextOfKin?.relationshipId,
				label: data?.nextOfKin?.relationship
			}
		}),
		SponsorsEmail: data.nextOfKin.email,
		SponsorsAddress: data.nextOfKin.address,
		oLevelResult: {
			sittings: data?.olevelInfo?.map((item) => ({
				...item,
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
		institutionAttended: {
			certificate: data?.institutionAttended?.certificate,
			dateFrom: data?.institutionAttended?.dateFrom,
			dateTo: data?.institutionAttended?.dateTo,
			nameOfInstitution: data?.institutionAttended?.nameOfInstitution
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
