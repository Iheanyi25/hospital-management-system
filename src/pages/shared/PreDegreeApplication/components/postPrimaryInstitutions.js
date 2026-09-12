import { SecondaryLink, TextField } from "../../../../ui_elements";
import { formatInputDate } from "../../../../utils/formatDate";

export const PostPrimaryInstitutions = ({
	index,
	errors,
	register,
	watch,
	handleRemoveItem
}) => {
	const beginDate = watch(`education.${index}.yearFrom`);
	return (
		<>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label
							htmlFor={`schoolName.${index}`}
						>{`Name of Institution`}</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter name"
							className="w-100"
							type="text"
							id={`schoolName.${index}`}
							name={`education.${index}.schoolName`}
							register={register}
							required
							error={
								errors?.education &&
								errors?.education[index]?.schoolName
							}
							errorText={
								errors?.education &&
								errors?.education[index]?.schoolName &&
								errors?.education[index]?.schoolName.message
							}
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
							name={`education.${index}.yearFrom`}
							register={register}
							required
							max={formatInputDate(new Date())}
							error={
								errors?.education &&
								errors?.education[index]?.yearFrom
							}
							errorText={
								errors?.education &&
								errors?.education[index]?.yearFrom &&
								errors?.education[index]?.yearFrom.message
							}
						/>
					</div>
					<div className="col-lg-1 d-flex align-items-center justify-content-center">
						-
					</div>
					<div className="col-lg-4">
						<TextField
							type="date"
							name={`education.${index}.yearTo`}
							register={register}
							disabled={!beginDate}
							min={beginDate}
							max={formatInputDate(new Date())}
							required
							error={
								errors?.education &&
								errors?.education[index]?.yearTo
							}
							errorText={
								errors?.education &&
								errors?.education[index]?.yearTo &&
								errors?.education[index]?.yearTo.message
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
							placeholder="Enter degree obtained"
							className="w-100"
							type="text"
							id={`certificate.${index}`}
							name={`education.${index}.certificate`}
							register={register}
							required
							error={
								errors?.education &&
								errors?.education[index]?.certificate
							}
							errorText={
								errors?.education &&
								errors?.education[index]?.certificate &&
								errors?.education[index]?.certificate.message
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
