import { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ApplicationPreviewWrapper } from "../ApplicationPreviewWrapper";
import styles from "./style.module.css";
import { staffRequestLoadApplicationFormUrl } from "../../../api/urls";
import { useApiGet } from "../../../api/apiCall";
import { Spinner } from "../../../ui_elements";
import Avatar from "react-avatar";
import { formatDateFromAPI } from "../../../utils/formatDate";

const StaffRequestPreview = () => {
	const { push } = useHistory();
	const { state } = useLocation();
	const componentRef = useRef();

	if (!state) {
		push("/staff_request_login");
	}

	const { details } = state;

	const { data, isLoading, error } = useApiGet(
		staffRequestLoadApplicationFormUrl(details),
		{
			refetchOnWindowFocus: false
		}
	);

	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<ApplicationPreviewWrapper
			previewHeader={
				<>
					<h3 className="text-uppercase">
						{data?.data?.basicInformation?.session} Staff request
						application form
					</h3>
					<h5
						className={`text-uppercase font-weight-normal ${styles["text-neutral"]}`}
					>
						reference number: {data?.data?.basicInformation?.rrr}
					</h5>
				</>
			}
			userDetails={null}
			componentRef={componentRef}
		>
			<div
				className={`${styles["preview-container"]} py-4 d-flex justify-content-center flex-column`}
			>
				<section>
					<section
						className={`d-flex  flex-wrap justify-content-between ${styles["flex-container"]} px-5 pb-3 border-bottom`}
					>
						<div>
							<h6 className="mb-3">Surname:</h6>
							<h6 className="mb-3">Firstname:</h6>
							<h6 className="mb-3">Other Name:</h6>
							<h6 className="mb-3">Sex:</h6>
							<h6 className="mb-3">JAMB Reg No:</h6>
							<h6 className="mb-3">UTME Score:</h6>
							<h6 className="mb-3">PUTME Score:</h6>
							<h6 className="mb-3">Aggregate Score:</h6>
							<h6 className="mb-3">Faculty:</h6>
							<h6 className="mb-3">Department:</h6>
						</div>
						<div>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.basicInformation?.lastname || "-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.basicInformation?.firstname || "-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.basicInformation?.middlename ||
									"-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.basicInformation?.gender || "-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.programme?.jambNumber || "-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.programme?.utmeScore || "-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.programme?.putmeScore || "-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.programme?.aggregateScore || "-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.programme?.faculty || "-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.programme?.department || "-"}
							</h6>
						</div>
						<div>
							<Avatar
								name={`${data?.data?.basicInformation?.lastname} ${data?.data?.basicInformation?.firstname}`}
								size={240}
								round={false}
								className={styles.avatar}
								src={data?.data?.basicInformation?.passport}
							/>
						</div>
					</section>
					<div className={`${styles["sub-header"]} my-4`}>
						<h5 className="text-center mt-3 mb-4 py-3">
							SECTION B: OFFICIAL USE (TO BE COMPLETED BY STAFF)
						</h5>
					</div>
					<section
						className={`d-flex flex-wrap justify-content-between ${styles["flex-container"]} px-5 pb-3 border-bottom`}
					>
						<div>
							<h6 className="mb-3">Staff Name:</h6>
							<h6 className="mb-3">Department:</h6>
							<h6 className="mb-3">
								Date of First Appointment to UNN:
							</h6>
							<h6 className="mb-3">Number of Years Served::</h6>
							<h6 className="mb-3">Relationship to Candidate:</h6>
							<h6 className="mb-3">Staff File No:</h6>
						</div>
						<div>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.staffDetails?.fullName || "-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.staffDetails?.department || "-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{(data?.data?.staffDetails?.entryDate &&
									formatDateFromAPI(
										data?.data?.staffDetails?.entryDate
									)) ||
									"-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{`${data?.data?.staffDetails?.numberOfYearsServed} year(s)` ||
									"-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.staffDetails?.relationship || "-"}
							</h6>
							<h6 className={`mb-3 ${styles["text-varaint-b"]}`}>
								{data?.data?.staffDetails?.staffNumber || "-"}
							</h6>
						</div>
						<div></div>
					</section>
					<section className="px-5 overflow-hidden">
						<h4 className="text-center mt-3 mb-3 py-3">
							DIRECT ENTRY QUALIFICATIONS, LIST SUBJECT AND GRADE
							OR CERTIFICATE AS APPROPRIATE
						</h4>
						<table className={`${styles.table} mb-4`}>
							<tr>
								<th>Programme</th>
								<th>Subject</th>
								<th>Grade</th>
							</tr>
							<tr>
								<td>A’LEVEL</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>HND</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>NCE</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>DEGREE</td>
								<td></td>
								<td></td>
							</tr>
						</table>
						<div>
							<p className="font-italic mb-2">
								(To be completed by Head of Department and
								countersigned by Dean of the Faculty of the
								staff (for Academic Unit only)
							</p>
							<p>
								I hereby certify that{" "}
								<span className="font-weight-bold text-capitalize">
									{data?.data?.staffDetails?.fullName || "-"}
								</span>
							</p>
							<p>
								Is a staff of the Department of{" "}
								<span className="font-weight-bold">
									{data?.data?.staffDetails?.department ||
										"-"}
								</span>
							</p>
							<p>
								That he/she is a confirmed staff of the
								university. I affirm that the information given
								above is true
							</p>
							<div className="mt-5 mb-4">
								<div className="row mb-5">
									<div className="col-6">
										<span>
											......................................................................................
										</span>
										<h6>Name of Dean of Faculty</h6>
									</div>
									<div className="col-6">
										<span>
											......................................................................................
										</span>
										<h6>Name of Head of Department</h6>
									</div>
								</div>
								<div className="row">
									<div className="col-6">
										<span>
											......................................................................................
										</span>
										<h6>
											Signature of Dean of Faculty, Date
											and Official Stamp
										</h6>
									</div>
									<div className="col-6">
										<span>
											......................................................................................
										</span>
										<h6>
											Signature of Head of Department,
											Date and Official Stamp
										</h6>
									</div>
								</div>
							</div>
							<p className="font-italic mb-2">
								(To be completed by the Registrar in charge of
								Personnel Services Unit)
							</p>
							<p className="mb-4">I hereby certify as follows:</p>
							<ol className="px-4">
								<li className="mb-4">
									That{" "}
									<span className="font-weight-bold text-capitalize">
										{data?.data?.staffDetails?.fullName ||
											"-"}
									</span>
									Is a confirmed staff of the University
								</li>
								<li className="mb-4">
									That the candidate for admission is the
									biological child/spouse of the staff Yes ( )
									No ( ) Tick as appropriate
								</li>
								<li className="mb-4">
									Any other information:
									...................................................................
								</li>
							</ol>
							<p className="mb-4">
								Name of officer in full:
								____________________________________________
								Signature: ___________________________
							</p>
							<p className="mb-4">
								Date with official stamp:
								_____________________________________________________________________________
							</p>
							<p className="mb-4">
								<span className="font-weight-bold">NB:</span>{" "}
								Please note that completed forms received after
								the deadline will not be processed.
							</p>
						</div>
					</section>
				</section>
			</div>
		</ApplicationPreviewWrapper>
	);
};

export default StaffRequestPreview;
