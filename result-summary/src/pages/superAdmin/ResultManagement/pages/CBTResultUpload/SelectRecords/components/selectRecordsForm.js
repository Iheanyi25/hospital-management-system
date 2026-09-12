import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import {
	Button,
	SMSelect,
	Spinner,
	Jumbotron,
	AsyncMultiSelect
} from "../../../../../../../ui_elements";
import { SEMESTERS } from "../../../../../../../utils/constants";

export const SelectRecordsForm = ({
	control,
	errors,
	allSessions,
	allStudentTypes,
	setFilter,
	setValue,
	clearErrors,
	handleSubmit,
	isLoadingLevels,
	isLoadingCourses,
	isDepartmentLoading,
	apiOptions
}) => {
	const courseIdInputRef = useRef();
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			studentTypeId: formData.studentTypeId.value,
			sessionId: formData.sessionId.value,
			semesterId: formData.semesterId.value,
			courseId: formData?.courseId?.value,
		}));
	};
	const handleFieldChange = ({ value, setField, clearFields }) => {
		setValue(setField, value);
		clearErrors(setField);
		if (clearFields) {
			clearFields.forEach((field) => setValue(field, ""));
		}
	};

	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="View CBT Result Upload Results"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_res_data"
						type="submit"
						buttonClass="primary"
						label="View results"
						loading={isLoadingCourses}
						disabled={isLoadingCourses}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className="row">
						<div className="col-md-6">
							<div className={`row`}>
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
						<div className="col-md-6">
							<div className="row">
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
												onChange={(value) => {
													handleFieldChange({
														value,
														setField: "semesterId",
														clearFields: [
															"levelId",
															"courseId"
														]
													});
													courseIdInputRef?.current?.clearValue();
												}}
												isError={!!errors.semesterId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="row mt-5">
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
												placeholder="Select student type"
												options={allStudentTypes}
												searchable={false}
												id="studentTypeId"
												onChange={(value) => {
													handleFieldChange({
														value,
														setField:
															"studentTypeId",
														clearFields: [
															"courseId",
															"levelId",
															"departmentId"
														]
													});
													courseIdInputRef?.current?.clearValue();
												}}
												isError={!!errors.studentTypeId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{allStudentTypes.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="courseId"
										>
											Course
										</label>
									</div>
									<div className="col-lg-9">
										{isDepartmentLoading ||
										isLoadingLevels ? (
											<Spinner />
										) : (
											<Controller
												name="courseId"
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<AsyncMultiSelect
														placeholder="Search by course code/title"
														id="courseId"
														apiOptions={apiOptions}
														isMulti={false}
														isClearable
														{...field}
														onChange={(value) =>
															value
																? handleFieldChange(
																		{
																			value,
																			setField:
																				"courseId"
																		}
																  )
																: null
														}
														ref={courseIdInputRef}
														isError={
															!!errors.courseId
														}
														errorText={
															errors.courseId &&
															errors.courseId
																.message
														}
														required
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
};
