import React, { useState } from "react";

const $ = window.$;

const AddPrescriptionQuantity = ({ drug, setSubmit }) => {

    const [details, setDetails] = useState({
        packs: "",
        tablets: ""
    });

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value,
        });
        console.log(details)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let drugData = drug;
        drugData["packs"] = details.packs;
        drugData["tablets"] = details.tablets;

        await setSubmit(drugData);
        setDetails({packs: "", tablets: ""});
        $("#add-prescription-quantity").modal("hide");
    };

    return (
        <div
            className="modal fade"
            id="add-prescription-quantity"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h5 className="text-center">Select amount prescribed</h5>
                        <p className="text-center">You can select number of packets or tablets</p>

                        <form className="p-2" onSubmit={handleSubmit}>
                            <label className="text-center w-100 mb-4">{drug && drug.name}</label>

                            <div className="d-flex justify-content-center">
                                <div className="form-group mr-2">
                                    <label>No of packs</label>
                                    <input
                                        name="packs"
                                        type="number"
                                        placeholder={"00"}
                                        className="form-control"
                                        value={details.packs}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group ml-2">
                                    <label>No of tablets</label>
                                    <input
                                        name="tablets"
                                        className="form-control"
                                        type="number"
                                        onChange={handleChange}
                                        placeholder="00"
                                        value={details.tablets}
                                    />
                                </div>
                            </div>

                            <div className="col text-right">
                                <button
                                    className="btn btn-outline-danger mr-3"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { AddPrescriptionQuantity };
