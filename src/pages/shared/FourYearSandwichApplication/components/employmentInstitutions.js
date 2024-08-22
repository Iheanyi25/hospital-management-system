import { Checkbox, SecondaryLink, TextField } from "../../../../ui_elements";
import { formatInputDate } from "../../../../utils/formatDate";

export const EmploymentInstitutions = ({
	index,
	errors,
	register,
	watch,
	handleRemoveItem,
	setValue,
	clearErrors
}) => {
	const beginDate = watch(`workHistory.${index}.yearFrom`);
	const checkBoxValue = watch(`workHistory.${index}.currentlyWorkingHere`);

	const handleCheckBoxClick = (index) => {
		setValue(`workHistory.${index}.currentlyWorkingHere`, !checkBoxValue);
		setValue(`workHistory.${index}.yearTo`, null);
		clearErrors(`workHistory.${index}.yearTo`);
	};

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
							name={`workHistory.${index}.employer`}
							register={register}
							required
							error={
								errors?.workHistory &&
								errors?.workHistory[index]?.employer
							}
							errorText={
								errors?.workHistory &&
								errors?.workHistory[index]?.employer &&
								errors?.workHistory[index]?.employer.message
							}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-3">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="yearFrom">Date Employed</label>
					</div>
					<div className="col-lg-4">
						<TextField
							type="date"
							name={`workHistory.${index}.yearFrom`}
							register={register}
							max={formatInputDate(new Date())}
							required
							error={
								errors?.workHistory &&
								errors?.workHistory[index]?.yearFrom
							}
							errorText={
								errors?.workHistory &&
								errors?.workHistory[index]?.yearFrom &&
								errors?.workHistory[index]?.yearFrom.message
							}
						/>
					</div>
					<div className="col-lg-1 d-flex align-items-center justify-content-center">
						-
					</div>
					<div className="col-lg-4">
						<TextField
							type="date"
							name={`workHistory.${index}.yearTo`}
							register={register}
							disabled={!beginDate || checkBoxValue}
							min={beginDate}
							max={formatInputDate(new Date())}
							required
							error={
								errors?.workHistory &&
								errors?.workHistory[index]?.yearTo
							}
							errorText={
								errors?.workHistory &&
								errors?.workHistory[index]?.yearTo &&
								errors?.workHistory[index]?.yearTo.message
							}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor={`jobDescription.${index}`}>
							Job Description
						</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter your job description"
							className="w-100"
							type="text"
							id={`jobDescription.${index}`}
							name={`workHistory.${index}.jobDescription`}
							register={register}
							inputType="textarea"
							required
							error={
								errors?.workHistory &&
								errors?.workHistory[index]?.jobDescription
							}
							errorText={
								errors?.workHistory &&
								errors?.workHistory[index]?.jobDescription &&
								errors?.workHistory[index]?.jobDescription
									.message
							}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor={`reasonForLeaving.${index}`}>
							Reasons for leaving
						</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter your reason for leaving"
							className="w-100"
							type="text"
							id={`reasonForLeaving.${index}`}
							name={`workHistory.${index}.reasonForLeaving`}
							register={register}
							required
							error={
								errors?.workHistory &&
								errors?.workHistory[index]?.reasonForLeaving
							}
							errorText={
								errors?.workHistory &&
								errors?.workHistory[index]?.reasonForLeaving &&
								errors?.workHistory[index]?.reasonForLeaving
									.message
							}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-3 my-4">
				<div className="row">
					<div className="col-lg-9">
						<Checkbox
							label="I currently work here"
							labelClassName="ml-3"
							id={`workHistory.${index}.currentlyWorkingHere`}
							checked={checkBoxValue}
							onSelect={() => handleCheckBoxClick(index)}
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
