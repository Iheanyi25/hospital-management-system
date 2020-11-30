const apiUrl = process.env.REACT_APP_API_URL;
export const getLabProfileUrl = (labId) => `${apiUrl}/Lab- Manage Profile/GetALabTechnician?id=${labId}`;
export const getPharmacyProfileUrl = (pharmId) => `${apiUrl}/Pharmacy/GetAPharmacistById?id=${pharmId}`;
