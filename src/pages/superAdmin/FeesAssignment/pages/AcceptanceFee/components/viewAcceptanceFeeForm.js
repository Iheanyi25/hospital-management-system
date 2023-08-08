import { Controller } from "react-hook-form";
import { Jumbotron, Button, SMSelect } from "../../../../../../ui_elements";

export const ViewAcceptanceFeeForm = ({
	control,
	allSessions,
	allStudentTypes,
	errors,
	setFilter,
	handleSubmit,
	isLoadingFeesToAssign,
	allServiceTypes
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			session: formData.session.value,
			studentTypeId: formData.studentTypeId.value,
		}));
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="View Acceptance fee"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_acceptance_records"
						type="submit"
						buttonClass="primary"
						label="View record"
						loading={isLoadingFeesToAssign}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className="row">
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="session"
									>
										Session
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="session"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="session"
												options={allSessions}
												placeholder="Select Session"
												searchable={true}
												isError={!!errors.session}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="studentTypeId"
									>
										Student Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="studentTypeId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Student Type"
												options={allStudentTypes}
												id="studentTypeId"
												searchable={false}
												isError={!!errors.studentTypeId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
