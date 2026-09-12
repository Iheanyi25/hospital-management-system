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

export const ManageUnitLoadForm = ({
	control,
	errors,
	allSessions,
	allFaculties,
	allStudentTypes,
	setFilter,
	handleSubmit,
	allLevels,
	levels,
	isLoadingLevels,
	isLoadingUnitLoads,
	isLoadingFaculties,
	setValue,
	allStudentModesOfStudy,
	isLoadingStudentModesOfStudy,
	setPageNumber,
}) => {
	const onSubmit = (formData) => {
		const hasModeOfStudyId = formData?.ModeOfStudyId?.value
			? { modeOfStudyId: formData?.ModeOfStudyId?.value }
			: {};
		setFilter((state) => ({
			...state,
			facultyId: formData.facultyId.value,
			studentTypeId: formData.studentTypeId.value,
			sessionId: formData.sessionId.value,
			semesterId: formData.semester.value,
			...hasModeOfStudyId,

			...(formData.yearOfStudyId && {
				yearOfStudyId: formData.yearOfStudyId.value
			})
		}));
		setPageNumber(1);
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="View Unit Load"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_unit_load"
						type="submit"
						buttonClass="primary"
						label="View Unit Load"
						loading={isLoadingUnitLoads}
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
										htmlFor="studentTypeId"
									>
										Student type
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
												onChange={(value) =>
													fieldSetterAndClearer({
														value,
														setterFunc: setValue,
														setField:
															"studentTypeId",
														clearFields: [
															"facultyId",
															"yearOfStudyId"
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
						{allFaculties.length > 0 && (
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
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select faculty"
													options={allFaculties}
													id="facultyId"
													searchable={true}
													isError={!!errors.facultyId}
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
						{allStudentModesOfStudy?.length > 0 && (
							<div className="col-md-6">
								<div
									className={`row ${
										allFaculties.length > 0 ||
										isLoadingFaculties
											? "mt-5"
											: ""
									}`}
								>
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
						<div className="col-md-6">
							<div className="row mt-5">
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
											htmlFor="yearOfStudyId "
										>
											Level
										</label>
									</div>
									<div className="col-lg-9">
										{isLoadingLevels ? (
											<Spinner />
										) : (
											<Controller
												name="yearOfStudyId"
												control={control}
												rules={{
													required: true
												}}
												render={({ field }) => (
													<SMSelect
														{...field}
														id="yearOfStudyId"
														placeholder="Select year of study"
														options={allLevels}
														searchable={false}
														isError={
															!!errors.yearOfStudyId
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
