import { INITIAL_DATE } from "../../utils/constants";
import { formatProfileInitalDate } from "../../utils/formatDate";
import { DIRECT_ENTRY } from "../constant";

export const directEntryInitialState = (data) => ({
	passport: {
		passport: data?.basicInformation?.passport
	},
	JambRegNumber: data?.basicInformation?.jambRegNumber,
	...(data?.basicInformation?.studentTypeId && {
		StudentTypeId: {
			label: data?.basicInformation?.studentType,
			value: data?.basicInformation?.studentTypeId
		}
	}),
	basicInformation: {
		Id: data?.basicInformation?.id,
		Surname: data?.basicInformation?.lastname,
		Firstname: data?.basicInformation?.firstname,
		Middlename: data?.basicInformation?.middlename,
		MaidenName: data?.basicInformation?.maidenName,
		...(data?.basicInformation?.dateofBirth && {
			DateofBirth:
				data?.basicInformation?.dateofBirth === INITIAL_DATE
					? ""
					: formatProfileInitalDate(
							data?.basicInformation?.dateofBirth
					  )
		}),
		...(data?.basicInformation?.genderId && {
			GenderId: {
				label: data?.basicInformation?.gender,
				value: data?.basicInformation?.genderId
			}
		}),
		...(data?.basicInformation?.sessionId && {
			SessionId: {
				label: data?.basicInformation?.sessionId,
				value: data?.basicInformation?.sessionId
			}
		}),
		...(data?.basicInformation?.bloodGroupId && {
			BloodGroupId: {
				label: data?.basicInformation?.bloodGroup,
				value: data?.basicInformation?.bloodGroupId
			}
		}),
		...(data?.basicInformation?.genoTypeId && {
			GenoTypeId: {
				label: data?.basicInformation?.genoType,
				value: data?.basicInformation?.genoTypeId
			}
		}),
		...(data?.basicInformation?.country && {
			CountryId: {
				label: data?.basicInformation?.country,
				value: data?.basicInformation?.countryId
			}
		}),
		...(data?.basicInformation?.state && {
			StateId: {
				label: data?.basicInformation?.state,
				value: data?.basicInformation?.stateId
			}
		}),
		...(data?.basicInformation?.lga && {
			LgaId: {
				label: data?.basicInformation?.lga,
				value: data?.basicInformation?.lgaId
			}
		}),
		Town: data?.basicInformation?.town,
		PermanentAddress: data?.basicInformation?.permanentAddress,
		Hobby: data?.basicInformation?.hobby,
		MobileNo: data?.basicInformation?.mobileNumber,
		Email: data?.basicInformation?.email,
		Disability: data?.basicInformation?.disability ? "Yes" : "No",
		...(data?.basicInformation?.religionId && {
			ReligionId: {
				label: data?.basicInformation?.religion,
				value: data?.basicInformation?.religionId
			}
		}),
		...(data?.basicInformation?.departmentId && {
			CourseId: {
				label: data?.basicInformation?.department,
				value: data?.basicInformation?.departmentId
			}
		}),
		SponsersFullname: data?.nextOfKin?.fullname,
		SponsersAddress: data?.nextOfKin?.address,
		SponsersMobileNo: data?.nextOfKin?.mobileNumber,
		SponsersEmail: data?.nextOfKin?.email,
		...(data?.nextOfKin?.relationshipId && {
			SponsersRelationship: {
				label: data?.nextOfKin?.relationship,
				value: data?.nextOfKin?.relationshipId
			}
		})
	},
	oLevelResult: {
		sittings: data?.olevelInfo?.map((item) => ({
			...item,
			subjects: [
				...Object?.keys(item?.subjectGrade).map((key, index) => ({
					subject: {
						label: key?.toUpperCase(),
						value: Object?.keys(item?.subjectGrade)?.[index]
					},
					grade: {
						label: item?.subjectGrade?.[key],
						value: Object?.values(item?.subjectGrade)?.[index]
					}
				}))
			]
		}))
	},
	institutionAttended: {
		institutionAttended: data?.institutionAttended
			? [...data?.institutionAttended]
			: []
	}
});

export const directEntryReducer = (state = {}, action) => {
	switch (action.type) {
		case DIRECT_ENTRY:
			return Object.assign({}, state, {
				...action.payload
			});
		default:
			return state;
	}
};
