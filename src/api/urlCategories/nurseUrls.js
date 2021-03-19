// Nurse- Manage Profile
export const getNursesUrl = (pageNumber, pageSize) =>
  `/Nurse/GetNurses?PageNumber=${pageNumber}&PageSize=${pageSize}`;
  export const getNurseProfileUrl = (NurseId) =>
  `/Nurse/GetNurse?NurseId=${NurseId}`;
 
