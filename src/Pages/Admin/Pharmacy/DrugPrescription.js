import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  costDrugUrl,
  getAllDrugsUrl,
  getPrescriptionUrl,
} from "../../../api/URLs";
import { fetchConfig } from "../../../api/fetchConfig";
import user from "../../../assets/img/user.png";
import remove from "../../../assets/img/remove.svg";
import {
  AddPrescriptionQuantity,
  SelectableDropDown,
} from "../../../Components";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import PrescriptionInvoice from "../../../Components/Modals/PrescriptionInvoice";

const DrugPrescription = ({ match }) => {
  const [costingDetails, setcostingDetails] = useState([]);

  // fetch Prescription
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
  // fetch Drugs
  const getDrugsUrl = getAllDrugsUrl();
  const getDrugConfig = fetchConfig({
    url: getDrugsUrl,
    method: "get",
  });
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [activeDrugs, setActiveDrugs] = useState(null);

  const { data, error, mutate } = useRequest(getDrugConfig, {
    revalidateOnFocus: false,
  });

  const onChange = (key, e) => {
    e.preventDefault();

    let rawData = e.target.value;
    rawData = rawData.split("#");

    let allDrugs = selectedDrugs;
    let existingIndex = allDrugs.find((element) => element.id === rawData[2]);

    if (!existingIndex) {
      let newValue = {
        name: rawData[3],
        drugId: rawData[2],
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

  const generateInvoice = async () => {
    selectedDrugs.forEach((drug, i) => {
      const { name, ...selectedDrugDet } = drug;
      selectedDrugs[i] = selectedDrugDet;
    });
    const payload = {
      patientId: prescription?.patient?.id,
      drugs: selectedDrugs,
    };
    const costUrl = costDrugUrl();
    const costDrugConfig = fetchConfig({
      url: costUrl,
      method: "post",
      data: payload,
    });
    let response = await fetchWrapper(costDrugConfig);
    setcostingDetails(response?.data?.costings);
    console.log(response);
    console.log(payload, "payload");
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
                onClick={generateInvoice}
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
                    <div className="card bg-light">
                      <div className="card-body p-5 m-auto">
                        <div className="d-flex">
                          <img
                            src={user}
                            style={{
                              height: "32px",
                              width: "32px",
                              borderRadius: "50%",
                            }}
                            alt="user"
                          />
                          <h6 className="mt-2 ml-2">{`[${
                            prescription?.patient?.firstName ?? ""
                          } ${prescription?.patient?.lastName ?? ""}]`}</h6>
                        </div>
                        <p className="mb-0">{prescription?.prescription}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <label className={"mb-3"}>Search & select drugs</label>
                    <SelectableDropDown
                      data={data?.drugs ?? []}
                      valueKeys={["name"]}
                      label={"Drug"}
                      multiple={false}
                      search
                      onChange={onChange}
                      stateKey={["name"]}
                      itemKey={["SKU", "genericName", "id", "name"]}
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
                                      {item.name}
                                    </div>
                                  </strong>
                                </td>
                                <td>
                                  {`${
                                    Number(item?.numberOfUnits) ?? 0
                                  } packs, `}{" "}
                                  {`${
                                    Number(item?.numberOfContainers) ?? 0
                                  }  tablets, `}
                                  {`${
                                    Number(item?.numberOfCartons) ?? 0
                                  }  cartons`}
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
      />
    </>
  );
};

export default DrugPrescription;
