// Admin - Manage Admission
export const getAdmissionsUrl = (pageNumber, pageSize) =>
  `/Admission/GetAdmissions?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getAdmissionsWithoutBedUrl = (pageNumber, pageSize) =>
  `/Admission/GetAdmissionsWithoutBed?PageNumber=${pageNumber}&PageSize=${pageSize}`;

// Admission - Manage Wards
export const createWardUrl = () => `/Admission/Ward/CreateWard`;
export const createBedUrl = () => `/Admission/Ward/CreateBed`;
export const getAllWardsUrl = (pageNumber, pageSize) =>
  `/Admission/Ward/GetAllWards?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const updateWardUrl = () => `/Admission/Ward/UpdateWard`;
export const deleteWardUrl = () => `/Admission/Ward/DeleteWard`;
export const getBedsInAWardUrl = (wardId, pageNumber, pageSize) =>
  `/Admission/Ward/GetBedsInAWard?WardId=${wardId}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
