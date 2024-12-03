import { generateUrlParams } from "../../utils/generateUrlParams";

const baseUrl = "Authentication";

export const createAccountUrl = () => `${baseUrl}/CreateStudentAccount`;
export const loginUrl = () => `${baseUrl}/login`;
export const ChangePasswordUrl = () => `${baseUrl}/change-password`;
export const sendSetupEmailUrl = (userId, email) =>
	`${baseUrl}/send-setup-password-email?userId=${userId}&email=${email}`;
export const twoFactorAuthUrl = () => `${baseUrl}/two-factor-authentication`;
export const resetPasswordUrl = () => `${baseUrl}/reset-password`;
export const verifyUserUrl = () => `${baseUrl}/verify-user`;
export const refreshAccessTokenUrl = () => `${baseUrl}/refresh-access-token`;
export const sendResetPasswordMailUrl = (email) =>
	`${baseUrl}/send-reset-password-mail?email=${email}`;
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
export const getReferralsUrl = (filter) =>
	`${baseUrl}/Referrals?${generateUrlParams(filter)}`;
export const toggleUserActivationStatusUrl = (userId) =>
	`${baseUrl}/toggle-user-activation-status?userId=${userId}`;
