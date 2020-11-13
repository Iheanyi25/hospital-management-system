import React from "react";
import { NavLink } from "react-router-dom";
import { PageLoader, Table } from "../../Components";

const $ = require("jquery");
$.Datatable = require("datatables.net");
const imageDefaulturl = "https://webmeup.com/upload/blog/lead-image-105.png"
class AllPatients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: [],
      apiUrl: process.env.REACT_APP_API_URL,
    };
  }

  async getAllPatients() {
    const { apiUrl } = this.state;
    const response = await fetch(`${apiUrl}/Patient/GetPatients`);
    const data = await response.json();
    this.setState({ patients: data.patients.map(x => x.patient) });
  }

  componentDidMount() {
    this.getAllPatients().then(() => this.sync());
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  formatDataForTable = () => {
    return this.state.patients.map((x, index) => {
      return {
        "#": ++index,
        "Photo": <img
          src={imageDefaulturl}
          alt=""
          width={40}
          height={40}
          className="rounded-500"
        />,
        "Name": `${x.firstName} ${x.lastName}`,
        "Email": <a href={"mailto:" + x.email}>{x.email}</a>,
        "Phone": x.phoneNumber,
        // "Date Of Birth": "10 Feb 2018",
        // "Address": "9:15 - 9:45",
        "Actions": this.generateTableFunctions(x)
      }
    })
  }

  generateTableFunctions = (x) => {
    return <div className="btn-group">
      <button
        type="button"
        className="btn btn-primary btn-sm btn-block dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Action
    </button>
      <div className="dropdown-menu text-left">
        <NavLink
          to={{
            pathname: `/AdminPreConsultation/${x.id}`,
            state: x
          }}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-stethoscope-alt mr-2" />
        Go for Pre-Consultation
      </NavLink>
        {/* <NavLink
          to={{
            pathname: `/AdminPreConsultation/${x.id}`,
            state: x
          }}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-stethoscope-alt mr-2" />
        Pre-Consultation History
      </NavLink> */}
        <NavLink
          to={{
            pathname: `/AdminUpdatePatientProfile/${x.id}`,
            state: x
          }}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-ui-edit  mr-2" />{" "}
        Update Profile
      </NavLink>
      </div>
    </div>

  }

  render() {
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header">
              <h4 className="page-title">Our Patients</h4>
            </header>

            <div className="page-content">
              <div className="card-body"></div>
            </div>
            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
                  <div>
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-active"
                        role="tabpanel"
                        aria-labelledby="pills-active-tab"
                      >
                        {
                          this.state.patients.length > 0 &&
                          <Table
                            content={this.formatDataForTable()}
                          />
                        }

                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="add-action-box">
                <button
                  className="btn btn-primary btn-lg btn-square rounded-pill"
                  data-toggle="modal"
                  data-target="#add-appointment"
                >
                  <span className="btn-icon icofont-stethoscope-alt" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default AllPatients;
