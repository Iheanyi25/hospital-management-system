import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { postAdminAccountUrl } from "../../api/URLs";

class AddFamily extends React.Component {

    // state = { familyName: "" }
    state = {
        name: '',
        phoneNumber: "",
        submit: true
    }
    componentDidMount() {
        console.log(this.props);
    }

    // componentDidUpdate() {
    //     if (Object.entries(this.state).includes("")) {
    //         this.setState({ ...this.state, submit: false });
    //         return;
    //     }
    //     else {
    //         this.setState({ ...this.state, submit: true });
    //         return;
    //     }
    // }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ ...this.state, submit: true })

        const data = {
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            healthPlanId: this.props.healthPlanId,
        };
        console.log(data)
        if (this.state.name !== '' && this.state.phoneNumber !== '') {
            try {
                const postAdminAccount = postAdminAccountUrl()
                const postAdminAccountConfig = fetchConfig({url : postAdminAccount, data:JSON.stringify(data), method : 'post'})
                const res = await fetchWrapper(postAdminAccountConfig)
               
                alert(res.message)
                await this.props.callbackFromProps();
                this.closeModal();
            } catch (error) {
                console.log(error);
            }
        }
        await this.setState({ ...this.state, submit: false })
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
                                            value={this.state.name}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Family Phone Number</label>
                                        <input
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            type="text"
                                            onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                                            placeholder="Enter family phone number"
                                            value={this.state.phoneNumber}
                                        />
                                    </div>

                                    <div className="modal-footer bg-white row">
                                        <div className="col">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                data-dismiss="modal"
                                            >
                                                <span className="d-none d-sm-block">
                                                    Cancel
                                                </span>
                                                <span className="d-sm-none">Cancel</span>
                                            </button>
                                        </div>
                                        <div className="col text-right">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={!this.state.submit}
                                            >
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