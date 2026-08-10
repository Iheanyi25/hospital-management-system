import { Controller } from "react-hook-form";
import {
	Jumbotron,
	Button,
	SMSelect,
	Spinner,
	OptionalIndicator
} from "../../../../../../ui_elements";
import { fieldSetterAndClearer } from "../../../../../../utils/fieldSetterAndClearer";

const FieldSlot = ({ label, htmlFor, spaced = true, optional, children }) => (
	<div className={`col-md-6 ${spaced ? "mt-5" : ""}`}>
		<div className="row">
			<div className="col-lg-3 d-flex align-items-center">
				<label className="font-weight-bold" htmlFor={htmlFor}>
					{label} {optional && <OptionalIndicator text={"(Optional)"} />}
				</label>
			</div>
			<div className="col-lg-9">{children}</div>
		</div>
	</div>
);

export const ViewSchoolFeesForm = ({
	allFaculties,
	isFacultiesLoading,
	allLevels,
	allSessions,
	allStudentTypes,
	allDepartments,
	allApprovalStatuses,
	isLoadingDepartments,
	isLoadingApprovalStatuses,
	control,
	setFilter,
	setValue,
	handleSubmit,
	allPaymentTypes,
	isLoadingLevels,
	isFetchingFeesToAssign,
	errors
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			StudentTypeId: formData.StudentTypeId.value,
			SessionId: formData.session.value,
			Level: formData?.Level?.value || "",
			PaymentType: formData.PaymentType.value,
			FacultyId: formData?.FacultyId?.value || "",
			DepartmentId: formData?.DepartmentId?.value || "",
			ApprovalStatusId: formData?.ApprovalStatusId?.value || ""
		}));
	};

	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="View fee approval"
				borderClasses="border-bottom-0"
				footerContent={
					<Button
						data-cy="view_school_fees_form"
						type="submit"
						buttonClass="primary"
						label="View record"
						disabled={isLoadingLevels}
						loading={isFetchingFeesToAssign}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className="row">
						<FieldSlot label="Session" htmlFor="session" spaced={false}>
							<Controller
								name="session"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="session"
										options={allSessions}
										placeholder="Select Session"
										searchable={true}
										isError={!!errors.session}
									/>
								)}
							/>
						</FieldSlot>

						<FieldSlot
							label="Payment Type"
							htmlFor="PaymentType"
							spaced={false}
						>
							<Controller
								name="PaymentType"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select payment type"
										options={allPaymentTypes}
										id="PaymentType"
										searchable={false}
										isError={!!errors.PaymentType}
									/>
								)}
							/>
						</FieldSlot>

						<FieldSlot label="Student Type" htmlFor="StudentTypeId">
							<Controller
								name="StudentTypeId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select Student Type"
										options={allStudentTypes}
										id="StudentTypeId"
										searchable={false}
										onChange={(value) =>
											fieldSetterAndClearer({
												value,
												setterFunc: setValue,
												setField: "StudentTypeId",
												clearFields: [
													"FacultyId",
													"DepartmentId",
													"Level"
												]
											})
										}
										isError={!!errors.StudentTypeId}
									/>
								)}
							/>
						</FieldSlot>

						{isFacultiesLoading && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{allFaculties?.length > 0 && (
							<FieldSlot label="Faculty" htmlFor="FacultyId" optional>
								<Controller
									name="FacultyId"
									control={control}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Select Faculty"
											options={allFaculties}
											id="FacultyId"
											onChange={(value) =>
												fieldSetterAndClearer({
													value,
													setterFunc: setValue,
													setField: "FacultyId",
													clearFields: ["DepartmentId"]
												})
											}
											searchable={true}
											isError={!!errors.FacultyId}
										/>
									)}
								/>
							</FieldSlot>
						)}

						{isLoadingLevels && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{allLevels?.length > 0 && (
							<FieldSlot label="Level" htmlFor="Level" optional>
								<Controller
									name="Level"
									control={control}
									render={({ field }) => (
										<SMSelect
											{...field}
											id="Level"
											placeholder="Select year of study"
											options={allLevels}
											searchable={true}
											isError={!!errors.Level}
										/>
									)}
								/>
							</FieldSlot>
						)}

						{isLoadingDepartments && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{allDepartments?.length > 0 && (
							<FieldSlot
								label="Department"
								htmlFor="DepartmentId"
								optional
							>
								<Controller
									name="DepartmentId"
									control={control}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Select department"
											options={allDepartments}
											id="DepartmentId"
											searchable={true}
											isError={!!errors.DepartmentId}
										/>
									)}
								/>
							</FieldSlot>
						)}

						<FieldSlot
							label="Approval Status"
							htmlFor="ApprovalStatusId"
							optional
						>
							{isLoadingApprovalStatuses ? (
								<Spinner />
							) : (
								<Controller
									name="ApprovalStatusId"
									control={control}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Select approval status"
											searchable={false}
											options={allApprovalStatuses}
											isError={!!errors.ApprovalStatusId}
											id="ApprovalStatusId"
										/>
									)}
								/>
							)}
						</FieldSlot>
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
