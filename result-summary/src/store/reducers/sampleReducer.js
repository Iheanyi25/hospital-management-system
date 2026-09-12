import { SAMPLE } from "../constant";

export const sampleReducer = (state = {}, action) => {
	switch (action.type) {
    case SAMPLE:
			return {
				...action.payload
			};
		default: {
			return state;
		}
	}
};
