import { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useApiGet } from "../../../api/apiCall";
import { previewJupebApplicationUrl } from "../../../api/urls";
import { Spinner } from "../../../ui_elements";
import { ApplicationPreviewWrapper } from "../ApplicationPreviewWrapper";
import styles from "./style.module.css";

const JupebApplicationPreview = () => {
	const { push } = useHistory();
	const { state } = useLocation();
	const componentRef = useRef();
	if (!state) push("/sub_degree_login");

	const { data, isLoading, error } = useApiGet(
		previewJupebApplicationUrl(state?.details),
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
			previewHeader={`${data?.data?.session} ${data?.data?.applicationType} Application Slip`}
			footerStyle={" justify-content-center"}
			footerContent={
				<div className="text-bold text-uppercase">
					<span className="text-danger">IMPORTANT:</span> YOU WILL BE
					CONTACTED VIA SMS AND EMAIL FOR YOUR SCREENING DATE
				</div>
			}
			userDetails={{
				fullname: `${data?.data?.lastname} ${data?.data?.firstname} `,
				image: data?.data?.passport
			}}
			componentRef={componentRef}
		>
			<div className={`${styles.preview_container} p-4`}>
				<section className="row align-items-center mt-3">
					<h4 className="mb-2">Personal Information</h4>
					<div className="row align-items-center justify-content-between  px-4">
						<div className="col-12 col-md-6 my-2">
							<div className="row align-items-center my-3">
								<h6 className="col-3">Application No</h6>
								<p className="col-8">
									{data?.data?.applicationNumber || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Full Name</h6>
								<p className="col-8">
									{`${data?.data?.lastname} ${data?.data?.firstname} ${data?.data?.middlename}`}
								</p>
							</div>

							<div className="row align-items-center my-3">
								<h6 className="col-3">Sex</h6>
								<p className="col-8">
									{data?.data?.gender || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Date of birth</h6>
								<p className="col-8">
									{data?.data?.dateOfBirth?.split("T")[0] ||
										"-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Country</h6>
								<p className="col-8">
									{data?.data?.country ?? "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">State of origin</h6>
								<p className="col-8">
									{data?.data?.state || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">LGA of origin</h6>
								<p className="col-8">
									{data?.data?.lga || "-"}
								</p>
							</div>
						</div>
						<div className="col-12 col-md-6 my-2">
							<div className="row align-items-center my-3">
								<h6 className="col-3">Email address</h6>
								<p className="col-8">
									{data?.data?.email || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Mobile phone</h6>
								<p className="col-8">
									{data?.data?.mobileNumber || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Address</h6>
								<p className="col-8">
									{data?.data?.permanentAddress || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Blood Group</h6>
								<p className="col-8">
									{data?.data?.bloodGroup || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Genotype</h6>
								<p className="col-8">
									{data?.data?.genoType || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Marital Status</h6>
								<p className="col-8">
									{data?.data?.maritalStatus || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Religion</h6>
								<p className="col-8">
									{data?.data?.religion || "-"}
								</p>
							</div>
						</div>
						<div className="col-6 my-2"></div>
					</div>
				</section>
				<section className="row align-items-center mt-3">
					<h4 className="mb-2">Next of Kin Details</h4>
					<div className="row align-items-center justify-content-between px-4">
						<div className="col-md-6 my-2">
							<div className="row align-items-center my-3">
								<h6 className="col-3">Fullname</h6>
								<p className="col-8">
									{data?.data?.nextOfKin?.fullname || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Email address</h6>
								<p className="col-8">
									{data?.data?.nextOfKin?.email || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Mobile number</h6>
								<p className="col-8">
									{data?.data?.nextOfKin?.mobileNumber || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Address</h6>
								<p className="col-8">
									{data?.data?.nextOfKin?.address || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Relationship</h6>
								<p className="col-8">
									{data?.data?.nextOfKin?.relationship || "-"}
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="row align-items-center mt-3">
					<div className="col-12 col-md-6">
						<h4 className="mb-2">Programme Details</h4>
						<div className="row align-items-center justify-content-between px-2">
							<div className="row align-items-center my-3">
								<h6 className="col-3">Subject Combination</h6>
								<p className="col-8">
									{data?.data?.jupebOptionSubjectName || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Choice Department</h6>
								<p className="col-8">
									{data?.data?.department || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Application No</h6>
								<p className="col-8">
									{data?.data?.applicationNumber || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Program type</h6>
								<p className="col-8">
									{data?.data?.applicationType || "-"}
								</p>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<h4 className="mb-2">Documents Uploaded</h4>
						<div className="row align-items-center justify-content-between">
							<div className="row align-items-center my-3">
								<h6 className="col-6">
									{data?.data?.birthCertificate
										? "Birth certificate"
										: "-"}
								</h6>
								<p className="col-6"></p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-6">
									{data?.data?.oLevelResult
										? "First sitting O’Level result"
										: "-"}
								</h6>
								<p className="col-6"></p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-6">
									{data?.data?.signature
										? "Applicant signature"
										: "-"}
								</h6>
								<p className="col-6"></p>
							</div>
						</div>
					</div>
				</section>

				<section className="row align-items-center mt-3">
					<h4 className="mb-2">Educational History</h4>
					{/* {data?.data?.institutionAttended?.map((items, i) => ( */}
					<div className="row align-items-center justify-content-between  px-4">
						<div className="col-12 col-md-6 my-2">
							<div className="row align-items-center my-3">
								<h6 className="col-3">School</h6>
								<p className="col-8">
									{data?.data?.institutionAttended
										?.nameOfInstitution || "-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Date attended</h6>
								<p className="col-8">
									{data?.data?.institutionAttended
										?.dateFrom || "-"}{" "}
									-{" "}
									{data?.data?.institutionAttended?.dateTo ||
										"-"}
								</p>
							</div>
							<div className="row align-items-center my-3">
								<h6 className="col-3">Qualification</h6>
								<p className="col-8">
									{data?.data?.institutionAttended
										?.certificate || "-"}
								</p>
							</div>
						</div>
					</div>
					{/* ))} */}
				</section>
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

export default JupebApplicationPreview;
