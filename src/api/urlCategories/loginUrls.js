// Login
export const logInUrl = () => `/Auth/Login`;
export const postPasswordUrl = () =>`/Auth/ChangePassword`;
export const postResetPasswordUrl = (email) =>`/Auth/SendResetPasswordMail?email=${email}`;
export const postResetPasswordFromMailUrl = (userToken, newPassword, userEmail) =>
  `/Auth/ResetPassword?email=${userEmail}&authenticationToken=${userToken}&newPassword=${newPassword}`;
