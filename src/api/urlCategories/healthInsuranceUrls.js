const baseName = "HealthInsurance";

// Health Insurance - Manage NHIS Health Plan Drugs
export const getHealthPlanDrugsByHealthPlanUrl = (healthPlanId, pageNumber, pageSize) =>
  `/${baseName}/GetHealthPlanDrugsByHealthPlan?HealthPlanId=${healthPlanId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
  export const createNHISHealthPlanDrugUrl = () =>
  `/${baseName}/CreateHealthPlanDrug`;
  export const deleteNHISHealthPlanDrugUrl = () =>
  `/${baseName}/DeleteHealthPlanDrug`;
  
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
