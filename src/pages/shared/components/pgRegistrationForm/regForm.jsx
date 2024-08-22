import React, { forwardRef } from "react";
import PrintOutLogo from "../printOutLogo/printOutLogo";
import styles from "./styles.module.css";
import Barcode from "react-barcode";

const RegistrationForm = forwardRef(({ details }, ref) => {
    const isUnassigned = details?.data?.programmeDetail?.matricNumber === details?.data?.programmeDetail?.jambRegNumber
    const fullname = `${details?.data?.admissionList?.firstname} ${details?.data?.admissionList?.middlename} ${details?.data?.admissionList?.lastname}`;
    const regNo = isUnassigned ? "Registration number not assigned" :  `${details?.data?.programmeDetail?.matricNumber}`
    const faculty = `${details?.data?.programmeDetail?.faculty}`
    const department = `${details?.data?.programmeDetail?.department}`
    const supervisor = `${details?.data?.admissionList?.supervisor}`
    const passport = `${details?.data?.personalData?.passport}`

    return (
        <div className={styles.content} ref={ref}>
            <header className={`${styles.header} mt-4 w-100 `}>
                <div className="d-flex justify-content-center">
                    <PrintOutLogo
                        office={"POSTGRADUATE REGISTRATION NUMBER"}
                        indexing={"OUR REF: UN/SPGS/WEB/30023"}
                        showBorderBottom={true}
                    />
                </div>
            </header>
            <main className={styles.page_content}>
                <div className={`${styles.body} pt-5`}>
                    <div className="container">
                        <div className={`row align-items-center`}>
                            <div className="col-12 col-md-9 row">
                                <div className="col-5">
                                    <p>Name of Student:</p>
                                    <p>Registration Number:</p>
                                    <p>Faculty:</p>
                                    <p>Department:</p>
                                    <p>Supervisor:</p>
                                </div>
                                <div className="col-7">
                                    <p>{fullname}</p>
                                    <p>{regNo}</p>
                                    <p>{faculty}</p>
                                    <p>{department}</p>
                                    <p>{supervisor}</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 text-center">
                                <img src={passport} alt="Passport" className={styles.passportImage} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.code}>
                    <Barcode value={regNo} />
                </div>
            </main>


        </div>
    );
});

export default RegistrationForm;
