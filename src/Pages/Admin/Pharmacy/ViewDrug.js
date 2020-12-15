import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../../Components";
import { getDrugUrl } from "../../../api/URLs";
import { UpdateInventory } from "../../.././Components/Modals";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { BasePrice, DrugDetails, HealthPlanPrice } from "./Components/ViewDrug";

const ViewDrug = ({ match }) => {
  const { id } = match.params;
  const drugUrl = getDrugUrl(id);
  const getDrugConfig = fetchConfig({
    url: drugUrl,
    method: "get",
  });

  const { data, error, mutate } = useRequest(getDrugConfig, {
    revalidateOnFocus: false,
  });
  const drug = data?.drug;
  console.log(drug);

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
                  className="nav nav-tabs mb-3"
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
                    <DrugDetails drug={drug} update={mutate} />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-base"
                    role="tabpanel"
                    aria-labelledby="pills-base-tab"
                  >
                    <BasePrice
                      basePrice={{
                        defaultPricePerUnit: drug.defaultPricePerUnit,
                        defaultPricePerContainer: drug.defaultPricePerContainer,
                        defaultPricePerCarton: drug.defaultPricePerCarton,
                      }}
                      drugId={id}
                      mutate={mutate}
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-health"
                    role="tabpanel"
                    aria-labelledby="pills-health-tab"
                  >
                    <HealthPlanPrice drugId={id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <UpdateInventory drug={drug} setSuccess={mutate} />
        </main>
      )}
    </>
  );
};

export default ViewDrug;
