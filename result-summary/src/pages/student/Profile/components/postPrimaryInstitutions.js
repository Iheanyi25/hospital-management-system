import {
	// SecondaryLink,
	TextField
} from "../../../../ui_elements";
import { formatInputDate } from "../../../../utils/formatDate";

export const PostPrimaryInstitutions = ({
	index,
	errors,
	register,
	watch
	// handleRemoveItem
}) => {
	const beginDate = watch(`educationalRecords.${index}.yearFrom`);
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
							id={`school.${index}`}
							name={`educationalRecords.${index}.school`}
							register={register}
							required
							error={
								errors?.educationalRecords &&
								errors?.educationalRecords[index]?.school
							}
							errorText={
								errors?.educationalRecords &&
								errors?.educationalRecords[index]?.school &&
								errors?.educationalRecords[index]?.school
									.message
							}
							disabled
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor={`place.${index}`}>Reg Number</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter your reg number"
							className="w-100"
							type="text"
							id={`place.${index}`}
							name={`educationalRecords.${index}.regNumber`}
							register={register}
							required
							error={
								errors?.educationalRecords &&
								errors?.educationalRecords[index]?.regNumber
							}
							errorText={
								errors?.educationalRecords &&
								errors?.educationalRecords[index]?.regNumber &&
								errors?.educationalRecords[index]?.regNumber
									.message
							}
							disabled
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
							name={`educationalRecords.${index}.yearFrom`}
							register={register}
							required
							max={formatInputDate(new Date())}
							error={
								errors?.educationalRecords &&
								errors?.educationalRecords[index]?.yearFrom
							}
							errorText={
								errors?.educationalRecords &&
								errors?.educationalRecords[index]?.yearFrom &&
								errors?.educationalRecords[index]?.yearFrom
									.message
							}
							disabled
						/>
					</div>
					<div className="col-lg-1 d-flex align-items-center justify-content-center">
						-
					</div>
					<div className="col-lg-4">
						<TextField
							type="date"
							name={`educationalRecords.${index}.yearTo`}
							register={register}
							// disabled={!beginDate}
							min={beginDate}
							max={formatInputDate(new Date())}
							required
							error={
								errors?.educationalRecords &&
								errors?.educationalRecords[index]?.yearTo
							}
							errorText={
								errors?.educationalRecords &&
								errors?.educationalRecords[index]?.yearTo &&
								errors?.educationalRecords[index]?.yearTo
									.message
							}
							disabled
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor={`certificate.${index}`}>
							Diploma/Certificate Obtained
						</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="What qualification did you obtain?"
							className="w-100"
							type="text"
							id={`certificate.${index}`}
							name={`educationalRecords.${index}.certificate`}
							register={register}
							required
							error={
								errors?.educationalRecords &&
								errors?.educationalRecords[index]?.certificate
							}
							errorText={
								errors?.educationalRecords &&
								errors?.educationalRecords[index]
									?.certificate &&
								errors?.educationalRecords[index]?.certificate
									.message
							}
							disabled
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4">
				<div className="border-bottom d-flex justify-content-end">
					{/* {index > 0 && (
						<SecondaryLink
							label="Delete"
							customClass="pb-4"
							linkType="danger-link"
							onClick={() =>
								handleRemoveItem(index, "educationalRecords")
							}
						/>
					)} */}
				</div>
			</div>
		</>
	);
};
