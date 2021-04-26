import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../../api/fetchConfig";
import { useRequest } from "../../../../api/fetcher";
import { getAntenatalsUrl } from "../../../../api/URLs";
import { PageLoader, Table } from "../../../../Components";
import ActionButton from "../../../../Components/DataTable/ActionButton";
import TableSize from "../../../../Components/DataTable/TableSize";

const ManageAnteNatal = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getAntenatals = getAntenatalsUrl(pageNumber, pageSize);
  const getAntenatalsConfig = fetchConfig({
    url: getAntenatals,
    method: "get",
  });
  const { data, error } = useRequest(getAntenatalsConfig, {
    revalidateOnFocus: false,
  });
  let dataTable = [];
  if (data) {
    dataTable = data?.antenatals.map(({ firstName, lastName, id }, index) => {
      return {
        "#": ++index,
        Name: `${firstName} ${lastName}` ?? "N/A",
        Action: <ActionTable id={id} />,
      };
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
            <h4 className="page-title mb-0">Manage Antenatals</h4>
            <Link
              className="btn btn-primary"
              to="/AdminRegisterAnteNatal"
            >
              Register an Antenatal
            </Link>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data?.antenatals.length : 0}
              heading="Number of Antenatals"
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
    </Fragment>
  );
};

const ActionTable = ({ id }) => {
  return (
    <ActionButton>
      <Link
        to={`/AdminViewAntenatalRecords/${id}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        View Records
      </Link>
    </ActionButton>
  );
};

export default ManageAnteNatal;
