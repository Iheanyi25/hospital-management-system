import { Controller } from "react-hook-form";
import styles from "../style.module.css";
import {
	Button,
	SMSelect,
	Jumbotron,
	Spinner,
	TextField,
	OptionalIndicator
} from "../../../../../../ui_elements";
import { formatInputDate } from "../../../../../../utils/formatDate";
import { RedCancel } from "../../../../../../assets/svgs";

export const PaymentReportsForm = ({
	control,
	errors,
	allSessions,
	allFaculties,
	allStudentTypes,
	allDepartments,
	allPaymentTypes,
	allPaymentPurposes,
	register,
	setFilter,
	handleSubmit,
	facultyState,
	setValue,
	isDepartmentLoading,
	dateFrom,
	onFacultyChange,
	onStudentTypeChange,
	isLoadingFaculties,
	studentTypeState,
	isLoadingReports,
	setPageNumber
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			studentTypeId: formData?.studentTypeId?.value,
			paymentPurposeId: formData?.paymentPurposeId?.value,
			paymentTypeId: formData?.paymentTypeId?.value,
			sessionId: formData?.sessionId?.value,
			facultyId: formData?.facultyId?.value,
			...(allDepartments?.length > 0 &&
				facultyState && {
					departmentId: formData?.departmentId?.value
				}),
			dateFrom: formData?.dateFrom,
			dateTo: formData?.dateTo
		}));
		setPageNumber(1);
	};
	
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="View Reports"
				footerContent={
					<Button
						data-cy="view_sundry_reports"
						type="submit"
						buttonClass="primary"
						label="View Reports"
						loading={isLoadingReports}
						disabled={isDepartmentLoading}
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
										Student Type
									</label>
								</div>
								<div className="col-lg-8">
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
												onChange={onStudentTypeChange}
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
										htmlFor="paymentPurposeId"
									>
										Payment Purpose
									</label>
								</div>
								<div className="col-lg-8">
									<Controller
										name="paymentPurposeId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select payment purpose"
												options={allPaymentPurposes}
												searchable={false}
												id="paymentPurposeId"
												isError={
													!!errors.paymentPurposeId
												}
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
										htmlFor="sessionId"
									>
										Session
									</label>
								</div>
								<div className="col-lg-8">
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
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="paymentTypeId"
									>
										Payment Type{" "}
										<OptionalIndicator text="(Optional)" />
									</label>
								</div>
								<div className="col-lg-8">
									<Controller
										name="paymentTypeId"
										control={control}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="paymentTypeId"
												placeholder="Select payment type"
												options={allPaymentTypes}
												searchable={false}
												isError={!!errors.paymentTypeId}
											/>
										)}
									/>
								</div>
								<div className={`col-1 d-flex`}>
									<span
										className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
										role="button"
										onClick={() =>
											setValue("paymentTypeId", null)
										}
									>
										<RedCancel className="align-middle" />
									</span>
								</div>
							</div>
						</div>

						{isLoadingFaculties && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{studentTypeState && allFaculties?.length > 0 && (
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
						)}
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
						<div className="col-md-6">
							<div className="row mt-5">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="dateFrom"
									>
										Date{" "}
										<OptionalIndicator text="(Begin - End)" />
									</label>
								</div>
								<div className="col-lg-4 mb-3 mb-lg-0">
									<TextField
										type="date"
										name="dateFrom"
										register={register}
										id="dateFrom"
										required
										error={errors.dateFrom}
										max={formatInputDate(new Date())}
									/>
								</div>

								<div className="col-lg-4">
									<TextField
										type="date"
										name="dateTo"
										register={register}
										id="dateTo"
										required
										disabled={!dateFrom}
										min={dateFrom}
										max={formatInputDate(new Date())}
										error={errors.dateTo}
									/>
								</div>
								<div className={`col-1 d-flex`}>
									<span
										className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
										role="button"
										onClick={() => {
											setValue("dateFrom", null);
											setValue("dateTo", null);
										}}
									>
										<RedCancel className="align-middle" />
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
