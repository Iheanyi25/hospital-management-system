import { SecondaryLink, TextField } from "../../../../ui_elements";
import { formatInputDate } from "../../../../utils/formatDate";

export const EmploymentInstitutions = ({
	index,
	errors,
	register,
	watch,
	handleRemoveItem
}) => {
	const beginDate = watch(`employmentInfo.${index}.yearFrom`);
	return (
		<>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label
							htmlFor={`employer.${index}`}
						>{`Employer and Location ${index + 1}`}</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter employer and location"
							className="w-100"
							type="text"
							id={`employer.${index}`}
							name={`employmentInfo.${index}.employer`}
							register={register}
							required
							error={
								errors?.employmentInfo &&
								errors?.employmentInfo[index]?.employer
							}
							errorText={
								errors?.employmentInfo &&
								errors?.employmentInfo[index]?.employer &&
								errors?.employmentInfo[index]?.employer.message
							}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-3">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="from">Date Employed</label>
					</div>
					<div className="col-lg-4">
						<TextField
							type="date"
							name={`employmentInfo.${index}.yearFrom`}
							register={register}
							max={formatInputDate(new Date())}
							required
							error={
								errors?.employmentInfo &&
								errors?.employmentInfo[index]?.yearFrom
							}
							errorText={
								errors?.employmentInfo &&
								errors?.employmentInfo[index]?.yearFrom &&
								errors?.employmentInfo[index]?.yearFrom.message
							}
						/>
					</div>
					<div className="col-lg-1 d-flex align-items-center justify-content-center">
						-
					</div>
					<div className="col-lg-4">
						<TextField
							type="date"
							name={`employmentInfo.${index}.yearTo`}
							register={register}
							disabled={!beginDate}
							min={beginDate}
							max={formatInputDate(new Date())}
							required
							error={
								errors?.employmentInfo &&
								errors?.employmentInfo[index]?.yearTo
							}
							errorText={
								errors?.employmentInfo &&
								errors?.employmentInfo[index]?.yearTo &&
								errors?.employmentInfo[index]?.yearTo.message
							}
						/>
					</div>
				</div>
			</div>

			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label
							htmlFor={`Job Description.${index}`}
						>{`Job Description ${index + 1}`}</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter employer and location"
							className="w-100"
							type="text"
							id={`jobDescription.${index}`}
							name={`employmentInfo.${index}.jobDescription`}
							register={register}
							required
							error={
								errors?.employmentInfo &&
								errors?.employmentInfo[index]?.jobDescription
							}
							errorText={
								errors?.employmentInfo &&
								errors?.employmentInfo[index]?.jobDescription &&
								errors?.employmentInfo[index]?.jobDescription
									.message
							}
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
							onClick={() => handleRemoveItem(index)}
						/>
					)}
				</div>
			</div>
		</>
	);
};
