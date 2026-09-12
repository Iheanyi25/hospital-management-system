import { Controller } from "react-hook-form";
import {
	Jumbotron,
	Button,
	SMSelect,
	Spinner
} from "../../../../../../ui_elements";
import { useHistory } from "react-router-dom";
import { fieldSetterAndClearer } from "../../../../../../utils/fieldSetterAndClearer";

export const ViewAcceptanceFeeForm = ({
	control,
	allSessions,
	allStudentTypes,
	errors,
	setFilter,
	handleSubmit,
	isLoadingFeesToAssign,
	allFaculties,
	isFacultiesLoading,
	faculties,
	filter,
	setValue
}) => {
	const { push } = useHistory();
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			sessionId: formData.sessionId.value,
			studentTypeId: formData.studentTypeId.value,
			facultyId: formData.facultyId.value,
			pageNumber: 1,
			pageSize: state.pageSize,
			searchTerm: ""
		}));
		push({
			search: new URLSearchParams({
				sessionId: formData.sessionId.value,
				studentTypeId: formData.studentTypeId.value,
				facultyId: formData.facultyId.value,
				pageNumber: filter.pageNumber,
				pageSize: filter.pageSize,
				searchTerm: filter.searchTerm
			}).toString()
		});
	};

	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="View Acceptance fee"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_acceptance_records"
						type="submit"
						buttonClass="primary"
						label="View record"
						loading={isLoadingFeesToAssign}
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
										htmlFor="sessionId"
									>
										Session
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="sessionId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="sessionId"
												options={allSessions}
												placeholder="Select Session"
												searchable={true}
												isError={!!errors.sessionId}
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
										htmlFor="studentTypeId"
									>
										Student Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="studentTypeId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Student Type"
												options={allStudentTypes}
												id="studentTypeId"
												searchable={false}
												onChange={(value) =>
													fieldSetterAndClearer({
														value,
														setterFunc: setValue,
														setField:
															"studentTypeId",
														clearFields: [
															"facultyId"
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
						{isFacultiesLoading && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{faculties?.data?.length > 0 && (
							<div className="col-md-6 mt-5">
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
											rules={{ required: true }}
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
