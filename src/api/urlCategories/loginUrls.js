// Login
export const logInUrl = () => `/Auth/Login`;
export const postPasswordUrl = () =>`/Auth/ChangePassword`;
export const postResetPasswordUrl = (email) =>`/Auth/SendResetPasswordMail?email=${email}`;
export const postResetPasswordFromMailUrl = () =>`/Auth/ResetPassword`;
