import { Controller } from "react-hook-form";
import { RedCancel } from "../../../../../../../../assets/svgs";
import {
	Jumbotron,
	Button,
	SMSelect,
	OptionalIndicator,
	TextField
} from "../../../../../../../../ui_elements";
import { formatInputDate } from "../../../../../../../../utils/formatDate";
import styles from "../style.module.css";

export const Form = ({
	allStatus,
	allSessions,
	allDepartments,
	control,
	setFilter,
	handleSubmit,
	isLoadingApplications,
	allApplicationTypes,
	register,
	dateFrom,
	setValue,
	errors,
	setApplicationType
}) => {
	const onSubmit = (formData) => {
		setApplicationType(formData.applicationTypeId.value);
		setFilter((state) => ({
			...state,
			sessionId: formData.sessionId.value,
			olevelStatusId: formData.status.label,
			applicationTypeId: formData.applicationTypeId.value,
			departmentId: formData?.departmentId?.value,
			...(formData.subjectCombinationId && {
				subjectCombinationId: formData.subjectCombinationId.value
			}),
			...(formData.jupebOptionId && {
				jupebOptionId: formData.jupebOptionId.value
			}),
			dateFrom: formData?.dateFrom,
			dateTo: formData?.dateTo
		}));
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
						disabled={isLoadingApplications}
						loading={isLoadingApplications}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className="row">
						<div className="col-md-6">
							<div className="row align-items-center">
								<div className="col-lg-3 align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="applicationTypeId"
									>
										Application Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="applicationTypeId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												placeholder="Select an Application Type"
												options={allApplicationTypes}
												id="applicationTypeId"
												searchable={true}
												onChange={(selectedOption) => {
													field.onChange(
														selectedOption
													);
													setApplicationType(
														selectedOption?.value
													);
												}}
												{...field}
												isError={
													!!errors.applicationTypeId
												}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className=" col-md-6 ">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="status"
									>
										Status
									</label>
								</div>
								<div className="col-lg-9 ">
									<Controller
										name="status"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="status"
												options={allStatus}
												placeholder="Select Verification Status"
												searchable={true}
												isError={!!errors.status}
											/>
										)}
									/>
								</div>
							</div>
						</div>

						<div className="col-md-6 ">
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

						<div className="col-md-6 ">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
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
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select department"
												options={allDepartments}
												searchable={false}
												id="departmentId"
												isError={!!errors.departmentId}
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

						<div className="col-md-6">
							<div className="row ">
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
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
