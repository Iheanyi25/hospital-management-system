import { SecondaryLink, SMSelect, TextField } from "../../../../ui_elements";
import { Controller } from "react-hook-form";

export const TcForm = ({
	index,
	errors,
	control,
	register,
	oLevelGrades,
	oLevelSubjects,
	allYears,
	handleRemoveItem
}) => {
	return (
		<>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3  d-flex align-items-center">
						<label htmlFor={`subject.${index}`}>
							Subject {index + 1} *
						</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name={`tcCertificate.${index}.subjectId`}
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<SMSelect
									{...field}
									placeholder="Select Subject"
									id={`subject.${index}`}
									options={oLevelSubjects}
									searchable={true}
									required
									error={
										errors?.tcCertificate &&
										errors?.tcCertificate[index]?.subjectId
									}
									errorText={
										errors?.tcCertificate &&
										errors?.tcCertificate[index]
											?.subjectId &&
										errors?.tcCertificate[index]?.subjectId
											.message
									}
								/>
							)}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3  d-flex align-items-center">
						<label htmlFor={`examNo.${index}`}>Exam No *</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter exam no"
							className="w-100"
							type="text"
							id={`examNo.${index}`}
							name={`tcCertificate.${index}.examNo`}
							register={register}
							required
							error={
								errors?.tcCertificate &&
								errors?.tcCertificate[index]?.examNo
							}
							errorText={
								errors?.tcCertificate &&
								errors?.tcCertificate[index]?.examNo &&
								errors?.tcCertificate[index]?.examNo.message
							}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3  d-flex align-items-center">
						<label htmlFor={`grade.${index}`}>Grade *</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name={`tcCertificate.${index}.gradeId`}
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<SMSelect
									{...field}
									placeholder="Select grade obtained"
									id={`grade.${index}`}
									options={oLevelGrades}
									searchable={true}
									required
									error={
										errors?.tcCertificate &&
										errors?.tcCertificate[index]?.gradeId
									}
									errorText={
										errors?.tcCertificate &&
										errors?.tcCertificate[index]?.gradeId &&
										errors?.tcCertificate[index]?.gradeId
											.message
									}
								/>
							)}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3  d-flex align-items-center">
						<label htmlFor={`year.${index}`}>Year Obtained *</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name={`tcCertificate.${index}.year`}
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<SMSelect
									{...field}
									placeholder="Select year obtained"
									id={`year.${index}`}
									options={allYears}
									searchable={true}
									required
									error={
										errors?.tcCertificate &&
										errors?.tcCertificate[index]?.year
									}
									errorText={
										errors?.tcCertificate &&
										errors?.tcCertificate[index]?.year &&
										errors?.tcCertificate[index]?.year
											.message
									}
								/>
							)}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4">
				<div className="border-bottom d-flex justify-content-end">
					{index > 0 && (
						<SecondaryLink
							label="Delete"
							customClass="pb-4"
							linkType="danger-link"
							onClick={() =>
								handleRemoveItem(index, "tcCertificate")
							}
						/>
					)}
				</div>
			</div>
		</>
	);
};
