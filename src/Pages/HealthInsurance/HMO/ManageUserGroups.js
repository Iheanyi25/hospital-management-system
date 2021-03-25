import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getHMOUserGroupsUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";
import { UserContext } from "../../../mobx/UserState";

const ManageUserGroups = observer(() => {
  const { hmoId } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getHMOUserGroups = getHMOUserGroupsUrl(hmoId, pageNumber, pageSize);
  const getHMOUserGroupsConfig = fetchConfig({
    url: getHMOUserGroups,
    method: "get",
  });
  const { data, error } = useRequest(getHMOUserGroupsConfig, {
    revalidateOnFocus: false,
  });
  let dataTable = [];
  if (data) {
    dataTable = data.hmoUserGroups.map(({ name, id }, index) => {
      return {
        "#": ++index,
        "User Group": name,
        Description: "Remember to map through them",
        Actions: <ActionTable userGroupName={name} id={id} />,
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
            <h4 className="page-title mb-0">Manage User Groups</h4>
            <div>
              <div className="col"></div>
              <div className="col text-right">
                <Link
                  to="/CreateUserGroup"
                  className="btn btn-outline-primary mr-2 mb-2"
                >
                  Create User group
                </Link>
              </div>
            </div>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.hmoUserGroups.length : 0}
              heading="Total User Groups"
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
});
const ActionTable = ({ userGroupName, id }) => {
  return (
    <ActionButton>
      <Link
        to={{ pathname: `/ManageUserSubGroups/${id}`, state: userGroupName }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage Sub Groups
      </Link>
      <Link
        // to={`/LabManageAdmissionServiceRequest/${admissionId}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Edit
      </Link>
      {/* <Link
        // to={`/LabManageAdmissionServiceRequest/${admissionId}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Delete
      </Link> */}
    </ActionButton>
  );
};

export default ManageUserGroups;
