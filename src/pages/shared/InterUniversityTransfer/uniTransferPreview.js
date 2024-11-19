import Avatar from "react-avatar";
import { shortDate } from "../../../utils/formatDate";
import styles from "./style.module.css";
import { TransferApplicationPreviewWrapper } from "./UniTransferStudents/components";

export const UniTransferPreview = ({ componentRef, formDetails }) => {
	const { personalInfoResponse, passport, oLevelResult, programmeInfo } =
		formDetails;

	return (
		<div>
			<TransferApplicationPreviewWrapper
				componentRef={componentRef}
				previewHeader={`${personalInfoResponse.session} INTER UNIVERSITY TRANSFER ACKNOWLEDGEMENT SLIP`}
			>
				<div className={`${styles.preview_container} px-4`}>
					<div className="row">
						<h4 className="mb-2">Personal Information</h4>
						<div className="row">
							<div className="col-4">
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">Surname</p>
									<p className="col-8">
										{personalInfoResponse?.surname ?? "-"}
									</p>
								</div>
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">Firstname</p>
									<p className="col-8">
										{personalInfoResponse?.firstname ?? "-"}
									</p>
								</div>
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">
										Other Name
									</p>
									<p className="col-8">
										{personalInfoResponse?.middlename ??
											"-"}
									</p>
								</div>
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">Sex</p>
									<p className="col-8">
										{personalInfoResponse?.genderId
											?.label ?? "-"}
									</p>
								</div>
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">
										Date of birth
									</p>
									<p className="col-8">
										{shortDate(
											personalInfoResponse?.dateOfBirth
										) ?? "-"}
									</p>
								</div>
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">Country</p>
									<p className="col-8">
										{personalInfoResponse?.countryId?.label ?? "-"}
									</p>
								</div>
							</div>
							<div className="col-5">
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">
										State of origin
									</p>
									<p className="col-8">
										{personalInfoResponse?.stateId?.label ??
											"-"}
									</p>
								</div>
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">
										LGA of origin
									</p>
									<p className="col-8">
										{personalInfoResponse?.lgaId?.label ??
											"-"}
									</p>
								</div>
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">
										Email address
									</p>
									<p className="col-8">
										{
											personalInfoResponse?.email
											?? "-"}
									</p>
								</div>
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">
										Mobile phone
									</p>
									<p className="col-8">
										{
											personalInfoResponse?.mobileNumber
											?? "-"}
									</p>
								</div>
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">Address</p>
									<p className="col-8">
										{personalInfoResponse?.contactAddress ??
											"-"}
									</p>
								</div>
							</div>
							<div className={styles.image_wrapper}>
								<div className="d-flex justify-content-center align-items-center">
									<Avatar
										name={`${personalInfoResponse?.firstname} ${personalInfoResponse?.surname}`}
										size={180}
										round={false}
										className={styles.avatar}
										src={passport}
									/>
								</div>
							</div>
						</div>
					</div>
					<section className="row mt-5">
						<div className="col-6">
							<h4 className="mb-2">
								Candidate’s Current University Details
							</h4>
							<div className="row">
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">
										Present University
									</p>
									<p className="col-8">
										{programmeInfo?.presentUniversity ??
											"-"}
									</p>
								</div>
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">Faculty</p>
									<p className="col-8">
										{programmeInfo?.presentFaculty ?? "-"}
									</p>
								</div>
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">
										Department
									</p>
									<p className="col-8">
										{programmeInfo?.presentDepartment ??
											"-"}
									</p>
								</div>
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">
										Course of study
									</p>
									<p className="col-8">
										{programmeInfo?.presentCourseOfStudy ??
											"-"}
									</p>
								</div>
							</div>
						</div>
						<div className="col-6">
							<h4 className="mb-2">Proposed Course of Study</h4>
							<div className="row">
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">Faculty</p>
									<p className="col-8">
										{programmeInfo?.faculty ?? "-"}
									</p>
								</div>
								<div className="my-2 d-flex align-items-center">
									<p className="col-4 text-bold">
										Department
									</p>
									<p className="col-8">
										{programmeInfo?.department ?? "-"}
									</p>
								</div>
								{programmeInfo?.departmentOption && (
									<div className="my-2 d-flex align-items-center">
										<p className="col-4 text-bold">
											Department Option
										</p>
										<p className="col-8">
											{programmeInfo?.departmentOption ??
												"-"}
										</p>
									</div>
								)}
							</div>
						</div>
					</section>
					<section className="row align-items-center mt-5">
						<h4 className="mb-2">O-Level Result</h4>
						<div className="row mx-2 justify-content-between">
							{oLevelResult &&
								oLevelResult?.sittings?.map((item, index) => (
									<div className="col-6" key={index}>
										<h6
											style={{
												color: "var(--text-black"
											}}
											className="mt-3"
										>
											{index === 0
												? "First Sitting"
												: "Second Sitting"}
										</h6>
										<div className="d-flex align-items-center gap-3 my-3">
											<h6 className="col-4 p-0">
												Exam Type
											</h6>
											<p className="col-4">
												{item?.oLevelType?.label}
											</p>
										</div>
										<div className="d-flex align-items-center gap-3 my-3">
											<h6 className="col-4 p-0">
												Exam Number
											</h6>
											<p className="col-4">
												{item?.examNumber}
											</p>
										</div>
										<div className="d-flex align-items-center gap-3 my-3">
											<h6 className="col-4 p-0">
												Exam Year
											</h6>
											<p className="col-4">
												{item?.examYear?.label}
											</p>
										</div>
										<div className="d-flex align-items-center gap-3 my-3">
											<h6 className="col-4 p-0">
												Exam Center
											</h6>
											<p className="col-4">
												{item?.examCentre}
											</p>
										</div>
										<div className="row align-items-center  my-4">
											<div className="d-flex align-items-center gap-3 my-3">
												<h6
													className="col-4 p-0"
													style={{
														color: "var(--text-black"
													}}
												>
													Subject
												</h6>
												<h6
													className="col-4 p-0"
													style={{
														color: "var(--text-black"
													}}
												>
													Grade
												</h6>
											</div>
											{item?.subjects &&
												item?.subjects?.map(
													(item, index) => (
														<div
															key={index}
															className="d-flex align-items-baseline gap-3 my-2"
														>
															<p className="col-4 p-0 text-capitalize">
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
					</section>
				</div>
			</TransferApplicationPreviewWrapper>
		</div>
	);
};
