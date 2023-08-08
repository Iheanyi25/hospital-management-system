import { SAVE_PG_INFO } from "../constant";

export const pgApplicationInitialState = (data) => {
	return {
		programme: {
			id: data?.programme?.id,
			pgApplicationFormId: data?.programme?.pgApplicationFormId ?? null,
			rrr: data?.programme?.rrr,
			...(data.programme.facultyId
				? {
						facultyId: {
							value: data?.programme?.facultyId,
							label: data?.programme?.faculty
						}
				  }
				: null),
			...(data.programme.departmentId && {
				departmentId: {
					value: data?.programme?.departmentId,
					label: data?.programme?.department
				}
			}),
			...(data.programme.departmentOptionId && {
				departmentOptionId: {
					value: data?.programme?.departmentOptionId,
					label: data?.programme?.departmentOption
				}
			}),
			...(data.programme.programmeId && {
				programmeId: {
					value: String(data?.programme?.programmeId),
					label: data?.programme?.programme
				}
			}),
			passport: data?.programme?.passport ?? null
		},
		basicInformation: {
			id: data?.basicInformation?.id ?? null,
			surname: data?.basicInformation?.surname,
			firstname: data?.basicInformation?.firstname,
			lastname: data?.basicInformation?.lastname,
			middlename: data?.basicInformation?.middlename,
			otherNames: data?.basicInformation?.otherNames,
			...(data?.basicInformation?.genderId && {
				genderId: {
					value: data?.basicInformation?.genderId,
					label: data?.basicInformation?.gender
				}
			}),
			dateOfBirth: data?.basicInformation?.dateOfBirth,
			...(data?.basicInformation?.country && {
				countryId: {
					value: data?.basicInformation?.countryId,
					label: data?.basicInformation?.country
				}
			}),
			...(data?.basicInformation?.stateId && {
				stateId: {
					value: data?.basicInformation?.stateId,
					label: data?.basicInformation?.state
				}
			}),
			...(data?.basicInformation?.lgaId && {
				lgaId: {
					value: data?.basicInformation?.lgaId,
					label: data?.basicInformation?.lga
				}
			}),
			permanentAddress: data?.basicInformation?.permanentAddress,
			contactAddress: data?.basicInformation?.contactAddress,
			mobileNumber: data?.basicInformation?.mobileNumber,
			...(data?.basicInformation?.religionId && {
				religionId: {
					value: data?.basicInformation?.religionId,
					label: data?.basicInformation?.religion
				}
			}),
			email: data?.basicInformation?.email,
			...(data?.basicInformation?.maritalStatusId && {
				maritalStatusId: {
					value: data?.basicInformation?.maritalStatusId,
					label: data?.basicInformation?.maritalStatus
				}
			})
		},
		nextOfKin: {
			id: data?.nextOfKin?.id,
			fullname: data?.nextOfKin?.fullname,
			...(data?.nextOfKin?.relationshipId && {
				relationshipId: {
					value: data?.nextOfKin?.relationshipId,
					label: data?.nextOfKin?.relationship
				}
			}),
			mobileNumber: data?.nextOfKin?.mobileNumber,
			address: data?.nextOfKin?.address
		},
		educationHistory: data?.educationHistory,
		honours: data?.honours,
		workHistory: data?.workHistory,
		referees: data?.referees,
		sessionId: data?.sessionId,
		studentTypeId: data?.studentTypeId,
		otherDetail: {
			id: 0,
			dissertationTitle: data?.otherDetail?.dissertationTitle,
			researchStatement: data?.otherDetail?.researchStatement,
			nysc: data?.otherDetail?.nysc,
			nyscYear: data?.otherDetail?.nyscYear,
			otherPrograms: data?.otherDetail?.otherPrograms,
			otherProgramsType: data?.otherDetail?.otherProgramsType,
			otherProgramsInstitution:
				data?.otherDetail?.otherProgramsInstitution
		}
	};
};

export const pgReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_PG_INFO:
			return action.payload;
		default:
			return state;
	}
};
