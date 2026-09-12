import React from "react";

export const NurseDashboardHeader = ({ firstName, lastName }) => {
  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <div className="card bg-light">
          <div className="card-header">Hello {`${firstName} ${lastName}`}</div>
          <div className="card-body">You have no new notifications</div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="card text-white bg-info">
          <div className="card-header">Important Updates</div>
          <div className="card-body">
            Yellow fever vaccinations are currently on going from 8am - 2pm
            everyday at our hospital, Get vaccinated today!
          </div>
        </div>
      </div>
    </div>
  );
};
