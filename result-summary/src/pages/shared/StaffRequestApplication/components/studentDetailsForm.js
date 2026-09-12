import { Controller } from "react-hook-form";
import {
	TextField,
	SMSelect,
	Jumbotron,
	Button
} from "../../../../ui_elements";

export const StudentDetailsForm = ({ replace, control, register, state }) => {
	const onSubmit = (event) => {
		event.preventDefault();
		replace({ hash: "#section_b", state });
	};

	return (
		<form onSubmit={onSubmit}>
			<Jumbotron
				headerText={<span>Student Details</span>}
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Next"
						buttonClass="primary"
						type="submit"
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="px-4 my-4">
					<h4>Note</h4>
					<ol className="mt-3">
						<li>
							Only one copy of this form is to be completed and
							submitted to the Admissions Office by a bona fide
							staff, either on behalf of himself/herself, his/her
							spouse or biological child
						</li>
						<li>
							Only Regular staff members of the University are
							eligible to apply.
						</li>
					</ol>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="full_name">Full Name</label>
						</div>
						<div className="col-lg-9">
							<div className="row" id="full_name">
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="First Name"
										className="w-100 pr-2"
										name="Firstname"
										register={register}
										disabled
									/>
								</div>
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="Middle Name"
										className="w-100 px-2"
										name="Middlename"
										register={register}
										disabled
									/>
								</div>
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="Last Name"
										className="w-100"
										name="Lastname"
										register={register}
										disabled
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="Gender">Sex</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="Gender"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										searchable={false}
										id="Gender"
										disabled
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="JambNumber">Jamb Reg No</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								type="text"
								id="JambNumber"
								name="JambNumber"
								disabled
								register={register}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="UtmeScore">UTME Score</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								type="text"
								id="UtmeScore"
								name="UtmeScore"
								disabled
								register={register}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="PutmeScore">PUTME Score</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								type="text"
								id="PutmeScore"
								name="PutmeScore"
								disabled
								register={register}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="AggregateScore">
								Aggregate Score
							</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								name="AggregateScore"
								className="w-100"
								type="text"
								id="	AggregateScore"
								disabled
								register={register}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="Department">Department</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="Department"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										searchable={false}
										id="Department"
										disabled
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
