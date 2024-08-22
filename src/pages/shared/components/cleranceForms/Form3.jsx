import React, { forwardRef } from "react";
import PrintOutLogo from "../printOutLogo/printOutLogo";
import styles from "./styles.module.css";
const Form3 = forwardRef(({ details }, ref) => {
	const fullname = `${details?.data?.admissionList?.firstname} ${details?.data?.admissionList?.middlename} ${details?.data?.admissionList?.lastname}`;
	return (
		<div className={styles.content} ref={ref}>
			<header className={`${styles.header} mt-4 w-100 `}>
				<div className="d-flex justify-content-center">
					<PrintOutLogo
						office={"OFFICE OF THE REGISTRAR"}
						indexing={"FORM R/REG.03"}
						showBorderBottom={true}
						showBorderBottomSub={true}
					/>
				</div>
			</header>
			<main className={`${styles.page_content} pt-0`}>
				{/* body  */}
				<section className={`${styles.body}`}>
					<div className="d-flex justify-content-center">
						<h3 className="text-uppercase">
							{`PROVISIONAL CLEARANCE`}
						</h3>
					</div>
					<div>
						<div className="d-flex mt-4">
							<p>
								NAME: <b>{fullname}</b>{" "}
							</p>
							<p className=" ml-3">
								REG. NO:{" "}
								<b>
									{
										details?.data?.programmeDetail
											?.jambRegNumber
									}
								</b>{" "}
							</p>
						</div>
						<p className="mt-1">
							DEPARTMENT:{" "}
							<b>{details?.data?.programmeDetail?.department}</b>{" "}
						</p>
						<div className="d-flex mt-1 mb-2">
							<p>
								FACULTY:{" "}
								<b>{details?.data?.programmeDetail?.faculty}</b>{" "}
							</p>
							<p className="ml-5">
								SESSION:{" "}
								<b>{details?.data?.admissionList?.session}</b>
							</p>
						</div>
					</div>

					<p>
						The above named has been provisionally cleared by me for
						the reason that there is inconclusive evidence of entry
						qualifications.
					</p>
				</section>
				{/* footer */}
				<section className="d-flex flex-column pt-5 ">
					<p className="mb-3">Faculty Officer's Signature</p>
					<div
						className={`${styles.comment} p-0 d-flex justify-content-between w-100`}
					>
						<div className="d-flex ">
							{" "}
							<p className="mr-2">Name in full </p>
							<div>
								{" "}
								__________________________________________________________{" "}
							</div>
						</div>
						<div className="d-flex ">
							{" "}
							<p className="mr-2">Date</p>
							<div>__________</div>
						</div>
					</div>
					<p style={{ margin: "2rem auto" }}>OFFICE STAMP</p>
				</section>
			</main>
		</div>
	);
});

export default Form3;
