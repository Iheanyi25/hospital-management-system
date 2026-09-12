import { shortDate } from "../../../utils/formatDate";
import { hashItem } from "../../../utils/hashItem";
import { ApplicationPreviewWrapper } from "../ApplicationPreviewWrapper";
import styles from "./style.module.css";

export const PgPreview = ({ componentRef, formDetails }) => {
	const {
		basicInformation,
		nextOfKin,
		educationHistory,
		honours,
		workHistory,
		programme,
		referees,
		otherDetail,
		session
	} = formDetails;
	const personalInfomation1 = [
		{
			title: "Surname",
			value: basicInformation?.lastname ?? "-"
		},
		{
			title: "Country",
			value: basicInformation?.country ?? "-"
		},
		{
			title: "Firstname",
			value: basicInformation?.firstname ?? "-"
		},
		{
			title: "State of Origin",
			value: basicInformation?.state ?? "-"
		},
		{
			title: "Middle",
			value: basicInformation?.middlename ?? "-"
		},
		{
			title: "LGA of Origin",
			value: basicInformation?.lga ?? "-"
		},
		{
			title: "Sex",
			value: basicInformation?.gender ?? "-"
		},
		{
			title: "Date of Birth",
			value: shortDate(basicInformation?.dateOfBirth) ?? "-"
		}
	];

	const personalInfomation2 = [
		{
			title: "Email Address",
			value: hashItem(basicInformation?.email || "") ?? "-"
		},
		{
			title: "Mobile Phone",
			value: hashItem(basicInformation?.mobileNumber || "") ?? "-"
		},
		{
			title: "Contact Address",
			value: basicInformation?.contactAddress ?? "-"
		},
		{
			title: "Permanent Address",
			value: basicInformation?.permanentAddress ?? "-"
		}
	];

	const nextOfKinInfo = [
		{
			title: "NOK’s Fullname",
			value: nextOfKin?.fullname ?? "-"
		},
		{
			title: "NOK’s Address",
			value: nextOfKin?.address ?? "-"
		},
		{
			title: "NOK’s Mobile No",
			value: nextOfKin?.mobileNumber ?? "-"
		},
		{
			title: "NOK’s  Relationship",
			value: nextOfKin?.relationship ?? "-"
		}
	];

	const progretails = [
		{
			title: "Programme",
			value: programme?.programme ?? "-"
		},
		{
			title: "Faculty",
			value: programme?.faculty ?? "-"
		},
		{
			title: "Department",
			value: programme?.department ?? "-"
		},
		{
			title: "Title of Previous Dissertation / Project",
			value: otherDetail?.dissertationTitle ?? "-"
		},
		{
			title: "Research Statement of Topic  wish to Study",
			value: otherDetail?.researchStatement ?? "-"
		}
	];

	const otherDetails = [
		{
			title: "Completed NYSC",
			value: otherDetail?.nysc ?? "-"
		},
		{
			title: "NYSC Completion Year",
			value: otherDetail?.nyscYear ?? "-"
		},
		{
			title: "Other Program",
			value: otherDetail?.otherPrograms ?? "-"
		},
		{
			title: "Other Program Type",
			value: otherDetail?.otherProgramsType ?? "-"
		},
		{
			title: "Other Program Institution",
			value: otherDetail?.otherProgramsInstitution ?? "-"
		}
	];
	return (
		<div>
			<ApplicationPreviewWrapper
				componentRef={componentRef}
				userDetails={{
					fullname: `${basicInformation?.surname} ${basicInformation?.firstname}`,
					passport: programme?.passport
				}}
				previewHeader={`${session} Postgraduate Application Acknowledgement Slip`}
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
						{personalInfomation2.map((detail, index) => (
							<div className="col-lg-12">
								<div
									className="px-0 col-6 my-2 d-flex align-items-center"
									key={index}
								>
									<p className="col-4 text-bold">
										{detail.title}
									</p>
									<p className="col-8">{detail.value}</p>
								</div>
							</div>
						))}
					</div>
					<section className="row mt-3">
						<h4 className="mb-2">Next of Kin Details</h4>
						{nextOfKinInfo.map((detail, index) => (
							<div className="col-12">
								<div
									className="px-0 col-6 my-2 d-flex align-items-center"
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
					<section className="row mt-3">
						<h4 className="mb-2">Academic Background</h4>
						<div className="row px-4">
							<div className="col-4 my-2">
								<h6>Name and Location</h6>
							</div>
							<div className="col-3 my-2">
								<h6>Major Field</h6>
							</div>
							<div className="col-1 my-2">
								<h6>From</h6>
							</div>
							<div className="col-1 my-2">
								<h6>To</h6>
							</div>
							<div className="col-3 my-2">
								<h6>Degree Obtained</h6>
							</div>
						</div>
						{educationHistory.map((detail, index) => (
							<div className="row px-4" key={index}>
								<div className="col-4 my-2">
									<p>{detail.schoolName}</p>
								</div>
								<div className="col-3 my-2">
									<p>{detail.majorField}</p>
								</div>
								<div className="col-1 my-2">
									<p>{detail.yearFrom}</p>
								</div>
								<div className="col-1 my-2">
									<p>{detail.yearTo}</p>
								</div>
								<div className="col-3 my-2">
									<p>{detail.certificate}</p>
								</div>
							</div>
						))}
					</section>
					<section className="row mt-3">
						<h4 className="mb-2">
							Academic Distinctions or Prices Won
						</h4>
						{honours.length > 0 ? (
							honours.map((item, index) => (
								<div className="col-12" key={index}>
									<p className="px-2">{item.honour}</p>
								</div>
							))
						) : (
							<div className="col-12">
								<p className="px-2">-</p>
							</div>
						)}
					</section>
					<section className="row mt-3">
						<h4 className="mb-2">Employment History</h4>
						<div className="row px-4">
							<div className="col-4 my-2">
								<h6>Name and Location</h6>
							</div>
							<div className="col-3 my-2">
								<h6>Job Description</h6>
							</div>
							<div className="col-1 my-2">
								<h6>From</h6>
							</div>
							<div className="col-1 my-2">
								<h6>To</h6>
							</div>
						</div>
						{workHistory.map((detail, index) => (
							<div className="row px-4" key={index}>
								<div className="col-4 my-2">
									<p>{detail.employer}</p>
								</div>
								<div className="col-3 my-2">
									<p>{detail.description}</p>
								</div>
								<div className="col-1 my-2">
									<p>{detail.yearFrom}</p>
								</div>
								<div className="col-1 my-2">
									<p>{detail.yearTo}</p>
								</div>
							</div>
						))}
					</section>
					<section className="row mt-3">
						<h4 className="mb-2">Referees</h4>
						<div className="row px-4">
							<div className="col-3 my-2">
								<h6>Name</h6>
							</div>
							<div className="col-3 my-2">
								<h6>Email</h6>
							</div>
							<div className="col-2 my-2">
								<h6>Position</h6>
							</div>
							<div className="col-4 my-2">
								<h6>Organisation</h6>
							</div>
						</div>
						{referees.map((detail, index) => (
							<div className="row px-4" key={index}>
								<div className="col-3 my-2">
									<p>{detail?.name ?? "-"}</p>
								</div>
								<div
									className="col-3 my-2"
									style={{ wordWrap: "break-word" }}
								>
									<p>{detail?.email ?? "-"}</p>
								</div>
								<div
									className="col-2 my-2"
									style={{ wordWrap: "break-word" }}
								>
									<p>{detail?.position ?? "-"}</p>
								</div>
								<div className="col-4 my-2">
									<p>{detail?.organisation ?? "-"}</p>
								</div>
							</div>
						))}
					</section>
					<section className="row mt-5">
						<h4 className="mb-2">Program Details</h4>
						{progretails.map((detail, index) => (
							<div className="col-12">
								<div
									className="px-0  my-2 d-flex align-items-center"
									key={index}
								>
									<p className="col-2 text-bold">
										{detail.title}
									</p>
									<p className="col-10">{detail.value}</p>
								</div>
							</div>
						))}
					</section>
					<section className="row mt-3">
						<h4 className="mb-2">Other Details</h4>
						{otherDetails.map((detail, index) => (
							<div className="col-12">
								<div
									className="px-0  my-2 d-flex align-items-center"
									key={index}
								>
									<p className="col-2 text-bold">
										{detail.title}
									</p>
									<p className="col-10">{detail.value}</p>
								</div>
							</div>
						))}
					</section>
				</div>
			</ApplicationPreviewWrapper>
		</div>
	);
};
