import React, { Fragment } from "react";
// import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getMedicationsUrl } from "../../../api/URLs";
// import { getAdmissionsUrl, getAllWardsUrl } from "../../api/URLs";
// import incomplete from "../../assets/img/incomplete.svg";
// import paid from "../../assets/img/paid.svg";
import { Table } from "../../DataTable";
// import TableSize from "../../DataTable/TableSize";
// import ActionButton from "../../DataTable/ActionButton";
import { PageLoader } from "../../Loader";

const Medications = ({admissionId}) => {
    // const [pageNumber, setPageNumber] = useState(1);
    // const [pageSize, setPageSize] = useState(50);
  //   const [wardId, setWardId] = useState("all");

    //Fetching admissions
    console.log("heloooo",admissionId,666)
    // const params = { pageNumber, pageSize, admissionId}
    const params = 2
    const getMedications = getMedicationsUrl(params);
    const getMedicationsConfig = fetchConfig({
      url: getMedications,
      method: "get",
    });
    const { data } = useRequest(getMedicationsConfig, {
      revalidateOnFocus: false,
    });
    console.log(data,11116666);


    // paginationDetails={data.paginationDetails}
    // setPageNumber={setPageNumber}
    // pageNumber={pageNumber}
    // pageSize={pageSize}
    // setPageSize={setPageSize}

    // // Fetching all wards
    // const getAllWards = getAllWardsUrl(pageNumber, pageSize);
    // const getAllWardsConfig = fetchConfig({ url: getAllWards, method: "get" });
    // const { data: wards } = useRequest(getAllWardsConfig, {
    //   revalidateOnFocus: false,
    // });
    // console.log(wards, 89999);
  const patientsMedications = {
    // medication: [
    //   {
    //     medication: "Ezinne",
    //     dose: "cefujkec",
    //     freq: "2",
    //     date: 3029,
    //     start: "Kaduna",
    //   },
    //   {
    //     medication: "Ezinne",
    //     dose: "cefujkec",
    //     freq: "2",
    //     date: 3029,
    //     start: "Kaduna",
    //   },
    //   {
    //     medication: "Ezinne",
    //     dose: "cefujkec",
    //     ferq: "w2",
    //     date: 3029,
    //     start: "Kaduna",
    //   },
    // ],
  };
  let dataTable = [];
  if (data) {
    dataTable = data?.medications.map((medication, index) => {
      return {
        "#": ++index,
        Medication: `${medication.medication}`,
        // `${admission?.patient?.firstName} ${admission?.patient?.lastName}`,
        Dose: `${medication.dosage}`,
        //  `${admission?.doctor?.firstName} ${admission?.doctor?.lastName}`,
        FreQ: `${medication?.freq || "N/A"}`,
        // admission?.bed?.ward?.name,
        Start: `${medication.startDate}`,
        //  admission?.bed?.name,
        Stop: `${medication.endDate}`,
        Status: `${medication.status}`,
        Initiator: `${medication.initiator}`,
      };
    });
  }
  //   if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          {/* <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title">Admissions</h4>
          </header> */}
          {/* <div className="page-content">
            <TableSize
              size= {patientsMedications.medication.length}
              heading="No of Patients admitted"
              icon=""
            />
          </div> */}
          <div className="page-content">
            {/* <div className="row mx-0 mb-3"> */}
              {/* <div className="col-12 col-md-4 col-lg-3 px-0">
                <select
                  className="form-control"
                  name="degree"
                  onChange={(e) => {
                    setWardId(e.target.value);
                  }}
                >
                  <option value="all">All</option>
                  {wards?.wards?.map((ward, index) => (
                    <option value={ward.id} key={index}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div> */}
            {/* </div> */}
            {patientsMedications && (
              <Table
                content={dataTable}
                // paginationDetails={data.paginationDetails}
                // setPageNumber={setPageNumber}
                // pageNumber={pageNumber}
                // pageSize={pageSize}
                // setPageSize={setPageSize}
              />
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

// const AdmissionsActionTable = ({ id }) => {
//   return (
//     <ActionButton>
//       <Link to="#" className="btn btn-sm btn-block">
//         <span className="btn-icon icofont-server mr-2" />
//         Hello, Nothing
//       </Link>
//       <Link to={`/AdminWardRoundNotes/${id}`} className="btn btn-sm btn-block">
//         <span className="btn-icon icofont-server mr-2" />
//         Manage Admission
//       </Link>
//     </ActionButton>
//   );
// };

export default Medications;
