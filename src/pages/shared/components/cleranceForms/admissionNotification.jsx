import { forwardRef } from "react";
import styles from "./styles.module.css"
import { SCHOOL_DETAILS } from "../../../../utils/constants";
import logo from "../../../../assets/images/invoice-logo.png"


const AdmissionNotificationSlip = forwardRef(({ details }, ref) => {
    const fullName = `${details?.data?.personalData?.firstname} ${details?.data?.personalData?.middlename} ${details?.data?.personalData?.lastname} `
    return (
        <div className={styles.notification_slip} ref={ref}>
            <div className="d-flex justify-content-center align-items-center shared_img_container">
                <img src={logo} alt="Logo" />
            </div>
            <div
                className={`d-flex flex-column mb-3 align-items-center header`}
            >
                <div className={`my-2 ${styles.title}`}>
                    <h2>{SCHOOL_DETAILS.name}</h2>
                    <h3>ADMISSION NOTIFICATION SLIP</h3>
                </div>

            </div>
            <div className="content">
                <i>Candidate's Details</i>
                <div className="row mt-4">
                    <div className="col-3">
                        <strong>Admission Session:</strong>
                    </div>
                    <div className="col-6">
                        <p>{details?.data?.admissionList?.session}</p>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3">
                        <strong>Registration Number:</strong>
                    </div>
                    <div className="col-6">
                        <p>{details?.data?.admissionList?.regNumber}</p>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3">
                        <strong>Candidate's Name:</strong>
                    </div>
                    <div className="col-6">
                        <p>{fullName}</p>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3">
                        <strong>Course Of Study:</strong>
                    </div>
                    <div className="col-6">
                        <p>{details?.data?.programmeDetail?.faculty}</p>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3">
                        <strong>Faculty:</strong>
                    </div>
                    <div className="col-6">
                        <p>{details?.data?.programmeDetail?.department}</p>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3">
                        <strong>Student Type:</strong>
                    </div>
                    <div className="col-6">
                        <p>{details?.data?.programmeDetail?.studentType}</p>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3">
                        <strong>Mode of Entry:</strong>
                    </div>
                    <div className="col-6">
                        <p>{details?.data?.programmeDetail?.modeOfEntry}</p>
                    </div>
                </div>
            </div>
            <div className={styles.instructions}>
                <h5>INSTRUCTIONS</h5>
                <ol>
                    <li className="mt-2">Purchase an Acceptance of Admission PIN from any designated bank.</li>
                    <li className="mt-2">Log in to the portal and complete your registration.</li>
                    <li className="mt-2">The institution reserves the right to withdraw your admission if you are involved in any admission irregularity.</li>
                    <li className="mt-2">Information relating to fees and hostel allocation should be obtained from the bursar or director of student affairs of the institution.</li>
                    <li className="mt-2">You will be required to come along with the Admission Slip or CLEARANCE</li>
                    <li className="mt-2">Accept our congratulations.</li>
                </ol>
            </div>
        </div>
    );
});


export default AdmissionNotificationSlip