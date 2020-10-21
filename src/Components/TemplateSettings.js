import React from "react";

class TemplateSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {/* App Settings modals */}
        <div
          className="modal fade"
          id="settings"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Application's settings</h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Light/dark topbar</label>
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="topbar"
                      />{" "}
                      <label
                        className="custom-control-label"
                        htmlFor="topbar"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Light/dark sidebar</label>
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="sidebar"
                      />{" "}
                      <label
                        className="custom-control-label"
                        htmlFor="sidebar"
                      />
                    </div>
                  </div>
                  <div className="form-group mb-0">
                    <label>Boxed/fullwidth mode</label>
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="boxed"
                        defaultChecked="checked"
                      />{" "}
                      <label className="custom-control-label" htmlFor="boxed" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer d-block">
                <div className="actions justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>{" "}
                  <button
                    id="reset-to-default"
                    type="button"
                    className="btn btn-error"
                  >
                    Reset to default
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end App Setting modal */}
      </>
    );
  }
}

export { TemplateSettings };
