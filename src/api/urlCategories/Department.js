const baseURL = "Department";

export const getAllDepartmentsUrl = (studentTypeId) =>
  `${baseURL}/${studentTypeId}/departments`;

export const getDepartmentOptionUrl = ({ departmentId }) =>
  `${baseURL}/${departmentId}/departmentoption`;
