import React, { forwardRef } from "react";
import PrintOutLogo from "../printOutLogo/printOutLogo";
import styles from "./styles.module.css";
const Form5 = forwardRef(({ details }, ref) => {

	return (
		<div className={styles.content} ref={ref}>
			<header className={`${styles.header} mt-4 w-100 `}>
				<div className="d-flex justify-content-center">
					<PrintOutLogo
						office={"CLASS ADMIT CARD"}
						indexing={"FORM R/REG.05"}
						showBorderBottom={true}
						showBorderBottomSub={true}
					/>
				</div>
			</header>
			<main className={`${styles.page_content} pt-0`}>
				{/* body  */}
				<section className={`${styles.body}`}>
					<div className="d-flex justify-content-center">
						<p className="text-uppercase">
							{details?.data?.currentSession?.session?.name} session
						</p>
					</div>
					<div className={`d-flex mt-2 justify-content-between`}>
						<aside className="pt-5">
							<div className="d-flex align-items-start">
								<p> NAME:</p>
								<div className="d-flex flex-column align-items-center justify-content-center  pt-0 ml-2">
									<p className="">
										<b>
											{
												details?.data?.admissionList
													?.lastname
											}
										</b>{" "}
									</p>
									<i style={{ margin: "0rem auto" }}>
										(Surname)
									</i>
								</div>{" "}
								<div className="d-flex flex-column align-items-center justify-content-center  pt-0 ml-5">
									<p className=" " style={{ height: "30px" }}>
										<b>
											{`${details?.data?.admissionList?.middlename} ${details?.data?.admissionList?.firstname}  `}
										</b>
									</p>
									<i style={{ margin: "0rem auto" }}>
										(Other Names)
									</i>
								</div>
							</div>

							<p className="mt-1">
								DEPARTMENT:{" "}
								<b>
									{details?.data?.programmeDetail.department}
								</b>
							</p>
							<div className="d-flex ">
								<p className=" mt-1">
									REG. NO:{" "}
									<b>
										{
											details?.data?.programmeDetail
												.jambRegNumber
										}
									</b>{" "}
								</p>
								<p className=" mt-1 ml-4">
									Sex:{" "}
									<b>{details?.data?.personalData?.gender}</b>{" "}
								</p>
							</div>
							<div className="d-flex align-items-start mt-4">
								<p> Area of Specialization</p>
								<div className="d-flex flex-column align-items-center justify-content-center  pt-0 ml-2">
									<p className="">
										{details?.data?.admissionList?.departmentOption}
									</p>
									<i style={{ margin: "0rem auto" }}>
										(if any)
									</i>
								</div>{" "}
							</div>
						</aside>
						<aside className={styles.passportColumn}>
							<img src={details?.data?.personalData?.passport} alt="Passport of the Student" />
						</aside>
					</div>

					<div className="pt-2 pr-4 ">
						<p>Year of Study: {details?.data?.programmeDetail?.level}</p>
						<p>
							Course No/Title __________________________ Units
							____________ Semester ________________
						</p>
						<p className="mt-2">
							Signature of Student
							________________________________ Date
							__________________________
						</p>
					</div>
					<div className="pt-5 pr-4 ">
						<p>
							Name of Faculty Officer
							___________________________________________________________________
						</p>
						<p className="mt-2">
							{" "}
							Signature ___________________________________ Date
							_____________________________
						</p>
					</div>
					<div className="pt-5 pr-4 ">
						<p>
							Name of Lecturer
							___________________________________________________________________
						</p>
						<p className="mt-2">
							{" "}
							Signature ___________________________________ Date
							_____________________________
						</p>
					</div>
				</section>
			</main>
		</div>
	);
});

export default Form5;
