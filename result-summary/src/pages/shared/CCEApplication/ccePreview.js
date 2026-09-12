import { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ApplicationPreviewWrapper } from "../ApplicationPreviewWrapper";
import styles from "./style.module.css";
import { cceLoadApplicationFormUrl } from "../../../api/urls";
import { useApiGet } from "../../../api/apiCall";
import { Spinner } from "../../../ui_elements";
import { formatStringToDate } from "../../../utils/formatDate";

const CCEPreview = () => {
	const { push } = useHistory();
	const { state } = useLocation();
	const componentRef = useRef();

	if (!state) {
		push("/cce_login");
	}

	const { details } = state;

	const { data, isLoading, error } = useApiGet(
		cceLoadApplicationFormUrl(details),
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
			previewHeader={`${data?.data?.personalInfoResponse?.session} CCE Application Slip`}
			userDetails={{
				fullname: `${data?.data?.personalInfoResponse?.surname} ${data?.data?.personalInfoResponse?.firstname} `,
				passport: data?.data?.passport
			}}
			componentRef={componentRef}
		>
			<div
				className={`${styles.preview_container} p-4 d-flex justify-content-center flex-column`}
			>
				<section className="row col-10 m-auto mb-5 mt-1">
					<section className="mt-3 col-6">
						<h4 className="mb-2">Personal Information</h4>
						<div className="row justify-content-between  px-2">
							<div className="col-10 my-2">
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">Form No</h6>
									<p className="col-8 text-left">
										{data?.data?.personalInfoResponse
											?.applicationNumber || "-"}
									</p>
								</div>
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">Surname</h6>
									<p className="col-8 text-left">
										{data?.data?.personalInfoResponse
											?.surname || "-"}
									</p>
								</div>
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">Firstname</h6>
									<p className="col-8 text-left">
										{data?.data?.personalInfoResponse
											?.firstname || "-"}
									</p>
								</div>
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">Other Name</h6>
									<p className="col-8 text-left">
										{data?.data?.personalInfoResponse
											?.middlename || "-"}
									</p>
								</div>
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">Sex</h6>
									<p className="col-8 text-left">
										{data?.data?.personalInfoResponse
											?.gender || "-"}
									</p>
								</div>
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">Date of Birth</h6>
									<p className="col-8 text-left">
										{data?.data?.personalInfoResponse
											?.dateOfBirth
											? formatStringToDate(
												data?.data
													?.personalInfoResponse
													?.dateOfBirth,
												"-"
											)
											: "-"}
									</p>
								</div>
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">Country</h6>
									<p className="col-8 text-left">
										{data?.data?.personalInfoResponse
											?.country ?? "-"}
									</p>
								</div>
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">Email Address</h6>
									<p className="col-8 text-left">
										{(data?.data?.personalInfoResponse
											?.email &&
											data?.data?.personalInfoResponse
												?.email
										) ||
											"-"}
									</p>
								</div>
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">Mobile Phone</h6>
									<p className="col-8 text-left">
										{(data?.data?.personalInfoResponse
											?.mobileNumber &&
											data?.data?.personalInfoResponse
												?.mobileNumber
										) ||
											"-"}
									</p>
								</div>
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">Address</h6>
									<p className="col-8 text-left">
										{data?.data?.personalInfoResponse
											?.contactAddress || "-"}
									</p>
								</div>
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">State of Origin</h6>
									<p className="col-8 text-left">
										{data?.data?.personalInfoResponse
											?.state || "-"}
									</p>
								</div>
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">LGA of Origin</h6>
									<p className="col-8 text-left">
										{data?.data?.personalInfoResponse
											?.lga || "-"}
									</p>
								</div>
							</div>
						</div>
					</section>
					<section className="mt-3 col-6">
						<h4 className="mb-2">Programme Details</h4>
						<div className="row justify-content-between  px-2">
							<div className="col-10 my-2">
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">Department</h6>
									<p className="col-8 text-left">
										{data?.data?.programmeInfoResponse
											?.department ?? "-"}
									</p>
								</div>
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">Jamb Reg Number</h6>
									<p className="col-8 text-left">
										{data?.data?.regNumber ?? "-"}
									</p>
								</div>
								<div className="row my-3 align-items-baseline">
									<h6 className="col-3">Jamb Score</h6>
									<p className="col-8 text-left">
										{data?.data?.programmeInfoResponse
											?.utmeScore ?? "-"}
									</p>
								</div>
							</div>
						</div>
					</section>
				</section>
				<section className="row col-10 m-auto mt-3">
					<h4 className="mb-2">O-Level Result</h4>
					<div className="row justify-content-between px-4">
						{data?.data?.olevelResponse &&
							data?.data?.olevelResponse?.map((item, index) => (
								<div className="col-6 my-2" key={index}>
									<h5>
										{index === 0
											? "First Sitting"
											: "Second Sitting"}
									</h5>
									<div className="row my-3 align-items-center">
										<h6 className="col-3">Exam Type</h6>
										<p className="col-8 text-left">
											{item?.examinationType ?? "-"}
										</p>
									</div>
									<div className="row my-3 align-items-center">
										<h6 className="col-3">Exam Number</h6>
										<p className="col-8 text-left">
											{item?.examNumber ?? "-"}
										</p>
									</div>
									<div className="row my-3 align-items-center">
										<h6 className="col-3">Exam Year</h6>
										<p className="col-8 text-left">
											{item?.examYear ?? "-"}
										</p>
									</div>
									<div className="row my-3 align-items-center">
										<h6 className="col-3">Exam Center</h6>
										<p className="col-8 text-left">
											{item?.examCenter ?? "-"}
										</p>
									</div>
									<div className="row my-4">
										<div className="row my-3 align-items-center">
											<h5 className="col-8 text-left m-0">
												Subject
											</h5>
											<h5 className="col-3 m-0">Grade</h5>
										</div>
										{subjectAndGrade &&
											subjectAndGrade?.[index]?.map(
												(item, index) => (
													<div
														key={index}
														className="row my-2"
													>
														<p className="col-8 text-capitalize text-left">
															{item?.[0].toLowerCase()}
														</p>
														<p className="col-2 text-capitalize text-left">
															{item?.[1].toLowerCase()}
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

export default CCEPreview;
