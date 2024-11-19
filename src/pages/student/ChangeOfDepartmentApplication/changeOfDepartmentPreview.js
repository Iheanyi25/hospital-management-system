import { useContext } from "react";
import { ApplicationPreviewWrapper } from "../../shared/ApplicationPreviewWrapper";
import styles from "./style.module.css";
import { ProfileContext } from "../../../ui_elements";

export const ChangeOfDepartmentPreview = ({ componentRef, formDetails }) => {
	const data = useContext(ProfileContext);

	const personalInfomation1 = [
		{
			title: "Matric No:",
			value: data?.profileData?.programmeDetail?.matricNumber ?? "-"
		},
		{
			title: "Surname:",
			value: data?.profileData?.personalData?.lastname ?? "-"
		},
		{
			title: "Firstname:",
			value: data?.profileData?.personalData?.firstname ?? "-"
		},
		{
			title: "Middle Name:",
			value: data?.profileData?.personalData?.middlename
				? data?.profileData?.personalData?.middlename
				: "-"
		},
		{
			title: "Year of Study:",
			value: data?.profileData?.programmeDetail?.level ?? "-"
		},
		{
			title: "Current Department:",
			value: data?.profileData?.programmeDetail?.department ?? "-"
		},
		{
			title: "Remita Reference Number:",
			value: formDetails?.rrr ?? "-"
		}
	];

	const applicationInformation = [
		{
			title: "Department to Transfer to",
			value: formDetails?.departmentId ?? "-"
		},
		{
			title: "Department Option:",
			value: formDetails?.departmentOptionId
				? formDetails?.departmentOptionId
				: "-"
		},
		// {
		// 	title: "Programme of Choice:",
		// 	value: data?.profileData?.programmeDetail?.schoolProgramme ?? "-"
		// },
		{
			title: "Reason for Transfer:",
			value: formDetails?.reason ?? "-"
		}
	];

	return (
		<div>
			<ApplicationPreviewWrapper
				componentRef={componentRef}
				userDetails={{
					fullname: `${data?.profileData?.personalData?.fullname}`,
					passport: data?.profileData?.personalData?.passport
				}}
				previewHeader={`${"Change of Degree"} Form Summary - ${
					formDetails?.session
				} `}
				noHeader
			>
				<div className={`${styles.preview_container} px-4`}>
					<div className={styles.content_container}>
						{personalInfomation1.map((detail, index) => (
							<div
								className="my-2 d-flex align-items-center"
								key={index}
							>
								<p className="col-4 text-bold">
									{detail.title}
								</p>
								<p className="col-4">{detail.value}</p>
							</div>
						))}
					</div>
					<div className={"row my-4"}>
						<div className={"bg-gray text-center py-2 mb-3"}>
							<h4 className="mb-2">DEGREE TO TRANSFER DETAILS</h4>
						</div>
						<div className={styles.content_container}>
							{applicationInformation.map((detail, index) => (
								<div
									className="my-2 d-flex align-items-center"
									key={index}
								>
									<p className="col-4 text-bold">
										{detail.title}
									</p>
									<p className="col-4">{detail.value}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</ApplicationPreviewWrapper>
		</div>
	);
};
