import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllDrugsUrl } from '../../../api/URLs'
import { fetchConfig } from '../../../api/fetchConfig'
import user from "../../../assets/img/user.png";
import { SelectableDropDown } from "../../../Components";
import { useRequest } from "../../../api/fetcher";

const DrugPrescription = () => {
  
    const getDrugsUrl = getAllDrugsUrl();
    const getDrugConfig = fetchConfig({
      url: getDrugsUrl,
      method: "get",
    });
   const { data, error, mutate} = useRequest(getDrugConfig, { revalidateOnFocus : false})
    console.log(data);
  return (
    <>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header">
            <h3>Prescription</h3>
          </header>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="card bg-light">
                      <div className="card-body p-5 m-auto">
                        <h5 className="text-center">Prescription</h5>
                        <div className="d-flex">
                          <img
                            src={user}
                            style={{
                              height: "32px",
                              width: "32px",
                              borderRadius: "50%",
                            }}
                            alt="user"
                          />
                          <h6 className="mt-2 ml-2">[Patient’s name]</h6>
                        </div>
                        <p className="mb-0">Athesunate</p>
                        <p className="mb-0">Athesunate 500mg x2</p>
                        <p className="mb-0">3 wolf moon officia aute</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <p>Search & select drug(s)</p>
                    {/* <SelectableDropDown
                      data={this.state.doctors}
                      itemKey={["id"]}
                      valueKeys={["firstName", "lastName"]}
                      label={"Doctors"}
                      onChange={this.handleChange}
                      stateKey={"doctorId"}
                      search={true}
                    /> */}
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr className="">
                            <th>#</th>
                            <th>Drug name</th>
                            <th>Qty</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <strong>1</strong>
                            </td>
                            <td>
                              <strong>
                                <div className="d-flex align-items-center nowrap">
                                  hyyhhyyh
                                </div>
                              </strong>
                            </td>
                            <td>hyhyhy</td>
                            <td>
                              <div className="d-flex align-items-center nowrap">
                                <Link
                                  title="Delete"
                                  to="#"
                                  // onClick={() => this.deleteService(index)}
                                  className="text-danger mr-4"
                                >
                                  <span className="btn-icon icofont-delete-alt" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="4">
                              <p className="w-50 text-secondary">
                                Search and select the drugs prescribed to the
                                patient
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
};

export default DrugPrescription;
