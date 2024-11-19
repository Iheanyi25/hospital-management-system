import React from "react";
import { Controller } from "react-hook-form";
import {
	Button,
	SMSelect,
	Spinner,
	Jumbotron
} from "../../../../../../ui_elements";
import { SEMESTERS } from "../../../../../../utils/constants";
import { fieldSetterAndClearer } from "../../../../../../utils/fieldSetterAndClearer";

export const AssignCoursetForm = ({
	control,
	errors,
	allSessions,
	allDepartments,
	allDepartmentOption,
	allStudentModes,
	allStudentTypes,
	isLoadingDepartmentOption,
	departmentOption,
	setFilter,
	setValue,
	handleSubmit,
	allLevels,
	levels,
	isLoadingLevels,
	isLoadingCourses,
	isDepartmentLoading,
	setCloneOpen
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			departmentId: formData?.departmentId?.value,
			departmentOptionId:
				departmentOption?.data?.length > 0
					? formData?.departmentOptionId?.value
					: null,
			modeOfEntryId: formData.modeOfEntryId.value,
			studentTypeId: formData.studentTypeId.value,
			sessionId: formData.sessionId.value,
			semesterId: formData.semesterId.value,
			levelId: formData.levelId.value
		}));
	};

	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Assign Course"
				borderClasses="border-bottom-0"
				footerContent={
					<div className="d-flex g-5">
						<Button
							data-cy="view_records"
							buttonClass="secondary"
							label="Clone Course Assignment"
							onClick={() => setCloneOpen(true)}
						/>
						<Button
							data-cy="view_records"
							type="submit"
							buttonClass="primary"
							label="View records"
							loading={isLoadingCourses}
							disabled={
								isLoadingDepartmentOption || isLoadingLevels
							}
						/>
					</div>
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
															"departmentOptionId",
															"level"
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
													id="departmentId"
													placeholder="Select department"
													options={allDepartments}
													searchable={true}
													onChange={(value) =>
														fieldSetterAndClearer({
															value,
															setterFunc:
																setValue,
															setField:
																"departmentId",
															clearFields: [
																"departmentOptionId"
															]
														})
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
						{departmentOption?.data?.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3  d-flex align-items-center">
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
											render={({ field }) => (
												<SMSelect
													{...field}
													id="departmentOptionId"
													placeholder="Select department option"
													options={
														allDepartmentOption
													}
													searchable={false}
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
						{isLoadingDepartmentOption && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						<div className="col-md-6">
							<div
								className={`row ${
									(departmentOption?.data?.length > 0 ||
										isLoadingDepartmentOption ||
										isDepartmentLoading ||
										allDepartments.length > 0) &&
									"mt-5"
								}`}
							>
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="modeOfEntryId"
									>
										Mode of Entry
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="modeOfEntryId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select a Mode of Entry"
												options={allStudentModes}
												id="modeOfEntryId"
												searchable={false}
												isError={!!errors.modeOfEntryId}
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
						<div className="col-md-6">
							<div className="row mt-5">
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
						{isLoadingLevels && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{levels?.data?.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="levelId"
										>
											Level
										</label>
									</div>
									<div className="col-lg-9">
										{isLoadingLevels ? (
											<Spinner />
										) : (
											<Controller
												name="levelId"
												control={control}
												rules={{
													required: true
												}}
												render={({ field }) => (
													<SMSelect
														{...field}
														id="levelId"
														placeholder="Select year of study"
														options={allLevels}
														searchable={false}
														isError={
															!!errors.levelId
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
};
