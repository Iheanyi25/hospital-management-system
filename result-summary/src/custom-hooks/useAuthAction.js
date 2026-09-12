import { useCallback } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setAuthHeader } from "../api/apiCall";
import { SAVE_IMPERSONATION_ITEMS, SAVE_MENU_ITEMS } from "../store/constant";
import {
	BIRTHDAY_STATE_HOLDER,
	DISPLAY_CSAT_MODAL,
	REFRESH_TOKEN_HOLDER,
	STUDENT_TYPE_HOLDER,
	TOKEN_HOLDER,
	USER_NAME_HOLDER,
	USER_ROLE_HOLDER
} from "../utils/constants";

export default function useAuthAction() {
	//useCookie, return the SetCookie function at index 1
	const setCookie = useCookies([TOKEN_HOLDER])[1];
	const removeCookie = useCookies()[2];
	const dispatch = useDispatch();

	const logout = useCallback(() => {
		dispatch({
			type: SAVE_MENU_ITEMS,
			payload: []
		});
		dispatch({
			type: SAVE_IMPERSONATION_ITEMS,
			payload: {}
		});
		removeCookie(TOKEN_HOLDER, { path: "/" });
		removeCookie(USER_ROLE_HOLDER, { path: "/" });
		removeCookie(USER_NAME_HOLDER, { path: "/" });
		removeCookie(BIRTHDAY_STATE_HOLDER, { path: "/" });
		removeCookie(STUDENT_TYPE_HOLDER, { path: "/" });
		removeCookie(REFRESH_TOKEN_HOLDER, { path: "/" });
	}, [removeCookie, dispatch]);

	const setLoginPrarms = (data) => {
		const userRole = data?.data?.userType?.toLowerCase()?.trim();
		const userName = data?.data?.fullName;
		const birthday = data?.data?.birthday;
		const studentTypeId = data?.data?.studentTypeId;
		const token = data?.data?.jwtToken?.token;
		const tokenExpirationDate = new Date(data?.data?.jwtToken?.expires);
		const impersonatorUsername = data?.data?.impersonatorUsername;
		const isImpersonating = data?.data?.isImpersonating;
		const displayCSATModal = data?.data?.displayCSATModal
			? JSON.stringify(data?.data?.displayCSATModal)
			: false;
		const refreshToken = data?.data?.refreshToken;
		if (data?.data?.menuItems?.length !== 0) {
			dispatch({
				type: SAVE_MENU_ITEMS,
				payload: data?.data?.menuItems
			});
			dispatch({
				type: SAVE_IMPERSONATION_ITEMS,
				payload: {
					tokenExpirationDate,
					impersonatorUsername,
					isImpersonating
				}
			});
			setAuthHeader(token);
			//automatically pushes to dashboard, since cookie is set, therefore, app re-renders
			//and the App is re-mounted
			setCookie(TOKEN_HOLDER, token, {
				path: "/"
			});
			//manually being set to a student user now, since the api doesn't return the user type
			setCookie(USER_ROLE_HOLDER, userRole, {
				path: "/"
			});
			setCookie(USER_NAME_HOLDER, userName, {
				path: "/"
			});
			setCookie(BIRTHDAY_STATE_HOLDER, birthday, {
				path: "/"
			});
			setCookie(STUDENT_TYPE_HOLDER, studentTypeId, {
				path: "/"
			});
			setCookie(REFRESH_TOKEN_HOLDER, refreshToken, {
				path: "/"
			});
			setCookie(DISPLAY_CSAT_MODAL, displayCSATModal, {
				path: "/"
			});
		} else {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Login Failed!",
				body: `User doesn't have any menu items. Please contact your administrator.`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	};
	return { setLoginPrarms, logout };
}
