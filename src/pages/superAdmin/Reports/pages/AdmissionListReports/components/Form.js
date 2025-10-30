import { Controller } from "react-hook-form";
import { RedCancel } from "../../../../../../assets/svgs";
import styles from "../style.module.css";
import {
	Jumbotron,
	Button,
	SMSelect,
	OptionalIndicator,
	Spinner
} from "../../../../../../ui_elements";

export const Form = ({
	allSessions,
	control,
	setFilter,
	handleSubmit,
	isLoadingLevels,
	isLoadingFeesToAssign,
	facultyState,
	allFaculties,
	isDepartmentLoading,
	onFacultyChange,
	allDepartments,
	allStudentTypes,
	setValue,
	errors,
	setPageNumber
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			sessionId: formData?.sessionId.value,
			facultyId: formData?.facultyId?.value,
			studentTypeId: formData?.studentTypeId?.value,
			departmentId: formData?.departmentId?.value
		}));
		setPageNumber(1);
	};

	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Applications"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_school_fees_form"
						type="submit"
						buttonClass="primary"
						label="View record"
						disabled={isLoadingLevels}
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
												isError={!!errors.studentTypeId}
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
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="sessionId"
												options={allSessions}
												placeholder="Select a Session"
												searchable={true}
												isError={!!errors.sessionId}
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
										htmlFor="facultyId"
									>
										Faculty{" "}
										<OptionalIndicator text="(Optional)" />
									</label>
								</div>
								<div className="col-lg-8">
									<Controller
										name="facultyId"
										control={control}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select faculty"
												options={allFaculties}
												onChange={onFacultyChange}
												id="facultyId"
												searchable={true}
											/>
										)}
									/>
								</div>
								<div className={`col-1 d-flex`}>
									<span
										className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
										role="button"
										onClick={() =>
											setValue("facultyId", null)
										}
									>
										<RedCancel className="align-middle" />
									</span>
								</div>
							</div>
						</div>
						{isDepartmentLoading && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{facultyState && allDepartments?.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="departmentId"
										>
											Department{" "}
											<OptionalIndicator text="(Optional)" />
										</label>
									</div>
									<div className="col-lg-8">
										<Controller
											name="departmentId"
											control={control}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select department"
													options={allDepartments}
													id="departmentId"
												/>
											)}
										/>
									</div>
									<div className={`col-1 d-flex`}>
										<span
											className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
											role="button"
											onClick={() =>
												setValue("departmentId", null)
											}
										>
											<RedCancel className="align-middle" />
										</span>
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
