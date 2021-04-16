import React, { useContext, useState } from "react";
import { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { fetchConfig } from "../../../../api/fetchConfig";
import {
  getBedsInAWardUrl,
  assignPatientToBedSpaceUrl,
} from "../../../../api/URLs";
import { PageLoader, Table } from "../../..";
import ActionButton from "../../../DataTable/ActionButton";
import TableSize from "../../../DataTable/TableSize";
import { AddBed } from "../../../Modals";
import formatDate from "../../../../utils/formatDate";
import { fetchWrapper, useRequest } from "../../../../api/fetcher";
import paid from "../../../../assets/img/paid.svg";
import notpaid from "../../../../assets/img/notpaid.svg";
import { notification } from "../../../../utils/notification";
import { observer } from "mobx-react";
import { UserContext } from "../../../../mobx/UserState";

const ManageBeds = observer(({ admissionId, wardId }) => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const history = useHistory();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getBedsInAWard = getBedsInAWardUrl(wardId, pageNumber, pageSize);
  const getBedsInAWardConfig = fetchConfig({
    url: getBedsInAWard,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getBedsInAWardConfig, {
    revalidateOnFocus: false,
  });

  const assignBed = async (bedId) => {
    const nextRoute = userType === "Admin" ? "/AdminManageAdmissions" : "/";
    const payload = {
      admissionId,
      bedId,
    };
    try {
      const assignPatientToBedSpace = assignPatientToBedSpaceUrl();
      const assignPatientToBedSpaceConfig = fetchConfig({
        url: assignPatientToBedSpace,
        method: "post",
        data: payload,
      });
      const res = await fetchWrapper(assignPatientToBedSpaceConfig);
      notification.success({ message: res.data.message });
      history.push(nextRoute);
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };

  let dataTable = [];
  if (data) {
    dataTable = data.beds.map((bed, index) => {
      console.log(bed, 6666);
      if (admissionId) {
        return {
          "#": ++index,
          Name: bed?.name,
          "Date Created": formatDate(bed?.dateCreated),
          Status: bed?.isAvailable ? (
            <>
              <img src={paid} alt="not paid" /> Available
            </>
          ) : (
            <>
              <img src={notpaid} alt="paid" /> Assigned
            </>
          ),
          Actions: bed?.isAvailable ? (
            <AdmissionsTableAction bedId={bed.id} assignBed={assignBed} />
          ) : (
            <>Unavailable</>
          ),
        };
      } else {
        return {
          "#": ++index,
          Name: bed?.name,
          "Date Created": formatDate(bed?.dateCreated),
          Status: bed?.isAvailable ? (
            <>
              <img src={paid} alt="not paid" /> Available
            </>
          ) : (
            <>
              <img src={notpaid} alt="paid" /> Assigned
            </>
          ),
          // Actions: <BedsTableAction />,
        };
      }
    });
  }
  if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">Manage Beds</h4>
            <Link
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#add-bed"
            >
              Add a bed
            </Link>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.beds.length : 0}
              heading="No Of Beds"
            />
          </div>
          <div className="page-content">
            {data && (
              <Table
                content={dataTable}
                paginationDetails={data.paginationDetails}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            )}
          </div>
        </div>
      </main>
      <AddBed wardId={wardId} mutate={mutate} />
    </Fragment>
  );
});

// const BedsTableAction = () => {
//   return (
//     <ActionButton>
//       <Link to="#" className="btn btn-sm btn-block">
//         <span className="btn-icon icofont-server mr-2" />
//         Hello, Nothing
//       </Link>
//     </ActionButton>
//   );
// };
const AdmissionsTableAction = ({ bedId, assignBed }) => {
  return (
    <ActionButton>
      <button
        type="button"
        className="btn btn-sm btn-block"
        onClick={() => assignBed(bedId)}
      >
        <span className="btn-icon icofont-server mr-2" />
        Assign to bed
      </button>
    </ActionButton>
  );
};

export { ManageBeds };
