import { Controller } from "react-hook-form";
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

export const SundryReportForm = ({
	control,
	errors,
	allSessions,
	allFaculties,
	allBursaryFees,
	allDepartments,
	register,
	setFilter,
	handleSubmit,
	facultyState,
	isDepartmentLoading,
	dateFrom,
	setValue,
	isLoadingReports,
	setPageNumber
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			facultyId: formData?.facultyId?.value,
			...(allDepartments?.length > 0 &&
				facultyState && {
					departmentId: formData?.departmentId?.value
				}),
			bursaryFeeTypeId: formData.bursaryFeeTypeId.value,
			sessionId: formData.sessionId.value,
			beginDate: formData?.dateFrom,
			endDate: formData?.dateTo
		}));
		setPageNumber(1);
	};
	
	const allObj = { value: "0", label: "All" };
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="View Reports"
				borderClasses="border-bottom-0"
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
						<div className="col-md-6 mb-4 mb-md-0">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="bursaryFeeTypeId"
									>
										Sundry Collection
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="bursaryFeeTypeId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select collection"
												options={[
													allObj,
													...allBursaryFees
												]}
												searchable={true}
												id="bursaryFeeTypeId"
												isError={
													!!errors.bursaryFeeTypeId
												}
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
												options={[
													allObj,
													...allSessions
												]}
												placeholder="Select Academic Session"
												searchable={false}
												isError={!!errors.sessionId}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6 mt-5">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="dateFrom"
									>
										Date{" "}
										<OptionalIndicator text="(Optional)" />
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
										className={`p-md-2 mt-2 mt-md-0`}
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
												id="facultyId"
												searchable={true}
											/>
										)}
									/>
								</div>
								<div className={`col-1 d-flex`}>
									<span
										className={`p-md-2 mt-2 mt-md-0`}
										role="button"
										onClick={() => {
											setValue("facultyId", null);
											setValue("departmentId", null);
										}}
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
											className={`p-md-2 mt-2 mt-md-0`}
											role="button"
											onClick={() => {
												setValue("departmentId", null);
											}}
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
