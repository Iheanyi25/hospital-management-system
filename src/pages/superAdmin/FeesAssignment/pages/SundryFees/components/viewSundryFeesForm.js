import { Controller } from "react-hook-form";
import {
	Jumbotron,
	Button,
	SMSelect,
	Spinner
} from "../../../../../../ui_elements";

export const ViewSundryFeesForm = ({
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
	errors,
	allServiceTypes,
	allStudentModes,
	isFacultiesLoading,
	faculties,
	allPaymentPurpose,
	allStudentModesOfStudy,
	isLoadingStudentModesOfStudy
}) => {
	const onSubmit = (formData) => {
		const hasModeOfStudyId = formData?.ModeOfStudyId?.value
			? { modeOfStudyId: formData?.ModeOfStudyId?.value }
			: {};
		setFilter((state) => ({
			...state,
			StudentTypeId: formData.StudentTypeId.value,
			StudentModeId: formData.StudentModeId.value,
			ServiceTypeId: formData.ServiceTypeId.value,
			SessionId: formData.session.value,
			Level: formData.Level.value,
			PaymentType: formData.PaymentType.value,
			PaymentPurpose: formData.PaymentPurpose.value,
			FacultyId: formData.FacultyId.value,
			...hasModeOfStudyId,
			pageNumber: 1,
			pageSize: state.pageSize,
			searchTerm: ""
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
										htmlFor="PaymentType"
									>
										Payment Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="PaymentType"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select payment type"
												options={allPaymentTypes}
												id="PaymentType"
												searchable={false}
												isError={!!errors.PaymentType}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6 mt-5">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="PaymentPurpose"
									>
										Payment Purpose
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="PaymentPurpose"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select payment purpose"
												options={allPaymentPurpose}
												id="PaymentPurpose"
												searchable={true}
												isError={
													!!errors.PaymentPurpose
												}
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
										htmlFor="StudentTypeId"
									>
										Student Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="StudentTypeId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Student Type"
												options={allStudentTypes}
												id="StudentTypeId"
												searchable={false}
												isError={!!errors.StudentTypeId}
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
										htmlFor="StudentModeId"
									>
										Student Mode
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="StudentModeId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Student Mode"
												options={allStudentModes}
												id="StudentModeId"
												searchable={false}
												isError={!!errors.StudentModeId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{isLoadingStudentModesOfStudy && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{allStudentModesOfStudy?.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3 d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="ModeOfStudyId"
										>
											Mode of Study
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="ModeOfStudyId"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select a mode of study"
													searchable={false}
													options={
														allStudentModesOfStudy
													}
													isError={
														!!errors.ModeOfStudyId
													}
													errorText={
														errors.ModeOfStudyId &&
														errors.ModeOfStudyId
															.message
													}
													id="ModeOfStudyId"
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						<div className="col-md-6 mt-5">
							<div className="row">
								<div className="col-lg-3 d-flex  align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="ServiceTypeId"
									>
										Service Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="ServiceTypeId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Service Type"
												options={allServiceTypes}
												id="ServiceTypeId"
												searchable={true}
												isError={!!errors.ServiceTypeId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{isFacultiesLoading && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{faculties?.data?.length > 0 && (
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="FacultyId"
										>
											Faculty
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="FacultyId"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select Faculty"
													options={allFaculties}
													id="FacultyId"
													searchable={true}
													isError={!!errors.FacultyId}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{isLoadingLevels && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{levels?.data?.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3 d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="Level"
										>
											Level
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="Level"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="Level"
													placeholder="Select year of study"
													options={allLevels}
													searchable={true}
													isError={!!errors.Level}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
