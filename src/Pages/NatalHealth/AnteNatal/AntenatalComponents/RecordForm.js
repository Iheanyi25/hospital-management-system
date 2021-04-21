import React from "react";
import {  } from "module";


const RecordForm = ()=>{
    return(
    <div className="card">
        <div className="card-body">
            <form>
                    <div className="custom-control custom-radio mb-3">
                        <input
                            type="radio"
                            className="custom-control-input"
                            name=""
                            id="tabs"
                        />{" "}
                        <label className="custom-control-label" for="tabs">
                            First time pregnancy
                        </label>
                    </div>
                <div className="form-group">
                    <label>Previous Surgeries</label>{" "}
                    <textarea
                        className="form-control"
                        placeholder="Previous surgeries"
                        rows={3}
                    />
                </div>
                <div className="row mb-2">
                    <div className="col-4">
                        <label>Any dead child</label>
                        <input
                        className="form-control w-75"
                        type="text"
                        tabIndex={-98}
                        name=""
                        required
                        />
                    </div>
                    <div className="col-4">
                        <label>Any living child</label>
                        <input
                        className="form-control w-75"
                        type="text"
                        tabIndex={-98}
                        name=""
                        required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Specify cause of death if known</label>
                    <textarea
                        className="form-control"
                        placeholder="Specify cause of death if known"
                        rows={3}
                    />
                </div>
                <div className="custom-control custom-radio mb-3">
                        <input
                            type="radio"
                            className="custom-control-input"
                            name=""
                            id="tabs"
                        />{" "}
                        <label className="custom-control-label" for="tabs">
                            Any complication on last pregnancy
                        </label>
                    </div>
                <div className="form-group">
                    <label>Previous Surgeries</label>{" "}
                    <textarea
                        className="form-control"
                        placeholder="Previous surgeries"
                        rows={3}
                    />
                </div>
            </form>
        </div>
    </div>
    );
};
export default RecordForm;