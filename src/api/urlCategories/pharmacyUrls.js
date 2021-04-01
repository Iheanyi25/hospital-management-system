// Pharmacy - Drug Costing
export const costDrugUrl = () => `/Pharmacy/CostDrugs`;

// Pharmacy - Drug Invoicing and Payments
export const getAllPrescriptionsUrl = () => `/Pharmacy/GetPrescriptions`;
export const getPrescriptionUrl = (id) =>
  `/Pharmacy/GetPrescription?ClerkingId=${id}`;
export const generateDrugDispenseInvoiceUrl = () =>
  `/Pharmacy/GenerateDrugDispenseInvoice`;
export const getAllDrugDispencingInvoicesUrl = () =>
  `/Pharmacy/GetDrugDispencingInvoices`;
export const payForDrugsUrl = () => `/Pharmacy/PayForDrugs`;
export const payForDrugsWithAccountUrl = () =>
  `/Pharmacy/PayForDrugsWithAccount`;
export const getDrugsInAnInvoice = (invoiceNumber) =>
  `/Pharmacy/GetDrugsInAnInvoice/${invoiceNumber}`;
export const markInvoiceAsDispensedUrl = (drugInvoiceId) =>
  `/Pharmacy/MarkInvoiceAsDispensed?DrugInvoiceId=${drugInvoiceId}`;

// Pharmacy - Manage Drug Inventory
export const getDrugBatchByDrugUrl = (drugId) =>
  `/Pharmacy/GetDrugBatchByDrug?DrugId=${drugId}`;
export const createDrugBatchUrl = () => `/Pharmacy/CreateDrugBatch`;
export const deleteDrugBatchUrl = () => `/Pharmacy/DeleteDrugBatch`;
export const updateDrugBatchUrl = () => `/Pharmacy/UpdateDrugBatch`;

// Pharmacy - Manage Drug Prices
export const updateDrugBasePriceUrl = () => `/Pharmacy/UpdateDefaultDrugPrice`;
export const getDrugPricesUrl = () => `/Pharmacy/GetDrugPrices`;
export const postDrugPricesUrl = () => `/Pharmacy/CreateDrugPrice`;
export const updateDrugPricesUrl = () => `/Pharmacy/UpdateDrugPrice`;
export const deleteDrugPricesUrl = () => `/Pharmacy/DeleteDrugPrice`;

// Pharmacy - Manage Drugs
export const getAllDrugsUrl = (pageNumber, pageSize) =>
  `/Pharmacy/GetAllDrugs?PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getAllDrugsByDrugTypeUrl = (drugType, pageNumber, pageSize) =>
  `/Pharmacy/GetDrugsByDrugType?drugType=${drugType}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
export const getDrugUrl = (drugId) => `/Pharmacy/GetDrug/${drugId}`;
export const postDrugUrl = () => `/Pharmacy/RegisterDrug`;
export const updateDrugInventoryUrl = (drugId, drugQuantity) =>
  `/Pharmacy/UpdateDrugQuantity?DrugId=${drugId}&DrugQuantity=${drugQuantity}`;
export const updateDrugUrl = () => `/Pharmacy/UpdateDrug`;
export const deleteDrugUrl = () => `/Pharmacy/DeleteDrug`;

// Pharmacy- Dashboard
export const pharmacyDashboardUrl = () => `/Pharmacy/SystemSummary`;

// Pharmacy- Manage Profile
export const getAllPharmacistUrl = () => `/Pharmacy/GetAllPharmacists?`;
export const getPharmacistProfileUrl = (pharmId) =>
  `/Pharmacy/GetAPharmacistById?id=${pharmId}`;
export const updatePharmacistBasicInfoUrl = () =>
  `/Pharmacy/UpdatePharmacistBasicInfo`;
export const updatePharmacistContactDetailsUrl = () =>
  `/Pharmacy/UpdatePharmacistContactDetails`;
