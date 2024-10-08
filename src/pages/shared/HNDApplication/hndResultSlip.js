import Avatar from "react-avatar";
import Barcode from "react-barcode";
import logo from "../../../assets/images/sideLogo.png";
import { formatDateFromAPI } from "../../../utils/formatDate";
import { Table } from "./HndApplicationDetails/components";
import styles from "./style.module.css";

const roundUpTo1 = (num) => Math.round(num * 10) / 10;
export const HNDResultSlip = ({ componentRef, details }) => {
	return (
		<div className={styles.putme_form_container} ref={componentRef}>
			<div className="d-flex justify-content-center align-items-center shared_img_container">
				<img src={logo} alt="Logo" />
			</div>
			<div
				className={`d-flex flex-column align-items-center ${styles.putme_form_title}`}
			>
				<h3 className="text-uppercase">
					{details?.personalInfoResponse?.session} POST UTME SCREENING
					RESULT SLIP
				</h3>
			</div>
			<section className={"mt-2"}>
				<div className="d-flex mb-4">
					<Avatar
						name={`${details?.surname ?? ""} ${
							details?.firstname ?? ""
						} ${details?.middlename ?? ""},`.toUpperCase()}
						size={240}
						round={false}
						src={details?.passport}
						className="mx-auto"
					/>
				</div>

				<div
					className={`d-flex justify-content-between ${styles.outer_container}`}
				>
					<main>
						<h5>Section A - Personal Information</h5>
						<div className="d-flex align-items-center mt-3">
							<div className={styles.info_container}>
								<h6>Application No:</h6>
							</div>
							<div className={styles.info_value}>
								<p>
									{
										details?.personalInfoResponse
											?.applicationNumber
									}
								</p>
							</div>
						</div>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>Surname:</h6>
							</div>
							<div className={styles.info_value}>
								<p>{details?.personalInfoResponse?.surname}</p>
							</div>
						</div>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>Firstname:</h6>
							</div>
							<div className={styles.info_value}>
								<p>
									{details?.personalInfoResponse?.firstname}
								</p>
							</div>
						</div>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>Othernames:</h6>
							</div>
							<div className={styles.info_value}>
								<p>
									{details?.personalInfoResponse?.middlename}
								</p>
							</div>
						</div>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>Sex:</h6>
							</div>
							<div className={styles.info_value}>
								<p>{details?.personalInfoResponse?.gender}</p>
							</div>
						</div>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>Date of birth:</h6>
							</div>
							<div className={styles.info_value}>
								<p>
									{formatDateFromAPI(
										details?.personalInfoResponse
											?.dateOfBirth
									)}
								</p>
							</div>
						</div>
					</main>
					<main className={styles.right_side}>
						<div className="d-flex align-items-center">
							<div className={styles.info_container}>
								<h6>Phone Number:</h6>
							</div>
							<div className={styles.info_value}>
								<p>
									{
										details?.personalInfoResponse
											?.mobileNumber
									}
								</p>
							</div>
						</div>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>Email:</h6>
							</div>
							<div className={styles.info_value}>
								<p>{details?.personalInfoResponse?.email}</p>
							</div>
						</div>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>Contact Address:</h6>
							</div>
							<div className={styles.info_value}>
								<p>
									{
										details?.personalInfoResponse
											?.contactAddress
									}
								</p>
							</div>
						</div>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>State of Origin:</h6>
							</div>
							<div className={styles.info_value}>
								<p>{details?.personalInfoResponse?.state}</p>
							</div>
						</div>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>LGA of Origin:</h6>
							</div>
							<div className={styles.info_value}>
								<p>
									{details?.personalInfoResponse?.lga || "-"}
								</p>
							</div>
						</div>
					</main>
				</div>

				<div
					className={`d-flex justify-content-between mt-5 ${styles.outer_container}`}
				>
					<main>
						<h5>
							Section B - JAMB Details and Examination Results
						</h5>
						<div className="d-flex align-items-center mt-3">
							<div className={styles.info_container}>
								<h6>Faculty:</h6>
							</div>
							<div className={styles.info_value}>
								<p>{details?.programmeInfoResponse?.faculty}</p>
							</div>
						</div>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>Department:</h6>
							</div>
							<div className={styles.info_value}>
								<p>
									{details?.programmeInfoResponse?.department}
								</p>
							</div>
						</div>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>JAMB Reg No:</h6>
							</div>
							<div className={styles.info_value}>
								<p>{details?.regNumber}</p>
							</div>
						</div>
					</main>
					<main className={styles.right_side}>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>JAMB Score:</h6>
							</div>
							<div className={styles.info_value}>
								<p>{details?.postUtmeResponse?.utmeScore}</p>
							</div>
						</div>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>PUTME Score:</h6>
							</div>
							<div className={styles.info_value}>
								<p>{details?.postUtmeResponse?.totalPoint}</p>
							</div>
						</div>
						<div className="d-flex align-items-center mt-2">
							<div className={styles.info_container}>
								<h6>Average Score:</h6>
							</div>
							<div className={styles.info_value}>
								<p>
									{roundUpTo1(
										details?.postUtmeResponse?.averageScore
									)}
								</p>
							</div>
						</div>
					</main>
				</div>
			</section>
			<section className="mt-5">
				<Table
					rows={details?.postUtmeResponse?.utmeSubjectGrades || []}
					sittingScore={details?.postUtmeResponse?.examSittingPoint}
					total={details?.postUtmeResponse?.totalPoint}
				/>
			</section>
			<section className="mt-5 d-flex align-items-center justify-content-center">
				<Barcode value={details.regNumber} />
			</section>
		</div>
	);
};
