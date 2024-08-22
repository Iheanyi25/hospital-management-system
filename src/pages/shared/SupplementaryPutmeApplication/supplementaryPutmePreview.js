import { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ApplicationPreviewWrapper } from "../ApplicationPreviewWrapper";
import styles from "./style.module.css";
import { supplementaryPutmeLoadApplicationFormUrl } from "../../../api/urls";
import { useApiGet } from "../../../api/apiCall";
import { Spinner } from "../../../ui_elements";
import { formatStringToDate } from "../../../utils/formatDate";

const SupplementaryPutmePreview = () => {
	const { push } = useHistory();
	const { state } = useLocation();
	const componentRef = useRef();

	if (!state) {
		push("/supplementary_putme_login");
	}

	const { details } = state;

	const { data, isLoading, error } = useApiGet(
		supplementaryPutmeLoadApplicationFormUrl(details),
		{
			refetchOnWindowFocus: false
		}
	);

	const subjectAndGrade = data?.data?.olevelResponse?.map((item) =>
		Object?.entries(item?.subjectGrade)
	);

	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<ApplicationPreviewWrapper
			previewHeader={`${data?.data?.personalInfoResponse?.session} Supplementary Putme Application Slip`}
			userDetails={{
				fullname: `${data?.data?.personalInfoResponse?.surname} ${data?.data?.personalInfoResponse?.firstname} `,
				passport: data?.data?.passport
			}}
			componentRef={componentRef}
		>
			<div className={`${styles.preview_container} p-4`}>
				<section className="row mt-3">
					<h4 className="mb-2">Personal Information</h4>
					<div className="row justify-content-between  px-4">
						<div className="col-6 my-2">
							<div className="row my-3">
								<h6 className="col-2">Form No</h6>
								<p className="col-8">
									{data?.data?.personalInfoResponse
										?.applicationNumber || "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Surname</h6>
								<p className="col-8">
									{data?.data?.personalInfoResponse
										?.surname || "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Firstname</h6>
								<p className="col-8">
									{data?.data?.personalInfoResponse
										?.firstname || "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Other Name</h6>
								<p className="col-8">
									{data?.data?.personalInfoResponse
										?.middlename || "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Sex</h6>
								<p className="col-8">
									{data?.data?.personalInfoResponse?.gender ||
										"-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Date of Birth</h6>
								<p className="col-8">
									{data?.data?.personalInfoResponse
										?.dateOfBirth
										? formatStringToDate(
											data?.data?.personalInfoResponse
												?.dateOfBirth,
											"-"
										)
										: "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Country</h6>
								<p className="col-8">
									{data?.data?.personalInfoResponse
										?.country ?? "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Email Address</h6>
								<p className="col-8">
									{(data?.data?.personalInfoResponse?.email &&
										data?.data?.personalInfoResponse
											?.email
									) ||
										"-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Mobile Phone</h6>
								<p className="col-8">
									{(data?.data?.personalInfoResponse
										?.mobileNumber &&
										data?.data?.personalInfoResponse
											?.mobileNumber
									) ||
										"-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Address</h6>
								<p className="col-8">
									{data?.data?.personalInfoResponse
										?.contactAddress || "-"}
								</p>
							</div>
						</div>
						<div className="col-6 my-2">
							<div className="row my-3">
								<h6 className="col-2">State of Origin</h6>
								<p className="col-8">
									{data?.data?.personalInfoResponse?.state ||
										"-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">LGA of Origin</h6>
								<p className="col-8">
									{data?.data?.personalInfoResponse?.lga ||
										"-"}
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="row mt-3">
					<h4 className="mb-2">Programme Details</h4>
					<div className="row justify-content-between  px-4">
						<div className="col-6 my-2">
							<div className="row my-3">
								<h6 className="col-2">Department</h6>
								<p className="col-8">
									{data?.data?.programmeInfoResponse
										?.department ?? "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">First Subject</h6>
								<p className="col-8">
									{data?.data?.programmeInfoResponse
										?.firstSubject ?? "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Second Subject</h6>
								<p className="col-8">
									{data?.data?.programmeInfoResponse
										?.secondSubject ?? "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Third Subject</h6>
								<p className="col-8">
									{data?.data?.programmeInfoResponse
										?.thirdSubject ?? "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Fourth Subject</h6>
								<p className="col-8">
									{data?.data?.programmeInfoResponse
										?.fourthSubject ?? "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">UTME Score</h6>
								<p className="col-8">
									{data?.data?.programmeInfoResponse
										?.utmeScore ?? "-"}
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="row mt-3">
					<h4 className="mb-2">O-Level Result</h4>
					<div className="row justify-content-between  px-4">
						{data?.data?.olevelResponse &&
							data?.data?.olevelResponse?.map((item, index) => (
								<div className="col-6 my-2" key={index}>
									<h5>
										{index === 0
											? "First Sitting"
											: "Second Sitting"}
									</h5>
									<div className="row my-3">
										<h6 className="col-2">Exam Type</h6>
										<p className="col-8">
											{item?.examinationType ?? "-"}
										</p>
									</div>
									<div className="row my-3">
										<h6 className="col-2">Exam Number</h6>
										<p className="col-8">
											{item?.examNumber ?? "-"}
										</p>
									</div>
									<div className="row my-3">
										<h6 className="col-2">Exam Year</h6>
										<p className="col-8">
											{item?.examYear ?? "-"}
										</p>
									</div>
									<div className="row my-3">
										<h6 className="col-2">Exam Center</h6>
										<p className="col-8">
											{item?.examCenter ?? "-"}
										</p>
									</div>
									<div className="row  my-4">
										<div className="row my-3">
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
														className="row my-2 "
													>
														<p className="col-9 text-capitalize">
															{item?.[0]}
														</p>
														<p className="col-3 text-capitalize">
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

export default SupplementaryPutmePreview;
