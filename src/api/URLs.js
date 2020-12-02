const apiUrl = process.env.REACT_APP_API_URL;
export const getLabProfileUrl = (labId) => `${apiUrl}/Lab- Manage Profile/GetALabTechnician?id=${labId}`;

//Pharmacy endpoints
export const getPharmacistProfileUrl = (pharmId) => `${apiUrl}/Pharmacy/GetAPharmacistById?id=${pharmId}`;
export const updatePharmacistBasicInfoUrl = () => `${apiUrl}/Pharmacy/UpdatePharmacistBasicInfo`;
export const updatePharmacistContactDetailsUrl = () => `${apiUrl}/Pharmacy/UpdatePharmacistContactDetails`;