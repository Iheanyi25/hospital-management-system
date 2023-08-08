import { INITIAL_DATE } from "../../utils/constants";
import { formatDateFromAPI } from "../../utils/formatDate";
import { SAVE_PUTME_INFO } from "../constant";

export const putmeInitialState = (data) => ({
	nameRegNoConfirmation: {},
	StudentTypeId: data?.studentTypeId,
	passport: {
		passport: data?.passport
	},
	programmeInfo: {
		regNo: data?.regNumber,
		utmeScore: data?.putmeProgrammeInfoResponse?.utmeScore,
		utmeResultSlip: data?.putmeProgrammeInfoResponse?.resultSlip,
		firstSubject: {
			label: data?.putmeProgrammeInfoResponse?.firstSubject,
			value: data?.putmeProgrammeInfoResponse?.firstSubjectId
		},
		secondSubject: {
			label: data?.putmeProgrammeInfoResponse?.secondSubject,
			value: data?.putmeProgrammeInfoResponse?.secondSubjectId
		},
		thirdSubject: {
			label: data?.putmeProgrammeInfoResponse?.thirdSubject,
			value: data?.putmeProgrammeInfoResponse?.thirdSubjectId
		},
		fourthSubject: {
			label: data?.putmeProgrammeInfoResponse?.fourthSubject,
			value: data?.putmeProgrammeInfoResponse?.fourthSubjectId
		},
		faculty: {
			label: data?.putmeProgrammeInfoResponse?.faculty,
			value: data?.putmeProgrammeInfoResponse?.facultyId
		},
		...(data?.putmeProgrammeInfoResponse?.alternativeDepartment && {
			altDepartment: {
				label: data?.putmeProgrammeInfoResponse?.alternativeDepartment,
				value: data?.putmeProgrammeInfoResponse?.altDepartmentId
			}
		}),
		department: {
			label: data?.putmeProgrammeInfoResponse?.department,
			value: data?.putmeProgrammeInfoResponse?.departmentId
		},
		departmentOption: {
			label: data?.putmeProgrammeInfoResponse?.departmentOption,
			value: data?.putmeProgrammeInfoResponse?.departmentOptionId
		},
		rrr: data?.putmeProgrammeInfoResponse?.rrr
	},
	personalInfo: {
		firstName: data?.putmePersonalInfoResponse?.firstname,
		middleName: data?.putmePersonalInfoResponse?.middlename,
		surName: data?.putmePersonalInfoResponse?.surname,
		...(data?.putmePersonalInfoResponse?.dateOfBirth && {
			dateOfBirth:
				data?.putmePersonalInfoResponse?.dateOfBirth === INITIAL_DATE
					? ""
					: formatDateFromAPI(
							data?.putmePersonalInfoResponse?.dateOfBirth
					  )
		}),
		...(data?.putmePersonalInfoResponse?.gender && {
			sex: {
				label: data?.putmePersonalInfoResponse?.gender,
				value: data?.putmePersonalInfoResponse?.genderId
			}
		}),
		mobileNo: data?.putmePersonalInfoResponse?.mobileNumber,
		email: data?.putmePersonalInfoResponse?.email,
		disability: data?.putmePersonalInfoResponse?.disability,
		hasDisability: data?.putmePersonalInfoResponse?.disability
			? "Yes"
			: "No",
		...(data?.putmePersonalInfoResponse?.country && {
			country: {
				label: data?.putmePersonalInfoResponse?.country,
				value: data?.putmePersonalInfoResponse?.countryId
			}
		}),
		...(data?.putmePersonalInfoResponse?.state && {
			state: {
				label: data?.putmePersonalInfoResponse?.state,
				value: data?.putmePersonalInfoResponse?.stateId
			}
		}),
		...(data?.putmePersonalInfoResponse?.lga && {
			lga: {
				label: data?.putmePersonalInfoResponse?.lga,
				value: data?.putmePersonalInfoResponse?.lgaId
			}
		}),
		homeTown: data?.putmePersonalInfoResponse?.homeTown,
		contactAddress: data?.putmePersonalInfoResponse?.contactAddress,
		sponsorFullName: data?.putmePersonalInfoResponse?.sponsorFullName,
		sponsorAddress: data?.putmePersonalInfoResponse?.sponsorContactAddress,
		sponsorMobileNo: data?.putmePersonalInfoResponse?.sponsorMobileNumber,
		...(data?.putmePersonalInfoResponse?.sponsorRelationship && {
			sponsorRelationship: {
				label: data?.putmePersonalInfoResponse?.sponsorRelationship,
				value: data?.putmePersonalInfoResponse?.sponsorRelationshipId
			}
		}),
		rrr: data?.putmePersonalInfoResponse?.rrr
	},
	oLevelResult: {
		sittings: data?.putmeOlevelResponse?.map((item) => ({
			...item,
			resultPin: item?.resultPin,
			resultPinSno: item?.resultPinSno,
			examNumber: item.examNumber,
			examCentre: item.examCentre,
			oLevelType: { value: item.oLevelTypeId, label: item.olevelType },
			examYear: { value: item.examYear, label: item.examYear },
			subjects: [
				...Object?.keys(item?.oLevelSubjectGradeNames).map(
					(key, index) => ({
						subject: {
							label: key?.toUpperCase(),
							value: Object?.keys(item?.oLevelSubjectGrade)?.[
								index
							]
						},
						grade: {
							label: item?.oLevelSubjectGradeNames?.[key],
							value: Object?.values(item?.oLevelSubjectGrade)?.[
								index
							]
						}
					})
				)
			]
		}))
	}
});

export const putmeReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_PUTME_INFO:
			return action.payload;
		default:
			return state;
	}
};
