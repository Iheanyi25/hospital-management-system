// Lab - Manage Profile
export const getAllLabTechniciansUrl = (pageNumber, pageSize) =>
  `/Lab/GetAllLabTechnicians?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getLabProfileUrl = (labId) => `/Lab/GetALabTechnician?id=${labId}`;
export const updateLabTechnicianBasicInfoUrl = () =>
  `/Lab/UpdateLabProfileBasicInfo`;
export const updateLabTechnicianContactDetailsUrl = () =>
  `/Lab/UpdateLabProfileContactDetails`;

// Lab Attendant - Dashboard
export const labDashboardUrl = () => `/Lab/Dashboard`;
