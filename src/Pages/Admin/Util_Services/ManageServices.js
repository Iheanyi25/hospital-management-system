import { observer } from "mobx-react";
import React, { useState, useContext, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import { deleteServiceUrl, getAllServicesUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";
import { UserContext } from "../../../mobx/UserState";
import { notification } from "../../../utils/notification";

const ManageServices = observer(() => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    user: { userType },
  } = useContext(UserContext);
  const getAllServices = getAllServicesUrl(pageNumber);
  const getAllServicesConfig = fetchConfig({
    url: getAllServices,
    method: "get",
  });
  const { data, error } = useRequest(getAllServicesConfig, {
    revalidateOnFocus: false,
  });

  const deleteMe = async (id) => {
    try {
      console.log("ddd");
      const deleteService = deleteServiceUrl();
      const deleteServiceConfig = fetchConfig({
        url: deleteService,
        data: { id },
        method: "post",
      });
      const res = await fetchWrapper(deleteServiceConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
      } else if (res.status === 400) {
        notification.warning({ message: res.data.message });
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };

  let dataTable = [];
  if (data) {
    dataTable = data.services.map((service, index) => {
      return {
        "#": ++index,
        Services: service?.name,
        Cost: service?.cost,
        Actions: <ServicesTableAction service={service} deleteMe={deleteMe} userType={userType} />,
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
            <h4 className="page-title mb-0">Manage Services</h4>
            <NavLink
              className="btn btn-primary"
              to={
                userType === "Admin"
                  ? "/AdminCreateService"
                  : "/LabCreateService"
              }
            >
              Create Service
            </NavLink>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.services.length : 0}
              heading="No Of Services"
            />
          </div>
          <div className="page-content">
            {data && (
              <Table
                content={dataTable}
                paginationDetails={data.paginationDetails}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
              />
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
});

const ServicesTableAction = ({ service, deleteMe, userType }) => {
  return (
    <ActionButton>
      <Link
        title="Pre-consultation"
        to={{
          pathname:
            userType === "Admin"
              ? "/AdminEditService/" + service.id
              : "/LabEditService/" + service.id,
          state: service,
        }}
        className="btn btn-sm btn-block text-primary"
      >
        <span className="btn-icon icofont-edit-alt mr-2" />
        Edit
      </Link>
      <Link
        title="Pre-consultation"
        to="#"
        onClick={() => deleteMe(service.id)}
        className="btn btn-sm btn-block text-danger"
      >
        <span className="btn-icon icofont-delete-alt mr-2" />
        Delete
      </Link>
    </ActionButton>
  );
};

export default ManageServices;
