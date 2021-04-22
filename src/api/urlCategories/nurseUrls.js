// Nurse- Manage Profile
export const getNursesUrl = (pageNumber, pageSize) =>
  `/Nurse/GetNurses?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getNurseProfileUrl = (NurseId) =>
  `/Nurse/GetNurse?NurseId=${NurseId}`;
export const updateNurseBasicInfoUrl = () => `/Nurse/UpdateBasicInfo`;
export const updateNurseContactDetailsUrl = () => `/Nurse/UpdateContactDetails`;

// Nurse - Manage Profile
export const getNurseReportsUrl = (pageNumber, pageSize) =>
`/Nurse/GetNurseReports?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getNurseReportsByNurseUrl = (nurseId, pageNumber, pageSize) =>
`/Nurse/GetNurseReportsByNurse?NurseId=${nurseId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const createNurseReportUrl = () => `/Nurse/CreateNurseReport`;
