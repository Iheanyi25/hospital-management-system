// Accountant - Dashboard

// Accountant - Manage Reports
export const getTransactionsUrl = () => `/Accountant/GetTransactions`;
export const getTransactionsForDrugsUrl = () => `/Accountant/GetTransactionsForDrugs`;
export const getTransactionsForServiceRequestsUrl = () => `/Accountant/GetTransactionsForServiceRequests`;
export const getTransactionsForRegistrationUrl = () => `/Accountant/GetTransactionsForRegistration`;

// Accountant- Manage Profile
export const getAllAccountantsUrl = () => `/Accountant/GetAccountants?`;
export const getAccountantProfileUrl = (accountantId) =>
  `/Accountant/GetAccountant?AccountantId=${accountantId}`;
export const updateAccountantBasicInfoUrl = () =>
  `/Accountant/UpdateAccountactBasicInfo`;
export const updateAccountantContactDetailsUrl = () =>
  `/Accountant/UpdateAccountantContactDetails`;






















