import { Controller } from "react-hook-form";
import { RedCancel } from "../../../../../../../../assets/svgs";
import {
	Jumbotron,
	Button,
	SMSelect,
	OptionalIndicator,
	TextField,
	Spinner
} from "../../../../../../../../ui_elements";
import { formatInputDate } from "../../../../../../../../utils/formatDate";
import styles from "../style.module.css";

export const Form = ({
	allSessions,
	allDepartments,
	control,
	setFilter,
	handleSubmit,
	isLoadingLevels,
	isLoadingFeesToAssign,
	allApplicationTypes,
	register,
	dateFrom,
	setValue,
	errors,
	allJupebOptions,
	jupebOptionsLoading,
	allSubjectCombination,
	subjectCombinationLoading,
	isJupeb
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			sessionId: formData.sessionId.value,
			applicationTypeId: formData.applicationTypeId.value,
			departmentId: formData?.departmentId?.value,
			subjectCombinationId: formData?.subjectCombinationId?.value,
			jupebOptionId: formData?.jupebOptionId?.value,
			dateFrom: formData?.dateFrom,
			dateTo: formData?.dateTo
		}));
	};

	const onJupepOptionsChange = (value) => {
		setValue("jupebOptionId", value);
		setValue("subjectCombinationId", null);
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
						<div className={`col-md-6`}>
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
						{jupebOptionsLoading && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{allJupebOptions.length > 0 && isJupeb && (
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="jupebOptions"
										>
											JUPEB Options{" "}
											<OptionalIndicator text="(Optional)" />
										</label>
									</div>
									<div className="col-lg-8">
										<Controller
											name="jupebOptionId"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="jupebOptionId"
													onChange={
														onJupepOptionsChange
													}
													options={allJupebOptions}
													placeholder="Select a JUPEB option"
													searchable={true}
													isError={
														!!errors.jupebOptionId
													}
												/>
											)}
										/>
									</div>
									<div className={`col-1 d-flex`}>
										<span
											className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
											role="button"
											onClick={() => {
												setValue("jupebOptionId", null);
												setValue(
													"subjectCombinationId",
													null
												);
											}}
										>
											<RedCancel className="align-middle" />
										</span>
									</div>
								</div>
							</div>
						)}
						{subjectCombinationLoading && (
							<div className="col-md-6 mt-5">
								<Spinner />
							</div>
						)}
						{allSubjectCombination?.length > 0 && isJupeb && (
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="subjectCombinationId"
										>
											Subject Combinations
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="subjectCombinationId"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="subjectCombinationId"
													options={
														allSubjectCombination
													}
													placeholder="Select a Subject Combination"
													searchable={true}
													isError={
														!!errors.subjectCombinationId
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						<div className="col-md-6 mt-5">
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
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
