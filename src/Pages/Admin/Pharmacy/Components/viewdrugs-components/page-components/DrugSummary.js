import React, { Fragment } from "react";
import tablet from "../../../../../../assets/img/tablet.svg";
import liquid from "../../../../../../assets/img/liquid.svg";
import inhalers from "../../../../../../assets/img/inhalers.svg";
import powder from "../../../../../../assets/img/powder.svg";
import { getPharmacyDashboardUrl } from "../../../../../../api/URLs";
import { fetchConfig } from "../../../../../../api/fetchConfig";
import { useRequest } from "../../../../../../api/fetcher";

const DrugSummary = () => {
  const getPharmacyDashboard = getPharmacyDashboardUrl();
  const getPharmacyDashboardConfig = fetchConfig({
    url: getPharmacyDashboard,
    method: "get",
  });
  const { data } = useRequest(getPharmacyDashboardConfig, {
    revalidateOnFocus: false,
  });
  return (
    <Fragment>
      <div className="row">
        <div className="col col-12 col-md-6 col-xl-3">
          <div className="card animated fadeInUp delay-02s bg-light">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col col-4">
                  <img src={tablet} alt="tablet" />
                </div>
                <div className="col col-8">
                  <h6 className="mt-0 mb-1">Tablets (In packets)</h6>
                  <div className="count text-primary fs-20">
                    {data?.drugTabletCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-12 col-md-6 col-xl-3">
          <div className="card animated fadeInUp delay-03s bg-light">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col col-4">
                  <img src={liquid} alt="tablet" />
                </div>
                <div className="col col-8">
                  <h6 className="mt-0 mb-1">Liqud (In bottles)</h6>
                  <div className="count text-primary fs-20">
                    {data?.drugLiquidCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-12 col-md-12 col-xl-3">
          <div className="card animated fadeInUp delay-04s bg-light">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col col-4">
                  <img src={inhalers} alt="tablet" />
                </div>
                <div className="col col-8">
                  <h6 className="mt-0 mb-1 text-nowrap">
                    Inhalers (In canisters)
                  </h6>
                  <div className="count text-primary fs-20">
                    {data?.drugInhalerCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-12 col-md-12 col-xl-3">
          <div className="card animated fadeInUp delay-04s bg-light">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col col-4">
                  <img src={powder} alt="tablet" />
                </div>
                <div className="col col-8">
                  <h6 className="mt-0 mb-1 text-nowrap">Powder (In cans)</h6>
                  <div className="count text-primary fs-20">
                    {data?.drugPowderCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { DrugSummary };
