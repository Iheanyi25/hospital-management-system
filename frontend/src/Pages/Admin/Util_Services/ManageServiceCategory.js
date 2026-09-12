import { observer } from "mobx-react";
import React, { useState, useContext, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  deleteServiceCategoryUrl,
  getAllServicesCategoryUrl,
} from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";
import { UserContext } from "../../../mobx/UserState";
import { notification } from "../../../utils/notification";

const ManageServiceCategory = observer(() => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const {
    user: { userType },
  } = useContext(UserContext);
  const getAllServicesCategory = getAllServicesCategoryUrl(pageNumber, pageSize);
  const getAllServicesCategoryConfig = fetchConfig({
    url: getAllServicesCategory,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getAllServicesCategoryConfig, {
    revalidateOnFocus: false,
  });

  const deleteMe = async (id) => {
    try {
      const deleteServiceCategory = deleteServiceCategoryUrl();
      const deleteServiceCategoryConfig = fetchConfig({
        url: deleteServiceCategory,
        data: { id },
        method: "post",
      });
      const res = await fetchWrapper(deleteServiceCategoryConfig);

      if (res.status === 200) {
        mutate();
        notification.success({ message: res.data.message });
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
    }
  };

  let dataTable = [];
  if (data) {
    dataTable = data.serviceCategories.map((serviceCategory, index) => {
      return {
        "#": ++index,
        Category: serviceCategory?.name,
        Description: serviceCategory?.description,
        Actions: (
          <ServiceCategoriesTableAction
            serviceCategory={serviceCategory}
            deleteMe={deleteMe}
            userType={userType}
          />
        ),
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
            <h4 className="page-title mb-0"> Manage Service Categories</h4>
            <NavLink
              className="btn btn-primary"
              to={
                userType === "Admin"
                  ? "/AdminServiceCategory"
                  : "/LabServiceCategory"
              }
            >
              Create Category
            </NavLink>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.serviceCategories.length : 0}
              heading="No of Service Categories"
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

const ServiceCategoriesTableAction = ({
  serviceCategory,
  deleteMe,
  userType,
}) => {
  return (
    <ActionButton>
      <Link
        title="Edit"
        to={{
          pathname:
            userType === "Admin"
              ? `/AdminEditServiceCategory/${serviceCategory.id}`
              : `/LabEditServiceCategory/${serviceCategory.id}`,
          state: serviceCategory,
        }}
        className="btn btn-sm btn-block text-primary"
      >
        <span className="btn-icon icofont-edit-alt mr-2" />
        Edit
      </Link>
      <Link
        title="Delete"
        onClick={() => deleteMe(serviceCategory.id)}
        className="btn btn-sm btn-block text-danger"
      >
        <span className="btn-icon icofont-delete-alt mr-2" />
        Delete
      </Link>
    </ActionButton>
  );
};

export default ManageServiceCategory;
