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
	allStudentModes,
	allStudentTypes,
	setFilter,
	handleSubmit,
	allLevels,
	levels,
	isLoadingLevels,
	isLoadingUnitLoads,
	isLoadingFaculties,
	setValue
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			facultyId: formData.facultyId.value,
			studentModeOfEntryId: formData.studentModeOfEntryId.value,
			studentTypeId: formData.studentTypeId.value,
			semester: formData.semester.value,
			yearOfStudyId: formData.yearOfStudyId.value
		}));
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
						label="View unit loads"
						loading={isLoadingUnitLoads}
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
							<div className="col-md-6 mb-5 mb-md-0">
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
						<div className="col-md-6">
							<div
								className={`row ${
									allFaculties.length > 0 ||
									isLoadingFaculties
										? "mt-5"
										: ""
								}`}
							>
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="studentModeOfEntryId"
									>
										Mode of Entry
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="studentModeOfEntryId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select a Mode of Entry"
												options={allStudentModes}
												id="studentModeOfEntryId"
												searchable={false}
												isError={
													!!errors.studentModeOfEntryId
												}
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
