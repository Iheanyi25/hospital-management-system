// Third party payment Urls
export const getAccountUrl = (accountName) =>
  `/Admin/GetAccountByAccountNumber/${accountName}`;
export const thirdPartyFundAccountUrl = () => `/Admin/Account/Link`;
