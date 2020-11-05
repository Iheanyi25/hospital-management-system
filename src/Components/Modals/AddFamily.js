import React from "react";

class AddFamily extends React.Component {

    // state = { familyName: "" }
    state = {
        name: ''
    }
    componentDidMount() {
        console.log(this.props);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            healthPlanId: this.props.healthPlanId,
        };
        console.log(data)
        if (this.state.name !== '' && this.state.capacity !== '') {
            try {
                let res = await fetch(process.env.REACT_APP_API_URL + '/Admin/Account/CreateAccount', {
                    headers: { 'Content-Type': 'application/json-patch+json' },
                    method: 'POST',
                    body: JSON.stringify(data),
                    redirect: 'follow',
                });
                let response = await res.json();
                alert(response.message)
                this.closeModal();
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    };

    closeModal = () => {
        let $ = window.$;
        $("#add-family").modal('hide');
    }

    render() {

        return (
            <>
                <div
                    className="modal fade"
                    id="add-family"
                    tabIndex={-1}
                    role="dialog"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-5">
                            <div className="modal-header">
                                <h5 className="text-center">Add a new Family </h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Family name</label>
                                        <input
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            type="text"
                                            onChange={(e) => this.setState({ name: e.target.value })}
                                            placeholder="Enter family name"
                                            defaultValue={this.state.familyName}
                                        />
                                    </div>


                                    <div className="modal-footer d-block bg-white">
                                        <div className="actions justify-content-end">
                                            <button
                                                type="button"
                                                className="btn btn-error"
                                                data-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button type="submit" className="btn btn-primary ml-4">
                                                Save
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

export { AddFamily };