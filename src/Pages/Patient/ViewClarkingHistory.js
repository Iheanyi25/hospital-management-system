import { observer } from "mobx-react";
import React from "react";
import { ClarkingHistory } from "../../Components/Clarking";
import { UserContext } from "../../mobx/UserState";

class ViewClarkingHistory extends React.Component {
  static contextType = UserContext;
  state = {
    count: "0",
  };

  setCount = (count) => {
    console.log(count);
    this.setState({ count: count });
  };

  render() {
    const content = this.context;
    const { user } = content;
    const { firstName, lastName, id } = user;
    const { count } = this.state;
    return (
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content"></div>
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title">Clarking History</h4>
          </header>

          <div className="row">
            <div className="col col-12 col-md-6 col-xl-4">
              <div className="card animated fadeInUp delay-02s bg-light">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col col-5">
                      <div className="icon p-0 fs-48 text-primary opacity-50 icofont-patient-file"></div>
                    </div>
                    <div className="col col-7">
                      <h6 className="mt-0 mb-1">Clarking</h6>
                      <div className="count text-primary fs-20">
                        {count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-light w-75 m-auto">
            <ClarkingHistory
              patientDetails={{ firstName, lastName, id }}
              setCount={this.setCount}
              user
            />
          </div>
        </div>
      </main>
    );
  }
}

export default observer(ViewClarkingHistory);
