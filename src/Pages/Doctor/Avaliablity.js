import React from "react";
import {  PageLoader } from "../../Components";

class DoctorAvaliablity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      doctorId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      avaliablity: "",
    };
  }

  async componentDidMount() {

    const { apiUrl } = this.state;
    const response = await fetch(
      `${apiUrl}/Doctor/GetDoctor?id=${this.state.doctorId}`
    );

    const data = response.json();
    this.setState({
      doctor: data.doctorProfile,
    });


  }

  handleChange(name, e) {
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
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
              <h3 className="page-title">My Avaliablity</h3>
            </header>
            <div className="page-content">
              <div className="row justify-content-center">

                <div className="col col-md-8">
                  <div className="card border-light">
                    <div className="card-body">
                      <form className="mb-4">
                        <h4>Configure Abaliablity</h4>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Are you avalibale for consultation? </label>
                              <div className="form-group">
                                <div className="custom-control custom-radio mb-3">
                                  <input type="radio" className="custom-control-input" name="avaliable" id="avaliable" />
                                  <label className="custom-control-label" for="avaliable">Yes I am avaliable for consultation</label>
                                </div>
                                <div className="custom-control custom-radio mb-3">
                                  <input type="radio" className="custom-control-input" name="avaliable" id="not_avaliable" />
                                  <label className="custom-control-label" for="not_avaliable">No, I am not avaliable for consultation</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Special Office Hours</label>
                              <textarea
                                className="form-control"
                                placeholder="Write you special office hours for people who want special appointments with you"
                                rows={4}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
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

export default DoctorAvaliablity;
