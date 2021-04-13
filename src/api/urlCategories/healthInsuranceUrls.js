const baseName = "HealthInsurance";

// Health Insurance - Manage Counters
export const getHMOCountersUrl = (hmoId) => `/${baseName}/GetHMOCounters?HMOId=${hmoId}`;


// Health Insurance - Manage HMO Health Plan Drug Prices
export const getHMODrugPricesByHealthPlanUrl = (healthPlanId, pageNumber, pageSize) =>
  `/${baseName}/GetDrugPricesByHealthPlan?HealthPlanId=${healthPlanId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const createHMODrugPriceUrl = () => `/${baseName}/CreateDrugPrice`;
export const updateHMODrugPriceDrugUrl = () =>
  `/${baseName}/UpdateDrugPrice`;
export const deleteHMODrugPriceFromHMOHealthPlanUrl = () =>
  `/${baseName}/DeleteDrugPrice`;

// Health Insurance - Manage HMO Health Plan Patients
export const getHealthPlanPatientsInHMOByHealthPlanUrl = (healthPlanId, pageNumber, pageSize) =>
  `/${baseName}/GetHealthPlanPatientsByHealthPlan?HMOHealthPlanId=${healthPlanId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const assignPatientToHMOHealthPlanUrl = () =>
  `/${baseName}/AssignPatientToHealthPlan`;
export const deletePatientFromHMOHealthPlanUrl = () =>
  `/${baseName}/DeletePatientFromHealthPlan`;
  
  // Health Insurance - Manage HMO Health Plan Service Prices
  export const getHMOServicePricesByHealthPlanUrl = (healthPlanId, pageNumber, pageSize) =>
  `/${baseName}/GetServicePricesByHealthPlan?HealthPlanId=${healthPlanId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
  export const createHMOServicePriceUrl = () => `/${baseName}/CreateServicePrice`;
  export const deleteHMODeleteServicePriceUrl = () =>
    `/${baseName}/DeleteServicePrice`;
  export const updateHMOServicePriceUrl = () =>
    `/${baseName}/UpdateServicePrice`;

// Health Insurance - Manage HMO Health Plans
export const getHMOHealthPlansUrl = (hmoId, pageNumber, pageSize) =>
  `/${baseName}/GetHMOHealthPlans?HMOId=${hmoId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
  export const createHMOHealthPlanUrl = () => `/${baseName}/CreateHealthPlan`;
  export const editHMOHealthPlanUrl = () => `/${baseName}/UpdateHealthPlan`;
  
  // Health Insurance - Manage HMO Sub Group Patients
  export const getSubGroupPatientsBySubGroupUrl = (hmoSubGroupId, pageNumber, pageSize) =>
    `/${baseName}/GetSubGroupPatientsBySubGroup?HMOSubGroupId=${hmoSubGroupId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
  export const assignPatientToHMOSubGroupUrl = () =>
    `/${baseName}/AssignPatientToHMOSubGroup`;
    export const deletePatientFromSubGroupUrl = () =>
      `/${baseName}/DeletePatientFromSubGroup`;


  // Health Insurance - Manage HMO User Sub Groups
  export const getHMOSubUserGroupsUrl = (hmoId, pageNumber, pageSize) =>
    `/${baseName}/GetHMOSubUserGroups?HMOUserGroupId=${hmoId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
  export const creatHMOSubUserGroupUrl = () => `/${baseName}/CreatHMOSubUserGroup`;
  export const updateHMOSubUserGroupUrl = () => `/${baseName}/UpdateHMOSubUserGroup`;

  // Health Insurance - Manage HMO User Groups
  export const getHMOUserGroupsUrl = (hmoId, pageNumber, pageSize) =>
    `/${baseName}/GetHMOUserGroups?HMOId=${hmoId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
  export const creatHMOUserGroupUrl = () => `/${baseName}/CreatHMOUserGroup`;
  export const updateHMOUserGroupUrl = () => `/${baseName}/UpdateHMOUserGroup`;
  
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
export const getNHISHealthPlanPatientsUrl = () =>
  `/${baseName}/GetNHISHealthPlanPatients`;
export const getPatientSecondaryNHISServicesUrl = () =>
  `/${baseName}/GetPatientSecondaryNHISServices`;
export const getNHISHealthPlanPatientsByHealthPlanUrl = (healthPlanId, pageNumber, pageSize) =>
  `/${baseName}/GetNHISHealthPlanPatientsByHealthPlan?HealthPlanId=${healthPlanId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const assignPatientToNHISHealthPlanUrl = () =>
  `/${baseName}/AssignPatientToNHISHealthPlan`;
export const updatePatientNHISHealthPlanUrl = () =>
  `/${baseName}/UpdatePatientNHISHealthPlan`;
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