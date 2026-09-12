const baseUrl = "CountryStatesLGA";

export const getAllCountriesUrl = () => `${baseUrl}/countries`;
export const getAllStatesUrl = (countryId) => `${baseUrl}/${countryId}/states`;
export const getAllLGAsUrl = ({stateId, countryId}) =>
	`${baseUrl}/${countryId}/${stateId}/lgas`;
