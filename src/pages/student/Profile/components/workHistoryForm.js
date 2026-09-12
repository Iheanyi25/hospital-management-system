import { useEffect } from "react";
import {
	Checkbox,
	// SecondaryLink,
	TextField
} from "../../../../ui_elements";
import { formatInputDate } from "../../../../utils/formatDate";

export const WorkHistoryForm = ({
	index,
	errors,
	register,
	watch,
	item,
	setValue
	// handleRemoveItem
}) => {
	const beginDate = watch(`workHistory.${index}.from`);

	useEffect(() => {
		if (item.currentlyWorkHere) {
			setValue(`workHistory.${index}.to`, null);
			setValue(`workHistory.${index}.reasonForLeaving`, null);
		}
	}, [item, setValue, index]);

	return (
		<>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor={`employer.${index}`}>
							{`Employer and Location ${index + 1}`} *
						</label>
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
							disabled
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-3">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="from">Date Employed *</label>
					</div>
					<div className="col-lg-4">
						<TextField
							type="date"
							name={`workHistory.${index}.from`}
							register={register}
							max={formatInputDate(new Date())}
							required
							error={
								errors?.workHistory &&
								errors?.workHistory[index]?.from
							}
							errorText={
								errors?.workHistory &&
								errors?.workHistory[index]?.from &&
								errors?.workHistory[index]?.from.message
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
							name={`workHistory.${index}.to`}
							register={register}
							disabled
							min={!item.currentlyWorkHere && beginDate}
							max={
								!item.currentlyWorkHere &&
								formatInputDate(new Date())
							}
							required
							error={
								errors?.workHistory &&
								errors?.workHistory[index]?.to
							}
							errorText={
								errors?.workHistory &&
								errors?.workHistory[index]?.to &&
								errors?.workHistory[index]?.to.message
							}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor={`reasonForLeaving.${index}`}>
							Reason for leaving *
						</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter a reason for leaving"
							className="w-100"
							type="text"
							id={`jobDescription.${index}`}
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
							disabled
						/>
					</div>
				</div>
			</div>

			<div className="container-fluid px-4">
				<div className="border-bottom d-flex justify-content-between">
					<div className="pb-4">
						<Checkbox
							label="I currently work here"
							labelClassName="ml-3"
							disabled
							checked={item?.currentlyWorkHere}
						/>
					</div>

					{/* {index > 0 && (
						<SecondaryLink
							label="Delete"
							customClass="pb-4"
							linkType="danger-link"
							onClick={() => handleRemoveItem(index)}
						/>
					)} */}
				</div>
			</div>
		</>
	);
};
