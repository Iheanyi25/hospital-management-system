import { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ApplicationPreviewWrapper } from "../ApplicationPreviewWrapper";
import { hashItem } from "../../../utils/hashItem";
import styles from "./style.module.css";
import { directEntryLoadApplicationFormUrl } from "../../../api/urls";
import { useApiGet } from "../../../api/apiCall";
import { Spinner } from "../../../ui_elements";
import { formatProfileInitalDate } from "../../../utils/formatDate";

const DirectEntryPreview = () => {
	const { push } = useHistory();
	const { state } = useLocation();
	const componentRef = useRef();

	if (!state) {
		push("/direct_entry_login");
	}

	const { details } = state;

	const { data, isLoading, error } = useApiGet(
		directEntryLoadApplicationFormUrl(details),
		{
			refetchOnWindowFocus: false
		}
	);

	const subjectAndGrade = data?.data?.olevelInfo?.map((item) =>
		Object?.entries(item?.subjectGrade)
	);

	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<ApplicationPreviewWrapper
			previewHeader={`${data?.data?.basicInformation?.session} Direct Entry Application Slip`}
			userDetails={{
				fullname: `${data?.data?.basicInformation?.lastname} ${data?.data?.basicInformation?.firstname} `,
				passport: data?.data?.basicInformation?.passport
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
									{data?.data?.basicInformation
										?.applicationNumber || "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Surname</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.lastname ||
										"-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Firstname</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.firstname ||
										"-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Other Name</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.middlename ||
										"-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Sex</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.gender ||
										"-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Date of Birth</h6>
								<p className="col-8">
									{formatProfileInitalDate(
										data?.data?.basicInformation
											?.dateofBirth
									) || ""}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Country</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.country ??
										"-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Email Address</h6>
								<p className="col-8">
									{(data?.data?.basicInformation?.email &&
										hashItem(
											data?.data?.basicInformation?.email
										)) ||
										"-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Mobile Phone</h6>
								<p className="col-8">
									{(data?.data?.basicInformation
										?.mobileNumber &&
										hashItem(
											data?.data?.basicInformation
												?.mobileNumber
										)) ||
										"-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Address</h6>
								<p className="col-8">
									{data?.data?.basicInformation
										?.permanentAddress || "-"}
								</p>
							</div>
						</div>
						<div className="col-6 my-2">
							<div className="row my-3">
								<h6 className="col-2">State of Origin</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.state || "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">LGA of Origin</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.lga || "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Blood Group/Genotype</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.bloodGroup ||
										"-"}
									/
									{data?.data?.basicInformation?.genoType ||
										"-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Disability</h6>
								<p className="col-8">
									{data?.data?.basicInformation
										?.disability === false
										? "No"
										: "Yes" ?? "-"}
								</p>
							</div>
							<div className="row my-3">
								<h6 className="col-2">Hobby</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.hobby || "-"}
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="row mt-3">
					<h4 className="mb-2">Course of Choice</h4>
					<div className="row justify-content-between  px-4">
						<div className="col-6 my-2">
							<div className="row my-3">
								<h6 className="col-2">Course</h6>
								<p className="col-8">
									{data?.data?.basicInformation?.department ||
										"-"}
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="row mt-3">
					<h4 className="mb-2">O-Level Result</h4>
					<div className="row justify-content-between  px-4">
						{data?.data?.olevelInfo &&
							data?.data?.olevelInfo?.map((item, index) => (
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
				<section className="row mt-3">
					<h4 className="mb-2">Institution Attended</h4>
					<div className="row justify-content-between  px-4">
						{data?.data?.institutionAttended?.map((items) => (
							<div className="row">
								<div className="my-3 col-3">
									<h6>Name and Location</h6>
									<p>{items?.institution ?? "-"}</p>
								</div>
								<div className="my-3 col-3">
									<h6>Field of Study</h6>
									<p>{items?.fieldOfStudy ?? "-"}</p>
								</div>
								<div className="my-3 col-2">
									<h6>From</h6>
									<p>
										{items?.dateFrom?.split("T")[0] ?? "-"}
									</p>
								</div>
								<div className="my-3 col-2">
									<h6>To</h6>
									<p>{items?.dateTo?.split("T")[0] ?? "-"}</p>
								</div>
								<div className="my-3 col-2">
									<h6>Certificate Obtained</h6>
									<p>{items?.certificate ?? "-"}</p>
								</div>
							</div>
						)) ?? []}
					</div>
				</section>
			</div>
		</ApplicationPreviewWrapper>
	);
};

export default DirectEntryPreview;
