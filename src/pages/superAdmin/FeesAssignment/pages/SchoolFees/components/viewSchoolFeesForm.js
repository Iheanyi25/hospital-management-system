import { Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
	Jumbotron,
	Button,
	SMSelect,
	Spinner
} from "../../../../../../ui_elements";
import { STUDENT_TYPES } from "../../../../../../utils/constants";
import { fieldSetterAndClearer } from "../../../../../../utils/fieldSetterAndClearer";

export const ViewSchoolFeesForm = ({
	allFaculties,
	isFacultiesLoading,
	allLevels,
	allSessions,
	allStudentTypes,
	allServiceTypes,
	allStudentModes,
	allStudentModeEntry,
	control,
	setFilter,
	handleSubmit,
	allPaymentTypes,
	isLoadingLevels,
	isLoadingFeesToAssign,
	faculties,
	levels,
	errors,
	pageNumber,
	pageSize,
	allProgrammes,
	watchData,
	allPaymentChannels,
	isLoadingSchoolProgrammes,
	allStudentModesOfStudy,
	isLoadingStudentModesOfStudy,
	isLoadingProgrammeTypes,
	allProgrammeTypes,
	allStaffStatus,
	setValue,
	searchTerm
}) => {
	const { push } = useHistory();
	const onSubmit = (formData) => {
		const hasSchoolProgrammeId = formData?.SchoolProgrammeId?.value
			? { SchoolProgrammeId: formData?.SchoolProgrammeId?.value }
			: {};
		const hasProgrammeTypeId = formData?.ProgrammeTypeId?.value
			? { ProgrammeTypeId: formData?.ProgrammeTypeId?.value }
			: {};
		const hasModeOfStudyId = formData?.ModeOfStudyId?.value
			? { ModeOfStudyId: formData?.ModeOfStudyId?.value }
			: {};
		setFilter((state) => ({
			...state,
			StudentTypeId: formData.StudentTypeId.value,
			StudentModeId: formData.StudentModeId.value,
			IsStaff: formData.IsStaff.value,
			ModeOfEntryId: formData.ModeOfEntryId.value,
			ServiceTypeId: formData.ServiceTypeId.value,
			SessionId: formData.session.value,
			Level: formData.Level.value,
			PaymentType: formData.PaymentType.value,
			FacultyId: formData.FacultyId.value,
			PaymentChannelId: formData.PaymentChannelId.value,
			...hasSchoolProgrammeId,
			...hasModeOfStudyId,
			...hasProgrammeTypeId,
			pageNumber,
			pageSize,
			searchTerm
		}));
		push({
			search: new URLSearchParams({
				StudentTypeId: formData.StudentTypeId.value,
				StudentModeId: formData.StudentModeId.value,
				ModeOfEntryId: formData.ModeOfEntryId.value,
				ServiceTypeId: formData.ServiceTypeId.value,
				IsStaff: formData.IsStaff.value,
				SessionId: formData.session.value,
				Level: formData.Level.value,
				PaymentType: formData.PaymentType.value,
				FacultyId: formData.FacultyId.value,
				PaymentChannelId: formData.PaymentChannelId.value,
				...hasSchoolProgrammeId,
				...hasModeOfStudyId,
				...hasProgrammeTypeId,
				pageNumber,
				pageSize,
				searchTerm
			}).toString()
		});
	};
	const shouldShowProgramme =
		Number(watchData.StudentTypeId) === STUDENT_TYPES.POSTGRADUATE;

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
												placeholder="Select Student type"
												options={allStudentTypes}
												id="StudentTypeId"
												onChange={(value) =>
													fieldSetterAndClearer({
														value,
														setterFunc: setValue,
														setField:
															"StudentTypeId",
														clearFields: [
															"FacultyId",
															"SchoolProgrammeId",
															"ProgrammeTypeId",
															"ModeOfStudyId",
															"Level"
														]
													})
												}
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
										htmlFor="IsStaff"
									>
										Staff Status
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="IsStaff"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Is the student a staff?"
												options={allStaffStatus}
												id="IsStaff"
												searchable={false}
												isError={!!errors.IsStaff}
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
						<div className="col-md-6 mt-5">
							<div className="row">
								<div className="col-lg-3 d-flex  align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="ModeOfEntryId"
									>
										Mode Of Entry
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="ModeOfEntryId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Student Mode of Entry"
												options={allStudentModeEntry}
												id="ModeOfEntryId"
												searchable={false}
												isError={!!errors.ModeOfEntryId}
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
													placeholder="Select faculty"
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
						<div className="col-md-6">
							<div className="row mt-5">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="PaymentChannelId"
									>
										Payment Channel
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="PaymentChannelId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="PaymentChannelId"
												placeholder="Select payment channel"
												options={allPaymentChannels}
												searchable={true}
												isError={
													!!errors.PaymentChannelId
												}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{isLoadingSchoolProgrammes && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{allProgrammes?.length > 0 && shouldShowProgramme && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3 d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="SchoolProgrammeId"
										>
											Programmes
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="SchoolProgrammeId"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="SchoolProgrammeId"
													placeholder="Select a programme"
													options={allProgrammes}
													searchable={true}
													isError={
														!!errors.SchoolProgrammeId
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{isLoadingProgrammeTypes && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{allProgrammeTypes?.length > 0 && shouldShowProgramme && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3 d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="ProgrammeTypeId"
										>
											Programme Type
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="ProgrammeTypeId"
											control={control}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="ProgrammeTypeId"
													placeholder="Select a programme type"
													options={allProgrammeTypes}
													searchable={true}
													isError={
														!!errors.ProgrammeTypeId
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{isLoadingStudentModesOfStudy && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{allStudentModesOfStudy?.length > 0 &&
							shouldShowProgramme && (
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
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
