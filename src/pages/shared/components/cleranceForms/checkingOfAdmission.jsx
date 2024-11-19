import { forwardRef } from "react";
import styles from "./styles.module.css"
import { SCHOOL_DETAILS } from "../../../../utils/constants";
import logo from "../../../../assets/images/invoice-logo.png"

const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${day}/${month < 10 ? `0${month}` : month}/${year}`;
};

const CredentialsCheck = forwardRef(({ details }, ref) => {
    const fullName = `${details?.data?.personalData?.firstname} ${details?.data?.personalData?.middlename} ${details?.data?.personalData?.lastname} `
    const todayDate = getFormattedDate()
    return (
        <div className={styles.notification_slip} ref={ref}>
            <div className="d-flex justify-content-center align-items-center shared_img_container">
                <img src={logo} alt="Logo" />
            </div>
            <header
                className={`d-flex flex-column mb-3 align-items-center header`}
            >
                <div className={`my-2 ${styles.title}`}>
                    <h2>{SCHOOL_DETAILS.name}</h2>
                    <h3>ADMISSION NOTIFICATION SLIP</h3>
                </div>
            </header>

            <div>
                <div className="w-100 d-flex justify-content-between mt-5 mb-5">
                    <p>OUR REF: </p>
                    <div>
                        <p><strong>FORM (REG.04)</strong></p>
                        <p><strong>DATE: {todayDate} </strong></p>
                    </div>

                </div>

                <h4 className={`${styles.checkTitle} text-center`}><strong>CHECKING OF CREDENTIALS - DEGREE / DIPLOMA / CERTIFICATE COURSES FULL CLEARANCE</strong></h4>

                <div className="row mt-4">
                    <div className="col-4">
                        <p><strong>NAME:</strong></p>
                    </div>
                    <div className="col-6">
                        <p>{fullName}</p>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-4">
                        <p><strong>REGISTRATION NUMBER/YEAR:</strong></p>
                    </div>
                    <div className="col-6">
                        <p>{details?.data?.admissionList?.regNumber}</p>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <p><strong>DEPARTMENT:</strong></p>
                    </div>
                    <div className="col-6">
                        <p>{details?.data?.programmeDetail?.department}</p>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-4">
                        <p><strong>COURSE:</strong></p>
                    </div>
                    <div className="col-6">
                        <p>{details?.data?.programmeDetail?.faculty}</p>
                    </div>
                </div>
                <div className="row mt-2 mb-4">
                    <div className="col-4">
                        <p><strong>DURATION:</strong></p>
                    </div>
                    <div className="col-6">
                        <p>{details?.data?.programmeDetail?.entryYear} -- {details?.data?.programmeDetail?.graduationYear}</p>
                    </div>
                </div>



                <div className="mt-4">
                    <p className="mb-3">The student whose particulars are indicated above, has submitted his/her qualification(s) on the basis of which he/she was registered and issued provisional clearance.</p>
                    <p className="mb-3">The student is hereby, given full clearance based on the qualification(s) he/she submitted as representing the minimum University/ Departmental entry requirements of the University of Nigeria.</p>
                    <p className="mb-3">If at anytime hereafter, it is discovered that the qualifications submitted by the candidate on the basis of which he/she was registered and issued with provisional and full clearance do not meet with the minimum entry requirements of the University and faculty/department, the full clearance and the provisional admission will be withdrawn and the student automatically loses his/her studentship.</p>
                    <p className="mb-3">Please accord the student full registration faculties.</p>
                </div>
                <div className="mt-4">
                    <p>______________________________________</p>
                    <i>Signature of Faculty Officer</i>
                </div>
                <div className="row mt-4">
                    <div className="col-6">
                        <p>Name in Full ___________________________________</p>
                    </div>
                    <div className="col-6 text-right">
                        <p>Date __________________</p>
                    </div>
                </div>
                <div className="mt-4">
                    <p>CC: Registrar (Admissions) CC: Student</p>
                </div>
            </div>

        </div>
    );
});


export default CredentialsCheck