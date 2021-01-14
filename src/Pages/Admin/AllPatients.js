import React from "react";
import { NavLink } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getPatientsUrl } from "../../api/URLs";
import { PageLoader, Table } from "../../Components";
import TableSize from "../../Components/DataTable/TableSize";
import PatientAndAdminImage from '../../assets/img/PatientAndAdminIcon.svg';

const $ = window.$;
$.Datatable = require("datatables.net");
const imageDefaulturl = "https://webmeup.com/upload/blog/lead-image-105.png";
class AllPatients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: []
    };
  }

  async getAllPatients() {
    try {
      const getPatients = getPatientsUrl()
      const getPatientsConfig = fetchConfig({ url: getPatients, method: 'get' })
      const { data } = await fetchWrapper(getPatientsConfig)

      this.setState({ patients: data.patients.map((x) => x.patient) });
    } catch (error) {
      console.log(error)
    }

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
        Photo: (
          <img
            src={PatientAndAdminImage}
            alt=""
            width={40}
            height={40}
            className="rounded-500"
          />
        ),
        Name: `${x.firstName} ${x.lastName}`,
        Email: <a href={"mailto:" + x.email}>{x.email}</a>,
        Phone: x.phoneNumber || "Not available",
        // "Date Of Birth": "10 Feb 2018",
        // "Address": "9:15 - 9:45",
        Actions: this.generateTableFunctions(x),
      };
    });
  };

  generateTableFunctions = (x) => {
    return (
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
        <div className="dropdown-menu text-left">
          <NavLink
            to={{
              pathname: `/AdminUpdatePatientProfile/${x.id}`,
              state: x,
            }}
            className="btn btn-sm btn-block"
          >
            <span className="btn-icon icofont-ui-edit  mr-2" /> Update Profile
          </NavLink>
          <NavLink
            to={{
              pathname: `/AdminPatientProfile/${x.id}`,
              state: x,
            }}
            className="btn btn-sm btn-block"
          >
            <span className="btn-icon icon sli-user mr-2" /> View Profile
          </NavLink>
          <NavLink
            to={{
              pathname: `/AdminPreConsultation/${x.id}`,
              state: x,
            }}
            className="btn btn-sm btn-block"
          >
            <span className="btn-icon icofont-stethoscope-alt mr-2" />
            Go for Pre-Consultation
          </NavLink>
          <NavLink
            to={{
              pathname: `/AdminViewPreConsultationHistory/${x.id}`,
              state: x,
            }}
            className="btn btn-sm btn-block"
          >
            <span className="btn-icon icofont-stethoscope-alt mr-2" />
            Pre-Consultation History
          </NavLink>
          <NavLink
            to={{
              pathname: `/AdminViewClarkingHistory/${x.id}`,
              state: x,
            }}
            className="btn btn-sm btn-block"
          >
            <span className="btn-icon icofont-stethoscope-alt mr-2" />
            Clarking History
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
        </div>
      </div>
    );
  };

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
              <TableSize size={this.state.patients.length} heading="Patients" />
              {/* <div className="card-body"></div> */}
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
                        {this.state.patients.length > 0 && (
                          <Table content={this.formatDataForTable()} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default AllPatients;
