import React, { useState, useContext, useEffect } from "react";
import { fetchWrapper, useRequest } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import {
  createServiceMedicationUrl,
  // createServiceMedicationUrl,
  getAllServicesCategoryUrl,
  getAllServicesInACategoryUrl,
} from "../../api/URLs";
import { notification } from "../../utils/notification";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";
import Select from "react-select";

const $ = window.$;
const UpdateServiceMedications = observer(({ admissionId, mutate }) => {
  const {
    user: { id: initiatorId },
  } = useContext(UserContext);
  const [payload, setpayload] = useState({
    administrationInstruction: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    status: "In progress",
    serviceId: "",
    initiatorId,
  });
  const [serviceCategory, setServiceCategory] = useState({
    label: "",
    value: "",
  });
  const [allServices, setAllServices] = useState([]);
  const [service, setService] = useState({ label: "", value: "" });
  const getAllServicesCategory = getAllServicesCategoryUrl(1, 200);
  const getAllServicesCategoryConfig = fetchConfig({
    url: getAllServicesCategory,
    method: "get",
  });
  const { data: categories, error } = useRequest(
    getAllServicesCategoryConfig,
    {
      revalidateOnFocus: false,
    }
  );

  console.log(error,8888)

  useEffect(() => {
    async function fetchServices() {
      try {
        const getAllServicesInACategory = getAllServicesInACategoryUrl(
          serviceCategory.value
        );
        const getAllServicesInACategoryConfig = fetchConfig({
          url: getAllServicesInACategory,
          method: "get",
        });
        const { data } = await fetchWrapper(getAllServicesInACategoryConfig);
        setAllServices(data?.services);
      } catch (error) {
        notification.error({ message: error?.response?.data.message });
      }
    }
    if(serviceCategory.value) fetchServices();
  }, [serviceCategory.value]);

  const handleChange = (e) => {
    setpayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceCatSelect = (serviceCat) => {
    setServiceCategory(serviceCat);
  };
  const handleServiceSelect = (service) => {
    setService(service);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...payload, serviceId: service?.value, admissionId };
    try {
      const createMedication = createServiceMedicationUrl ();
      const createMedicationConfig = fetchConfig({
        url: createMedication,
        data: data,
        method: "post",
      });
      const res = await fetchWrapper(createMedicationConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        mutate();
        $("#update-service-medication").modal("hide");
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };

  return (
    <div
      className="modal fade"
      id="update-service-medication"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Update medications</h5>
            <form className="p-3" onSubmit={handleSubmit}>
              <div className="d-block d-md-flex justify-content-between">
                <div style={{ flex: "1" }} className="mr-md-4">
                  <UpdateServiceMedicationForm
                    handleChange={handleChange}
                    startDate={payload.startDate}
                    handleServiceCatSelect={handleServiceCatSelect}
                    handleServiceSelect={handleServiceSelect}
                    serviceCategories={categories?.serviceCategories}
                    selectedServiceCategory={serviceCategory}
                    services={allServices}
                    selectedService={service}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});
export default UpdateServiceMedications;

const UpdateServiceMedicationForm = ({
  handleChange,
  services,
  selectedService,
  serviceCategories,
  selectedServiceCategory,
  handleServiceCatSelect,
  handleServiceSelect,
  startDate
}) => {
  const optionsServiceCat = [];
  const optionsService = [];

  if (serviceCategories?.length > 0) {
    serviceCategories.forEach(({ id, name }) => {
      optionsServiceCat.push({ value: id, label: name });
    });
  }

  if (services?.length > 0) {
    services.forEach(({ id, name }) => {
      optionsService.push({ value: id, label: name });
    });
  }
  return (
    <>
      <div className="form-group">
        <label>Administration Instructions</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Enter administration instructions"
          onChange={handleChange}
          name="administrationInstruction"
          required
        />
      </div>
      <div className="form-group">
        <label>Dosage</label>
        <input
          type="text"
          className="form-control"
          name="dosage"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Frequency</label>
        <input
          type="text"
          className="form-control"
          name="frequency"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Commencement Date</label>
        <input
          type="date"
          className="form-control"
          name="startDate"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Stop Date</label>
        <input
          type="date"
          className="form-control"
          name="endDate"
          min={startDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Service Categories</label>
        <Select
          options={optionsServiceCat}
          value={selectedServiceCategory}
          onChange={handleServiceCatSelect}
        />
      </div>
      {selectedServiceCategory.value && 
       <div className="form-group">
       <label>Services in Category</label>
       <Select
         options={optionsService}
         value={selectedService}
         onChange={handleServiceSelect}
       />
     </div>}
     
      <div className="col"></div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-danger mr-3" data-dismiss="modal">
          Close
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </>
  );
};
