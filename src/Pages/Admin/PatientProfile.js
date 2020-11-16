import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";
import user from "../../assets/img/user.png";
import reset from "../../assets/img/reset.svg";
import email from "../../assets/img/email.svg";
import phone from "../../assets/img/phone.svg";
import edit from "../../assets/img/edit.svg";
import add from "../../assets/img/add.svg";

class PatientProfile extends React.Component {
  render() {
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="page-content">
              <header className="page-header">
                <h3 className="page-title">Dr. Emene’s profile</h3>
              </header>
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body d-flex justify-content-between">
                    <div className="d-flex justify-content-between">
                      <img
                        src={user}
                        style={{ height: "100px", width: "100px" }}
                        className="mr-3"
                        alt="user"
                      />
                      <div>
                        <h6 className="mb-2 mt-2 font-weight-bold">
                          Thor Odinson
                        </h6>
                        <p className="mb-2">Engineer</p>
                        <Link to="/">
                          <img src={reset} alt="reset" className="mr-2" />
                          Reset Password
                        </Link>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="d-flex mb-3 mt-2">
                        <img src={email} alt="reset" className="mr-2 mb-2" />
                        <p>emene_v@gmail.com</p>
                      </div>
                      <div className="d-flex pl-1">
                        <img src={phone} alt="reset" className="mr-3 mb-2" />
                        <p>0909 5667 678</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mx-0">
                <div className="col col-md-7">
                  <div className="card border-light p-4">
                    <div className="card-body">
                      <div className="d-flex justify-content-between border-bottom">
                        <h6 className="card-title mt-0 font-weight-bold">
                          Health details
                        </h6>
                        <img src={edit} alt="reset" className="mr-3 mb-2" />
                      </div>
                      <div className="basic-info d-flex justify-content-between mt-4">
                        <div>
                          <p className="font-weight-bold">Blood group</p>
                          <p>o+</p>
                        </div>
                        <div>
                          <p className="font-weight-bold">Genotype</p>
                          <p>o+</p>
                        </div>
                        <div>
                          <p className="font-weight-bold">Gender</p>
                          <p>o+</p>
                        </div>
                        <div>
                          <p className="font-weight-bold">Diabetic</p>
                          <p>o+</p>
                        </div>
                      </div>
                      <div className="allergies mt-4">
                        <h6 className="mb-1">Allergies</h6>
                        <p>
                          Grass and tree pollen dust mites. Animal dander, tiny
                          flakes of skin or hair. insect bites and stings.
                          medicines – including ibuprofen, aspirin and certain
                          antibiotic
                        </p>
                      </div>
                      <div className="Disabilities mt-4">
                        <h6 className="mb-1">Disabilities</h6>
                        <p>Fractured arm, Myopia</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-md-5">
                  <div className="card border-light p-4">
                    <div className="card-body">
                      <div className="d-flex justify-content-between border-bottom mb-4">
                        <h6 className="card-title mt-0 font-weight-bold">
                          Contact Information
                          <img src={add} alt="reset" className="ml-3" />
                        </h6>
                        <img src={edit} alt="reset" className="mr-3 mb-2" />
                      </div>
                      <div className="contact-info">
                        <div className='mb-4'>
                          <p className='font-weight-bold mb-2'>Mobile</p>
                          <p>0909 5667 678</p>
                        </div>
                        <div className='mb-4'>
                          <p className='font-weight-bold mb-2'>Email</p>
                          <p>emene_v@gmail.com</p>
                        </div>
                        <div className='mb-4'>
                          <p className='font-weight-bold mb-2'>Address</p>
                          <p>8502 Preston Rd. Inglewood, Maine 98380</p>
                        </div>
                        <div className='mb-4'>
                          <p className='font-weight-bold mb-2'>State of origin</p>
                          <p>Lagos state</p>
                        </div>
                        <div className='mb-4'>
                          <p className='font-weight-bold mb-2'>Country</p>
                          <p>Nigeria</p>
                        </div>
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

export default PatientProfile;
