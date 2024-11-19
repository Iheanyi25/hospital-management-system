import React from "react";
import { Controller } from "react-hook-form";
import {
	Button,
	SMSelect,
	Jumbotron,
	Spinner
} from "../../../../../ui_elements";

export const Form = ({
	control,
	errors,
	allFaculties,
	allStudentTypes,
	data,
	setFilter,
	handleSubmit,
	isLoadingDepartmentList,
	isLoadingFaculties
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			studentTypeId: formData.studentTypeId.value,
			facultyId: formData.facultyId.value
		}));
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Session Manager"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_unit_load"
						type="submit"
						buttonClass="primary"
						label="View Records"
						loading={isLoadingDepartmentList}
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
												id="studentTypeId"
												isError={!!errors.studentTypeId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{isLoadingFaculties && (
							<div className="col-md-6 mb-5 mb-md-0">
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
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
