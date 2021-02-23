import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { getBedsInAWardUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../..";
import ActionButton from "../../DataTable/ActionButton";
import TableSize from "../../DataTable/TableSize";
import { AddBed } from "../../Modals";
import formatDate from "../../../utils/formatDate";
import { useRequest } from "../../../api/fetcher";
import paid from "../../../assets/img/paid.svg";
import notpaid from "../../../assets/img/notpaid.svg";

const ManageBeds = ({ admissionId, wardId }) => {
  const [id, setId] = useState(useParams().id);
  useEffect(() => {
    if (wardId) {
      setId(wardId);
    }
  }, [wardId]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getBedsInAWard = getBedsInAWardUrl(id, pageNumber, pageSize);
  const getBedsInAWardConfig = fetchConfig({
    url: getBedsInAWard,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getBedsInAWardConfig, {
    revalidateOnFocus: false,
  });

  let dataTable = [];
  if (data) {
    dataTable = data.beds.map((bed, index) => {
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
          Actions: <AdmissionsTableAction admissionId={admissionId} />,
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
          Actions: <BedsTableAction />,
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
      <AddBed wardId={id} mutate={mutate} />
    </Fragment>
  );
};

const BedsTableAction = () => {
  return (
    <ActionButton>
      <Link to="#" className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Hello, Nothing
      </Link>
    </ActionButton>
  );
};
const AdmissionsTableAction = () => {
  return (
    <ActionButton>
      <Link to="#" className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Assign to bed
      </Link>
    </ActionButton>
  );
};

export default ManageBeds;
