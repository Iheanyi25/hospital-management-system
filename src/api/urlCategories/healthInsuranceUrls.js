const baseName = "HealthInsurance";

// Health Insurance - Manage HMO Health Plan Patients
export const assignPatientToHMOHealthPlanUrl = () =>
`/${baseName}/AssignPatientToHealthPlan`;


// Health Insurance - Manage HMO Health Plans
export const getHMOHealthPlansUrl = (hmoId, pageNumber, pageSize) =>
  `/${baseName}/GetHMOHealthPlans?HMOId=${hmoId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const createHMOHealthPlanUrl = () => `/${baseName}/CreateHealthPlan`;

// Health Insurance - Manage HMOS
export const getHMOsUrl = (pageNumber, pageSize) =>
  `/${baseName}/GetHMOs?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const createHMOUrl = () => `/${baseName}/CreatHMO`;

// Health Insurance - Manage NHIS Health Plan Drugs
export const getHealthPlanDrugsByHealthPlanUrl = (healthPlanId, pageNumber, pageSize) =>
  `/${baseName}/GetHealthPlanDrugsByHealthPlan?HealthPlanId=${healthPlanId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
  export const createNHISHealthPlanDrugUrl = () =>
  `/${baseName}/CreateHealthPlanDrug`;
  export const deleteNHISHealthPlanDrugUrl = () =>
  `/${baseName}/DeleteHealthPlanDrug`;
  
  //Health Insurance - Manage NHIS Health Plan Patients
  export const getNHISHealthPlanPatientsByHealthPlanUrl = (healthPlanId, pageNumber, pageSize) =>
  `/${baseName}/GetNHISHealthPlanPatientsByHealthPlan?HealthPlanId=${healthPlanId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
  export const assignPatientToNHISHealthPlanUrl = () =>
  `/${baseName}/AssignPatientToNHISHealthPlan`;
  export const deletePatientFromNHISHealthPlanUrl = () =>
  `/${baseName}/DeletePatientFromNHISHealthPlan`;
  
// Health Insurance - Manage NHIS Health Plan Services
  export const getHealthPlanServicesByHealthPlanUrl = (healthPlanId, pageNumber, pageSize) =>
  `/${baseName}/GetHealthPlanServicesByHealthPlan?HealthPlanId=${healthPlanId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
  export const createNHISHealthPlanServiceUrl = () =>
  `/${baseName}/CreateHealthPlanService`;
  export const deleteHealthPlanServiceUrl = () =>
  `/${baseName}/DeleteHealthPlanService`;

// Health Insurance - Manage NHIS Health Plans
export const getNHISHealthPlansUrl = (pageNumber, pageSize) =>
  `/${baseName}/GetNHISHealthPlans?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const createNHISHealthPlanUrl = () =>
  `/${baseName}/CreateNHISHealthPlan`;
  
  // Health Insurance - Manage Profile
  export const getHMOAdminsUrl = (pageNumber, pageSize) => `/${baseName}/GetHMOAdmins?PageNumber=${pageNumber}&PageSize=${pageSize}`;
  export const getHMOAdminUrl = (id) => `/${baseName}/GetHMOAdmin?HMOAdminId=${id}`;
  export const updateBasicInfoHMOAdminUrl = () => `/${baseName}/UpdateBasicInfo`;
  export const updateContactDetailsHMOAdminUrl = () => `/${baseName}/UpdateContactDetails`;
