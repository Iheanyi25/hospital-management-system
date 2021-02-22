import { observer } from "mobx-react";
import React, { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import { deleteWardUrl, getAllWardsUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../..";
import ActionButton from "../../DataTable/ActionButton";
import TableSize from "../../DataTable/TableSize";
import { notification } from "../../../utils/notification";

const ManageWards = observer(() => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getAllWards = getAllWardsUrl(pageNumber, pageSize);
  const getAllWardsConfig = fetchConfig({ url: getAllWards, method: "get" });
  const { data, error, mutate } = useRequest(getAllWardsConfig, {
    revalidateOnFocus: false,
  });

  const deleteMe = async (id) => {
    try {
      const deleteWard = deleteWardUrl();
      const deleteWardConfig = fetchConfig({
        url: deleteWard,
        data: { id },
        method: "post",
      });
      const res = await fetchWrapper(deleteWardConfig);
      notification.success({ message: res.data.message });
      mutate();
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };

  let dataTable = [];
  if (data) {
    dataTable = data.wards.map((ward, index) => {
      return {
        "#": ++index,
        Name: ward?.name,
        Capacity: ward?.capacity,
        Description: ward?.description,
        Actions: <WardsTableAction ward={ward} deleteMe={deleteMe} />,
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
            <h4 className="page-title mb-0">Manage Wards</h4>
            <Link className="btn btn-primary" to="/AdminCreateWard">
              Create Ward
            </Link>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.wards.length : 0}
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

const WardsTableAction = ({ ward, deleteMe }) => {
  return (
    <ActionButton>
      <Link
        title="Pre-consultation"
        to={{
          pathname: "/AdminEditWard/" + ward.id,
          state: ward,
        }}
        className="btn btn-sm btn-block text-primary"
      >
        <span className="btn-icon icofont-edit-alt mr-2" />
        Edit
      </Link>
      <Link
        title="Pre-consultation"
        to="#"
        onClick={() => deleteMe(ward.id)}
        className="btn btn-sm btn-block text-danger"
      >
        <span className="btn-icon icofont-delete-alt mr-2" />
        Delete
      </Link>
    </ActionButton>
  );
};

export default ManageWards;
