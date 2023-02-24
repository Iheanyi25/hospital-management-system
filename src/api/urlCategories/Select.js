const baseUrl = "Select";

export const getSessionsUrl = () => `${baseUrl}/session`;
export const getStudentTypeUrl = () => `${baseUrl}/student-types`;
export const getLevelUrl = (studentTypeId) =>
  `${baseUrl}/levels?studentTypeId=${studentTypeId}`;
export const getSemesterUrl = () => `${baseUrl}/semester`;
