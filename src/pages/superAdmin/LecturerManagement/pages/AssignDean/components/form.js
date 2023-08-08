import { Controller } from "react-hook-form";
import { Jumbotron, Button, SMSelect } from "../../../../../../ui_elements";

export const Form = ({
	control,
	allSessions,
	errors,
	setFilter,
	handleSubmit,
	isLoadingFeesToAssign
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			sessionId: formData.sessionId.value
		}));
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Assign Dean"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_dean_records"
						type="submit"
						buttonClass="primary"
						label="View records"
						loading={isLoadingFeesToAssign}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className="row">
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
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
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="sessionId"
												options={allSessions}
												placeholder="Select Academic Session"
												searchable={false}
												isError={!!errors.sessionId}
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
