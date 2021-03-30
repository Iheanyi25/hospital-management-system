import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  costDrugUrl,
  getAllDrugsUrl,
  getPrescriptionUrl,
  generateDrugDispenseInvoiceUrl,
} from "../../../api/URLs";
import { fetchConfig } from "../../../api/fetchConfig";
import {
  AddPrescriptionQuantity,
} from "../../../Components";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import { PrescriptionInvoice } from "../../../Components/Modals";
import { observer } from "mobx-react";
import { UserContext } from "../../../mobx/UserState";
import { PrescriptionList } from "../../Components/DrugPrescription";
import { notification } from "../../../utils/notification";
import DrugPrescriptionTable from "../../../Components/Admissions/Prescriptions/DrugPrescriptionTable";
import Select from "react-select";

const $ = window.$;

const DrugPrescription = observer(({ match }) => {
  const {
    user: { id: generatedBy, userType },
  } = useContext(UserContext);
  const history = useHistory();
  const [costingDetails, setcostingDetails] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState({});

  const { id: clarkingId } = match.params;

  const prescriptionUrl = getPrescriptionUrl(clarkingId);
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
  const [activeDrug, setActiveDrug] = useState({label: "", value: ""});

  const { data } = useRequest(getDrugConfig, {
    revalidateOnFocus: false,
  });

  const onChange = (data, e) => {
    // e.preventDefault();


    let allDrugs = selectedDrugs;
    let existingIndex = allDrugs.find((element) => element.id === data.value);

    if (!existingIndex) {
      let newValue = {
        label: data.label,
        value: data.value,
      };
      console.log(newValue,333)
      setActiveDrug(newValue);
      loadModal();
    }
  };

  const loadModal = () => {
    document.getElementById("prescriptionTrigger").click();
  };

  const addPresQuality = (newValue) => {
    setSelectedDrugs([...selectedDrugs, newValue]);
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

  const generateInvoice = async () => {
    const nextRoute =
      userType === "Admin"
        ? "/AdminManagePrescriptionInvoice"
        : "/PharmacyManagePrescriptions";

    const payload = {
      generatedBy,
      clarkingId,
      ...invoiceDetails,
    };
    console.log(payload, nextRoute, "7777");
    const invoiceUrl = generateDrugDispenseInvoiceUrl();
    const generateDrugDispenseInvoiceConfig = fetchConfig({
      url: invoiceUrl,
      method: "post",
      data: payload,
    });
    try {
      const res = await fetchWrapper(generateDrugDispenseInvoiceConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        history.push(nextRoute);
        $("#showInvoice").modal("hide");
      }
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
    }
  };

  const allDrugs = [];

    if (data?.drugs?.length > 0) {
      data.drugs.forEach(({ id, name, sku }) => {
        allDrugs.push({ value: id, label: name, sku });
      });
    }

    console.log(selectedDrugs,5555)


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
                    <Select
                      options={allDrugs}
                      onChange={onChange}
                    />
                  </div>

                  <div className="col-12 col-md-5">
                    <DrugPrescriptionTable
                      selectedDrugs={selectedDrugs}
                      removeFromSelected={removeFromSelected}
                    />
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

      <AddPrescriptionQuantity drug={ {name: activeDrug.label, drugId: activeDrug.value}} setSubmit={addPresQuality} />
      <PrescriptionInvoice
        costingDetails={costingDetails}
        doctor={prescription?.doctor}
        patient={prescription?.patient}
        generateInvoice={generateInvoice}
      />
    </>
  );
});

export default DrugPrescription;
