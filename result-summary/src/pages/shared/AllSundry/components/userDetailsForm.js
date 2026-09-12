import { Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useApiPost } from "../../../../api/apiCall";
import { generateAllSundryInvoiceUrl } from "../../../../api/urls";
import {
	Jumbotron,
	Button,
	TextField,
	Spinner,
	SMSelect
} from "../../../../ui_elements";
import { SEMESTERS } from "../../../../utils/constants";

export const UserDetailsForm = ({
	filter,
	data,
	departmentOption,
	isLoadingDepartmentOption,
	allDepartments,
	allDepartmentOption,
	allSessions,
	register,
	control,
	handleSubmit,
	isLoadingFees,
	contractorPaymentSelected,
	isCertifcateVerification,
	checkForExtraCredit,
	errors
}) => {
	const { push } = useHistory();
	const { mutate, isLoading: isPosting } = useApiPost();
	const onSubmit = (values) => {
		const requestDet = {
			url: generateAllSundryInvoiceUrl(),
			data: {
				subCategoryFeeId: filter.subCategoryId.value.id,
				numberOfCertificates: isCertifcateVerification
					? values?.numberOfCertificates?.value
					: "",
				name: isCertifcateVerification ? values?.name : "",
				surname: isCertifcateVerification ? "" : values.surname,
				firstName: isCertifcateVerification ? "" : values.firstName,
				middleName: values.middleName,
				regNumber: isCertifcateVerification ? "" : values.regNo,
				mobileNumber: values.phoneNo,
				email: values.email,
				departmentId: values.departmentId?.value ?? "",
				departmentOptionId: values.departmentOptionId?.value ?? "",
				sessionId: isCertifcateVerification
					? ""
					: values.sessionId.value,
				semesterId: !checkForExtraCredit ? "" : values.semesterId.value,
				amount: values.amount
			}
		};
		mutate(requestDet, {
			onSuccess: (data) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Invoice successfully generated!",
					body: "You generated an invoice for bursary payment successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				push({
					pathname: `/sundry_reciepts`,
					state: { data: data?.data?.data }
				});
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Invoice generation failed!",
					body:
						response?.data?.message ||
						`Something went wrong while generating invoice.`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	function generateNumbers(n) {
		const numbers = [];
		for (let i = 0; i < n; i++) {
			numbers.push(i + 1);
		}
		return numbers;
	}

	const numbers = generateNumbers(10);

	const allNumbers = numbers.map((number) => ({
		label: String(number),
		value: number
	}));
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={filter?.subCategoryId?.value?.name}
				footerContent={
					<Button
						data-cy="sub_next_of_kin"
						label="Submit"
						buttonClass="primary"
						type="submit"
						loading={isPosting}
						disabled={isLoadingDepartmentOption || isLoadingFees}
					/>
				}
				borderClasses="border-top-0"
				footerStyle="d-flex justify-content-end"
			>
				<div className="p-4 ">
					<div className="row gy-2">
						{!isCertifcateVerification && (
							<div className="col-md-6">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="surname">Surname</label>
									</div>
									<div className="col-lg-9">
										<TextField
											id="surname"
											autoComplete="off"
											placeholder="Enter your surname"
											className="w-100"
											type="text"
											name="surname"
											disabled={data?.lastname}
											register={register}
											error={errors.surname}
											errorText={
												errors.surname &&
												errors.surname.message
											}
										/>
									</div>
								</div>
							</div>
						)}
						{!isCertifcateVerification && (
							<div className="col-md-6">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="firstName">
											First Name
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											id="firstName"
											autoComplete="off"
											placeholder="Enter your first name"
											className="w-100"
											type="text"
											name="firstName"
											register={register}
											disabled={data?.firstname}
											error={errors.firstName}
											errorText={
												errors.firstName &&
												errors.firstName.message
											}
										/>
									</div>
								</div>
							</div>
						)}
						{!isCertifcateVerification && (
							<div className="col-md-6 ">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="middleName">
											Middle name
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											id="middleName"
											autoComplete="off"
											placeholder="Enter your middle name"
											className="w-100"
											type="text"
											name="middleName"
											register={register}
											disabled={data?.middlename}
											error={errors.middleName}
											errorText={
												errors.middleName &&
												errors.middleName.message
											}
										/>
									</div>
								</div>
							</div>
						)}
						{isCertifcateVerification && (
							<div className="col-md-6">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="name">Name</label>
									</div>
									<div className="col-lg-9">
										<TextField
											id="name"
											autoComplete="off"
											placeholder="Institution or Individual"
											className="w-100"
											type="text"
											name="name"
											register={register}
											disabled={data?.name}
											error={errors.name}
											errorText={
												errors.name &&
												errors.name.message
											}
										/>
									</div>
								</div>
							</div>
						)}
						{!contractorPaymentSelected &&
							!isCertifcateVerification && (
								<div className="col-md-6 ">
									<div className="row">
										<div className="col-lg-3 d-flex align-items-center">
											<label htmlFor="regNo">
												{contractorPaymentSelected
													? "Company Name"
													: "Reg No"}
											</label>
										</div>
										<div className="col-lg-9">
											<TextField
												id="regNo"
												autoComplete="off"
												placeholder={
													!contractorPaymentSelected
														? "Enter your reg no"
														: "Enter your company name"
												}
												className="w-100"
												type="text"
												name="regNo"
												register={register}
												disabled={true}
												error={errors.regNo}
												errorText={
													errors.regNo &&
													errors.regNo.message
												}
											/>
										</div>
									</div>
								</div>
							)}
						<div
							className={`col-md-6 ${
								!isCertifcateVerification ? "" : ""
							}`}
						>
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="email">Email</label>
								</div>
								<div className="col-lg-9">
									<TextField
										id="email"
										autoComplete="off"
										placeholder="example@examplemail.com"
										className="w-100"
										type="email"
										name="email"
										register={register}
										disabled={data?.email}
										error={errors.email}
										errorText={
											errors.email && errors.email.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6 ">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="phoneNo">
										Phone Number
									</label>
								</div>
								<div className="col-lg-9">
									<TextField
										id="phoneNo"
										autoComplete="off"
										placeholder="Enter your phone number"
										className="w-100"
										type="text"
										name="phoneNo"
										register={register}
										disabled={contractorPaymentSelected}
										error={errors.phoneNo}
										errorText={
											errors.phoneNo &&
											errors.phoneNo.message
										}
									/>
								</div>
							</div>
						</div>
						{!contractorPaymentSelected &&
							!isCertifcateVerification && (
								<div className="col-md-6 ">
									<div className="row">
										<div className="col-lg-3  d-flex align-items-center">
											<label htmlFor="departmentId">
												Department
											</label>
										</div>
										<div className="col-lg-9">
											<Controller
												name="departmentId"
												control={control}
												rules={{
													required: true
												}}
												render={({ field }) => (
													<SMSelect
														{...field}
														id="departmentId"
														placeholder="Select department"
														options={allDepartments}
														searchable={true}
														disabled={
															data?.departmentId
														}
														isError={
															!!errors.departmentId
														}
														errorText={
															errors.departmentId &&
															errors.departmentId
																.message
														}
													/>
												)}
											/>
										</div>
									</div>
								</div>
							)}
						{departmentOption?.data?.length > 0 && (
							<div className="col-md-6 ">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label htmlFor="departmentOptionId">
											Department Option
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="departmentOptionId"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="departmentOptionId"
													placeholder="Select department option"
													options={
														allDepartmentOption
													}
													searchable={false}
													disabled={
														data?.departmentOptionId
													}
													isError={
														!!errors.departmentOptionId
													}
													errorText={
														errors.departmentOptionId &&
														errors
															.departmentOptionId
															.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{isLoadingDepartmentOption && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{!isCertifcateVerification && (
							<div className="col-md-6 ">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label htmlFor="sessionId">
											Payment Session
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
													placeholder="Select payment session"
													options={allSessions}
													searchable={true}
													isError={!!errors.sessionId}
													errorText={
														errors.sessionId &&
														errors.sessionId.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{isLoadingFees && (
							<div className="col-md-6">
								<Spinner />
							</div>
						)}
						{isCertifcateVerification && (
							<div className="col-md-6 ">
								<div className="row align-items-center">
									<div className="col-lg-3 align-items-center">
										<label htmlFor="numberOfCertificates">
											Certificates to verify
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="numberOfCertificates"
											control={control}
											defaultValue={allNumbers[0]}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select number of certificates"
													options={allNumbers}
													id="numberOfCertificates"
													searchable={true}
													isError={
														!!errors.numberOfCertificates
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{checkForExtraCredit && (
							<div className="col-md-6 ">
								<div className="row align-items-center">
									<div className="col-lg-3  d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="semesterId"
										>
											Semester
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="semesterId"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="semesterId"
													placeholder="Select Semester"
													options={SEMESTERS}
													searchable={false}
													isError={
														!!errors.semesterId
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						<div className="col-md-6 ">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="amount">Amount (₦)</label>
								</div>
								<div className="col-lg-9">
									<TextField
										id="amount"
										autoComplete="off"
										placeholder="Amount (₦)"
										className="w-100"
										type="text"
										name="amount"
										register={register}
										disabled={
											filter?.subCategoryId?.value
												?.amount > 0
										}
										error={errors.amount}
										errorText={
											errors.amount &&
											errors.amount.message
										}
									/>
								</div>
							</div>
						</div>
						{/* )} */}
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
