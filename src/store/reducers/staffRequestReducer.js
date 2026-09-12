import { CLEAR_APPLICATION_DATA, STAFF_REQUEST } from "../constant";

export const staffRequestInitialState = (data) => ({
	basicInformationResponse: {
		Firstname: data?.basicInformation?.firstname,
		Middlename: data?.basicInformation?.middlename,
		Lastname: data?.basicInformation?.lastname,
		Passport: data?.basicInformation?.passport,
		...(data?.basicInformation?.genderId && {
			Gender: {
				label: data?.basicInformation?.gender,
				value: data?.basicInformation?.genderId
			}
		}),
		...(data?.basicInformation?.sessionId && {
			Session: {
				label: data?.basicInformation?.session,
				value: data?.basicInformation?.sessionId
			}
		}),
		...(data?.basicInformation?.studentTypeId && {
			StudentType: {
				label: data?.basicInformation?.studentType,
				value: data?.basicInformation?.studentTypeId
			}
		}),
		...(data?.programme?.departmentId && {
			Department: {
				label: data?.programme?.department,
				value: data?.programme?.departmentId
			}
		}),
		AggregateScore: data?.programme?.aggregateScore || 0,
		JambNumber: data?.programme?.jambNumber,
		PutmeScore: data?.programme?.putmeScore || 0,
		UtmeScore: data?.programme?.utmeScore
	}
});

export const staffRequestReducer = (state = {}, action) => {
	switch (action.type) {
		case STAFF_REQUEST:
			return Object.assign({}, state, {
				...action.payload
			});
		case CLEAR_APPLICATION_DATA:
			return {};
		default:
			return state;
	}
};
