import { Controller } from "react-hook-form";
import {
	Jumbotron,
	Button,
	SMSelect,
	Spinner,
	ProfileContext
} from "../../../../../../ui_elements";
import { fieldSetterAndClearer } from "../../../../../../utils/fieldSetterAndClearer";
import { useContext } from "react";

export const Form = ({
	control,
	allFaculties,
	allSessions,
	allStudentTypes,
	errors,
	setFilter,
	setValue,
	handleSubmit,
	isLoadingLevelAdvisers,
	isLoadingFaculties,
	isLoadingDepartments,
	allDepartments
}) => {
	const data = useContext(ProfileContext);
	const programDetails = data?.profileData?.programmeDetail;

	const onFacultyChange = (value) => {
		setValue("facultyId", value);
		setValue("departmentId", null);
	};

	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			studentTypeId: formData.studentTypeId.value,
			sessionId: formData.sessionId.value,
			departmentId: formData?.departmentId?.value
		}));
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Assign Course Adviser"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_records_hod"
						type="submit"
						buttonClass="primary"
						label="View records"
						loading={isLoadingLevelAdvisers}
						disabled={isLoadingDepartments || isLoadingFaculties}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className="row">
						<div className="col-md-6 mb-5">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
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
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Student Type"
												options={allStudentTypes}
												searchable={false}
												disabled={
													programDetails?.studentTypeId
												}
												onChange={(value) =>
													fieldSetterAndClearer({
														value,
														setterFunc: setValue,
														setField:
															"studentTypeId",
														clearFields: [
															"facultyId",
															"sessionId"
														]
													})
												}
												id="studentTypeId"
												isError={!!errors.studentTypeId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{isLoadingFaculties && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{allFaculties?.length > 0 && (
							<div className="col-md-6">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
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
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select faculty"
													options={allFaculties}
													onChange={(value) =>
														onFacultyChange(value)
													}
													id="facultyId"
													disabled={
														programDetails?.facultyId
													}
													searchable={true}
													isError={!!errors.facultyId}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{isLoadingDepartments && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{allDepartments?.length > 0 && (
							<div className="col-md-6">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="departmentId"
										>
											Department
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="departmentId"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select department"
													options={allDepartments}
													id="departmentId"
													searchable={true}
													disabled={
														programDetails?.departmentId
													}
													isError={
														!!errors.departmentId
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
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
