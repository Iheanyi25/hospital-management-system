import React from "react";
import { NavLink } from "react-router-dom";
import { UpdateInventory } from "../../../../../Components/Modals";
import formatAmount from "../../../../../utils/formatAmount";
import remove from "../../../../../assets/img/remove.svg";
import view from "../../../../../assets/img/view.svg";
import inventory from "../../../../../assets/img/inventory.svg";
import { fetchWrapper } from "../../../../../api/fetcher";
import { fetchConfig } from "../../../../../api/fetchConfig";
import { deleteDrugUrl } from "../../../../../api/URLs";
import { UserContext } from "../../../../../mobx/UserState";

let $ = window.$;
$.DataTables = require("datatables.net");

class AllDrugs extends React.Component {
  static contextType = UserContext;
  state = {
    allDrugs: [],
    singleDrug: {},
  };

  componentDidMount() {
    this.fetchAllDrugs().then(() => this.sync());
  }

  fetchAllDrugs = async () => {
    this.setState({ allDrugs: this.props.allDrugs });
  };

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  deleteDrug = async (id) => {
    const { setSuccess } = this.props;
    try {
      const deleteDrugs = deleteDrugUrl();
      const deleteDrugsConfig = fetchConfig({
        url: deleteDrugs,
        data: { id: id },
        method: "delete",
      });
      const res = await fetchWrapper(deleteDrugsConfig);

      if (res.status === 200) {
        setSuccess(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      user: { userType },
    } = this.context;
    const { allDrugs, singleDrug } = this.state;
    return allDrugs.length === 0 ? (
      <div className="d-flex justify-content-center my-4">
        <img
          src={require("../../../../../assets/img/emptyData.svg")}
          alt="empty states"
        />
      </div>
    ) : (
      <div className="table-responsive">
        <table
          ref={(el) => (this.el = el)}
          className="table table-striped"
          data-paging="true"
          data-info="true"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Drug Name</th>
              <th>Generic Name</th>
              <th>Type</th>
              <th>Manufacturer</th>
              <th>Quantity in stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allDrugs?.map((drug, index) => (
              <tr key={index}>
                <td>
                  <div className="text-muted text-nowrap">{index + 1}</div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">
                    {drug?.name ?? "N/A"}{" "}
                    <sub className="text-primary">{drug?.measurment}</sub>
                  </div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">
                    {drug?.genericName ?? "N/A"}
                  </div>
                </td>
                <td>
                  <div
                    className="text-muted text-nowrap"
                    style={{ textTransform: "capitalize" }}
                  >
                    {drug?.drugType ?? "N/A"}
                  </div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">
                    {drug?.manufacturer ?? "N/A"}
                  </div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">
                    {formatAmount(drug?.quantityInStock) ?? "N/A"}
                  </div>
                </td>
                <td>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm btn-block dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Action
                    </button>
                    <div className="dropdown-menu">
                      <NavLink
                        to={{
                          pathname:
                            userType === "Admin"
                              ? `/AdminViewDrug/${drug.id}`
                              : `/PharmacyViewDrug/${drug.id}`,
                          state: drug?.drugType,
                        }}
                        className="btn btn-sm btn-block"
                      >
                        <img src={view} alt="view" className="mr-2" />
                        View drug
                      </NavLink>
                      <NavLink
                        to="#"
                        data-toggle="modal"
                        data-target="#update-inventory"
                        className="btn btn-sm btn-block"
                        onClick={() => {
                          this.setState({ singleDrug: drug });
                        }}
                      >
                        <img src={inventory} alt="inventory" className="mr-2" />
                        Update inventory
                      </NavLink>
                      <NavLink
                        to="#"
                        className="btn btn-sm btn-block"
                        onClick={() => this.deleteDrug(drug.id)}
                      >
                        <img src={remove} alt="delete" className="mr-2" />
                        Delete
                      </NavLink>
                    </div>
                  </div>
                </td>
              </tr>
            )) ?? "N/A"}
          </tbody>
        </table>
        <UpdateInventory drug={singleDrug} setSuccess={this.props.setSuccess} />
      </div>
    );
  }
}

export { AllDrugs };
