const baseName = "HealthInsurance";

// Health Insurance - Manage NHIS Health Plans
export const getNHISHealthPlansUrl = (pageNumber, pageSize) =>
  `/${baseName}/GetNHISHealthPlans?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const createNHISHealthPlanUrl = () =>
  `/${baseName}/CreateNHISHealthPlan`;
