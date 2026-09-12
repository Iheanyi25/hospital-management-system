import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import { Button, SMSelect, Jumbotron } from "../../../../ui_elements";

export default function ViewAllRoomsForm({
	control,
	errors,
	allSessions,
	allHostels,
	isLoadingHostels,
	isSessionsLoading,
	setFilter,
	handleSubmit
}) {
	const ref = useRef(null);

	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			hostelId: formData.hostelId.value,
			sessionId: formData.sessionId.value
		}));
	};

	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="View Records"
				borderClasses="border-bottom-0"
				footerContent={
					<>
						<Button
							data-cy="view_rooms"
							type="submit"
							ref={ref}
							buttonClass="primary"
							label="View rooms"
							loading={isLoadingHostels || isSessionsLoading}
							// disabled={isLoadingDepartmentOption}
						/>
					</>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className={"d-flex row"}>
						<div className="col-md-6 ">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="sessionId">Session</label>
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
												placeholder="Select session"
												options={allSessions}
												searchable={true}
												isError={!!errors.sessionId}
												errorText={
													errors.sessionId &&
													errors.sessionId.message
												}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6 ">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="hostelId">Hostel</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="hostelId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="hostelId"
												placeholder="Select hostel"
												options={allHostels}
												searchable={true}
												isError={!!errors.hostelId}
												errorText={
													errors.hostelId &&
													errors.hostelId.message
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
}
