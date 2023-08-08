import {
	Button,
	SMSelect,
	Spinner,
	Jumbotron
} from "../../../../../ui_elements";
import { Controller } from "react-hook-form";
import { SEMESTERS } from "../../../../../utils/constants";
import { useHistory } from "react-router-dom";

export default function ApproveCoursesForm({
	allStudentTypes,
	allLevels,
	allSessions,
	allDepartments,
	isDepartmentLoading,
	allDepartmentOption,
	isLoadingLevels,
	isLoadingDepartmentOption,
	isLoadingCoursesList,
	control,
	errors,
	data,
	setFilter,
	filter,
	handleSubmit
}) {
	const { push } = useHistory();
	const onSubmit = (formData) => {
		setFilter((state) => ({
			departmentId: formData.department.value,
			//conditinally add departmentOptionId to filter object
			...(allDepartmentOption.length > 0 && {
				departmentOptionId: formData?.departmentOption?.value
			}),
			levelId: formData?.yearOfStudy?.value,
			studentTypeId: formData.studentType.value,
			sessionId: formData.session.value,
			semesterId: formData.semester.value,
			pageSize: state.pageSize
		}));
		push({
			search: new URLSearchParams({
				departmentId: formData.department.value,
				//conditinally add departmentOptionId to filter object
				...(allDepartmentOption.length > 0 && {
					departmentOptionId: formData?.departmentOption?.value
				}),
				levelId: formData.yearOfStudy.value,
				studentTypeId: formData.studentType.value,
				sessionId: formData.session.value,
				semesterId: formData.semester.value,
				pageSize: filter.pageSize
			}).toString()
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-100">
			<Jumbotron
				headerText="Courses"
				borderClasses={`${data.length > 0 && "border-bottom-0"}`}
				footerContent={
					<Button
						data-cy="view_reged_courses"
						type="submit"
						buttonClass="primary"
						label="View registered course"
						disabled={isLoadingLevels || isLoadingDepartmentOption}
						loading={isLoadingCoursesList}
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
										htmlFor="studentType"
									>
										Student Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="studentType"
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
												id="studentType"
												isError={!!errors.studentType}
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
						{allDepartments.length > 0 && (
							<div className="col-md-6">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="dept"
										>
											Department
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="department"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="dept"
													placeholder="Select department"
													options={allDepartments}
													searchable={true}
													isError={
														!!errors.department
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{allDepartmentOption?.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-3 mt-md-0">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="departmentOption"
										>
											Department option
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="departmentOption"
											control={control}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="departmentOption"
													placeholder="Select department option"
													options={
														allDepartmentOption
													}
													searchable={false}
													isError={
														!!errors.departmentOption
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{isLoadingDepartmentOption && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						<div className="col-md-6">
							<div
								className={`row ${
									allDepartments.length > 0 ||
									isDepartmentLoading
										? "mt-3 mt-md-5"
										: "mt-3 mt-md-0"
								}`}
							>
								<div className="col-lg-3  d-flex align-items-center">
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
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="session"
												options={allSessions}
												placeholder="Select Academic Session"
												searchable={false}
												isError={!!errors.session}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="row mt-3 mt-md-5">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="semester"
									>
										Semester
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="semester"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="semester"
												placeholder="Select Semester"
												options={SEMESTERS}
												searchable={false}
												isError={!!errors.semester}
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
						{allLevels.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-3 mt-md-5">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="yearOfStudy"
										>
											Level
										</label>
									</div>
									<div className="col-lg-9">
										{isLoadingLevels ? (
											<Spinner />
										) : (
											<Controller
												name="yearOfStudy"
												control={control}
												rules={{
													required: true
												}}
												render={({ field }) => (
													<SMSelect
														{...field}
														id="yearOfStudy"
														placeholder="Select year of study"
														options={allLevels}
														searchable={false}
														isError={
															!!errors.yearOfStudy
														}
													/>
												)}
											/>
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</section>
			</Jumbotron>
		</form>
	);
}
