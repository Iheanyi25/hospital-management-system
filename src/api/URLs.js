// Authentication endpoints
export * from './urlCategories/loginUrls.js';
export * from './urlCategories/adminUrls.js';
export * from './urlCategories/admissionUrls';
export * from './urlCategories/accountantUrls.js';
export * from './urlCategories/doctorUrls.js';
export * from './urlCategories/nurseUrls.js';
export * from './urlCategories/labUrls.js';
export * from './urlCategories/pharmacyUrls.js';
export * from './urlCategories/patientUrls.js';
export * from './urlCategories/commonUrls';
export const baseUrl =  () => process.env.REACT_APP_API_URL;
