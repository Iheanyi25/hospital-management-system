import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useApiEdit } from "../../../../api/apiCall";
import { getUserProfileUrl, updateStaffProfileUrl } from "../../../../api/urls";
import {
	Jumbotron,
	TextField,
	SMSelect,
	Button
} from "../../../../ui_elements";
import { trimItem } from "../../../../utils/trimItem";
import { paymentDetailsSchema } from "./schema";

export const PaymentDetails = ({
	allPensionFunds,
	allBanks,
	programmeDetail
}) => {
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiEdit();
	const queryClient = useQueryClient();

	const {
		register,
		control,
		formState: { errors },
		handleSubmit
	} = useForm({
		defaultValues: {
			PensionId: {
				value: programmeDetail.pensionId,
				label: programmeDetail.pension
			},
			PensionNumber: programmeDetail.pensionNumber,
			BankId: {
				value: programmeDetail.bankId,
				label: programmeDetail.bank
			},
			AccountNumber: programmeDetail.accountNumber
		},
		resolver: yupResolver(paymentDetailsSchema)
	});

	const onSubmit = (values) => {
		const requestData = [];
		const { PensionId, BankId, ...editedValues } = values;
		const newObj = {
			...editedValues,
			PensionId: PensionId.value,
			BankId: BankId.value
		};
		Object.keys(newObj).map((item) =>
			requestData.push({
				op: "replace",
				path: `/ProgrammeDetail/${item}`,
				value: trimItem(newObj[item])
			})
		);
		const requestBody = {
			url: updateStaffProfileUrl(),
			data: requestData
		};
		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(getUserProfileUrl());
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Profile details updated.",
					body: "Your profile details has been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace("#section_e")
			},
			onError: () => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body: "Something went wrong"
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Appointment Details</span>}
				footerStyle="d-flex justify-content-end"
				footerContent={
					<>
						<Button
							data-cy="submit_qualification"
							label="Next"
							buttonClass="primary"
							type="submit"
							loading={isLoading}
						/>
					</>
				}
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="PensionId">
								Pension Fund Administrator *
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="PensionId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="PensionId"
										placeholder="Choose Pension Fund Administrator"
										name="PensionId"
										options={allPensionFunds}
										searchable={false}
										isError={!!errors.PensionId}
										errorText={
											errors.PensionId &&
											errors.PensionId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="PensionNumber">
								Pension Number *
							</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								id="PensionNumber"
								className="w-100"
								placeholder="Enter your Pension Number"
								type="text"
								name="PensionNumber"
								register={register}
								error={errors.PensionNumber}
								errorText={
									errors.PensionNumber &&
									errors.PensionNumber.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="BankId">Paypoint/BankId *</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="BankId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="BankId"
										placeholder="Choose Pension Fund Administrator"
										name="BankId"
										options={allBanks}
										searchable={false}
										isError={!!errors.BankId}
										errorText={
											errors.BankId &&
											errors.BankId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="AccountNumber">
								Bank Account Number *
							</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								id="AccountNumber"
								className="w-100"
								placeholder="Enter your bank account number"
								type="text"
								name="AccountNumber"
								register={register}
								error={errors.AccountNumber}
								errorText={
									errors.AccountNumber &&
									errors.AccountNumber.message
								}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
