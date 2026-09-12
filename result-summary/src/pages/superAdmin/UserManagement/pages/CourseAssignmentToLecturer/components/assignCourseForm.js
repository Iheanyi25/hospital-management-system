import { Controller } from "react-hook-form";
import {
	Jumbotron,
	Button,
	SMSelect,
	Spinner
} from "../../../../../../ui_elements";
import { SEMESTERS } from "../../../../../../utils/constants";
import { fieldSetterAndClearer } from "../../../../../../utils/fieldSetterAndClearer";

export const AssignCourseForm = ({
	allDepartments,
	allDepartmentOption,
	departmentOption,
	allLevels,
	allSessions,
	allCampuses,
	allStudentTypes,
	control,
	setFilter,
	setValue,
	handleSubmit,
	isLoadingLevels,
	isDepartmentLoading,
	isLoadingDepartmentOption,
	levels,
	errors,
	isLoadingLecturerCourses
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			studentTypeId: formData.studentTypeId.value,
			semesterId: formData.semesterId.value,
			sessionId: formData.session.value,
			levelId: formData.level.value,
			departmentId: formData.departmentId.value,
			departmentOptionId:
				departmentOption?.data?.length > 0
					? formData?.departmentOptionId?.value
					: null,
			campusId: formData?.campusId?.value
		}));
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Assign Course To Lecturer"
				footerContent={
					<Button
						data-cy="view_courses_assigned_form"
						type="submit"
						buttonClass="primary"
						label="View record"
						loading={isLoadingLecturerCourses}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4 container flex-wrap align-items-center justify-content-between">
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
												onChange={(value) =>
													fieldSetterAndClearer({
														value,
														setterFunc: setValue,
														setField:
															"studentTypeId",
														clearFields: [
															"departmentId",
															"level",
															"semesterId"
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
						{isDepartmentLoading && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						<div className="col-md-6">
							<div className="row align-items-center">
								<div className="col-lg-3 align-items-center">
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
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select department"
												options={allDepartments}
												id="departmentId"
												searchable={true}
												onChange={(value) =>
													fieldSetterAndClearer({
														value,
														setterFunc: setValue,
														setField:
															"departmentId",
														clearFields: [
															"departmentOptionId"
														]
													})
												}
												isError={!!errors.departmentId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{isLoadingDepartmentOption && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{departmentOption?.data?.length > 0 && (
							<div className="col-md-6 mb-5">
								<div className="row align-items-center">
									<div className="col-lg-3 align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="departmentOptionId"
										>
											Department option
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="departmentOptionId"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select department option"
													options={
														allDepartmentOption
													}
													id="departmentOptionId"
													searchable={true}
													isError={
														!!errors.departmentOptionId
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						<div className="col-md-6">
							<div className={`row align-items-center`}>
								<div className="col-lg-3 align-items-center">
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
							<div className="row align-items-center">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="semesterId"
									>
										Semester
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="semesterId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="semesterId"
												placeholder="Select Semester"
												options={SEMESTERS}
												searchable={false}
												isError={!!errors.semesterId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{isLoadingLevels && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{levels?.data?.length > 0 && (
							<div className="col-md-6">
								<div
									className={`row ${
										!departmentOption?.data?.length > 0
											? "mt-5"
											: ""
									} align-items-center`}
								>
									<div className="col-lg-3 align-items-center">
										<label
											className="font-weight-bold mr-5"
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
							<div className={`row align-items-center`}>
								<div className="col-lg-3 align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="campusId"
									>
										Campus
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="campusId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="campusId"
												options={allCampuses}
												placeholder="Select a campus"
												searchable={true}
												isError={!!errors.campusId}
												errorText={
													errors.campusId &&
													errors.campusId.message
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
