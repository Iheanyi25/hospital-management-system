import React from "react";
import { NavLink } from "react-router-dom";
import { UpdateInventory } from "../../../../../Components/Modals";
import remove from "../../../../../assets/img/remove.svg";
import update from "../../../../../assets/img/update.svg";
import view from "../../../../../assets/img/view.svg";
import inventory from "../../../../../assets/img/inventory.svg";

const apiUrl = process.env.REACT_APP_API_URL;

let $ = window.$;
$.DataTables = require("datatables.net");

class AllDrugs extends React.Component {
  state = {
    user: JSON.parse(localStorage.getItem("authenticatedUser")),

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
    console.log($(this.el));
  }

  deleteDrug = async (id) => {
    const { setSuccess } = this.props;
    try {
      let res = await fetch(`${apiUrl}/Pharmacy/DeleteDrug`, {
        headers: { "Content-Type": "application/json-patch+json" },
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        redirect: "follow",
      });
      if (res.status === 200) {
        setSuccess(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { allDrugs, singleDrug, user } = this.state;
    console.log(allDrugs, "hello");
    return allDrugs.length === 0 ? (
      <h4 className="text-center">Not Available!</h4>
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
                    {drug?.name ?? "N/A"} <sub>500ml</sub>
                  </div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">
                    {drug?.genericName ?? "N/A"}
                  </div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">
                    {drug?.drugType ?? "N/A"}
                  </div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">
                    {drug?.manufacturer ?? "N/A"}
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
                        to={user.uerType === "Admin" ? `/AdminViewDrug/${drug.id}`:`/PharmacyViewDrug/${drug.id}`}
                        className="btn btn-sm btn-block"
                      >
                        <img src={view} alt="view" className="mr-2" />
                        View drug
                      </NavLink>
                      {/* <NavLink
                        to="#"
                        data-toggle="modal"
                        data-target="#update-drug"
                        className="btn btn-sm btn-block"
                        onClick={() =>
                          this.setState({
                            singleDrug: drug,
                          })
                        }
                      >
                        <img src={update} alt="delete" className="mr-2" />
                        Update drug
                      </NavLink> */}

                      <NavLink
                        to="#"
                        data-toggle="modal"
                        data-target="#update-inventory"
                        className="btn btn-sm btn-block"
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
        <UpdateInventory drug={singleDrug} />
        {/* <UpdateDrug drug={singleDrug} /> */}
      </div>
    );
  }
}

export { AllDrugs };
