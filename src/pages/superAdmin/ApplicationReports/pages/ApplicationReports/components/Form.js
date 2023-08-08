import { Controller } from "react-hook-form";
import { RedCancel } from "../../../../../../assets/svgs";
import {
	Jumbotron,
	Button,
	SMSelect,
	OptionalIndicator,
	TextField
} from "../../../../../../ui_elements";
import { formatInputDate } from "../../../../../../utils/formatDate";

export const Form = ({
	allSessions,
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
}) => {
	const onSubmit = (formData) => {
		setFilter((state) => ({
			...state,
			sessionId: formData.sessionId.value,
			applicationTypeId: formData.applicationTypeId.value,
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
