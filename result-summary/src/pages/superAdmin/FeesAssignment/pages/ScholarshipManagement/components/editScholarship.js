import { useEffect, useMemo, useState } from "react";
import styles from "./style.module.css";
import { Controller, useForm } from "react-hook-form";
import {
	Button,
	Jumbotron,
	SMSelect,
	TextField
} from "../../../../../../ui_elements";
import { Bin } from "../../../../../../assets/svgs";
import {
	getPaymentPurposesUrl,
	getScholarshipsUrl,
	getSchoolFeesPaymentTypesUrl,
	updateScholarshipUrl
} from "../../../../../../api/urls";
import { useApiGet, useApiPut } from "../../../../../../api/apiCall";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { useQueryClient } from "react-query";

const EditScholarship = ({ closeModal, filter, editData }) => {
	const [breakdowns, setBreakdowns] = useState([0]);
	const constants = useMemo(() => ["feeType", "installment"], []);

	const queryClient = useQueryClient();
	const { mutate, isLoading } = useApiPut();
	const { data: paymentTypes } = useApiGet(getSchoolFeesPaymentTypesUrl(), {
		refetchOnWindowFocus: false
	});
	const { data: paymentPurpose } = useApiGet(getPaymentPurposesUrl(), {
		refetchOnWindowFocus: false
	});

	const allPaymentTypes = formatSelectItems(paymentTypes?.data, "name", "id");
	const allPaymentPurpose = formatSelectItems(
		paymentPurpose?.data,
		"name",
		"id"
	);

	const {
		register,
		setValue,
		getValues,
		control,
		trigger,
		clearErrors,
		formState: { errors }
	} = useForm({
		defaultValues: {
			scholarshipName: editData?.name || "",
			installment: editData?.breakdown?.map((item) => ({
				label: item?.installment?.label,
				value: item?.installment?.value
			})),
			feeType: editData?.breakdown?.map((item) => ({
				label: item?.feeType?.label,
				value: item?.feeType?.value
			}))
		}
	});

	const onSubmit = async () => {
		await trigger();
		if (
			Object.keys(errors)?.length >= 1 ||
			getValues?.()?.scholarshipName === ""
		) {
			return;
		}
		const requestDet = {
			url: updateScholarshipUrl(editData?.id),
			data: {
				name: getValues()?.scholarshipName,
				breakdown: getValues()
					?.feeType?.map((feeType, index) => ({
						PaymentTypeId: getValues()?.installment?.[index]?.value,
						PaymentPurposeId: feeType?.value
					}))
					.filter(
						(item) => item.PaymentPurposeId && item.PaymentTypeId
					)
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(getScholarshipsUrl(filter));
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Scholarship created successfully",
					body: "You successfully created a new scholarship"
				});
				closeModal();
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Scholarship Creation Failed!",
					body:
						response?.data?.message || `Scholarship creation failed`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const handleAddMore = () => {
		setBreakdowns((breakdowns) => [
			...breakdowns,
			breakdowns[breakdowns?.length - 1] + 1
		]);
	};

	const handleRemove = (removeItem) => {
		const filteredBreakdown = breakdowns.filter(
			(item) => item !== removeItem
		);
		setBreakdowns(filteredBreakdown);
		constants.map((constant) => {
			setValue(`${constant}.${removeItem}`, undefined);
			clearErrors();
			return null;
		});
	};

	useEffect(() => {
		for (let i = 0; i < editData?.breakdown.length - 1; i++) {
			handleAddMore();
		}
	}, [editData?.breakdown.length]);

	return (
		<div>
			<div>
				<div className="w-100 overflow-hidden">
					<Jumbotron
						headerText={`Edit Scholarship`}
						footerContent={
							<>
								<button
									className={styles["add_another"]}
									onClick={handleAddMore}
								>
									Add Fees Breakdown
								</button>
								<Button
									data-cy="save"
									label="Create"
									buttonClass="primary"
									onClick={onSubmit}
									loading={isLoading}
								/>
							</>
						}
						footerStyle="d-flex align-items-center justify-content-between"
					>
						<form>
							<div className="col-md-8 d-flex align-items-center my-4 gap-2 gap-md-0">
								<label
									htmlFor={`scholarshipName`}
									className="col-md-5 pl-2"
								>
									Scholarship Name
								</label>
								<TextField
									className="col-md-12"
									placeholder="Name"
									id={`scholarshipName`}
									name={`scholarshipName`}
									onBlur={() => trigger(`scholarshipName`)}
									register={() =>
										register(`scholarshipName`, {
											required: true
										})
									}
									error={errors?.scholarshipName}
								/>
							</div>
							<div className="m-4">
								<p>
									Assign fees associated with this scholarship
								</p>
							</div>
							{breakdowns.map((item, index) => (
								<div
									key={index}
									className={`row p-4 ${
										index !== 0 ? "border-top" : ""
									} position-relative align-items-center gap-3 gap-md-0`}
								>
									<div className="col-md-6 d-flex align-items-center gap-2 gap-md-0">
										<label htmlFor={`feeType.${item}`}>
											Fee Type
										</label>
										<div className="col-md-10">
											<Controller
												name={`feeType.${item}`}
												control={control}
												rules={{
													required: true
												}}
												render={({ field }) => (
													<SMSelect
														{...field}
														id={`feeType.${item}`}
														placeholder="Select fee type"
														options={
															allPaymentPurpose
														}
														searchable={true}
														onBlur={() =>
															trigger(
																`feeType.${item}`
															)
														}
														isError={
															!!errors?.feeType?.[
																index
															]
														}
													/>
												)}
											/>
										</div>
									</div>
									<div className="col-md-5 d-flex align-items-center gap-2 gap-md-0">
										<label htmlFor={`installment.${item}`}>
											Installment
										</label>
										<div className="col-md-10">
											<Controller
												name={`installment.${item}`}
												control={control}
												rules={{
													required: true
												}}
												render={({ field }) => (
													<SMSelect
														{...field}
														id="installment"
														placeholder="Select installment"
														options={
															allPaymentTypes
														}
														searchable={true}
														onBlur={() =>
															trigger(
																`installment.${item}`
															)
														}
														isError={
															!!errors
																?.installment?.[
																index
															]
														}
													/>
												)}
											/>
										</div>
									</div>
									{index !== 0 ? (
										<div className="col-md-1">
											<button
												className={styles.bin}
												type="button"
												onClick={() => {
													handleRemove(item);
												}}
											>
												<Bin />
											</button>
										</div>
									) : (
										""
									)}
								</div>
							))}
						</form>
					</Jumbotron>
				</div>
			</div>
		</div>
	);
};

export { EditScholarship };
