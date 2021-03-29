import React, { useState } from "react";
import { Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getHMOSubUserGroupsUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";

const ManageUserSubGroups = () => {
  const {
    location: { state: userGroupName },
  } = useHistory();
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getHMOUserGroups = getHMOSubUserGroupsUrl(id, pageNumber, pageSize);
  const getHMOUserGroupsConfig = fetchConfig({
    url: getHMOUserGroups,
    method: "get",
  });
  const { data, error } = useRequest(getHMOUserGroupsConfig, {
    revalidateOnFocus: false,
  });
  const deleteSubGroup = async (id) => {
    // try {
    //   const deleteHMODrugPriceFromHMOHealthPlan = deleteHMODrugPriceFromHMOHealthPlanUrl();
    //   const deleteHMODrugPriceFromHMOHealthPlanConfig = fetchConfig({
    //     url: deleteHMODrugPriceFromHMOHealthPlan,
    //     data: { id },
    //     method: "delete",
    //   });
    //   const res = await fetchWrapper(deleteHMODrugPriceFromHMOHealthPlanConfig);
    //   if (res.status === 200) {
    //     notification.success({ message: res.data.message });
    //     mutate();
    //   }
    // } catch (error) {
    //   notification.error({ message: error?.response?.data.message });
    // }
  };
  let dataTable = [];
  if (data) {
    dataTable = data.hmoSubUserGroups.map(
      ({ name, description, id, hmoUserGroupId }, index) => {
        return {
          "#": ++index,
          "Sub Groups": name,
          Description: description,
          "Health Plan": "Not Available",
          Actions: (
            <ActionTable
              subGroupDetails={{ name, description, id, hmoUserGroupId }}
              deleteSubGroup={deleteSubGroup}
            />
          ),
        };
      }
    );
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
          <header className="page-header justify-content-between d-sflex align-items-center mb-2">
            <h4 className="page-title mb-0">
              {`Manage User Sub Group in ${userGroupName || ""}`}
            </h4>
            <div>
              <div className="col"></div>
              <div className="col text-right">
                <Link
                  to={{
                    pathname: `/CreateUserSubGroup/${id}`,
                    state: userGroupName,
                  }}
                  className="btn btn-outline-primary mr-2 mb-2"
                >
                  Create Sub Group
                </Link>
              </div>
            </div>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.hmoSubUserGroups.length : 0}
              heading="Total Sub Groups"
            />
          </div>
          <div className="page-content">
            {data && (
              <Table
                content={dataTable}
                tableID={"hmoSubUserGroups" + data.hmoSubUserGroups.length}
                key={"hmoSubUserGroups" + data.hmoSubUserGroups.length}
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
const ActionTable = ({ subGroupDetails }) => {
  const { name, id } = subGroupDetails;
  return (
    <ActionButton>
      <Link
        to={{ pathname: `/EditUserSubGroup/${id}`, state: subGroupDetails }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Update
      </Link>
      <Link to={`/AddUserGroupToPlan`} className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Assign to health plan
      </Link>
      <Link
        to={{
          pathname: `/ManagePatientsInSubGroup/${id}`,
          state: name,
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage Patients
      </Link>
      {/* <button
        onClick={() => deleteSubGroup(id)}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Delete
      </button> */}
    </ActionButton>
  );
};

export default ManageUserSubGroups;
