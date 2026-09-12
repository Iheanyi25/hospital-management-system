import { SecondaryLink, TextField, SMSelect } from "../../../../ui_elements";
import { formatInputDate } from "../../../../utils/formatDate";
import { Controller } from "react-hook-form";

export const PostPrimaryInstitutions = ({
	index,
	errors,
	control,
	allCountries,
	register,
	watch,
	handleRemoveItem
}) => {
	const beginDate = watch(`educationHistory.${index}.yearFrom`);
	return (
		<>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label
							htmlFor={`school.${index}`}
						>{`Name of Institution`}</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter institution attended"
							className="w-100"
							type="text"
							id={`schoolName.${index}`}
							name={`educationHistory.${index}.schoolName`}
							register={register}
							required
							error={
								errors?.educationHistory &&
								errors?.educationHistory[index]?.schoolName
							}
							errorText={
								errors?.educationHistory &&
								errors?.educationHistory[index]?.schoolName &&
								errors?.educationHistory[index]?.schoolName
									.message
							}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3  d-flex align-items-center">
						<label htmlFor={`countryId.${index}`}>Country</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name={`educationHistory.${index}.countryId`}
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<SMSelect
									{...field}
									placeholder="Choose country"
									id={`countryId.${index}`}
									options={allCountries}
									searchable={true}
									required
									error={
										errors?.educationHistory &&
										errors?.educationHistory[index]
											?.countryId
									}
									errorText={
										errors?.educationHistory &&
										errors?.educationHistory[index]
											?.countryId &&
										errors?.educationHistory[index]
											?.countryId.message
									}
								/>
							)}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-3">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="dateOfBirth">Date Attended</label>
					</div>
					<div className="col-lg-4">
						<TextField
							type="date"
							name={`educationHistory.${index}.yearFrom`}
							register={register}
							required
							max={formatInputDate(new Date())}
							error={
								errors?.educationHistory &&
								errors?.educationHistory[index]?.yearFrom
							}
							errorText={
								errors?.educationHistory &&
								errors?.educationHistory[index]?.yearFrom &&
								errors?.educationHistory[index]?.yearFrom
									.message
							}
						/>
					</div>
					<div className="col-lg-1 d-flex align-items-center justify-content-center">
						-
					</div>
					<div className="col-lg-4">
						<TextField
							type="date"
							name={`educationHistory.${index}.yearTo`}
							register={register}
							disabled={!beginDate}
							min={beginDate}
							max={formatInputDate(new Date())}
							required
							error={
								errors?.educationHistory &&
								errors?.educationHistory[index]?.yearTo
							}
							errorText={
								errors?.educationHistory &&
								errors?.educationHistory[index]?.yearTo &&
								errors?.educationHistory[index]?.yearTo.message
							}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor={`certificate.${index}`}>
							Qualification(s) Obtained
						</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="What qualification did you obtain?"
							className="w-100"
							type="text"
							id={`certificate.${index}`}
							name={`educationHistory.${index}.certificate`}
							register={register}
							required
							error={
								errors?.educationHistory &&
								errors?.educationHistory[index]?.certificate
							}
							errorText={
								errors?.educationHistory &&
								errors?.educationHistory[index]?.certificate &&
								errors?.educationHistory[index]?.certificate
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
							onClick={() =>
								handleRemoveItem(index, "educationHistory")
							}
						/>
					)}
				</div>
			</div>
		</>
	);
};
