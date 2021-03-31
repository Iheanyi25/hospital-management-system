import React, { useState } from "react";
import { fetchConfig } from "../../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../../api/fetcher";
import {
  getServiceInvoicesForHMOUrl,
  getAllServicesCategoryUrl,
  getAllServicesInACategoryUrl,
} from "../../../../api/URLs";
import { Table } from "../../../../Components";
import NoDataState from "../../../../Components/EmptyState/NoDataState";
import formatDate from "../../../../utils/formatDate";
import { FetchReportForm } from "./components";

const ServiceInvoiceReport = () => {
  const [details, setDetails] = useState({
    startDate: "",
    endDate: "",
  });
  const [reports, setReports] = useState([]);
  const [hmo, setHmo] = useState();
  const [category, setCategory] = useState();
  const [showServices, setShowServices] = useState(false);
  const [serviceOptions, setServiceOptions] = useState();
  const [service, setService] = useState();

  // fetch categories
  const getAllServicesCategory = getAllServicesCategoryUrl(1, 200);
  const getAllServicesCategoryConfig = fetchConfig({
    url: getAllServicesCategory,
    method: "get",
  });
  const { data: categories } = useRequest(getAllServicesCategoryConfig, {
    revalidateOnFocus: false,
  });
  let categoryOptions = [];
  if (categories?.serviceCategories.length > 0) {
    categories.serviceCategories.forEach(({ id, name }) => {
      categoryOptions.push({ value: id, label: name });
    });
  }

  // fetch services
  const fetchServices = async (category) => {
    setShowServices(false);
    setCategory(category);
    const getAllServicesInACategory = getAllServicesInACategoryUrl(
      category.value
    );
    const getAllServicesInACategoryConfig = fetchConfig({
      url: getAllServicesInACategory,
      method: "get",
    });
    try {
      const { data } = await fetchWrapper(getAllServicesInACategoryConfig);
      let serviceOptions = [];
      if (data?.services.length > 0) {
        data.services.forEach(({ id, name }) => {
          serviceOptions.push({ value: id, label: name });
        });
      }
      setServiceOptions(serviceOptions);
      setShowServices(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleServiceChange = (service) => {
    setService(service);
  };
  const handleHMOChange = (hmo) => {
    setHmo(hmo);
  };
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const fetchReport = async (e) => {
    const { startDate, endDate } = details;
    e.preventDefault();
    const payload = {
      startDate: startDate + "T00:00:00.000Z",
      endDate: endDate + "T23:59:59.000Z",
      hmoId: hmo.value,
      serviceId: service.value,
    };
    const getServiceInvoicesForHMO = getServiceInvoicesForHMOUrl();
    const getServiceInvoicesForHMOConfig = fetchConfig({
      url: getServiceInvoicesForHMO,
      method: "post",
      data: payload,
    });
    const { data } = await fetchWrapper(getServiceInvoicesForHMOConfig);
    setReports(data?.registrationTransactions);
  };
  const { startDate, endDate } = details;
  let dataTable = [];
  if (reports) {
    dataTable = reports?.map(
      (
        {
          service: { name },
          serviceInvoice: {
            patient: { firstName, lastName },
            invoiceNumber,
            amountToBePaidByHMO,
            dateGenerated,
          },
        },
        index
      ) => {
        return {
          "#": ++index,
          "Patient Name": `${firstName} ${lastName}`,
          "Service Name": name,
          "Invoice Number": invoiceNumber,
          "Amount (NGN)": amountToBePaidByHMO,
          "Date Generated": formatDate(dateGenerated),
        };
      }
    );
  }
  return (
    <>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <header className="page-header ml-3">
              <h3 className="page-title">HMO Service Report</h3>
            </header>
            <p className="ml-3">
              Select the date range to see the data from that timeline
            </p>
            <FetchReportForm
              startDate={startDate}
              endDate={endDate}
              hmo={hmo}
              handleHMOChange={handleHMOChange}
              optionValue={category}
              optionTitle="Select Category"
              options={categoryOptions}
              handleOptionChange={fetchServices}
              thirdOptionFlag={showServices}
              thirdOptionTitle="Select Service"
              thirdOptionValue={service}
              thirdOptionOptions={serviceOptions}
              handleThirdOptionChange={handleServiceChange}
              handleChange={handleChange}
              fetchReport={fetchReport}
            />
            <div className="col col-md-12">
              {reports.length === 0 ? (
                <div className="card border-light m-auto w-50 p-4">
                  <NoDataState />
                </div>
              ) : (
                <div className="page-content">
                  <Table
                    content={dataTable}
                    tableID={"reports" + reports.length}
                    key={"reports" + reports.length}
                    exportAction
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ServiceInvoiceReport;
