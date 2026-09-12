import { SecondaryLink, SMSelect } from "../../../../ui_elements";
import { Controller } from "react-hook-form";

export const DiplomaForm = ({
	index,
	errors,
	control,
	oLevelSubjects,
	oLevelGrades,
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
							name={`aCEDiplomaQualifications.${index}.subjectId`}
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<SMSelect
									{...field}
									placeholder="Select subject"
									id={`subject.${index}`}
									options={oLevelSubjects}
									searchable={true}
									required
									error={
										errors?.aCEDiplomaQualifications &&
										errors?.aCEDiplomaQualifications[index]
											?.subjectId
									}
									errorText={
										errors?.aCEDiplomaQualifications &&
										errors?.aCEDiplomaQualifications[index]
											?.subjectId &&
										errors?.aCEDiplomaQualifications[index]
											?.subjectId.message
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
						<label htmlFor={`grade.${index}`}>Grade *</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name={`aCEDiplomaQualifications.${index}.gradeId`}
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
										errors?.aCEDiplomaQualifications &&
										errors?.aCEDiplomaQualifications[index]
											?.gradeId
									}
									errorText={
										errors?.aCEDiplomaQualifications &&
										errors?.aCEDiplomaQualifications[index]
											?.gradeId &&
										errors?.aCEDiplomaQualifications[index]
											?.gradeId.message
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
							name={`aCEDiplomaQualifications.${index}.year`}
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
										errors?.aCEDiplomaQualifications &&
										errors?.aCEDiplomaQualifications[index]
											?.year
									}
									errorText={
										errors?.aCEDiplomaQualifications &&
										errors?.aCEDiplomaQualifications[index]
											?.year &&
										errors?.aCEDiplomaQualifications[index]
											?.year.message
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
								handleRemoveItem(
									index,
									"aCEDiplomaQualifications"
								)
							}
						/>
					)}
				</div>
			</div>
		</>
	);
};
