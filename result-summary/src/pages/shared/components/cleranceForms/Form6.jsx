import React, { forwardRef } from "react";
import PrintOutLogo from "../printOutLogo/printOutLogo";
import styles from "./styles.module.css";
const Form6 = forwardRef(({ data, details }, ref) => {
	const dobString = details?.data?.personalData?.dateOfBirth;
	const date = new Date(dobString);

	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear().toString();

	return (
		<div className={styles.content} ref={ref}>
			<header className={`${styles.header} mt-4 w-100 `}>
				<div className="d-flex justify-content-center">
					<PrintOutLogo
						office={"STUDENTS INFORMATION FORM (SIF)"}
						indexing={"FORM R/REG.06"}
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
							{details?.data?.admissionList?.session} session
						</p>
					</div>
					<div className={`d-flex mt-2 justify-content-between`}>
						<aside className="pt-5">
							<p className="mt-1">
								1. REGISTRATION NUMBER:{" "}
								<b>
									{
										details?.data?.programmeDetail
											?.matricNumber
									}
								</b>
							</p>
							<div className="d-flex align-items-start">
								<p> 2. NAME (MR/MRS/MISS)</p>
								<div className="d-flex flex-column align-items-center justify-content-center  pt-0 ml-2">
									<b className="">
										{details?.data?.personalData?.lastname}
									</b>
									<p
										style={{
											margin: "0rem auto",
											fontSize: "14px"
										}}
									>
										SURNAME
									</p>
								</div>{" "}
								<div className="d-flex flex-column align-items-center justify-content-center  pt-0">
									<b className="">
										{details?.data?.personalData?.firstname}
									</b>
									<p
										style={{
											margin: "0rem auto",
											fontSize: "14px"
										}}
									>
										FIRST NAME
									</p>
								</div>
								<div className="d-flex flex-column align-items-center justify-content-center  pt-0">
									<b className="">
										{
											details?.data?.personalData
												?.middlename
										}
									</b>
									<p
										style={{
											margin: "0rem auto",
											fontSize: "14px"
										}}
									>
										MIDDLE NAME
									</p>
								</div>
							</div>
							<div className="d-flex flex-column align-items-center justify-content-center pt-5 ml-2">
								<p className="">
									---------------------------------------------
								</p>
								<p
									style={{
										margin: "0rem auto",
										fontSize: "14px"
									}}
								>
									FORMER SURNAME (IF ANY)
								</p>
							</div>{" "}
						</aside>
					</div>
					<div className="d-flex align-items-center gap-3 mt-5">
						3.{" "}
						<p className="d-flex align-items-center gap-2 ml-0">
							SEX{" "}
							<div
								className={styles.box}
								style={{
									width: "55px",
									display: "flex",
									justifyContent: "center",
									fontWeight: "bold"
								}}
							>
								{details?.data?.personalData?.gender}
							</div>{" "}
						</p>
						<div className="d-flex align-items-center">
							<p> 4. DATE OF BIRTH</p>
							<div className="d-flex flex-column align-items-center justify-content-center mt-2 pt-3 ml-2">
								<div className="d-flex">
									{/* <div className={styles.box}></div>
									<div className={styles.box}></div> */}
									<b className={styles.box}>{day}</b>
								</div>
								<p
									style={{
										margin: "0rem auto",
										fontSize: "14px"
									}}
								>
									DAY
								</p>
							</div>
							<div className="d-flex flex-column align-items-center justify-content-center mt-2 pt-3 ml-3">
								<div className="d-flex">
									{/* <div className={styles.box}></div>
									<div className={styles.box}></div> */}
									<b className={styles.box}>{month}</b>
								</div>
								<p></p>
								<p
									style={{
										margin: "0rem auto",
										fontSize: "14px"
									}}
								>
									MONTH
								</p>
							</div>{" "}
							<div className="d-flex flex-column align-items-center justify-content-center mt-2 pt-3 ml-3">
								<div className="d-flex">
									{/* <div className={styles.box}></div>
									<div className={styles.box}></div> */}
									<b className={styles.box}>{year}</b>
								</div>
								<p
									style={{
										margin: "0rem auto",
										fontSize: "14px"
									}}
								>
									YEAR
								</p>
							</div>
						</div>
						5. NATIONALITY: {details?.data?.personalData?.country}
					</div>
					<div className="d-flex align-items-start mt-3">
						<p> 6. PLACE OF BIRTH </p>
						<div className="d-flex flex-column align-items-center justify-content-center  pt-0 ml-2">
							<p className="">
								-----------------------------------------------------
							</p>
							<p
								style={{
									margin: "0rem auto",
									fontSize: "14px"
								}}
							>
								TOWN
							</p>
						</div>{" "}
						<div className="d-flex flex-column align-items-center justify-content-center  pt-0">
							<p className="">
								-----------------------------------------------------
							</p>
							<p
								style={{
									margin: "0rem auto",
									fontSize: "14px"
								}}
							>
								STATE
							</p>
						</div>
					</div>
					<div className="d-flex align-items-start mt-3">
						<p> 7. PLACE OF ORIGIN </p>
						<div className="d-flex flex-column align-items-center justify-content-center  pt-0 ml-2">
							<b className="">
								{details?.data?.personalData?.homeTown}
							</b>
							<p
								style={{
									margin: "0rem auto",
									fontSize: "14px"
								}}
							>
								TOWN
							</p>
						</div>{" "}
						<div className="d-flex flex-column align-items-center justify-content-center  pt-0">
							<b className="">
								{details?.data?.personalData?.state}
							</b>
							<p
								style={{
									margin: "0rem auto",
									fontSize: "14px"
								}}
							>
								STATE
							</p>
						</div>
						<div className="d-flex flex-column align-items-center justify-content-center  pt-0">
							<b className="">
								{details?.data?.personalData?.lga}
							</b>
							<p
								style={{
									margin: "0rem auto",
									fontSize: "14px"
								}}
							>
								L.G.A
							</p>
						</div>
					</div>
					<div className="d-flex align-items-start mt-3">
						<p className="mt-1"> 8. </p>
						<div className="d-flex flex-column align-items-start justify-content-center  pt-0 ml-2">
							<p className="d-flex align-items-center gap-2 ml-0">
								MARITAL STATUS{" "}
								<div className={styles.box}></div>{" "}
							</p>
							<p
								style={{
									margin: "0rem",
									fontSize: "11px"
								}}
							>
								ENTER APPROPRIATE LETTER
							</p>
						</div>
						<p className="mt-1 ml-3">
							(S-SINGLE<span className="ml-3"> </span> D-DIVORCED
							<span className="ml-3"> </span> M-MARRIED
							<span className="ml-3"> </span> W-WIDOW)
						</p>
					</div>
					<div className="d-flex align-items-start mt-3">
						<p className="mt-1"> 9. </p>
						<div className="d-flex flex-column align-items-start justify-content-center  pt-0 ml-2">
							<p className="d-flex align-items-center gap-2 ml-0">
								RELIGION <div className={styles.box}></div>{" "}
							</p>
							<p
								style={{
									margin: "0rem",
									fontSize: "11px"
								}}
							>
								ENTER APPROPRIATE LETTER
							</p>
						</div>
						<p className="mt-1 ml-3">
							(C-CHRITIANITY<span className="ml-3"> </span>{" "}
							T-TRADITIONAL <span className="ml-3"> </span>I-ISLAM{" "}
							<span className="ml-3"> </span>O-OTHERS )
						</p>
					</div>
					<div className="d-flex gap-1 align-items-start">
						<p>10.</p>
						<div>
							<p>ADDRESS</p>
							<p>
								{" "}
								(A) PERMANENT/HOME ADDRESS
								<b className="ml-2">
									{
										details?.data?.personalData
											?.permanentAddress
									}
								</b>
							</p>
						</div>
					</div>
					<div className="d-flex gap-1 align-items-start mt-1">
						<p>11. NEXT OF KIN</p>
						<div style={{ width: "520px" }}>
							<div className="d-flex justify-content-between align-items-center w-100 ">
								<p>NAME</p>
								<b className="">
									{details?.data?.nextOfKin?.fullname}
								</b>
							</div>
							<div className="d-flex justify-content-between align-items-center w-100 mt-1">
								<p>ADDRESS</p>
								<b className="">
									{details?.data?.nextOfKin?.address}
								</b>
							</div>
							<div className="d-flex justify-content-between align-items-center w-100 mt-1">
								<p>RELATIONSHIP</p>
								<b className="">
									{details?.data?.nextOfKin?.relationship}
								</b>
							</div>
							<div className="d-flex justify-content-between align-items-centert w-100 mt-1">
								<p>TELEPHONE</p>
								<b className="">
									{details?.data?.nextOfKin?.mobileNumber}
								</b>
							</div>
						</div>
					</div>
					<div className="d-flex gap-4 align-items-start mt-1">
						<p>12. SPONSOR</p>
						<div style={{ width: "520px" }}>
							<div className="d-flex justify-content-between align-items-center w-100 ">
								<p>NAME</p>
								<b className="">
									{details?.data?.sponsor?.fullname}
								</b>
							</div>
							<div className="d-flex justify-content-between align-items-center w-100 mt-1">
								<p>ADDRESS</p>
								<div>
									<b className="">
										{details?.data?.sponsor?.address}
									</b>
								</div>
							</div>
						</div>
					</div>
					<div className="d-flex gap-1 align-items-start mt-3">
						<p className=""> 13A.</p>
						<div>
							<p> MODE OF ENTRY</p>
							<div className="d-flex flex-column align-items-start justify-content-center  pt-0">
								<p className="d-flex align-items-center gap-2 ml-0">
									(FOR UNDERGRADS ONLY)
									{"   "}
									<b className="">
										{
											details?.data?.programmeDetail
												?.modeOfEntry
										}
									</b>
								</p>
								<div className="d-flex gap-2 ">
									<p
										style={{
											margin: "0rem",
											fontSize: "11px"
										}}
									>
										ENTER APPROPRIATE LETTER
									</p>
									<p
										style={{
											margin: "0rem ",
											fontSize: "11px",
											marginLeft: "7rem"
										}}
									>
										R-REMEDIAL U-UME D-DIRECT T-TRANSFER
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="d-flex gap-1 align-items-start mt-4">
						<p className=""> 13B.</p>
						<div>
							<p>IF TRANSFER, PREVIOUS INSTITUTION</p>
							<p>
								-----------------------------------------------------------------------------------------------------------
							</p>
						</div>
					</div>
					<br />
					<div className="d-flex align-items-start mt-3">
						<p className="mt-1"> 13C. </p>
						<div className="d-flex flex-column align-items-start justify-content-center  pt-0 ml-2">
							<p className="d-flex align-items-center gap-2 ml-0">
								PROGRAMME TYPE{" "}
								<div className={styles.box}></div>{" "}
							</p>
							<p
								style={{
									margin: "0rem",
									fontSize: "11px"
								}}
							>
								ENTER APPROPRIATE LETTER
							</p>
						</div>
						<p className="mt-1 ml-3">
							(F-FIRST DEGREE<span className="ml-3"> </span>{" "}
							D-DIP/CERT
							<span className="ml-3"> </span> H-PG DEGREE )
						</p>
					</div>
					<div className="d-flex align-items-start mt-3">
						<p className="mt-1"> 14. </p>
						<div className="d-flex flex-column align-items-start justify-content-center  pt-0 ml-2">
							<p className="d-flex align-items-center gap-2 ml-0">
								HIGHEST QUALIFICATION{" "}
								<div className={styles.box}></div>{" "}
							</p>
							<p
								style={{
									margin: "0rem",
									fontSize: "11px"
								}}
							>
								(ENTER APPROPRIATE NUMBER)
							</p>
						</div>
						<div
							className="d-flex flex-column"
							style={{ maxWidth: "500px" }}
						>
							<p className="mt-1 ml-3">
								(1. SSCE<span className="ml-2"> </span> 2.
								WASC/GCEOL
								<span className="ml-3"> </span> 3. TCIL/ACE{" "}
								<span className="ml-3"> </span> 4. HSC/GCE/A/L{" "}
								<span className="ml-3"> </span> 5. ND{" "}
								<span className="ml-3"> </span>6. HND{" "}
								<span className="ml-3"> </span> 7. NCE{" "}
								<span className="ml-3"> </span>8. BACHELOR'S
								DEGREE
								<span className="ml-3"> </span>9. PGD.{" "}
								<span className="ml-3"> </span> 10. MASTERS{" "}
								<span className="ml-3"> </span> 11. PH.D )
								<p>
									12. OTHERS PLEASE
									SPECIFY-------------------------
								</p>
							</p>
						</div>
					</div>
					<p className="mt-2">
						15. INSTITUTION WHERE OBTAINED
						---------------------------------------- DATE
						-------------------
					</p>
					<div className="d-flex align-items-start mt-2">
						<p> 16. SUJECT OF FIRST DEGREE</p>
						<div className="d-flex flex-column align-items-center justify-content-center  pt-0 ml-2">
							<p className="">
								-------------------------------------------------------------------------------
							</p>
							<p
								style={{
									margin: "0rem auto",
									fontSize: "14px"
								}}
							>
								(FOR POSTGRADUATE ONLY)
							</p>
						</div>{" "}
					</div>
					<p className="mt-2">
						17. YEAR OF ENTRY INTO PRESENT INSTITUTION
						--------------------------------------------------
					</p>{" "}
					<p className="mt-2">
						18. COLLEGE
						-----------------------------------------------------------------------------------------------------
					</p>{" "}
					<p className="mt-2">
						19. FACULTY/SCHOOL
						----------------------------------------------------------------------------------------
					</p>{" "}
					<p className="mt-2">
						20. DEPARTMENT/INSTITUTE
						------------------------------------------------------------------------------
					</p>{" "}
					<p className="mt-2">
						21. QUALIFICATION IN VIEW
						-------------------------------------------------------------------------------
					</p>
					<div className="d-flex align-items-start mt-3">
						<p className="mt-1"> 22. </p>
						<div className="d-flex flex-column align-items-start justify-content-center  pt-0 ml-2">
							<p className="d-flex align-items-center gap-2 ml-0">
								MODE OF STUDY <div className={styles.box}></div>{" "}
							</p>
							<p
								style={{
									margin: "0rem",
									fontSize: "11px"
								}}
							>
								(ENTER APPROPRIATE LETTER)
							</p>
						</div>
						<div
							className="d-flex flex-column pl-5"
							style={{ maxWidth: "500px" }}
						>
							<p className="mt-1 ml-3">
								(F-FULL TIME P-PART TIME (DAY))
							</p>
							<p className="mt-1 ml-3">(W-WEEKED E- EVENING)</p>{" "}
							<p className="mt-1 ml-3">
								(S-SANDWICH/LONG VACATION)
							</p>{" "}
							<p className="mt-1 ml-3">
								(O-OCCASIONAL X-EXCHANGE)
							</p>{" "}
							<p className="mt-1 ml-3">C-CORRESPONDENCE</p>
						</div>
					</div>
					<p className="mt-2">
						23. NORMAL COURSE DURATION
						----------------------------------------------------------------------
					</p>{" "}
					<p className="mt-2">
						24. EXTRA CURRICULAR ACTIVITIES
						-----------------------------------------------------------------
					</p>{" "}
					<div className="d-flex align-items-center">
						<p> 25. HEALTH STATUS</p>
						<div className="d-flex flex-column align-items-center justify-content-center mt-2 pt-3 ml-2">
							<div className="d-flex">
								<div className={styles.box}></div>
							</div>
							<p
								style={{
									margin: "0rem auto",
									fontSize: "14px"
								}}
							>
								NORMAL
							</p>
						</div>
						<div className="d-flex flex-column align-items-center justify-content-center mt-2 pt-3 ml-2">
							<div className="d-flex">
								<div className={styles.box}></div>
							</div>
							<p
								style={{
									margin: "0rem auto",
									fontSize: "14px"
								}}
							>
								DISABLE
							</p>
						</div>
					</div>
					<p className="mt-2">
						IF DISABLED, STATE TYPE
						-------------------------------------------------------------------------------------
					</p>{" "}
					<p className="mt-2">
						IF SPECIAL MEDICATIONS IS REQUIRED, STATE TYPE
						------------------------------------------------
					</p>
				</section>

				<div
					className={`${styles.comment} p-0 d-flex gap-4 justify-content-start w-100`}
				>
					<div className="d-flex flex-column align-items-center justify-content-center  pt-5">
						<p>
							------------------------------------------------------
						</p>
						<p style={{ margin: "0rem auto" }}>
							{" "}
							SIGNATURE OF STUDENT{" "}
						</p>
					</div>
					<div className="d-flex flex-column align-items-center justify-content-center  pt-5">
						<p>--------------------------------------------</p>
						<p style={{ margin: "0rem auto" }}>Date</p>
					</div>
				</div>
			</main>
		</div>
	);
});

export default Form6;
