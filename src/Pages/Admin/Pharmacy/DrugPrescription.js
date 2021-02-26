import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  costDrugUrl,
  getAllDrugsUrl,
  getPrescriptionUrl,
} from "../../../api/URLs";
import { fetchConfig } from "../../../api/fetchConfig";
import remove from "../../../assets/img/remove.svg";
import {
  AddPrescriptionQuantity,
  SelectableDropDown,
} from "../../../Components";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import { PrescriptionInvoice } from "../../../Components/Modals";
import { observer } from "mobx-react";
import { UserContext } from "../../../mobx/UserState";
import { PrescriptionList } from "../../Components/DrugPrescription";

const DrugPrescription = observer(({ match }) => {
  const { user } = useContext(UserContext);
  const [costingDetails, setcostingDetails] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState({});

  const { id } = match.params;

  const prescriptionUrl = getPrescriptionUrl(id);
  const getPrescriptionConfig = fetchConfig({
    url: prescriptionUrl,
    method: "get",
  });

  const { data: prescription } = useRequest(getPrescriptionConfig, {
    revalidateOnFocus: false,
  });
  console.log(prescription);
  const getDrugsUrl = getAllDrugsUrl(1, 200);
  const getDrugConfig = fetchConfig({
    url: getDrugsUrl,
    method: "get",
  });
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [activeDrugs, setActiveDrugs] = useState(null);

  const { data } = useRequest(getDrugConfig, {
    revalidateOnFocus: false,
  });

  const onChange = (key, e) => {
    e.preventDefault();

    let rawData = e.target.value;
    rawData = rawData.split("#");

    let allDrugs = selectedDrugs;
    let existingIndex = allDrugs.find((element) => element.id === rawData[1]);

    if (!existingIndex) {
      let newValue = {
        name: rawData[2],
        drugId: rawData[1],
      };
      setActiveDrugs(newValue);
      loadModal();
    } else return;
  };

  const loadModal = () => {
    document.getElementById("prescriptionTrigger").click();
  };

  const addPresQuality = (newValue) => {
    let allDrugs = selectedDrugs;
    allDrugs.push(newValue);
    console.log(newValue, "heloo");
    setSelectedDrugs(allDrugs);
    setActiveDrugs(null);
  };

  const removeFromSelected = (id) => {
    let arrayToRemoveFrom = selectedDrugs;

    arrayToRemoveFrom.splice(id, 1);
    setSelectedDrugs(arrayToRemoveFrom);
  };

  const costDrugs = async () => {
    selectedDrugs.forEach((drug, i) => {
      const { name, ...selectedDrugDet } = drug;
      selectedDrugs[i] = selectedDrugDet;
    });
    const payload = {
      patientId: prescription?.patient?.id,
      drugs: selectedDrugs,
    };
    console.log(payload, "payload");
    const costUrl = costDrugUrl();
    const costDrugConfig = fetchConfig({
      url: costUrl,
      method: "post",
      data: payload,
    });
    setInvoiceDetails(payload);
    let response = await fetchWrapper(costDrugConfig);
    setcostingDetails(response?.data?.costings);
    console.log(response);
  };

  return (
    <>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title">Prescription</h4>
            {selectedDrugs.length > 0 ? (
              <Link
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#showInvoice"
                onClick={costDrugs}
              >
                Preview
              </Link>
            ) : null}
          </header>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-4">
                    <PrescriptionList
                      fullName={`${prescription?.patient?.firstName ?? ""} ${
                        prescription?.patient?.lastName ?? ""
                      }`}
                      prescription={prescription?.prescription}
                    />
                  </div>
                  <div className="col-12 col-md-3">
                    <label className={"mb-3"}>Search & select drugs</label>
                    <SelectableDropDown
                      searchParams={["name", "sku"]}
                      data={data?.drugs ?? []}
                      valueKeys={["name"]}
                      label={"Drug"}
                      multiple={false}
                      search
                      onChange={onChange}
                      stateKey={["name"]}
                      itemKey={["genericName", "id", "name"]}
                    />
                  </div>

                  <div className="col-12 col-md-5">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr className="">
                            <th>#</th>
                            <th>Drug name</th>
                            <th>Qty</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedDrugs && selectedDrugs.length > 0 ? (
                            selectedDrugs.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  <strong>{index + 1}</strong>
                                </td>
                                <td>
                                  <strong>
                                    <div className="d-flex align-items-center nowrap">
                                      {item?.name ?? "N/A"}
                                    </div>
                                  </strong>
                                </td>
                                <td>
                                  {Number(item?.numberOfUnits) === 1
                                    ? `${item.numberOfUnits} tablet, `
                                    : Number(item?.numberOfUnits) > 1
                                    ? `${item.numberOfUnits} tablets, `
                                    : null}
                                  {Number(item?.numberOfContainers) === 1
                                    ? `${item.numberOfContainers} pack, `
                                    : Number(item?.numberOfContainers) > 1
                                    ? `${item.numberOfContainers} packs,  `
                                    : null}
                                  {Number(item?.numberOfCartons) === 1
                                    ? `${item.numberOfCartons} carton `
                                    : Number(item?.numberOfCartons) > 1
                                    ? `${item.numberOfCartons} cartons `
                                    : null}
                                </td>
                                <td>
                                  <div className="d-flex align-items-center nowrap">
                                    <Link
                                      title="Delete"
                                      to="#"
                                      onClick={() => removeFromSelected(index)}
                                      className="text-danger mr-4"
                                    >
                                      <img src={remove} alt="delete" />
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4">
                                <p className="w-50 text-secondary">
                                  Search and select the drugs prescribed to the
                                  patient
                                </p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <button
        className="btn d-none"
        id="prescriptionTrigger"
        data-toggle="modal"
        data-target="#add-prescription-quantity"
      />

      <AddPrescriptionQuantity drug={activeDrugs} setSubmit={addPresQuality} />
      <PrescriptionInvoice
        costingDetails={costingDetails}
        doctor={prescription?.doctor}
        patient={prescription?.patient}
        invoiceDetails={invoiceDetails}
        id={id}
        nextRoute={
          user.userType === "Admin"
            ? "/AdminManagePrescriptionInvoice"
            : "/PharmacyManagePrescriptions"
        }
      />
    </>
  );
});

export default DrugPrescription;
