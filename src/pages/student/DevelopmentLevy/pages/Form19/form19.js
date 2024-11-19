import React, { useContext } from "react";
import styles from "./style.module.css";
import { ProfileContext } from "../../../../../ui_elements";
import { PrintOutLogo } from "../DocumentPage/components/logo";
import { formatDateFromAPI } from "../../../../../utils/formatDate";

const Form19 = ({ componentRef }) => {
	const data = useContext(ProfileContext);

	return (
		<div className={styles.container} ref={componentRef}>
			<div className={styles.header}>
				<PrintOutLogo
					office={"VALIDITY FORM  - UNDERGRADUATE ADMISSION"}
				/>
			</div>
			<span className={styles.header_instruction}>
				Two copies of this form should be duly completed by all the
				candidates admitted in this university and returned with the
				Letter of Acceptance for Provisional Admission to THE REGISTRAR
				(ADMISSIONS) not later than two weeks from date of issue.
			</span>
			<div className={`${styles.form_wrapper} text-uppercase`}>
				<div className={styles.section}>
					<h3 className={styles.section_header}>
						1. COURSE OF STUDY
					</h3>
					<div className={`${styles.section_content} flex-row`}>
						<div className={styles.course_content_wrapper}>
							<div className={styles.section_entry}>
								<p>Faculty:</p>
								<p>
									{
										data?.profileData?.programmeDetail
											?.faculty
									}
								</p>
							</div>
							<div className={styles.section_entry}>
								<p>Department:</p>
								<p>
									{
										data?.profileData?.programmeDetail
											?.department
									}
								</p>
							</div>
							<div className={styles.section_entry}>
								<p>Jamb Reg No:</p>
								<p>
									{
										data?.profileData?.programmeDetail
											?.jambRegNumber
									}
								</p>
							</div>
							<div className={styles.section_entry}>
								<p>Mode of Admission (Tick):</p>
								<div className="d-flex align-items-center gap-10">
									<div
										className={`${styles.checkBox_wrapper} mr-4`}
									>
										<div className={styles.checkBox} />
										<p>Merit</p>
									</div>
									<div className={styles.checkBox_wrapper}>
										<div className={styles.checkBox} />
										<p>Supplementary</p>
									</div>
								</div>
							</div>
						</div>
						<img
							src={data?.profileData?.personalData?.passport}
							alt={"profile_pic"}
							className={styles.profile_pic}
						/>
					</div>
				</div>

				<div className={styles.section}>
					<h3 className={styles.section_header}>
						2. PERSONAL INFORMATION
					</h3>
					<div className={styles.section_content}>
						<div className={styles.section_entry}>
							<p>SURNAME:</p>
							<p>{data?.profileData?.personalData?.lastname}</p>
						</div>
						<div className={styles.section_entry}>
							<p>OTHERNAMES:</p>
							<p>
								{data?.profileData?.personalData?.firstname}{" "}
								{data?.profileData?.personalData?.middlename}
							</p>
						</div>
						<div className={styles.section_entry}>
							<p>HOME/PERMANENT ADDRESS:</p>
							<p>
								{
									data?.profileData?.personalData
										?.contactAddress
								}
							</p>
						</div>
						<div className={styles.section_entry}>
							<p>PHONE NUMBER:</p>
							<p>
								{data?.profileData?.personalData?.mobileNumber}
							</p>
						</div>
						<div className={styles.section_entry}>
							<p>POSTAL ADDRESS: (If different from above):</p>
							<p>
								...................................................................................
							</p>
						</div>
						<div className={styles.section_entry}>
							<p>DATE OF BIRTH:</p>
							<p>
								{formatDateFromAPI(
									data?.profileData?.personalData?.dateOfBirth
								)}
							</p>
						</div>
						{/* <div className={styles.section_entry}>
							<p>AGE:</p>
							<p>agriculture and agriculture technology</p>
						</div> */}
						{/* <div className={styles.section_entry}>
							<p>PLACE OF BIRTH:</p>
							<p>agriculture and agriculture technology</p>
						</div> */}
						<div className={styles.section_entry}>
							<p>STATE:</p>
							<p>{data?.profileData?.personalData?.state}</p>
						</div>
						<div className={styles.section_entry}>
							<p>LGA:</p>
							<p>{data?.profileData?.personalData?.lga}</p>
						</div>
						<div className={styles.section_entry}>
							<p>NATIONALITY:</p>
							<p>{data?.profileData?.personalData?.country}</p>
						</div>
						<div className={styles.section_entry}>
							<p>NAME AND ADDRESS OF PARENT/GUARDIAN:</p>
							<p>{data?.profileData?.sponsor?.fullname}</p>
						</div>
						<div className={styles.section_entry}>
							<p>PHONE NUMBER OF PARENT/GUARDIAN:</p>
							<p>{data?.profileData?.sponsor?.mobileNumber}</p>
						</div>
						<div className={styles.section_entry}>
							<p>EMAIL:</p>
							<p className="text-lowercase">
								{data?.profileData?.sponsor?.email}
							</p>
						</div>
						<div className={styles.section_entry}>
							<p>PERSON TO CONTACT IN CASE OF EMERGENCY:</p>
							<p>
								...................................................................................
							</p>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<h3 className={styles.section_header}>3. ACCOMODATION</h3>
					<div className={styles.section_content}>
						<div className={`d-flex w-100`}>
							<div className={`${styles.checkBox_wrapper} mr-5`}>
								<div className={styles.checkBox} />
								<p>Interest in on-Campus Residence</p>
							</div>
							<div className={styles.checkBox_wrapper}>
								<div className={styles.checkBox} />
								<p>Interest in off-Campus Residence</p>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.section}>
					<h3 className={styles.section_header}>
						4. EXTRA CURRICULAR ACTIVITIES
					</h3>
					<div className={styles.section_content}>
						<div className={`d-flex w-100`}>
							<div className={`${styles.checkBox_wrapper} mr-5`}>
								<div className={styles.checkBox} />
								<p>SPORTS (State them)</p>
							</div>
							<p>
								.....................................................
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className={`d-flex flex-column w-100`}>
				<h3
					className={`${styles.section_header} m-auto mt-5 text-uppercase`}
				>
					Declaration
				</h3>
				<p className={styles.declaration_text}>
					I am grateful to the vice chancellor for the admission and
					hereby undertake as a student of FUTO to observe and comply
					with all ordinances and regulations of the University as fas
					they concern me.
				</p>
				<div className="d-flex align-items-center mt-4">
					<p className={`${styles.declaration_text}`}>
						Signature:
						....................................................
					</p>
					<p className={`${styles.declaration_text}`}>
						Date:......................................................................
					</p>
				</div>
			</div>
			<div className={styles.office_sect_wrapper}>
				<h3
					className={`${styles.section_header} m-auto mt-5 text-uppercase`}
				>
					FOR OFFICE USE ONLY
				</h3>
				<div className={styles.office_entry_wrapper}>
					<p className={styles.declaration_text}>
						Year of Admission:
					</p>
					<p>
						____________________________________________________________________________________________________________________________________
					</p>
				</div>
				<div className={styles.office_entry_wrapper}>
					<p className={styles.declaration_text}>
						Acceptance/Dev Levy:
					</p>
					<div className={styles.levy_wrapper}>
						<div className={`${styles.checkBox_wrapper}`}>
							<div className={styles.checkBox} />
							<p>Paid</p>
						</div>
						<span>/</span>
						<div className={styles.checkBox_wrapper}>
							<div className={styles.checkBox} />
							<p>UnPaid</p>
						</div>
					</div>
				</div>
				<div className={styles.office_entry_wrapper}>
					<p className={styles.declaration_text}>Receipt No:</p>
					<p>
						____________________________________________________________________________________________________________________________________
					</p>
				</div>
				<div className={styles.office_entry_wrapper}>
					<p className={styles.declaration_text}>Verify By:</p>
					<p>
						____________________________________________________________________________________________________________________________________
					</p>
				</div>
			</div>
		</div>
	);
};

export default Form19;
