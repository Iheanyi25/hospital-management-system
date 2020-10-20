import React from "react";


class SearchPatient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
    };
  }



  render() {
    

    return (
      <>
        <div
          className="modal fade"
          id="add-patient"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Search a Patient</h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <input
                      id="date"
                      name="date"
                      className="form-control"
                      type="text"
                      placeholder="Date"
                      
                    />
                  </div>
                  

                  <div className="modal-footer d-block">
                    <div className="actions justify-content-between">
                      <button
                        type="button"
                        className="btn btn-error"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>{" "}
                      <button type="submit" className="btn btn-info">
                        Fetch Patient
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* end Add Drug modal */}
      </>
    );
  }
}

export default SearchPatient;
