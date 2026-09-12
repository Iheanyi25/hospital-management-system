import React, { forwardRef } from "react";
import PrintOutLogo from "../printOutLogo/printOutLogo";
import styles from "./styles.module.css";

const Form1 = forwardRef(({ details }, ref) => {
	const fullname = `${details?.data?.admissionList?.firstname} ${details?.data?.admissionList?.middlename} ${details?.data?.admissionList?.lastname}`;
	return (
		<div className={styles.content} ref={ref}>
			<header className={`${styles.header} mt-4 w-100 `}>
				<div className="d-flex justify-content-center">
					<PrintOutLogo
						office={"OFFICE OF THE REGISTRAR"}
						indexing={"FORM R/REG.01"}
						showBorderBottom={true}
					/>
				</div>
			</header>
			<main className={styles.page_content}>
				{/* heading */}
				<section className={`d-flex justify-content-between`}>
					<aside>
						<div className="d-flex align-items-center">
							<strong style={{ fontSize: "1.14rem" }}>TO:</strong>
							<p className="ml-1">The Registrar, </p>
						</div>
						<p className="mt-1">Akwa Ibom State Polytechnic,</p>
						<p className="mt-1">
							(To be completed and returned in triplicate)
						</p>
					</aside>
				</section>
				{/* body  */}
				<section className={styles.body}>
					<div className="d-flex justify-content-center">
						<h4 className="text-uppercase">
							{`ACCEPTANCE OF OFFER OF ADMISSION AND PLEDGE`}
						</h4>
					</div>
					<p>
						I, <b>{fullname}</b>, hereby accept the offer of
						Provisional admission to pursue a{" "}
						<b>{`${details?.data?.currentSession?.department?.duration} year`}</b>{" "}
						course in the Polytechnic, leading to{" "}
						<b>{details?.data?.programmeDetail?.schoolProgramme}</b>{" "}
						in the {/* </p> */}
						{/* <div
						className="d-flex mb-2 mt-2 justify-content-start align-items-center"
						style={{ paddingLeft: "40%" }}
					>
						<i>(Title of degree/course)</i>
					</div> */}
						{/* <p> */}{" "}
						<b>{details?.data?.programmeDetail?.department}</b>{" "}
						Under the conditions stipulated in the letter of offer
						of admission by the Joint Admission and Matriculation
						Board Reference No _____________________________ dated
						_____________________ 20____________ JAMB REG. NO.{" "}
						<b>{details?.data?.programmeDetail?.jambRegNumber}</b>
					</p>
					<div className="d-flex justify-content-center">
						<h4 className="text-uppercase mt-2">{`PLEDGE`}</h4>
					</div>
					<p>
						I, <b>{fullname}</b> Registration Number{" "}
						<b>{details?.data?.programmeDetail?.jambRegNumber}</b>{" "}
						of the Department of{" "}
						<b>{details?.data?.programmeDetail?.department}</b> in
						consideration of my being admitted into Akwa Ibom State
						Ploytechnic, do hereby solemnly pledge to be of good
						behaviour, not to belong to any secret society/cult or
						any society not approved by the Polytechnic and to abide
						by the rules and regulations of the Akwa Ibom State
						Polytechnic and any other regulations of Federal or State
						Government specifically made to ensure civilized and
						orderly community life in the Polytechnic.
						<br />
						<br />
						The Polytechnic shall exercise the right of
						suspension/withdrawal of my admission or expulsion from{" "}
						the Polytechnic should I violate the above pledge.
					</p>
				</section>
				{/* footer */}
				<section className={styles.comment}>
					<div className="d-flex ">
						{" "}
						<p className="mr-2">Signature</p>
						<div>_____________________</div>
					</div>
					<div className="d-flex ">
						{" "}
						<p className="mr-2">Date</p>
						<div>__________________________</div>
					</div>
				</section>
			</main>
		</div>
	);
});

export default Form1;
