import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../../Components";
import { getDrugUrl } from "../../../api/URLs";
import { UpdateInventory, UpdateDrug } from "../../.././Components/Modals";
import edit from "../../../assets/img/edit.svg";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";

const apiUrl = process.env.REACT_APP_API_URL;
const ViewDrug = ({ match }) => {
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //  fetchDrug()
  // }, [])

  const { id } = match.params;
  const drugUrl = getDrugUrl(id);
  console.log(drugUrl);
  const getDrugConfig = fetchConfig({
    url: drugUrl,
    method: "get",
  });

  const { data, error, mutate } = useRequest(getDrugConfig, {
    revalidateOnFocus: false,
  });
  const drug = data?.drug
  console.log(drug);

  // const fetchDrug = async () => {
  //   const { id } = match.params;
  //   try {
  //     let res = await fetch(`${apiUrl}/Pharmacy/GetDrug/${id}`, {
  //       headers: { "Content-Type": "application/json-patch+json" },
  //       method: "GET",
  //       redirect: "follow",
  //     });
  //     const data = await res.text();
  //     console.log(JSON.parse(data));
  //     setDrug(JSON.parse(data).drug)
  //     // this.setState({ drug: JSON.parse(data).drug, loading: false });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      {!data ? (
        <PageLoader />
      ) : (
        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="d-flex justify-content-between align-items-center mb-5">
              <h4 className="page-title">Drug details</h4>
              <Link
                data-toggle="modal"
                data-target="#update-inventory"
                className="btn btn-primary"
              >
                Update inventory
              </Link>
            </header>
            <div className="col col-md-12">
              <div>
                <ul
                  className="nav nav-pills nav-fill mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active show"
                      id="pills-drug-tab"
                      data-toggle="pill"
                      href="#pills-drug"
                      role="tab"
                      aria-controls="pills-drug"
                      aria-selected="false"
                    >
                      Drug details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="pills-base-tab"
                      data-toggle="pill"
                      href="#pills-base"
                      role="tab"
                      aria-controls="pills-base"
                      aria-selected="false"
                    >
                      Base price
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="pills-health-tab"
                      data-toggle="pill"
                      href="#pills-health"
                      role="tab"
                      aria-controls="pills-health"
                      aria-selected="false"
                    >
                      Health plan price
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane show fade active"
                    id="pills-drug"
                    role="tabpanel"
                    aria-labelledby="pills-drug-tab"
                  >
                    <div className="card border-light p-4 w-75 m-auto">
                      <div className="card-body">
                        <div className="d-flex justify-content-between border-bottom">
                          <h6 className="font-weight-bold">{drug.name}</h6>
                          <div className="d-flex">
                            <p className="mt-4">
                              <span className="font-weight-bold text-info">
                                {drug.quantityInStock}{" "}
                              </span>
                              <span className="text-secondary">
                                {drug.drugType === "tabs"
                                  ? "tablets in stock"
                                  : drug.drugType === "liquid"
                                  ? "bottles in stock"
                                  : drug.drugType === "powder"
                                  ? "caans in stock"
                                  : "cannisters in stock"}
                              </span>
                            </p>
                            <img
                              src={edit}
                              data-toggle="modal"
                              data-target="#update-drug"
                              alt="reset"
                              className="ml-3"
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <div>
                              <h6 className="mb-2">Drug Name</h6>
                              <p>{drug.name}</p>
                            </div>
                            <div>
                              <h6 className="mb-2">Generic Name</h6>
                              <p>{drug.genericName}</p>
                            </div>
                            <div>
                              <h6 className="mb-2">Manufacturer</h6>
                              <p>{drug.manufacturer}</p>
                            </div>
                            <div>
                              <h6 className="mb-2">Drug Type</h6>
                              <p>{drug.drugType}</p>
                            </div>
                            <div>
                              <h6 className="mb-2">Measurement</h6>
                              <p>{drug.measurment}</p>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div>
                              <h6 className="mb-2">Cost Price</h6>
                              <p>{drug.costPricePerContainer}</p>
                            </div>
                            <div>
                              <h6 className="mb-2">
                                Number of pills in a packet/container
                              </h6>
                              <p>{drug.manufacturer}</p>
                            </div>
                            <div>
                              <h6 className="mb-2">
                                Number of packets in a carton
                              </h6>
                              <p>{drug.containersPerCarton}</p>
                            </div>
                            <div>
                              <h6 className="mb-2">
                                Price per parcket/container (NGN)
                              </h6>
                              <p>{drug.quantityPerContainer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-base"
                    role="tabpanel"
                    aria-labelledby="pills-base-tab"
                  >
                    <div className="card border-light p-4 w-50 m-auto">
                      <div className="card-body">
                        <div className="d-flex justify-content-between border-bottom">
                          <h6 className="font-weight-bold">Base Price</h6>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <div>
                              <h6 className="mb-2">Price Per Pack (NGN)</h6>
                              <p>5,000</p>
                            </div>
                            <div>
                              <h6 className="mb-2">DPrice Per Pill (NGN)</h6>
                              <p>500</p>
                            </div>
                            <div>
                              <h6 className="mb-2">Price Per Carton (NGN)</h6>
                              <p>50,000</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-health"
                    role="tabpanel"
                    aria-labelledby="pills-health-tab"
                  >
                    <div className="card border-light p-4 w-50 m-auto">
                      <div className="card-body">
                        <div className="d-flex justify-content-between border-bottom">
                          <h6 className="font-weight-bold">
                            Price for the family health plan
                          </h6>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <div>
                              <h6 className="mb-2">Price Per Pack (NGN)</h6>
                              <p>5,000</p>
                            </div>
                            <div>
                              <h6 className="mb-2">DPrice Per Pill (NGN)</h6>
                              <p>500</p>
                            </div>
                            <div>
                              <h6 className="mb-2">Price Per Carton (NGN)</h6>
                              <p>50,000</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <UpdateInventory drug={drug} setSuccess={mutate} />
          <UpdateDrug drug={drug} id={drug.id} setSuccess={mutate} />
        </main>
      )}
    </>
  );
};

export default ViewDrug;
