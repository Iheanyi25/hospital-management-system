import { formatDateFromAPI } from "../../../utils/formatDate";
import { ApplicationPreviewWrapper } from "../ApplicationPreviewWrapper";
import styles from "./style.module.css";

const NDPreview = ({ componentRef, details }) => {
	const {
		personalInfoResponse,
		programmeInfoResponse,
		olevelResponse,
		regNumber,
		passport
	} = details ?? {};
	const subjectAndGrade = olevelResponse?.map((item) =>
		Object?.entries(item?.subjectGrade)
	);

	const totalUTMEscore =
		programmeInfoResponse?.firstSubjectUtmeScore +
		programmeInfoResponse?.secondSubjectUtmeScore +
		programmeInfoResponse?.thirdSubjectUtmeScore +
		programmeInfoResponse?.fourthSubjectUtmeScore;

	return (
		<ApplicationPreviewWrapper
			userDetails={{
				name: `${personalInfoResponse?.surname} ${personalInfoResponse?.firstname} `,
				passport
			}}
			previewHeader={`${
				personalInfoResponse?.session ?? ""
			} ND APPLICATION SLIP`}
			footerStyle={" justify-content-center"}
			componentRef={componentRef}
		>
			<div
				className={`${styles.preview_container} p-4`}
				ref={componentRef}
			>
				<section className="row align-items-center mt-2">
					<h4 className="mb-2">Personal Information</h4>
					<div className="row justify-content-between">
						<div className="col-12 col-md-6 my-2">
							<div className="d-flex gap-3 my-2">
								<h6 className="col-4">Surname</h6>
								<p className="col-4">{`${personalInfoResponse?.surname}`}</p>
							</div>
							<div className="d-flex gap-3 my-2">
								<h6 className="col-4">First Name</h6>
								<p className="col-4">{`${personalInfoResponse?.firstname}`}</p>
							</div>
							<div className="d-flex gap-3 my-2">
								<h6 className="col-4">Middle Name</h6>
								<p className="col-4">{`${personalInfoResponse?.middlename}`}</p>
							</div>
							<div className="d-flex gap-3 my-2">
								<h6 className="col-4">Gender</h6>
								<p className="col-4">
									{personalInfoResponse?.gender}
								</p>
							</div>
							<div className="d-flex gap-3 my-2">
								<h6 className="col-4">Date of birth</h6>
								<p className="col-4">
									{personalInfoResponse?.dateOfBirth
										? formatDateFromAPI(
												personalInfoResponse?.dateOfBirth
										  )
										: "N/A"}
								</p>
							</div>

							<div className="d-flex gap-3 my-2">
								<h6 className="col-4">Phone Number</h6>
								<p className="col-4">
									{personalInfoResponse?.mobileNumber}
								</p>
							</div>
						</div>
						<div className="col-12 col-md-6 my-2">
							<div className="d-flex gap-3 my-2">
								<h6 className="col-4">Marital Status</h6>
								<p className="col-4">
									{personalInfoResponse?.maritalStatus}
								</p>
							</div>
							<div className="d-flex gap-3 my-2">
								<h6 className="col-4">Email address</h6>
								<p className="col-4">
									{personalInfoResponse?.email}
								</p>
							</div>
							<div className="d-flex  gap-3 my-3">
								<h6 className="col-4">Contact Address</h6>
								<p className="col-4">
									{personalInfoResponse?.contactAddress.slice(
										0,
										24
									)}
								</p>
							</div>
							<div className="d-flex gap-3 my-2">
								<h6 className="col-4">State of origin</h6>
								<p className="col-4">
									{personalInfoResponse?.state}
								</p>
							</div>
							<div className="d-flex gap-3 my-2">
								<h6 className="col-4">LGA of origin</h6>
								<p className="col-4">
									{personalInfoResponse?.lga}
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="row align-items-center mt-3">
					<h4 className="mb-2">Programme Details</h4>
					<div className="row justify-content-between">
						<div className="col-6 my-2">
							<div className="d-flex  gap-3 my-3">
								<h6 className="col-4">First Choice School</h6>
								<p className="col-4">
									{programmeInfoResponse?.faculty}
								</p>
							</div>

							<div className="d-flex gap-3 my-3">
								<h6 className="col-4">
									First Choice Programme
								</h6>
								<p className="col-4">
									{programmeInfoResponse?.department}
								</p>
							</div>
							{programmeInfoResponse?.departmentOption && (
								<div className="d-flex gap-3 my-3">
									<h6 className="col-4">
										First Choice Programme Option
									</h6>
									<p className="col-4">
										{
											programmeInfoResponse?.departmentOption
										}
									</p>
								</div>
							)}
						</div>{" "}
						{programmeInfoResponse?.alternativeDepartment && (
							<div className="col-6 my-2">
								<div className="d-flex gap-3 my-3">
									<h6 className="col-4">
										Second Choice Programme
									</h6>
									<p className="col-4">
										{
											programmeInfoResponse?.alternativeDepartment
										}
									</p>
								</div>
								{programmeInfoResponse?.alternativeDepartmentOption && (
									<div className="d-flex gap-3 my-3">
										<h6 className="col-4">
											Second Choice Programme Option
										</h6>
										<p className="col-4">
											{
												programmeInfoResponse?.alternativeDepartmentOption
											}
										</p>
									</div>
								)}
							</div>
						)}
						<div className="col-12 col-md-6 my-2"></div>
						<div className="col-12 col-md-6 my-2"></div>
					</div>
				</section>
				<section className="row align-items-center mt-3">
					<h4 className="mb-2">O-Level Result</h4>
					<div className="row justify-content-between">
						{olevelResponse &&
							olevelResponse?.map((item, index) => (
								<div
									className="col-12 col-md-6 my-2"
									key={index}
								>
									<h5 className="">
										{index === 0
											? "First Sitting"
											: "Second Sitting"}
									</h5>
									<div className="d-flex gap-3 my-2">
										<h6 className="col-4">Exam Type</h6>
										<p className="col-4">
											{item?.examinationType}
										</p>
									</div>
									<div className="d-flex gap-3 my-2">
										<h6 className="col-4">Exam Number</h6>
										<p className="col-4">
											{item?.examNumber}
										</p>
									</div>
									<div className="d-flex gap-3 my-2">
										<h6 className="col-4">Exam Year</h6>
										<p className="col-4">
											{item?.examYear}
										</p>
									</div>
									<div className="d-flex gap-3 my-2">
										<h6 className="col-4">Exam Center</h6>
										<p className="col-4">
											{item?.examCenter}
										</p>
									</div>
									<div className="row my-4">
										<div className="d-flex gap-3 my-2">
											<h5 className="col-4">Subject</h5>
											<h5 className="col-4">Grade</h5>
										</div>
										{subjectAndGrade &&
											subjectAndGrade?.[index]?.map(
												(item, index) => (
													<div
														key={index}
														className="d-flex gap-3 my-2"
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
				<section className="row align-items-center mt-3">
					<h4 className="mb-2">JAMB Details</h4>
					<div className="row justify-content-between">
						<div className="col-6 my-2">
							<div className="d-flex  gap-3 my-3">
								<h6 className="col-4">Subject 1 / Score</h6>
								<p className="col-4">
									{programmeInfoResponse?.firstSubject}{" "}
									{
										programmeInfoResponse?.firstSubjectUtmeScore
									}
								</p>
							</div>

							<div className="d-flex gap-3 my-3">
								<h6 className="col-4">Subject 2 / Score</h6>
								<p className="col-4">
									{programmeInfoResponse?.secondSubject}{" "}
									{
										programmeInfoResponse?.secondSubjectUtmeScore
									}
								</p>
							</div>

							<div className="d-flex gap-3 my-3">
								<h6 className="col-4">UTME Score</h6>
								<p className="col-4">{totalUTMEscore}</p>
							</div>
						</div>
						<div className="col-6 my-2">
							<div className="d-flex gap-3 my-3">
								<h6 className="col-4">Subject 3 / Score</h6>
								<p className="col-4">
									{programmeInfoResponse?.thirdSubject}{" "}
									{
										programmeInfoResponse?.thirdSubjectUtmeScore
									}
								</p>
							</div>

							<div className="d-flex gap-3 my-3">
								<h6 className="col-4">Subject 4 / Score</h6>
								<p className="col-4">
									{programmeInfoResponse?.fourthSubject}{" "}
									{
										programmeInfoResponse?.fourthSubjectUtmeScore
									}
								</p>
							</div>

							<div className="d-flex  gap-3 my-3">
								<h6 className="col-4">UTME No</h6>
								<p className="col-4">{regNumber}</p>
							</div>
						</div>
						<div className="col-12 col-md-6 my-2"></div>
						<div className="col-12 col-md-6 my-2"></div>
					</div>
				</section>
			</div>
		</ApplicationPreviewWrapper>
	);
};

export default NDPreview;
