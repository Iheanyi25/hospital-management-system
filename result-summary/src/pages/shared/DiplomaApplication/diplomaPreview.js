import { ApplicationPreviewWrapper } from "../ApplicationPreviewWrapper";
import styles from "./style.module.css";
import { useSelector } from "react-redux";

const DiplomaPreview = () => {
	const { basicInformation, programme } = useSelector(
		(state) => state.diplomaData
	);

	return (
		<div>
			<ApplicationPreviewWrapper
				// componentRef={componentRef}
				userDetails={{
					fullname: `${basicInformation?.lastname} ${basicInformation?.firstname}`,
					passport: basicInformation?.passport
				}}
				previewHeader={`OFFICE OF THE REGISTRAR - Diploma Application Printout`}
				noHeader
			>
				<div className={`${styles.preview_container} px-4`}>
					<h4 className="mb-4">Personal Infomation</h4>
					<div className={`row py-4 mb-4 ${styles.divider}`}>
						<div className="col-lg-6">
							<div className="d-flex gap-2 mb-3 align-items-center">
								<h5>Form No</h5>
								<p>
									{basicInformation?.applicationNumber ?? "-"}
								</p>
							</div>
							<div className="d-flex gap-2 mb-3 align-items-center">
								<h5>Surname</h5>
								<p>{basicInformation?.surname ?? "-"}</p>
							</div>
							<div className="d-flex gap-2 mb-3 align-items-center">
								<h5>Firstname</h5>
								<p>{basicInformation?.firstname ?? "-"}</p>
							</div>
							<div className="d-flex gap-2 mb-3 align-items-center">
								<h5>Other Name</h5>
								<p>{basicInformation?.middlename ?? "-"}</p>
							</div>
							<div className="d-flex gap-2 mb-3 align-items-center">
								<h5>Sex</h5>
								<p>{basicInformation?.gender?.label ?? "-"}</p>
							</div>
							<div className="d-flex gap-2 mb-3 align-items-center">
								<h5>Date Of Birth</h5>
								<p>{basicInformation?.dateOfBirth ?? "-"}</p>
							</div>
							<div className="d-flex gap-2 mb-3 align-items-center">
								<h5>Country</h5>
								<p>{basicInformation?.country?.label ?? "-"}</p>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="d-flex gap-2 mb-3 align-items-center">
								<h5>State of origin</h5>
								<p>{basicInformation?.state?.label ?? "-"}</p>
							</div>
							<div className="d-flex gap-2 mb-3 align-items-center">
								<h5>LGA of origin</h5>
								<p>{basicInformation?.lga?.label ?? "-"}</p>
							</div>
							<div className="d-flex gap-2 mb-3 align-items-center">
								<h5>Email address</h5>
								<p>{basicInformation?.email ?? "-"}</p>
							</div>
							<div className="d-flex gap-2 mb-3 align-items-center">
								<h5>Mobile phone</h5>
								<p>{basicInformation?.mobileNumber ?? "-"}</p>
							</div>
							<div className="d-flex gap-2 mb-3 align-items-center">
								<h5>Address</h5>
								<p>{basicInformation?.contactAddress ?? "-"}</p>
							</div>
						</div>
					</div>
					<section
						className={`row mt-3 py-4 mb-4  ${styles.divider}`}
					>
						<h4 className="mb-4">Diploma Course</h4>
						<div className="row">
							<div className="col-lg-6">
								<div className="d-flex gap-2 mb-3 align-items-center">
									<h5>Course</h5>
									<p>{programme?.department?.label}</p>
								</div>
							</div>
							{programme?.departmentOption && (
								<div className="col-lg-6">
									<div className="d-flex gap-2 mb-3 align-items-center">
										<h5>Course Option</h5>
										<p>
											{programme?.departmentOption.label}
										</p>
									</div>
								</div>
							)}
						</div>
					</section>
					{/* <section
						className={`row align-items-center mt-3 py-4 mb-4  ${styles.divider}`}
					>
						<h4 className="mb-2">O-Level Result</h4>
						<div className="row mx-2 justify-content-between">
							{sittings &&
								sittings?.map((item, index) => (
									<div
										className="col-lg-6 col-sm-6"
										key={index}
									>
										<h5
											style={{
												color: "var(--text-black"
											}}
										>
											{index === 0
												? "First Sitting"
												: "Second Sitting"}
										</h5>
										<div className="d-flex align-items-center gap-3 my-3">
											<h5 className="col-4">Exam Type</h5>
											<p className="col-4">
												{item?.oLevelType?.label}
											</p>
										</div>
										<div className="d-flex align-items-center gap-3 my-3">
											<h5 className="col-4">
												Exam Number
											</h5>
											<p className="col-4">
												{item?.examNumber}
											</p>
										</div>
										<div className="d-flex align-items-center gap-3 my-3">
											<h5 className="col-4">Exam Year</h5>
											<p className="col-4">
												{item?.examYear?.label}
											</p>
										</div>
										<div className="d-flex align-items-center gap-3 my-3">
											<h5 className="col-4">
												Exam Center
											</h5>
											<p className="col-4">
												{item?.examCentre}
											</p>
										</div>
										<div className="row align-items-center  my-4">
											<div className="d-flex align-items-center gap-3 my-3">
												<h6
													className={`col-4 ${styles.grading}`}
												>
													Subject
												</h6>
												<h6
													className={`col-4 ${styles.grading}`}
												>
													Grade
												</h6>
											</div>
											{item?.subjects &&
												item?.subjects?.map(
													(item, index) => (
														<div
															key={index}
															className="d-flex align-items-center gap-3 my-2"
														>
															<p className="col-4">
																{
																	item
																		?.subject
																		?.label
																}
															</p>
															<p className="col-4">
																{
																	item?.grade
																		?.label
																}
															</p>
														</div>
													)
												)}
										</div>
									</div>
								))}
						</div>
					</section> */}

					<section className="row mt-3">
						<div
							className={`w-100 text-center ${styles.official_use} `}
						>
							<h3>OFFICIAL USE (TO BE COMPLETED BY STAFF)</h3>
						</div>
						<h4 className="my-5">
							Processed by Admissions Official
						</h4>
						<div className="d-flex my-4 gap-3 w-40 row">
							<h5 className="col-lg-2">Full Name</h5>
							<div className={`${styles.line} col-lg-4`} />
						</div>
						<div className="d-flex gap-3 my-4 align-items-end text-align-end row">
							<h5 className="col-lg-2">Result of Application</h5>
							<div className={`${styles.line} col-lg-4`}>
								<h4>SUCCESSFUL</h4>
							</div>
						</div>

						<div className="d-flex gap-3 my-4 row">
							<h5 className="col-lg-2">Comment</h5>
							<div className={`${styles.line} col-lg-4`} />
						</div>
						<div className="d-flex row">
							<div className="d-flex gap-3 my-4 row col-lg-4">
								<h5 className="col-6">Signature</h5>
								<div className={`${styles.line} col-4`} />
							</div>
							<div className="d-flex gap-3 my-4 row col-lg-4">
								<h5 className="col-lg-3">Date</h5>
								<div className={`${styles.line} col-lg-4 `} />
							</div>
						</div>
					</section>
				</div>
			</ApplicationPreviewWrapper>
		</div>
	);
};

export default DiplomaPreview;
