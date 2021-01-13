import React, { useState, useEffect } from 'react';
import styles from "../../Login/css/Login.module.css";
import { InvalidDetails } from "../../../Components/Alerts/InvalidDetails";
import { useHistory } from 'react-router-dom'
import { Success } from '../../../Components/Alerts/Success';
import { fetchWrapper } from '../../../api/fetcher';
import { fetchConfig } from '../../../api/fetchConfig';
import { postPasswordUrl } from '../../../api/URLs';

function ChangePassword() {

    const [allPasswordDetails, setAllPasswordDetails] = useState({ currentPassword: "", newPassword: "", submitting: false, error: false, passwordStatus: false, response: "" });

    const { currentPassword, newPassword, submitting, error, passwordStatus, response } = allPasswordDetails;

    const history = useHistory();

    const handleSubmit = async (e) => {
        setAllPasswordDetails({ ...allPasswordDetails, submitting: true });
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem("authenticatedUser")).id;


        if (newPassword !== "" && currentPassword !== "") {
            const payload = {
                userId,
                    currentPassword,
                    newPassword,
            }
            const postPassword = postPasswordUrl()
            const postPasswordConfig = fetchConfig({url : postPassword, data: payload, method : 'post'})
            const res = await fetchWrapper(postPasswordConfig)

            if (res.status === 200) {
                console.log('Res is ', res);
                const {data} = res;
                setAllPasswordDetails({ ...allPasswordDetails, passwordStatus: true, response: data.message })
                console.log('Data is ', data);

            }
        }
        setTimeout(() => {
            history.push('/DoctorProfile')
        }, 1500);
    }

    const handleCurrentPasssword = (val) => {
        setAllPasswordDetails({ ...allPasswordDetails, currentPassword: val })

    }

    const handleNewPassword = (val) => {
        setAllPasswordDetails({ ...allPasswordDetails, newPassword: val })
        console.log(newPassword, " new Password")

    }

    const setErrorStatus = () => {
        setAllPasswordDetails({ ...allPasswordDetails, error: false });
    }

    return (
        <>
            <main className="main-content">
                {error ? <InvalidDetails setErrorStatus={setErrorStatus()} /> : null}

                <header className="page-header">
                    <h4 className="page-title pl-4">Change Password</h4>
                </header>
                <div className="main-content-wrap">
                    <div className="page-content">
                        <div className="row justify-content-center">
                            <div className="col col-md-6">
                                <div className="card border-light">
                                    <div className="card-body bg-light pb-5">
                                        <form
                                            className={`${styles.form} needs-validation`}
                                            noValidate
                                            onSubmit={(e) => handleSubmit(e)}
                                        >
                                            <div className="form-group">
                                                <div className="valid-feedback">Looks good!</div>
                                                <div className="invalid-feedback">
                                                    Oops! should be numbers only.
                          </div>
                                                <div className="form-group">
                                                    <label className="pt-1">Current Password</label>
                                                    <input
                                                        className="form-control"
                                                        type="password"
                                                        name="currentPassword"
                                                        onChange={(e) => {
                                                            handleCurrentPasssword(e.target.value);
                                                        }}
                                                        placeholder="Enter your current password"
                                                        required
                                                        autoComplete="off"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label>New Password</label>
                                                    <input
                                                        className="form-control"
                                                        type="password"
                                                        name="newPassword"
                                                        onChange={(e) => {
                                                            handleNewPassword(e.target.value);
                                                        }}
                                                        placeholder="Enter your new password"
                                                        required
                                                        autoComplete="off"
                                                    />
                                                </div>

                                            </div>
                                            <div className="m-auto">
                                                <div className="row">
                                                    <button className="btn btn-primary" type="submit" disabled={submitting}>
                                                        <span className="btn-icon icofont-location-arrow mr-2"></span>{" "}
                                                        Change password
                                                        </button>
                                                </div>
                                            </div>

                                            {
                                                passwordStatus === true ? (
                                                    <Success message={response} />
                                                ) :
                                                    null
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export { ChangePassword };