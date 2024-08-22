import React, { forwardRef } from "react";
import PrintOutLogo from "../printOutLogo/printOutLogo";
import styles from "./styles.module.css";
const Form4 = forwardRef(({ details }, ref) => {
	const fullname = `${details?.data?.admissionList?.firstname} ${details?.data?.admissionList?.middlename} ${details?.data?.admissionList?.lastname}`;
	return (
		<div className={styles.content} ref={ref}>
			<header className={`${styles.header} mt-4 w-100 `}>
				<div className="d-flex justify-content-center">
					<PrintOutLogo
						office={"OFFICE OF THE REGISTRAR"}
						indexing={"FORM R/REG.04"}
						showBorderBottom={true}
						showBorderBottomSub={true}
					/>
				</div>
			</header>
			<main className={`${styles.page_content} pt-0`}>
				{/* body  */}
				<section className={`${styles.body}`}>
					<div className="d-flex justify-content-center">
						<h3 className="text-uppercase">{`ADMISSION`}</h3>
					</div>
					<div>
						<div className="d-flex mt-4  justify-content-between">
							<p>
								{" "}
								<u>OUR REF: RUN/ADMS/A.13</u>
							</p>
							<p className="ml-5">
								Date _________________________
							</p>
						</div>
						<p className="mt-1">
							NAME: <b>{fullname}</b>{" "}
						</p>
						<p className=" mt-1">
							REG. NO:{" "}
							<b>
								{details?.data?.programmeDetail.jambRegNumber}
							</b>{" "}
						</p>

						<p className="mt-1">
							DEPARTMENT/FACULTY:{" "}
							<b>{details?.data?.programmeDetail.department}</b> /
							<b>{details?.data?.programmeDetail.faculty}</b>
						</p>
					</div>

					<div className="d-flex justify-content-center">
						<h4 className="text-uppercase">
							{`AUTHORITY TO SERVE AS AN ADMISSION LETTER`}
						</h4>
					</div>

					<p>
						Approval was given on 18/10/1996 that all the registered
						students who have not received their admission letter
						should be issued with full clearance provided that they
						meet the entry requirements for the course they were
						admitted and have no other deficiencies preventing them
						from being cleared.
					</p>
					<p>
						Furthermore, it was also approved that a photocopy of
						form II and marked point-outs showing the signature or
						the JAMB, registrar and official stamp as applicable, to
						substantiate that they were recommended by the
						polytechnic and eventually approved by JAMB, should also
						be attached.
					</p>

					<u>
						<p>This authority serves as admission letter only.</p>
					</u>
				</section>
				{/* footer */}
				<section className="d-flex flex-column pt-5 ">
					<div
						className={`${styles.comment} p-0 d-flex justify-content-between w-100`}
					>
						<div className="d-flex flex-column align-items-center justify-content-center  pt-5">
							<p>_________________________</p>
							<p style={{ margin: "0rem auto" }}>
								Name of Officer
							</p>
						</div>
						<div className="d-flex flex-column align-items-center justify-content-center  pt-5">
							<p>_________________________</p>
							<p style={{ margin: "0rem auto" }}>Signature</p>
						</div>
						<div className="d-flex flex-column align-items-center justify-content-center  pt-5">
							<p>_________________________</p>
							<p style={{ margin: "0rem auto" }}>Date</p>
						</div>
					</div>
					<div className="d-flex flex-column align-items-center justify-content-center  pt-5">
						<p>___________________________________________</p>
						<p style={{ margin: "0rem auto" }}>
							Registrar’s Signature and Date
						</p>
					</div>
				</section>
			</main>
		</div>
	);
});

export default Form4;
