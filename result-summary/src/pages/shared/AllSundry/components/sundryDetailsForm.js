import { Controller } from "react-hook-form";
import {
	Jumbotron,
	Button,
	SMSelect,
	Spinner,
	TextField
} from "../../../../ui_elements";
import { fieldSetterAndClearer } from "../../../../utils/fieldSetterAndClearer";

export const SundryDetailsForm = ({
	allSetupCategories,
	allSetupCategoryTypes,
	setupCategoryType,
	control,
	register,
	setFilter,
	setValue,
	handleSubmit,
	isLoadingSetupCategoryTypes,
	setupCategoryFees,
	isLoadingSetupCategoryFees,
	allSetupCategoryFees,
	isLoading,
	setNewInvoice,
	user,
	isUnderGraduateSelected,
	errors
}) => {
	const onSubmit = (formData) => {
		setNewInvoice(false)
		setFilter((state) => ({
			...state,
			setupCategoryId: formData.setupCategoryId.value,
			setupCategoryTypeId: formData.setupCategoryTypeId.value,
			subCategoryId: formData.subCategoryId,
			mobileNumber: formData.mobileNumber
		}));
	};
	return (
		<form className="w-100" onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Bursary Fee Collections"
				footerContent={
					<Button
						data-cy="fetch_details"
						type="submit"
						buttonClass="primary"
						label="Next"
						disabled={
							isLoadingSetupCategoryFees ||
							isLoadingSetupCategoryTypes
						}
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<div className="row gy-2">
						<div className="col-md-6">
							<div className="row align-items-center">
								<div className="col-lg-3 align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="setupCategoryId"
									>
										Fee Category
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="setupCategoryId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select a category"
												options={allSetupCategories}
												id="setupCategoryId"
												searchable={true}
												onChange={(value) =>
													fieldSetterAndClearer({
														value,
														setterFunc: setValue,
														setField:
															"setupCategoryId",
														clearFields: [
															"setupCategoryTypeId",
															"subCategoryId"
														]
													})
												}
												disabled={
													user === "postgraduate"
												}
												isError={
													!!errors.setupCategoryId
												}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						{isLoadingSetupCategoryTypes && (
							<div className="col-md-6 my-5">
								<Spinner />
							</div>
						)}
						{setupCategoryType?.data?.length > 0 && (
							<div className="col-md-6">
								<div className="row align-items-center">
									<div className="col-lg-3 align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="setupCategoryTypeId"
										>
											Type
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="setupCategoryTypeId"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select a type"
													options={
														allSetupCategoryTypes
													}
													id="setupCategoryTypeId"
													disabled={
														user === "postgraduate"
													}
													searchable={true}
													onChange={(value) =>
														fieldSetterAndClearer({
															value,
															setterFunc:
																setValue,
															setField:
																"setupCategoryTypeId",
															clearFields: [
																"subCategoryId",
																"mobileNumber"
															]
														})
													}
													isError={
														!!errors.setupCategoryTypeId
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						{isLoadingSetupCategoryFees && (
							<div className="col-md-6 col-12">
								<Spinner />
							</div>
						)}
						{setupCategoryFees?.data?.length > 0 && (
							<div className="col-md-6">
								<div className="row align-items-center">
									<div className="col-lg-3 align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="subCategoryId"
										>
											Sub Category
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="subCategoryId"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													{...field}
													placeholder="Select a sub category"
													options={
														allSetupCategoryFees
													}
													id="subCategoryId"
													searchable={true}
													isError={
														!!errors.subCategoryId
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						)}
						<div className="col-md-6">
							<div
								className={`row align-items-center ${(setupCategoryFees?.data?.length > 0 ||
										isLoadingSetupCategoryFees ||
										setupCategoryType?.data?.length > 0 ||
										isLoadingSetupCategoryTypes) &&
									""
									}`}
							>
								<div className="col-lg-3 align-items-center font-weight-bold">
									<label htmlFor="mobileNumber">
										{isUnderGraduateSelected
											? "Reg. Number"
											: "Phone Number"}
									</label>
								</div>
								<div className="d-flex col-lg-9">
									<TextField
										className="w-100"
										placeholder={
											isUnderGraduateSelected
												? "Enter Reg. number"
												: "Enter phone number"
										}
										name="mobileNumber"
										type="text"
										register={register}
										required
										error={errors.mobileNumber}
										errorText={
											errors.mobileNumber &&
											errors.mobileNumber.message
										}
										id="mobileNumber"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
