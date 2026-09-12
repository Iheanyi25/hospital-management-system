import React, { forwardRef } from "react";
import PrintOutLogo from "../printOutLogo/printOutLogo";
import styles from "./styles.module.css";
const Form2 = forwardRef(({ details }, ref) => {
	const fullname = `${details?.data?.admissionList?.firstname || ''
		}${details?.data?.admissionList?.middlename ? ` ${details?.data?.admissionList?.middlename}` : ''
		}${details?.data?.admissionList?.lastname ? ` ${details?.data?.admissionList?.lastname}` : ''
		}`.trim();
	return (
		<div className={styles.content} ref={ref}>
			<header className={`${styles.header} mt-4 w-100 `}>
				<div className="d-flex justify-content-center">
					<PrintOutLogo
						office={""}
						indexing={"FORM R/REG.02"}
						showBorderBottom={false}
					/>
				</div>
			</header>
			<main className={styles.page_content}>
				{/* heading 1*/}
				<section className={`d-flex mb-2 justify-content-between`}>
					<aside className={styles.passportColumn}>
						<img
							src={details?.data?.personalData?.passport}
							alt="Passport of the Student"
							height={200}
							width={200}
						/>
					</aside>
					<aside>
						<div className={`ml-1 ${styles.address}`}>
							{details.data?.personalData?.permanentAddress}
						</div>

						<p className="mt-1">
							Date: ____________________________
						</p>
					</aside>
				</section>
				{/* heading 2*/}
				<section className={`d-flex justify-content-between`}>
					<aside>
						<div className="d-flex align-items-center">
							<p className="ml-1">The Registrar, </p>
						</div>
						<p className="mt-1">Akwa Ibom State Polytechnic,</p>
						<p className="mt-1">Ikot Osurua</p>
					</aside>
				</section>
				{/* body  */}
				<section className={styles.body}>
					<div className="d-flex justify-content-center">
						<h4 className="text-uppercase">
							{`LETTER OF UNDERTAKING`}
						</h4>
					</div>
					<p>
						I, Mr./Mrs./Miss <b>{fullname}</b> whose passport
						photograph is attached herewith, humble request the
						Akwa Ibom State to admit and allow me register
						provisionally and at my own risk under the following
						terms:
					</p>

					<div className="mt-4 mb-2">
						<div className={styles.listWrapper}>
							<span>A.</span>
							<ul>
								<li>
									That my entry qualification, copies of which
									I have submitted/intend to submit are in
									accordance with the minimum and the
									faculty/departmental entry requirements of
									the Polytechnic.
								</li>
								<li>
									That if at any time in future it is
									discovered that I do not possess the minimum
									entry requirements for the course as
									prescribed by the senate of the Polytechnic,
									the off of admission will be withdrawn.
								</li>{" "}
								<li>
									That I shall pay in subsequent years the
									same amount of consolidated fees which I am
									required to pay in my first year of study at
									Polytechnic.
								</li>
							</ul>
						</div>
						<div className={styles.listWrapper}>
							<span>B.</span>
							<div>
								<p>
									My academic qualifications are as follows:
								</p>
								<div className={styles.qualificationColumn}>
									<div className="w-100 h-100 ">
										<h3 className="w-100 align-items-center justify-content-center d-flex ">
											<span>*NCE</span>
										</h3>
										<div className="w-100">
											<div className="w-100">
												<span>EXAM. NO.</span>
												<span>YEAR</span>
											</div>
											{Array(5)
												.fill(0)
												.map((_, i) => (
													<div className="w-100">
														<span></span>
														<span></span>
													</div>
												))}
										</div>
									</div>
									<div className="w-100 h-100 ">
										<h3 className="w-100 align-items-center justify-content-center d-flex ">
											<span>*GCE/WASC</span>
										</h3>
										<div className="w-100">
											<div className="w-100">
												<span>EXAM. NO.</span>
												<span>YEAR</span>
											</div>
											{Array(5)
												.fill(0)
												.map((_, i) => (
													<div className="w-100">
														<span></span>
														<span></span>
													</div>
												))}
										</div>
									</div>
									<div className="w-100 h-100 ">
										<h3 className="w-100 align-items-center justify-content-center d-flex ">
											<span>*DIP/ACE/TCII</span>
										</h3>
										<div className="w-100">
											<div className="w-100">
												<span>EXAM. NO.</span>
												<span>YEAR</span>
											</div>
											{Array(5)
												.fill(0)
												.map((_, i) => (
													<div className="w-100">
														<span></span>
														<span></span>
													</div>
												))}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.listWrapper}>
							<span>C.</span>
							<div>
								<p>
									My academic qualifications are as follows:
								</p>
								<p>
									COURSE TO WHICH ADMITTED:{" "}
									<b>
										{
											details?.data?.programmeDetail
												?.schoolProgramme
										}
									</b>
								</p>
								<p>
									DEPARTMENT OF :{" "}
									<b>
										{
											details?.data?.programmeDetail
												?.department
										}
									</b>
								</p>
							</div>
						</div>
					</div>

					<p>
						I certify, on my honour, that the above statements are
						true and there fore correct.
					</p>
				</section>
				{/* footer */}
				<section
					className={`${styles.comment} d-flex justify-content-between w-100`}
				>
					<div className="d-flex ">
						{" "}
						<p className="mr-2">Signature</p>
						<div>_____________________</div>
					</div>
					<div className="d-flex ">
						{" "}
						<p className="mr-2">Date</p>
						<div>_________________________</div>
					</div>
				</section>
			</main>
		</div>
	);
});

export default Form2;
