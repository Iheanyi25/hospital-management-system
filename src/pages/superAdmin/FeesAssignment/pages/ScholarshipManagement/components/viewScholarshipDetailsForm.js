import { Controller } from "react-hook-form";
import { Jumbotron, Button, SMSelect } from "../../../../../../ui_elements";

export const ViewScholarshipDetailsForm = ({
	control,
	allSessions,
	errors,
	setFilter,
	handleSubmit,
	isLoading
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			session: formData.session.value
		}));
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Records"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_acceptance_records"
						type="submit"
						buttonClass="primary"
						label="View record"
						loading={isLoading}
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
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
