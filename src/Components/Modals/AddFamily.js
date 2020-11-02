import React from "react";


class AddFamily extends React.Component {

    // state = { familyName: "" }
    state = {
        name: ''
    }
    componentDidMount() {
        console.log(this.props.healthPlanId);
    }

    handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			name: this.state.name,
			capacity: this.state.capacity,
		};
		if (this.state.name !== '' && this.state.capacity !== '') {
			try {
				let res = await fetch('https://hms-tenece.azurewebsites.net/api/Admin/Ward/CreateWard', {
					headers: { 'Content-Type': 'application/json-patch+json' },
					method: 'POST',
					body: JSON.stringify(data),
					redirect: 'follow',
				});
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		}
	};

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
                                <h6 className="modal-title">Create a health plan for this patient</h6>
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