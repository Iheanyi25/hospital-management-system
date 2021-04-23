//Nurse - Manage Antenatal
export const getAntenatalsUrl = (pageNumber, pageSize) =>
  `/Nurse/GetAntenatals?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const createAntenatalUrl = () => `/Nurse/CreateAntenatal`;
export const getAntenatalRecordsForAntenatalUrl = (antenatalId) =>
`/Nurse/GetAntenatalRecordsForAntenatal?AntenatalId=${antenatalId}`;
export const createAntenatalRecordUrl = () => `/Nurse/CreateAntenatalRecord`;

// Nurse- Manage Profile
export const getNursesUrl = (pageNumber, pageSize) =>
  `/Nurse/GetNurses?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getNurseProfileUrl = (NurseId) =>
  `/Nurse/GetNurse?NurseId=${NurseId}`;
export const updateNurseBasicInfoUrl = () => `/Nurse/UpdateBasicInfo`;
export const updateNurseContactDetailsUrl = () => `/Nurse/UpdateContactDetails`;

// Nurse - Manage Report
export const getNurseReportUrl = (nurseReportId) =>
  `/Nurse/GetNurseReport?NurseReportId=${nurseReportId}`;
export const getNurseReportsUrl = (pageNumber, pageSize) =>
  `/Nurse/GetNurseReports?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getNurseReportsByNurseUrl = (nurseId, pageNumber, pageSize) =>
  `/Nurse/GetNurseReportsByNurse?NurseId=${nurseId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const createNurseReportUrl = () => `/Nurse/CreateNurseReport`;
export const updateNursingReportUrl = () => `/Nurse/UpdateNursingReport`;
export const updateNANDAReportUrl = () => `/Nurse/UpdateNANDAReport`;
export const updateDailyReportUrl = () => `/Nurse/UpdateDailyReport`;
