import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="app-footer">
        <div className="footer-wrap">
          <div className="row h-100 align-items-center">
            <div className="col-12 col-md-6 d-none d-md-block">
              <ul className="page-breadcrumbs">
                <li className="item">
                  <NavLink to="#" className="link">
                    Dashboards
                    </NavLink>{" "}
                  <i className="separator icofont-thin-right" />
                </li>
                <li className="item">
                  <NavLink to="#" className="link">
                    Default
                    </NavLink>{" "}
                  <i className="separator icofont-thin-right" />
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-6 text-right">
              <div className="d-flex align-items-center justify-content-center justify-content-md-end">
                <span>Version 1.0.0</span>{" "}
                <button
                  className="no-style ml-2 settings-btn"
                  data-toggle="modal"
                  data-target="#settings"
                >
                  <span className="icon icofont-ui-settings text-primary" />
                </button>
              </div>
            </div>
          </div>
          <div className="footer-skeleton">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 d-none d-md-block">
                <ul className="page-breadcrumbs">
                  <li className="item bg-1 animated-bg" />
                  <li className="item bg animated-bg" />
                </ul>
              </div>
              <div className="col-12 col-md-6">
                <div className="info justify-content-center justify-content-md-end">
                  <div className="version bg animated-bg" />
                  <div className="settings animated-bg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export { Footer };