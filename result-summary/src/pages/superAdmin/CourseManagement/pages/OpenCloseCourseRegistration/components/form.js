import React from "react";
import { Controller } from "react-hook-form";
import {
	Button,
	SMSelect,
	Jumbotron,
	Spinner
} from "../../../../../../ui_elements";
import { fieldSetterAndClearer } from "../../../../../../utils/fieldSetterAndClearer";

export const Form = ({
	control,
	errors,
	allSessions,
	allStudentTypes,
	setFilter,
	setValue,
	handleSubmit,
	allLevels,
	levels,
	isLoadingLevels,
	isLoadingCourseReg
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			sessionId: formData.sessionId.value,
			studentTypeId: formData.studentTypeId.value,
			yearOfStudyId: formData.yearOfStudyId.value
		}));
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Open & Close course registration"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_acceptance_record"
						type="submit"
						buttonClass="primary"
						label="View records"
						loading={isLoadingCourseReg}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className="row">
						<div className="col-md-6 mb-5 mb-md-0">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
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
