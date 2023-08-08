import { TextField } from "../../../../ui_elements";

export const Referees = ({ index, errors, register }) => {
	return (
		<>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor={`name.${index}`}>{`Name ${
							index + 1
						}`}</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter name"
							className="w-100"
							type="text"
							id={`name.${index}`}
							name={`referees.${index}.name`}
							register={register}
							required
							error={
								errors?.referees &&
								errors?.referees[index]?.name
							}
							errorText={
								errors?.referees &&
								errors?.referees[index]?.name &&
								errors?.referees[index]?.name.message
							}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor={`email.${index}`}>Email</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter email"
							className="w-100"
							type="text"
							id={`email.${index}`}
							name={`referees.${index}.email`}
							register={register}
							required
							error={
								errors?.referees &&
								errors?.referees[index]?.email
							}
							errorText={
								errors?.referees &&
								errors?.referees[index]?.email &&
								errors?.referees[index]?.email.message
							}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor={`position.${index}`}>
							Job position
						</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter position"
							className="w-100"
							type="text"
							id={`position.${index}`}
							name={`referees.${index}.position`}
							register={register}
							required
							error={
								errors?.referees &&
								errors?.referees[index]?.position
							}
							errorText={
								errors?.referees &&
								errors?.referees[index]?.position &&
								errors?.referees[index]?.position.message
							}
						/>
					</div>
				</div>
			</div>
			<div className="container-fluid px-4 my-4">
				<div className="row">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor={`organisation.${index}`}>
							Organization
						</label>
					</div>
					<div className="col-lg-9">
						<TextField
							autoComplete="off"
							placeholder="Enter organization"
							className="w-100"
							type="text"
							id={`organisation.${index}`}
							name={`referees.${index}.organisation`}
							register={register}
							required
							error={
								errors?.referees &&
								errors?.referees[index]?.organisation
							}
							errorText={
								errors?.referees &&
								errors?.referees[index]?.organisation &&
								errors?.referees[index]?.organisation.message
							}
						/>
					</div>
				</div>
				{index < 2 && (
					<div className="container-fluid mt-4 px-4 border-bottom" />
				)}
			</div>
		</>
	);
};
