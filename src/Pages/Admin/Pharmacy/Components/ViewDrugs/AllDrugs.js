import React from "react";
import { NavLink } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

let $ = window.$;
$.DataTables = require("datatables.net");

class AllDrugs extends React.Component {
  state = {
    drugs: [],
  };
  componentDidMount() {
    this.fetchAllDrugs().then(() => this.sync());
  }

  fetchAllDrugs = async () => {
    try {
      let res = await fetch(`${apiUrl}/Pharmacy/GetAllDrugs`, {
        headers: { "Content-Type": "application/json-patch+json" },
        method: "GET",
        redirect: "follow",
      });
      const data = await res.text();
      console.log(JSON.parse(data));
      this.setState({ drugs: JSON.parse(data).drugs });
    } catch (error) {
      console.log(error);
    }
  };
  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
    console.log($(this.el));
  }

  render() {
    const { drugs } = this.state;
    return (
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
              <th>Title</th>
              <th>Generic Name</th>
              <th>Type</th>
              <th>Manufacturer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {drugs?.map((drug, index) => (
              <tr key={index}>
                <td>
                  <div className="text-muted text-nowrap">{index + 1}</div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">{drug?.name ?? "N/A"}</div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">{drug?.title ?? "N/A"}</div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">{drug?.genericName ?? "N/A"}</div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">{drug?.drugType ?? "N/A"}</div>
                </td>
                <td>
                  <div className="text-muted text-nowrap">{drug?.manufacturer ?? "N/A"}</div>
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
                          pathname: `/AdminPaymentForService/`,
                        }}
                        className="btn btn-sm btn-block"
                      >
                        <span className="btn-icon icofont-stethoscope-alt mr-2" />
                        Pay for Services
                      </NavLink>
                    </div>
                  </div>
                </td>
              </tr>
            )) ?? "N/A"}
          </tbody>
        </table>
      </div>
    );
  }
}

export { AllDrugs };
