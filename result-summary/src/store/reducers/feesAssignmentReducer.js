import { FEES_ASSIGNMENT } from "../constant";

export const feesAssignmentReducer = (state = null, action) => {
	switch (action.type) {
		case FEES_ASSIGNMENT:
			return action.payload;
		default:
			return state;
	}
};
