import { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useApiGet } from "../../../api/apiCall";
import { CSPGAppVerificationPaymentUrl } from "../../../api/urls";
import { Spinner } from "../../../ui_elements";
import { ApplicationPreviewWrapper } from "../ApplicationPreviewWrapper";
import styles from "./style.module.css";

const CenterOfSafetyApplicationPreview = () => {
	const { push } = useHistory();
	const { state } = useLocation();
	const componentRef = useRef();
	if (!state) push("/center_of_safety_login");

	const { data, isLoading, error } = useApiGet(
		CSPGAppVerificationPaymentUrl(state?.details),
		{
			refetchOnWindowFocus: false
		}
	);

	const subjectAndGrade = data?.data?.olevelInfo?.map((item) =>
		Object?.entries(item?.subjectGrade)
	);

	if (isLoading) return <Spinner />;
	if (error) return "An error has occurred: " + error.message;

	return (
		<ApplicationPreviewWrapper
			previewHeader={`${data?.data?.session} ${data?.data?.studentType} Application Slip`}
			footerStyle={" justify-content-center"}
			userDetails={{
				fullname: `${data?.data?.basicInformation?.lastname} ${data?.data?.basicInformation?.firstname} `,
				passport: data?.data?.basicInformation?.passport
			}}
			componentRef={componentRef}
		>
			<div className={`${styles.preview_container} p-4`}>
				<section className="row align-items-center mt-3">
					<h4 className="mb-2">Bio Data</h4>
					<div className="row align-items-center justify-content-between px-4">
						<div className="col-12 col-md-6 my-2">
							<div className="row align-items-center my-3">
								<h6 className="col-3">Full Name</h6>
								<p className="col-8">
									{`${data?.data?.basicInformation.lastname} ${data?.data?.basicInformation.firstname} ${data?.data?.basicInformation.middlename}`}
								</p>
							</div>

							<div className="row align-items-center my-3">
								<h6 className="col-3">Sex</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.gender ||
										"-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Date of birth</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.dateOfBirth?.split(
										"T"
									)[0] || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">State of origin</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.state || "-"}
								</p>
							</div>
						</div>
						<div className="col-12 col-md-6 my-2">
							<div className="row align-items-center my-3">
								<h6 className="col-3">Email address</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.email || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Mobile phone</h6>
								<p className="col-8">
									{data?.data?.basicInformation
										?.mobileNumber || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Country</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.country ??
										"-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">LGA of origin</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.lga || "-"}
								</p>
							</div>
						</div>
						<div className="col-6 my-2"></div>
					</div>
				</section>
				<section className="row align-items-center mt-3">
					<h4 className="mb-2">Programme Details</h4>
					<div className="row justify-content-between px-4">
						<div className="col-12 col-md-6 my-2">
							<div className="row align-items-center my-3">
								<h6 className="col-3">Session</h6>
								<p className="col-8">
									{data?.data?.session || "-"}
								</p>
							</div>

							<div className="row align-items-center my-3">
								<h6 className="col-3">Award</h6>
								<p className="col-8">
									{data?.data?.programme?.schoolProgramme ||
										"-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Duration</h6>
								<p className="col-8">
									{data?.data?.duration || "-"}
								</p>
							</div>
						</div>
						<div className="col-12 col-md-6 my-2">
							<div className="row align-items-center my-3">
								<h6 className="col-3">Mode</h6>
								<p className="col-8">
									{data?.data?.programme?.modeOfStudy || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Course</h6>
								<p className="col-8">
									{data?.data?.programme?.department || "-"}
								</p>
							</div>
						</div>
						<div className="col-6 my-2"></div>
					</div>
				</section>
				{data?.data?.educationHistory?.length > 0 && (
					<section className="row align-items-center mt-3">
						<h4 className="mb-2">Academic Qualifications</h4>
						{data?.data?.educationHistory.map((history) => (
							<div className="row px-4 mt-4 mb-4">
								<div className="col-6">
									<h5>Name and Location</h5>
									<p>{history?.schoolName}</p>
								</div>
								<div className="col-6 row">
									<div className="col-3">
										<h5>From</h5>
										<p>
											{new Date(
												history?.yearFrom
											).getFullYear()}
										</p>
									</div>
									<div className="col-3">
										<h5>To</h5>
										<p>
											{new Date(
												history?.yearTo
											).getFullYear()}
										</p>
									</div>
									<div className="col-6">
										<h5>Qualifications</h5>
										<p>{history?.certificate}</p>
									</div>
								</div>
							</div>
						))}
					</section>
				)}
				<section className="row align-items-center mt-3">
					<h4 className="mb-2">O-Level Result</h4>
					<div className="row align-items-center justify-content-between  px-4">
						{data?.data?.olevelInfo &&
							data?.data?.olevelInfo?.map((item, index) => (
								<div
									className="col-12 col-md-6 my-2"
									key={index}
								>
									<h5>
										{index === 0
											? "First Sitting"
											: "Second Sitting"}
									</h5>
									<div className="row align-items-center my-3">
										<h6 className="col-3">Exam Type</h6>
										<p className="col-8">
											{item?.examinationType ?? "-"}
										</p>
									</div>
									<div className="row align-items-center my-3">
										<h6 className="col-3">Exam Number</h6>
										<p className="col-8">
											{item?.examNumber ?? "-"}
										</p>
									</div>
									<div className="row align-items-center my-3">
										<h6 className="col-3">Exam Year</h6>
										<p className="col-8">
											{item?.examYear ?? "-"}
										</p>
									</div>
									<div className="row align-items-center my-3">
										<h6 className="col-3">Exam Center</h6>
										<p className="col-8">
											{item?.examCenter ?? "-"}
										</p>
									</div>
									<div className="row align-items-center  my-4">
										<div className="row align-items-center my-3">
											<h5 className="col-9 p-0 m-0">
												Subject
											</h5>
											<h5 className="col-3 p-0 m-0">
												Grade
											</h5>
										</div>
										{subjectAndGrade &&
											subjectAndGrade?.[index]?.map(
												(item, index) => (
													<div
														key={index}
														className="row align-items-center my-2"
													>
														<p className="col-9 text-capitalize">
															{item?.[0]}
														</p>
														<p className="col-3">
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

export default CenterOfSafetyApplicationPreview;
