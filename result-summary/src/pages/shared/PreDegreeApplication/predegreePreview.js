import { formatDateFromAPI } from "../../../utils/formatDate";
import { ApplicationPreviewWrapper } from "../ApplicationPreviewWrapper";
import styles from "./style.module.css";

const PredegreePreview = ({ componentRef, details }) => {
	const {
		personalInfoResponse,
		programmeInfoResponse,
		olevelResponse,
		qualificationDetailResponse,
		passport
	} = details ?? {};
	const subjectAndGrade = olevelResponse?.map((item) =>
		Object?.entries(item?.subjectGrade)
	);

	return (
		<ApplicationPreviewWrapper
			userDetails={{
				name: `${personalInfoResponse?.surname} ${personalInfoResponse?.firstname} `,
				passport
			}}
			previewHeader={`${
				personalInfoResponse?.session ?? ""
			} PRE-DEGREE APPLICATION SLIP`}
			footerStyle={" justify-content-center"}
			componentRef={componentRef}
		>
			<div
				className={`${styles.preview_container} p-4`}
				ref={componentRef}
			>
				<section className="row align-items-center mt-5">
					<h4 className="mb-2">Personal Information</h4>
					<div className="row align-items-start justify-content-between">
						<div className="col-12 col-md-6 my-2">
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4 ">Fullname</h6>
								<p className="col-6 text-left">{`${personalInfoResponse?.surname} ${personalInfoResponse?.firstname} ${personalInfoResponse?.middlename}`}</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Gender</h6>
								<p className="col-6 text-left">
									{personalInfoResponse?.gender}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Date of birth</h6>
								<p className="col-6 text-left">
									{personalInfoResponse?.dateOfBirth
										? formatDateFromAPI(
												personalInfoResponse?.dateOfBirth
										  )
										: "N/A"}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">State of origin</h6>
								<p className="col-6 text-left">
									{personalInfoResponse?.state}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Address</h6>
								<p className="col-6 text-left">
									{personalInfoResponse?.contactAddress}
								</p>
							</div>
						</div>
						<div className="col-12 col-md-6 my-2">
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Marital Status</h6>
								<p className="col-6 text-left">
									{personalInfoResponse?.maritalStatus}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Religion</h6>
								<p className="col-6 text-left">
									{personalInfoResponse?.religion}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Email address</h6>
								<p className="col-6 text-left">
									{personalInfoResponse?.email}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Mobile phone</h6>
								<p className="col-6 text-left">
									{personalInfoResponse?.mobileNumber}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Country of Origin</h6>
								<p className="col-6 text-left">
									{personalInfoResponse?.country}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">LGA of origin</h6>
								<p className="col-6 text-left">
									{personalInfoResponse?.lga}
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="row align-items-center mt-5">
					<h4 className="mb-2">Programme Details</h4>
					<div className="row align-items-center justify-content-between">
						<div className="col-12 col-md-6 my-2">
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Faculty</h6>
								<p className="col-10 text-left">
									{programmeInfoResponse?.faculty}
								</p>
							</div>
							<div className="d-flex align-items-baseline gap-3 my-3">
								<h6 className="col-4">Department</h6>
								<p className="col-10 text-left">
									{programmeInfoResponse?.department}
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="d-flex flex-column mt-5">
					<h4 className="mb-3">Academic Background</h4>
					<div className="d-flex align-items-start">
						<div className="col-3">
							<h6 className="text-left">Institution Attended</h6>
						</div>
						{/* <div className="col-3 ">
							<p>Major Field</p>
						</div> */}
						<div className="col-2">
							<h6 className="text-left">From</h6>
						</div>
						<div className="col-2">
							<h6 className="text-left">To</h6>
						</div>
						<div className="col-3">
							<h6 className="text-left">
								Qualification Obtained
							</h6>
						</div>
					</div>
					{qualificationDetailResponse.map((detail, index) => (
						<div className="d-flex mt-2" key={index}>
							<div className="col-3">
								<p className="text-left">{detail.schoolName}</p>
							</div>
							{/* <div className="col-3">
								<p>{detail.majorField}</p>
							</div> */}
							<div className="col-2">
								<p className="text-left">{detail.yearFrom}</p>
							</div>
							<div className="col-2">
								<p className="text-left">{detail.yearTo}</p>
							</div>
							<div className="col-3">
								<p className="text-left">
									{detail.certificate}
								</p>
							</div>
						</div>
					))}
				</section>
				<section className="row align-items-center mt-5">
					<h4 className="mb-2">O-Level Result</h4>
					<div className="row align-items-center justify-content-between">
						{olevelResponse &&
							olevelResponse?.map((item, index) => (
								<div
									className="col-12 col-md-6 my-2"
									key={index}
								>
									<h5>
										{index === 0
											? "First Sitting"
											: "Second Sitting"}
									</h5>
									<div className="d-flex align-items-baseline gap-3 my-3">
										<h6 className="col-4">Exam Type</h6>
										<p className="col-4 text-left">
											{item?.examinationType}
										</p>
									</div>
									<div className="d-flex align-items-baseline gap-3 my-3">
										<h6 className="col-4">Exam Number</h6>
										<p className="col-4 text-left">
											{item?.examNumber}
										</p>
									</div>
									<div className="d-flex align-items-baseline gap-3 my-3">
										<h6 className="col-4">Exam Year</h6>
										<p className="col-4 text-left">
											{item?.examYear}
										</p>
									</div>
									<div className="d-flex align-items-baseline gap-3 my-3">
										<h6 className="col-4">Exam Center</h6>
										<p className="col-4 text-left">
											{item?.examCenter}
										</p>
									</div>
									<div className="row align-items-center  my-5">
										<div className="d-flex align-items-baseline gap-3 mt-5">
											<h5 className="col-4">Subject</h5>
											<h5 className="col-4">Grade</h5>
										</div>
										{subjectAndGrade &&
											subjectAndGrade?.[index]?.map(
												(item, index) => (
													<div
														key={index}
														className="d-flex align-items-baseline gap-3 my-2"
													>
														<p className="col-4 text-left">
															{item?.[0]}
														</p>
														<p className="col-4 text-left">
															{item?.[1]}
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
		</ApplicationPreviewWrapper>
	);
};

export default PredegreePreview;
