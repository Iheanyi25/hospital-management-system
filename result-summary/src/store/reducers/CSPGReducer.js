import { CSPG_APPLICATIONS } from "../constant";
import { INITIAL_DATE } from "../../utils/constants";
import { formatDateFromAPI } from "../../utils/formatDate";

export const CSPGApplicationsInitialState = (data) => {
	return {
		isFormCompleted: data.isFormCompleted,
		...(data?.studentTypeId
			? {
					studentTypeId: {
						value: data?.studentTypeId,
						label: data?.studentType
					}
			  }
			: null),
		...(data?.sessionId
			? {
					sessionId: {
						value: data?.sessionId,
						label: data?.session
					}
			  }
			: null),
		rrr: data?.rrr,
		passport: data?.basicInformation?.passport ?? null,
		id: data?.basicInformation?.id,
		duration: data?.duration,
		programme: {
			id: data?.programme?.id,
			applicationFormId: data?.programme?.applicationFormId,
			...(data?.programme?.modeOfStudyId
				? {
						modeOfStudyId: {
							value: data?.programme?.modeOfStudyId,
							label: data?.programme?.modeOfStudy
						}
				  }
				: null),
			...(data?.programme?.departmentId
				? {
						CSECourseId: {
							value: data?.programme?.departmentId,
							label: data?.programme?.department
						}
				  }
				: null),
			...(data?.programme?.schoolProgrammeId
				? {
						CSEAwardId: {
							value: data?.programme?.schoolProgrammeId,
							label: data?.programme?.schoolProgramme
						}
				  }
				: null),
			...(data?.sessionId
				? {
						sessionId: {
							value: data?.sessionId,
							label: data?.session
						}
				  }
				: null),
			duration: data?.programme?.duration
		},
		basicInformation: {
			id: data?.basicInformation?.id,
			lastname: data?.basicInformation?.lastname,
			firstname: data?.basicInformation?.firstname,
			middlename: data?.basicInformation?.middlename,
			...(data?.basicInformation?.genderId
				? {
						genderId: {
							value: data?.basicInformation?.genderId,
							label: data?.basicInformation?.gender
						}
				  }
				: null),
			...(data?.basicInformation?.dateOfBirth && {
				dateOfBirth:
					data?.basicInformation?.dateOfBirth === INITIAL_DATE
						? ""
						: formatDateFromAPI(data?.basicInformation?.dateOfBirth)
			}),
			...(data?.basicInformation?.countryId
				? {
						countryId: {
							value: data?.basicInformation?.countryId,
							label: data?.basicInformation?.country
						}
				  }
				: null),
			...(data?.basicInformation?.stateId
				? {
						stateId: {
							value: data?.basicInformation?.stateId,
							label: data?.basicInformation?.state
						}
				  }
				: null),
			...(data?.basicInformation?.lgaId
				? {
						lgaId: {
							value: data?.basicInformation?.lgaId,
							label: data?.basicInformation?.lga
						}
				  }
				: null),
			contactAddress: data?.basicInformation?.contactAddress,
			mobileNumber: data?.basicInformation?.mobileNumber,
			email: data?.basicInformation?.email,
			passport: data?.basicInformation?.passport ?? null
		},
		educationHistory: data?.educationHistory,
		honours: data?.honours,
		olevelInfo: {
			sittings: data?.olevelInfo?.map((item) => ({
				...item,
				resultPin: item?.resultPin,
				resultPinSno: item?.resultPinSno,
				examNumber: item.examNumber,
				examCentre: item.examCentre,
				oLevelType: {
					value: item.oLevelTypeId,
					label: item.olevelType
				},
				examYear: { value: item.examYear, label: item.examYear },
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

export const CSPGReducer = (state = {}, action) => {
	switch (action.type) {
		case CSPG_APPLICATIONS:
			return action.payload;
		default:
			return state;
	}
};
