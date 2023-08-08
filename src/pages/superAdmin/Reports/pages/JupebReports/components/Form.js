import { Controller } from "react-hook-form";
import { Jumbotron, Button, SMSelect } from "../../../../../../ui_elements";

export const Form = ({
	allSessions,
	control,
	setFilter,
	handleSubmit,
	isLoadingLevels,
	isLoadingFeesToAssign,
	allApplicationTypes,
	errors
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			sessionId: formData.sessionId.value,
			applicationTypeId: formData.applicationTypeId.value
		}));
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Applications"
				footerContent={
					<Button
						data-cy="view_school_fees_form"
						type="submit"
						buttonClass="primary"
						label="View record"
						disabled={isLoadingLevels}
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
										htmlFor="sessionId"
									>
										Session
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="sessionId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="sessionId"
												options={allSessions}
												placeholder="Select a Session"
												searchable={true}
												isError={!!errors.sessionId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="row align-items-center">
								<div className="col-lg-3 align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="applicationTypeId"
									>
										Application Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="applicationTypeId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												placeholder="Select an Application Type"
												options={allApplicationTypes}
												id="applicationTypeId"
												searchable={true}
												{...field}
												isError={
													!!errors.applicationTypeId
												}
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
