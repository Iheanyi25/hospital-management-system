import {
	Jumbotron,
	Button,
	TextField,
	SMSelect
} from "../../../../ui_elements";
import { useHistory } from "react-router";

export const PersonalInformation = ({ data }) => {
	const { replace } = useHistory();

	return (
		<form onSubmit={() => replace("#section_b")}>
			<Jumbotron
				headerText={<span>Personal Details</span>}
				footerContent={
					<Button
						data-cy="sub_program"
						label="Next"
						buttonClass="primary"
						type="submit"
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Full Name</label>
						</div>
						<div className="col-lg-9">
							<div className="row">
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="First Name"
										className="w-100 pr-2"
										value={data?.firstname}
										disabled
									/>
								</div>
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="Middle Name"
										className="w-100 px-2"
										name="Middlename"
										value={data?.middlename}
										disabled
									/>
								</div>
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="Last Name"
										className="w-100"
										name="Surname"
										value={data?.lastname}
										disabled
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Reg No</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter reg no"
								className="w-100"
								type="text"
								name="HomeTown"
								value={data?.regNumber}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label>Course of Study</label>
						</div>
						<div className="col-lg-9">
							<SMSelect
								placeholder="Choose course of study"
								name="BloodGroupId"
								value={{ label: data?.department ?? "N/A" }}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Phone Number</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter phone number"
								type="text"
								name="MobileNo"
								value={data?.mobileNumber}
								disabled
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
