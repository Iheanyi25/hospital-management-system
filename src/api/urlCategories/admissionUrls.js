// Admin - Manage Admission
export const getAdmissionsUrl = (pageNumber, pageSize) =>
  `/Admission/GetAdmissions?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getAdmissionsWithoutBedUrl = (pageNumber, pageSize) =>
  `/Admission/GetAdmissionsWithoutBed?PageNumber=${pageNumber}&PageSize=${pageSize}`;

// Admission - Manage Wards
export const createWardUrl = () => `/Admission/Ward/CreateWard`;
