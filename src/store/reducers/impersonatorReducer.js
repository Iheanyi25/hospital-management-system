import { SAVE_IMPERSONATION_ITEMS } from "../constant";

export const impersonatorReducer = (state = [], action) => {
	switch (action.type) {
		case SAVE_IMPERSONATION_ITEMS:
			return action.payload;
		default: {
			return state;
		}
	}
};
