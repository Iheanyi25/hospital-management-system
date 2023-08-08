import { SAVE_MENU_ITEMS } from "../constant";

export const menuItemsReducer = (state = [], action) => {
	switch (action.type) {
		case SAVE_MENU_ITEMS:
			return [...action.payload];
		default: {
			return state;
		}
	}
};
