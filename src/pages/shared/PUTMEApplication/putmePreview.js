import { formatDateFromAPI } from "../../../utils/formatDate";
import { ApplicationPreviewWrapper } from "../ApplicationPreviewWrapper";
import styles from "./style.module.css";

const PUTMEPreview = ({ componentRef, details }) => {
	const {
		putmePersonalInfoResponse,
		putmeProgrammeInfoResponse,
		putmeOlevelResponse,
		regNumber,
		passport
	} = details ?? {};
	const subjectAndGrade = putmeOlevelResponse?.map((item) =>
		Object?.entries(item?.subjectGrade)
	);

	return (
		<ApplicationPreviewWrapper
			userDetails={{
				name: `${putmePersonalInfoResponse?.surname} ${putmePersonalInfoResponse?.firstname} `,
				passport
			}}
			previewHeader={`${
				putmePersonalInfoResponse?.session ?? ""
			} PUTME APPLICATION SLIP`}
			footerStyle={" justify-content-center"}
			footerContent={
				<div className="text-bold text-uppercase">
					<span className="text-danger">IMPORTANT:</span> YOU WILL BE
					CONTACTED VIA SMS AND EMAIL FOR YOUR SCREENING DATE
				</div>
			}
			componentRef={componentRef}
		>
			<div
				className={`${styles.preview_container} p-4`}
				ref={componentRef}
			>
				<section className="row align-items-center mt-3">
					<h4 className="mb-2">Personal Information</h4>
					<div className="row align-items-center justify-content-between">
						<div className="col-12 col-md-6 my-2">
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-4">Fullname</h6>
								<p className="col-4">{`${putmePersonalInfoResponse?.surname} ${putmePersonalInfoResponse?.firstname} ${putmePersonalInfoResponse?.middlename}`}</p>
							</div>
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-4">Gender</h6>
								<p className="col-4">
									{putmePersonalInfoResponse?.gender}
								</p>
							</div>
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-4">Date of birth</h6>
								<p className="col-4">
									{putmePersonalInfoResponse?.dateOfBirth
										? formatDateFromAPI(
												putmePersonalInfoResponse?.dateOfBirth
										  )
										: "N/A"}
								</p>
							</div>
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-4">State of origin</h6>
								<p className="col-4">
									{putmePersonalInfoResponse?.state}
								</p>
							</div>
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-4">Address</h6>
								<p className="col-4">
									{putmePersonalInfoResponse?.contactAddress}
								</p>
							</div>
						</div>
						<div className="col-12 col-md-6 my-2">
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-4">Email address</h6>
								<p className="col-4">
									{putmePersonalInfoResponse?.email}
								</p>
							</div>
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-4">Mobile phone</h6>
								<p className="col-4">
									{putmePersonalInfoResponse?.mobileNumber}
								</p>
							</div>
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-4">Country of Origin</h6>
								<p className="col-4">
									{putmePersonalInfoResponse?.country}
								</p>
							</div>
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-4">LGA of origin</h6>
								<p className="col-4">
									{putmePersonalInfoResponse?.lga}
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="row align-items-center mt-3">
					<h4 className="mb-2">JAMB Details</h4>
					<div className="row align-items-center justify-content-between">
						<div className="col-12 col-md-6 my-2">
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-4">Faculty</h6>
								<p className="col-4">
									{putmeProgrammeInfoResponse?.faculty}
								</p>
							</div>
							<div className="d-flex align-items-center gap-3 my-3">
								<h6 className="col-4">Department</h6>
								<p className="col-4">
									{putmeProgrammeInfoResponse?.department}
								</p>
							</div>
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-4">JAMB Score</h6>
								<p className="col-4">
									{putmeProgrammeInfoResponse?.utmeScore}
								</p>
							</div>
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-4">JAMB Reg No</h6>
								<p className="col-4">{regNumber}</p>
							</div>
						</div>
						<div className="col-12 col-md-6 my-2">
							<div className="d-flex align-items-center  gap-3 my-3">
								<h6 className="col-4">First Subject</h6>
								<p className="col-4">
									{putmeProgrammeInfoResponse?.firstSubject}
								</p>
							</div>
							<div className="d-flex align-items-center gap-3 my-3">
								<h6 className="col-4">Second Subject</h6>
								<p className="col-4">
									{putmeProgrammeInfoResponse?.secondSubject}
								</p>
							</div>
							<div className="d-flex align-items-center gap-3 my-3">
								<h6 className="col-4">Third Subject</h6>
								<p className="col-4">
									{putmeProgrammeInfoResponse?.thirdSubject}
								</p>
							</div>
							<div className="d-flex align-items-center gap-3 my-3">
								<h6 className="col-4">Fourth Subject</h6>
								<p className="col-4">
									{putmeProgrammeInfoResponse?.fourthSubject}
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="row align-items-center mt-3">
					<h4 className="mb-2">O-Level Result</h4>
					<div className="row align-items-center justify-content-between">
						{putmeOlevelResponse &&
							putmeOlevelResponse?.map((item, index) => (
								<div
									className="col-12 col-md-6 my-2"
									key={index}
								>
									<h5>
										{index === 0
											? "First Sitting"
											: "Second Sitting"}
									</h5>
									<div className="d-flex align-items-center gap-3 my-3">
										<h6 className="col-4">Exam Type</h6>
										<p className="col-4">
											{item?.olevelType}
										</p>
									</div>
									<div className="d-flex align-items-center gap-3 my-3">
										<h6 className="col-4">Exam Number</h6>
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
										<h6 className="col-4">Exam Center</h6>
										<p className="col-4">
											{item?.examCenter}
										</p>
									</div>
									<div className="row align-items-center  my-4">
										<div className="d-flex align-items-center gap-3 my-3">
											<h5 className="col-4">Subject</h5>
											<h5 className="col-4">Grade</h5>
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
				</section>
			</div>
		</ApplicationPreviewWrapper>
	);
};

export default PUTMEPreview;
