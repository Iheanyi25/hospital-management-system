import { formatDateFromAPI } from "../../../utils/formatDate";
import { ApplicationPreviewWrapper } from "../ApplicationPreviewWrapper";
import styles from "./style.module.css";

const SupplementaryPreview = ({ componentRef, details }) => {
	const { basicInformation, programme } = details ?? {};

	return (
		<ApplicationPreviewWrapper
			userDetails={{
				name: `${basicInformation?.surname} ${basicInformation?.firstname} `,
				passport: basicInformation?.passport
			}}
			previewHeader={`${
				basicInformation?.session ?? ""
			}ADMISSION SHOPPING APPLICATION SLIP`}
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
					<div className="row align-items-start justify-content-between">
						<div className="col-12 col-md-6 my-2">
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Fullname</h6>
								<p className="col-6 text-left">
									{basicInformation?.surname &&
										`${basicInformation?.surname} `}
									{basicInformation?.firstname &&
										`${basicInformation?.firstname} `}
									{basicInformation?.middlename &&
										`${basicInformation?.middlename}`}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Gender</h6>
								<p className="col-6 text-left">
									{basicInformation?.gender}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Date of birth</h6>
								<p className="col-6 text-left">
									{basicInformation?.dateOfBirth
										? formatDateFromAPI(
												basicInformation?.dateOfBirth
										  )
										: "N/A"}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">State of origin</h6>
								<p className="col-6 text-left">
									{basicInformation?.state}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Address</h6>
								<p className="col-6 text-left">
									{basicInformation?.contactAddress}
								</p>
							</div>
						</div>
						<div className="col-12 col-md-6 my-2">
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Email address</h6>
								<p className="col-4 text-left">
									{basicInformation?.email}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Mobile phone</h6>
								<p className="col-4 text-left">
									{basicInformation?.mobileNumber}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">Country of Origin</h6>
								<p className="col-4 text-left">
									{basicInformation?.country}
								</p>
							</div>
							<div className="d-flex  align-items-baseline gap-3 my-3">
								<h6 className="col-4">LGA of origin</h6>
								<p className="col-4 text-left">
									{basicInformation?.lga}
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="row align-items-center mt-3">
					<h4 className="mb-1">JAMB Details</h4>
					<div className="row align-items-center justify-content-between">
						<div className="w-75 my-2">
							<div className="d-flex align-items-center gap-3 my-3">
								<h6 className="col-3">Faculty</h6>
								<p className="col-8 text-left">
									{programme?.faculty}
								</p>
							</div>
							<div className="d-flex align-items-center gap-3 my-3">
								<h6 className="col-3">Department</h6>
								<p className="col-8 text-left">
									{programme?.department}
								</p>
							</div>
							<div className="d-flex align-items-center gap-3 my-3">
								<h6 className="col-3">Course Shopping Into</h6>
								<p className="col-8 text-left">
									{programme?.courseShoppingInto}
								</p>
							</div>
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-3">JAMB Score</h6>
								<p className="col-8 text-left">
									{programme?.utmeScore}
								</p>
							</div>
							<div className="d-flex  align-items-center gap-3 my-3">
								<h6 className="col-3">JAMB Reg No</h6>
								<p className="col-8 text-left">
									{programme?.jambNumber}
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</ApplicationPreviewWrapper>
	);
};

export default SupplementaryPreview;
