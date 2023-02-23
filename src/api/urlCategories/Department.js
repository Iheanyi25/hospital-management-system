const baseURL = "Department";

export const getAllDepartmentsUrl = (studentTypeId) =>
  `${baseURL}/${studentTypeId}/departments`;
