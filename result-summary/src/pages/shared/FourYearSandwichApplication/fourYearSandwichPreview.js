import { shortDate } from "../../../utils/formatDate";
import { ApplicationPreviewWrapper } from "../ApplicationPreviewWrapper";
import styles from "./style.module.css";

export const FourYearSandwichPreview = ({ componentRef, formDetails }) => {
	const {
		personalInfoResponse,
		applicationType,
		employmentResponse,
		programmeInfoResponse,
		session,
		passport
	} = formDetails;
	// const subjectAndGrade = olevelResponse?.map((item) =>
	// 	Object?.entries(item?.subjectGrade)
	// );
	const personalInfomation1 = [
		{
			title: "Surname",
			value: personalInfoResponse?.surname ?? "-"
		},
		{
			title: "Phone Number",
			value: personalInfoResponse?.mobileNumber ?? "-"
		},
		{
			title: "First Name",
			value: personalInfoResponse?.firstname ?? "-"
		},
		{
			title: "Email Address",
			value: personalInfoResponse?.email ?? "-"
		},
		{
			title: "Middle Name",
			value: personalInfoResponse?.middlename
				? personalInfoResponse?.middlename
				: "-"
		},
		{
			title: "Home Address",
			value: personalInfoResponse?.permanentAddress ?? "-"
		},
		{
			title: "Sex",
			value: personalInfoResponse?.gender ?? "-"
		},
		{
			title: "Contact Address",
			value: personalInfoResponse?.contactAddress ?? "-"
		},
		{
			title: "Date of Birth",
			value: shortDate(personalInfoResponse?.dateOfBirth) ?? "-"
		},
		{
			title: "Country",
			value: personalInfoResponse?.country ?? "-"
		},
		{
			title: "Marital Status",
			value: personalInfoResponse?.maritalStatus ?? "-"
		},
		{
			title: "LGA of Origin",
			value: personalInfoResponse?.lga ?? "-"
		},
		{
			title: "State of Origin",
			value: personalInfoResponse?.state ?? "-"
		},
		{
			title: "Application Number",
			value: personalInfoResponse?.applicationNumber ?? "-"
		}
	];

	const nextOfKinInfo = [
		{
			title: "NOK’s Fullname",
			value: personalInfoResponse?.sponsorFullName ?? "-"
		},
		{
			title: "NOK’s Address",
			value: personalInfoResponse?.sponsorContactAddress ?? "-"
		},
		{
			title: "NOK’s Mobile No",
			value: personalInfoResponse?.sponsorMobileNumber ?? "-"
		},
		{
			title: "NOK’s  Relationship",
			value: personalInfoResponse?.sponsorRelationship ?? "-"
		}
	];

	const programdetails = [
		{
			title: "Course",
			value: programmeInfoResponse?.department ?? "-"
		},
		{
			title: "Applied to the University Berfore?",
			value: personalInfoResponse?.appliedToUniversity
				? "Yes"
				: "No" ?? "-"
		},
		{
			title: "When",
			value: personalInfoResponse?.appliedToUniversityDate ?? "-"
		},
		{
			title: "Admitted",
			value: personalInfoResponse?.offeredAdmission ? "Yes" : "No" ?? "-"
		}
	];

	return (
		<div>
			<ApplicationPreviewWrapper
				componentRef={componentRef}
				userDetails={{
					fullname: `${personalInfoResponse?.surname} ${personalInfoResponse?.firstname}`,
					passport: passport
				}}
				previewHeader={`${session} ${applicationType} Acknowledgement Slip`}
				noHeader
			>
				<div className={`${styles.preview_container} px-4`}>
					<div className="row">
						<h4 className="mb-2">Personal Infomation</h4>
						{personalInfomation1.map((detail, index) => (
							<div
								className="col-6 my-2 d-flex align-items-center"
								key={index}
							>
								<p className="col-4 text-bold">
									{detail.title}
								</p>
								<p className="col-8">{detail.value}</p>
							</div>
						))}
					</div>
					<section className="row mt-3">
						<h4 className="mb-2">Next of Kin Details</h4>
						{nextOfKinInfo.map((detail, index) => (
							<div className="col-6">
								<div
									className="px-0 col-12 my-2 d-flex align-items-center"
									key={index}
								>
									<p className="col-4 text-bold">
										{detail.title}
									</p>
									<p className="col-8">{detail.value}</p>
								</div>
							</div>
						))}
					</section>
					<section className="row mt-5">
						<h4 className="mb-2">Sandwich Diploma Course</h4>
						{programdetails.map((detail, index) => (
							<div className="col-6">
								<div
									className="px-0  my-2 d-flex align-items-center"
									key={index}
								>
									<p className="col-4 text-bold">
										{detail.title}
									</p>
									<p className="col-8">{detail.value}</p>
								</div>
							</div>
						))}
					</section>
					{/* <section className="row align-items-center mt-3">
						<h4 className="mb-2">O-Level Result</h4>
						<div className="row mx-2 justify-content-between">
							{olevelResponse &&
								olevelResponse?.map((item, index) => (
									<div className="col-6" key={index}>
										<h6
											style={{
												color: "var(--text-black"
											}}
										>
											{index === 0
												? "First Sitting"
												: "Second Sitting"}
										</h6>
										<div className="d-flex align-items-center gap-3 my-3">
											<h6 className="col-4">Exam Type</h6>
											<p className="col-4">
												{item?.examinationType}
											</p>
										</div>
										<div className="d-flex align-items-center gap-3 my-3">
											<h6 className="col-4">
												Exam Number
											</h6>
											<p className="col-4">
												{item?.examNumber}
											</p>
										</div>
										<div className="d-flex align-items-center gap-3 my-3">
											<h6 className="col-4">Exam Year</h6>
											<p className="col-4">
												{item?.examYear}
											</p>
										</div>
										<div className="d-flex align-items-center gap-3 my-3">
											<h6 className="col-4">
												Exam Center
											</h6>
											<p className="col-4">
												{item?.examCenter}
											</p>
										</div>
										<div className="row align-items-center  my-4">
											<div className="d-flex align-items-center gap-3 my-3">
												<h6
													className="col-4"
													style={{
														color: "var(--text-black"
													}}
												>
													Subject
												</h6>
												<h6
													className="col-4"
													style={{
														color: "var(--text-black"
													}}
												>
													Grade
												</h6>
											</div>
											{subjectAndGrade &&
												subjectAndGrade?.[index]?.map(
													(item, index) => (
														<div
															key={index}
															className="d-flex align-items-center gap-3 my-2"
														>
															<p className="col-4">
																{item?.[0]}
															</p>
															<p className="col-4">
																{item?.[1]}
															</p>
														</div>
													)
												)}
										</div>
									</div>
								))}
						</div>
					</section> */}
					<section className="row mt-3 mb-5">
						<h4 className="mb-2">Employment History</h4>
						<div className="row px-4">
							<div className="col-3 my-2">
								<h6>Name and Location</h6>
							</div>
							<div className="col-3 my-2">
								<div className="row">
									<div className="col-6">
										<h6>From</h6>
									</div>
									<div className="col-6">
										<h6>To</h6>
									</div>
								</div>
							</div>
							<div className="col-3 my-2">
								<h6>Job Description</h6>
							</div>
							<div className="col-3 my-2">
								<h6>Reason for Leaving</h6>
							</div>
						</div>
						{employmentResponse?.map((detail, index) => (
							<div className="row px-4" key={index}>
								<div className="col-3 my-2">
									<p>{detail.employer}</p>
								</div>
								<div className="col-3 my-2">
									<div className="row">
										<div className="col-6">
											<p>{shortDate(detail.yearFrom)}</p>
										</div>
										<div className="col-6">
											<p>
												{detail.currentlyWorkingHere
													? "Currently work here"
													: shortDate(detail.yearTo)}
											</p>
										</div>
									</div>
								</div>
								<div className="col-3 my-2">
									<p>{detail.jobDescription}</p>
								</div>
								<div className="col-3 my-2">
									<p>{detail.reasonForLeaving}</p>
								</div>
							</div>
						))}
					</section>
				</div>
			</ApplicationPreviewWrapper>
		</div>
	);
};
