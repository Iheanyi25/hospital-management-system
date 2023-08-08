import React from "react";
import { Controller } from "react-hook-form";
import {
	Button,
	SMSelect,
	Spinner,
	Jumbotron
} from "../../../../../../../ui_elements";
import { SEMESTERS } from "../../../../../../../utils/constants";

export const SelectRecordsForm = ({
	control,
	errors,
	allSessions,
	allGscourse,
	allStudentTypes,
	setFilter,
	setValue,
	handleSubmit,
	allLevels,
	levels,
	isLoadingLevels,
	isLoadingCourses,
	isLoadingGscourse
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			studentTypeId: formData.studentTypeId.value,
			sessionId: formData.sessionId.value,
			semesterId: formData.semesterId.value,
			courseCode: formData.courseCode.value,
			levelId: formData.levelId.value
		}));
	};
	const handleFieldChange = ({ value, setField, clearFields }) => {
		setValue(setField, value);
		clearFields.forEach((field) => setValue(field, ""));
	};

	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="View GS Course Upload Results"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_res_data"
						type="submit"
						buttonClass="primary"
						label="View results"
						loading={isLoadingCourses}
						disabled={isLoadingLevels}
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
												onChange={(value) =>
													handleFieldChange({
														value,
														setField: "semesterId",
														clearFields: [
															"levelId",
															"courseCode"
														]
													})
												}
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
												onChange={(value) =>
													handleFieldChange({
														value,
														setField:
															"studentTypeId",
														clearFields: [
															"courseCode",
															"levelId"
														]
													})
												}
												isError={!!errors.studentTypeId}
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
														onChange={(value) =>
															handleFieldChange({
																value,
																setField:
																	"levelId",
																clearFields: [
																	"courseCode"
																]
															})
														}
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
						{isLoadingGscourse && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{allGscourse.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="courseCode"
										>
											GS Course
										</label>
									</div>
									<div className="col-lg-9">
										{isLoadingLevels ? (
											<Spinner />
										) : (
											<Controller
												name="courseCode"
												control={control}
												rules={{
													required: true
												}}
												render={({ field }) => (
													<SMSelect
														{...field}
														id="courseCode"
														placeholder="Select course"
														options={allGscourse}
														searchable={false}
														isError={
															!!errors.courseCode
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
