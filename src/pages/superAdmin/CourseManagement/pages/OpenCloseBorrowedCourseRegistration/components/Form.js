import React from "react";
import { Controller } from "react-hook-form";
import {
	Button,
	SMSelect,
	Jumbotron,
	AsyncMultiSelect
} from "../../../../../../ui_elements";
import { studentsApiOptions } from "../../../../../../utils/apiOptions";
import { SEMESTERS } from "../../../../../../utils/constants";

export const Form = ({
	control,
	errors,
	setValue,
	allSessions,
	setFilter,
	handleSubmit,
	isLoadingUnitLoads
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			sessionId: formData.sessionId.value,
			semesterId: formData.semesterId.value,
			matricNo: formData.matricNo.value
		}));
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Select Record"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_records"
						type="submit"
						buttonClass="primary"
						label="View records"
						loading={isLoadingUnitLoads}
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
							<div className="row mt-5">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="matricNo"
									>
										Matric number
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="matricNo"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<AsyncMultiSelect
												placeholder="Select matric number"
												id="matricNo"
												apiOptions={studentsApiOptions}
												isMulti={false}
												isClearable
												onChange={(data) =>
													setValue(
														"matricNo",
														data?.length > 0
															? data
															: null
													)
												}
												{...field}
												isError={!!errors.matricNo}
												errorText={
													errors.matricNo &&
													errors.matricNo.message
												}
												required
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
