import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Auth";

export const createAccountUrl = () => `${baseUrl}/CreateStudentAccount`;
export const loginUrl = () => `${baseUrl}/login`;
export const ChangePasswordUrl = () => `${baseUrl}/change-password`;
export const twoFactorAuthUrl = () => `${baseUrl}/two-factor-authentication`;
export const resetPasswordUrl = () => `${baseUrl}/reset-password`;
export const verifyUserUrl = () => `${baseUrl}/verify-user`;
export const sendResetPasswordMailUrl = (email) =>
	`${baseUrl}/send-reset-passwordmail?email=${email}`;
export const initiateImpersonationProcessUrl = () => `${baseUrl}/impersonation`;
export const getImpersonatorDetailsUrl = ({
	userIdToImpersonate,
	impersonatorId,
	token
}) =>
	`${baseUrl}/impersonation-login?${generateUrlParams({
		userIdToImpersonate,
		impersonatorId,
		token
	})}`;
export const impersonateUserUrl = () => `${baseUrl}/impersonate`;
export const getUserUrl = (filter) =>
	`${baseUrl}/get-user?${generateUrlParams(filter)}`;
