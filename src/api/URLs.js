const apiUrl = process.env.REACT_APP_API_URL;

//labTechnician endpoints
export const getLabProfileUrl = (labId) => `${apiUrl}/Lab/GetALabTechnician?id=${labId}`;
export const updateLabTechnicianBasicInfoUrl = () => `${apiUrl}/Lab/UpdateLabProfileBasicInfo`;
export const updateLabTechnicianContactDetailsUrl = () => `${apiUrl}/Lab/UpdateLabProfileContactDetails`;

//Pharmacy endpoints
export const getPharmacistProfileUrl = (pharmId) => `${apiUrl}/Pharmacy/GetAPharmacistById?id=${pharmId}`;
export const updatePharmacistBasicInfoUrl = () => `${apiUrl}/Pharmacy/UpdatePharmacistBasicInfo`;
export const updatePharmacistContactDetailsUrl = () => `${apiUrl}/Pharmacy/UpdatePharmacistContactDetails`;
export const getDrugUrl = (drugId) => `${apiUrl}/Pharmacy/GetDrug/${drugId}`;
export const getAllDrugsUrl = () => `${apiUrl}//Pharmacy/GetAllDrugs`;
export const postDrugUrl = () => `${apiUrl}/Pharmacy/RegisterDrug`;
export const updateDrugInventoryUrl = (drugId, drugQuantity) => `${apiUrl}/Pharmacy/UpdateDrugQuantity?DrugId=${drugId}&DrugQuantity=${drugQuantity}`;

//accountant endpoints
export const getAccountantProfileUrl = (accountantId) => `${apiUrl}/Accountant/GetAccountant?AccountantId=${accountantId}`;
export const updateAccountantBasicInfoUrl = () => `${apiUrl}/Accountant/UpdateAccountactBasicInfo`;
export const updateAccountantContactDetailsUrl = () => `${apiUrl}/Accountant/UpdateAccountantContactDetails`;

//service endpoint 
export const getServiceRequestUrl = (serviceRequestId) =>  `${apiUrl}/Admin/GetServiceRequest/${serviceRequestId}`
export const postServiceRequestUrl = () =>  `${apiUrl}/Admin/UploadServiceRequestResult`