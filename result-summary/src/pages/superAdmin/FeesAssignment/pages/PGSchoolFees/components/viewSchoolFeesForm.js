import { Controller } from "react-hook-form";
import { Jumbotron, Button, SMSelect } from "../../../../../../ui_elements";

export const ViewSchoolFeesForm = ({
	allFaculties,
	allLevels,
	allSessions,
	allStudentTypes,
	control,
	setFilter,
	handleSubmit,
	allPaymentTypes,
	isLoadingLevels,
	isLoadingFeesToAssign,
	levels,
	errors
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			studentTypeId: formData.studentTypeId.value,
			sessionId: formData.sessionId.value,
			level: formData.level.value,
			paymentType: formData.paymentType.value,
			facultyId: formData.facultyId.value
		}));
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="View School fees"
				borderClasses="border-bottom-0"
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
												placeholder="Select Session"
												searchable={true}
												isError={!!errors.sessionId}
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
										htmlFor="facultyId"
									>
										Faculty
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="facultyId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select faculty"
												options={allFaculties}
												id="facultyId"
												searchable={false}
												isError={!!errors.facultyId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6 mt-5">
							<div className="row">
								<div className="col-lg-3 d-flex  align-items-center">
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
						{levels?.data?.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3 d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="level"
										>
											Level
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="level"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="level"
													placeholder="Select year of study"
													options={allLevels}
													searchable={true}
													isError={!!errors.level}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						<div className="col-md-6 mt-5">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="paymentType"
									>
										Payment Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="paymentType"
										control={control}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select payment type"
												rules={{ required: true }}
												options={allPaymentTypes}
												id="paymentType"
												searchable={false}
												isError={!!errors.paymentType}
												disabled
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
