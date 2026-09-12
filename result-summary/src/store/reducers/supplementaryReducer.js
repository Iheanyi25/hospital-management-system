import { INITIAL_DATE } from "../../utils/constants";
import { formatDateFromAPI } from "../../utils/formatDate";
import { SAVE_SUPPLEMENTARY_INFO } from "../constant";

export const supplementaryInitialState = (data) => ({
	nameRegNoConfirmation: {},
	StudentTypeId: data?.basicInformation?.studentTypeId,
	StudentType:data?.basicInformation?.studentType,
	passport: {
		passport: data?.basicInformation?.passport
	},
	programmeInfo: {
		regNo: data?.programme?.jambNumber,
		utmeScore: data?.programme?.utmeScore,
		faculty: {
			label: data?.programme?.faculty,
			value: data?.programme?.facultyId
		},
		facultyShoppingInto: {
			label: data?.programme?.facultyShoppingInto,
			value: data?.programme?.facultyShoppingIntoId
		},
		department: {
			label: data?.programme?.department,
			value: data?.programme?.departmentId
		},
		departmentOption: {
			label: data?.programme?.departmentOption,
			value: data?.programme?.departmentOptionId
		},
		courseShoppingInto: {
			label: data?.programme?.courseShoppingInto,
			value:data?.programme?.courseShoppingIntoId
		},
		supplementaryApplicationDate: data?.programme?.supplementaryApplicationDate,
		rrr: data?.basicInformation?.rrr
	},
	personalInfo: {
		firstName: data?.basicInformation?.firstname,
		middleName: data?.basicInformation?.middlename,
		surName: data?.basicInformation?.lastname,
		...(data?.basicInformation?.dateOfBirth && {
			dateOfBirth:
				data?.basicInformation?.dateOfBirth === INITIAL_DATE
					? ""
					: formatDateFromAPI(data?.basicInformation?.dateOfBirth)
		}),
		...(data?.basicInformation?.gender && {
			sex: {
				label: data?.basicInformation?.gender,
				value: data?.basicInformation?.genderId
			}
		}),
		mobileNo: data?.basicInformation?.mobileNumber,
		email: data?.basicInformation?.email,
		contactAddress: data?.basicInformation?.contactAddress,

		...(data?.basicInformation?.country && {
			country: {
				label: data?.basicInformation?.country,
				value: data?.basicInformation?.countryId
			}
		}),
		...(data?.basicInformation?.state && {
			state: {
				label: data?.basicInformation?.state,
				value: data?.basicInformation?.stateId
			}
		}),
		...(data?.basicInformation?.lga && {
			lga: {
				label: data?.basicInformation?.lga,
				value: data?.basicInformation?.lgaId
			}
		}),
		rrr: data?.basicInformation?.rrr
	},

});

export const supplementaryReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_SUPPLEMENTARY_INFO:
			return action.payload;
		default:
			return state;
	}
};