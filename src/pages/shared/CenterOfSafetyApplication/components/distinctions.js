import { TextField } from "../../../../ui_elements";

export const Distinctions = ({ index, register }) => {
	return (
		<>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label>{`Qualifications`}</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter honour"
							className="w-100"
							type="text"
							id={`honours.${index}.honour`}
							name={`honours.${index}.honour`}
							register={register}
							required
						/>
					</div>
				</div>
			</div>
		</>
	);
};
