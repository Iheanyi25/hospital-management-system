import {
	Jumbotron,
	Button,
	TextField,
	SMSelect
} from "../../../../ui_elements";
import { useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useApiPut } from "../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import { siwesDetailsSchema } from "./siweschema";
import { addOrUpdateStudentSiwesDetailsUrl } from "../../../../api/urls";

export const SiwesDetails = ({ allSiwesStates, data }) => {
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiPut();

	const {
		control,
		register,
		formState: { errors },
		handleSubmit
	} = useForm({
		defaultValues: {
			...data,
			stateId: { label: data.state, value: data.stateId }
		},
		resolver: yupResolver(siwesDetailsSchema)
	});

	const onSubmit = (values) => {
		const requestBody = {
			url: addOrUpdateStudentSiwesDetailsUrl(),
			data: {
				...values,
				stateId: values.stateId.value
			}
		};
		mutate(requestBody, {
			onSuccess: (data) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Successfully updates siwes details",
					body: "That would be all!!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace({
					pathname: "/siwes/preview",
					state: { isPrintout: true }
				});
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
				headerText={<span>SIWES Details</span>}
				footerContent={
					<Button
						data-cy="sub_program"
						label="Save"
						buttonClass="primary"
						type="submit"
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label>Session</label>
						</div>
						<div className="col-lg-9">
							<SMSelect
								placeholder="Choose session"
								register={register}
								value={{ label: data?.session ?? "N/A" }}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Log Book Serial No.</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter log book serial no."
								className="w-100"
								type="text"
								name="logBookSerialNumber"
								register={register}
								error={errors.logBookSerialNumber}
								errorText={
									errors.logBookSerialNumber &&
									errors.logBookSerialNumber.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Organization Name</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter orgnaization name"
								className="w-100"
								type="text"
								name="organizationName"
								register={register}
								error={errors.organizationName}
								errorText={
									errors.organizationName &&
									errors.organizationName.message
								}
							/>
						</div>
					</div>
				</div>

				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>State of SIWES placement</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="stateId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Choose a state"
										name="stateId"
										// register={register}
										options={allSiwesStates}
										searchable={true}
										id="stateId"
										isError={!!errors.stateId}
										errorText={
											errors.stateId &&
											errors.stateId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>City/Town of SIWES</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter City/Town of SIWES"
								className="w-100"
								type="text"
								name="city"
								register={register}
								error={errors.city}
								errorText={errors.city && errors.city.message}
							/>
						</div>
					</div>
				</div>

				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Organization Address</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter organization address"
								className="w-100"
								type="text"
								name="organizationAddress"
								register={register}
								error={errors.organizationAddress}
								errorText={
									errors.organizationAddress &&
									errors.organizationAddress.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Name of Industry Based Supervisor</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter state of name of industry based supervisor"
								className="w-100"
								type="text"
								name="supervisor"
								register={register}
								error={errors.supervisor}
								errorText={
									errors.supervisor &&
									errors.supervisor.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Bank</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter bank name"
								className="w-100"
								type="text"
								name="bank"
								register={register}
								error={errors.bank}
								errorText={errors.bank && errors.bank.message}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Account Number</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter account number"
								className="w-100"
								type="number"
								name="accountNumber"
								register={register}
								error={errors.accountNumber}
								errorText={
									errors.accountNumber &&
									errors.accountNumber.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Sort Coder</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter sort coder"
								className="w-100"
								type="text"
								name="sortCode"
								register={register}
								error={errors.sortCode}
								errorText={
									errors.sortCode && errors.sortCode.message
								}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
