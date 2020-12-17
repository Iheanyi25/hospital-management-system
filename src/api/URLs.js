const apiUrl = process.env.REACT_APP_API_URL;
// Login endpoints
export const logInUrl = () => `${apiUrl}/Auth/Login`;

//labTechnician endpoints
export const getLabProfileUrl = (labId) =>
  `${apiUrl}/Lab/GetALabTechnician?id=${labId}`;
export const updateLabTechnicianBasicInfoUrl = () =>
  `${apiUrl}/Lab/UpdateLabProfileBasicInfo`;
export const updateLabTechnicianContactDetailsUrl = () =>
  `${apiUrl}/Lab/UpdateLabProfileContactDetails`;

//Pharmacy endpoints
export const getPharmacistProfileUrl = (pharmId) =>
  `${apiUrl}/Pharmacy/GetAPharmacistById?id=${pharmId}`;
export const updatePharmacistBasicInfoUrl = () =>
  `${apiUrl}/Pharmacy/UpdatePharmacistBasicInfo`;
export const updatePharmacistContactDetailsUrl = () =>
  `${apiUrl}/Pharmacy/UpdatePharmacistContactDetails`;
export const getDrugUrl = (drugId) => `${apiUrl}/Pharmacy/GetDrug/${drugId}`;
export const getAllDrugsUrl = () => `${apiUrl}//Pharmacy/GetAllDrugs`;
export const postDrugUrl = () => `${apiUrl}/Pharmacy/RegisterDrug`;
export const updateDrugInventoryUrl = (drugId, drugQuantity) =>
  `${apiUrl}/Pharmacy/UpdateDrugQuantity?DrugId=${drugId}&DrugQuantity=${drugQuantity}`;
export const updateDrugBasePriceUrl = () =>
  `${apiUrl}/Pharmacy/UpdateDefaultDrugPrice`;
export const getDrugPricesUrl = () => `${apiUrl}/Pharmacy/GetDrugPrices`;
export const postDrugPricesUrl = () => `${apiUrl}/Pharmacy/CreateDrugPrice`;
export const updateDrugPricesUrl = () => `${apiUrl}/Pharmacy/UpdateDrugPrice`;
export const deleteDrugPricesUrl = () => `${apiUrl}/Pharmacy/DeleteDrugPrice`;

//accountant endpoints
export const getAccountantProfileUrl = (accountantId) =>
  `${apiUrl}/Accountant/GetAccountant?AccountantId=${accountantId}`;
export const updateAccountantBasicInfoUrl = () =>
  `${apiUrl}/Accountant/UpdateAccountactBasicInfo`;
export const updateAccountantContactDetailsUrl = () =>
  `${apiUrl}/Accountant/UpdateAccountantContactDetails`;

//service endpoint
export const getServiceRequestUrl = (serviceRequestId) =>
  `${apiUrl}/Admin/GetServiceRequest/${serviceRequestId}`;
export const postServiceRequestUrl = () =>
  `${apiUrl}/Admin/UploadServiceRequestResult`;

// Health plan endpoint
export const getAllHealthPlansUrl = () => `${apiUrl}/Admin/GetAllHealthPlans`;
export const updateHealthPlanUrl = () => `${apiUrl}/Admin/UpdateHealthPlan`;
export const disableHealthPlanUrl = () => `${apiUrl}/Admin/DisableHealthPlan`;

//Admin Profile
export const getAdminProfileUrl = (adminId) =>
  `${apiUrl}/Admin/GetAdmin?AdminId=${adminId}`;
  export const updateAdminBasicInfoUrl = () =>
  `${apiUrl}/Admin/UpdateAdminBasicInfo`;
export const updateAdminContactDetailsUrl = () =>
  `${apiUrl}/Admin/UpdateAdminContactDetails`;
