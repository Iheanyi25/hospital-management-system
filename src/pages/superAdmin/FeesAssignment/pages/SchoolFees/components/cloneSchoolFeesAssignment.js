import styles from "../style.module.css";
import {
	Jumbotron,
	Button,
	SMSelect,
	Spinner,
	AsyncMultiSelect
} from "../../../../../../ui_elements";
import { Controller, useForm } from "react-hook-form";
import { useApiPost, useApiGet } from "../../../../../../api/apiCall";
import { cloneFeesAssignmentUrl, yearOfStudyUrl } from "../../../../../../api/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RedCancel } from "../../../../../../assets/svgs";
import { useMemo, useRef } from "react";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { fieldSetterAndClearer } from "../../../../../../utils/fieldSetterAndClearer";

const uploadSchema = (allPaymentPurpose) =>
	yup.object().shape({
		oldSessionId: yup
			.mixed()
			.required("please select session to clone from"),
		newSessionId: yup.mixed().required("please select session to clone to"),
		paymentPurposeId: yup.mixed().when([], {
			is: () => allPaymentPurpose?.length > 0,
			then: yup.mixed().required("please select purpose of payment"),
			otherwise: yup.mixed().nullable()
		})
	});

export const CloneSchoolFeesAssignment = ({
	allDepartments,
	allStudentModesOfStudy,
	allStudentTypes,
	allPaymentPurpose,
	allSessions,
	closeModal,
	paymentPurposeId,
}) => {
	const {
		control,
		watch,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(uploadSchema(allPaymentPurpose))
	});

	const useLevels = (studentTypeId) => {
		const { data, isLoading } = useApiGet(
			yearOfStudyUrl({ studentTypeId }),
			{ refetchOnWindowFocus: false, enabled: !!studentTypeId }
		);
		return { levels: data, isLoading };
	};
	
	const oldStudentTypeId = watch("oldStudentTypeId")?.value || "";
	const newStudentTypeId = watch("newStudentTypeId")?.value || "";

	const { levels: oldLevels, isLoading: isLoadingOldLevels } =
		useLevels(oldStudentTypeId);
	const { levels: newLevels, isLoading: isLoadingNewLevels } =
		useLevels(newStudentTypeId);

	const formatLevels = (data) => formatSelectItems(data?.data, "name", "id");

	const allOldLevels = useMemo(() => formatLevels(oldLevels), [oldLevels]);
	const allNewLevels = useMemo(() => formatLevels(newLevels), [newLevels]);

	const loadDepartmentOptions = async (inputValue) => {
		const filtered = allDepartments?.filter((option) =>
			option.label.toLowerCase().includes(inputValue.toLowerCase())
		);
		return filtered;
	};

	const ref = useRef();

	const { mutate, isLoading: isPosting } = useApiPost();
	const onSubmit = (data) => {
		const requestDet = {
			url: cloneFeesAssignmentUrl(),
			data: {
				...(allPaymentPurpose?.length > 0
					? { paymentPurposeId: data.paymentPurposeId?.value }
					: { paymentPurposeId }),
				oldSessionId: data.oldSessionId?.value,
				newSessionId: data.newSessionId?.value,
				...(data.oldModeOfStudyId?.value &&
					data.oldModeOfStudyId?.value === 1 && {
						oldModeOfStudyId: "FullTime"
					}),
				...(data.oldModeOfStudyId?.value &&
					data.oldModeOfStudyId?.value === 2 && {
						oldModeOfStudyId: "PartTime"
					}),
				...(data.newModeOfStudyId?.value &&
					data.newModeOfStudyId?.value === 1 && {
						newModeOfStudyId: "FullTime"
					}),
				...(data.newModeOfStudyId?.value &&
					data.newModeOfStudyId?.value === 2 && {
						newModeOfStudyId: "PartTime"
					}),
				...(data.oldLevelId?.value && {
					oldLevelId: data.oldLevelId?.value
				}),
				...(data.newLevelId?.value && {
					newLevelId: data.newLevelId?.value
				}),
				...(data.oldStudentTypeId?.value && {
					oldStudentTypeId: data.oldStudentTypeId?.value
				}),
				...(data.newStudentTypeId?.value && {
					newStudentTypeId: data.newStudentTypeId?.value
				}),
				...(data.oldDepartmentId?.value && {
					oldDepartmentId: data.oldDepartmentId?.value
				}),
				...(data.newDepartmentIds?.length > 0 && {
					newDepartmentIds: data.newDepartmentIds.map(
						(item) => item.value
					)
				}),
				...(data.programmeIds?.length > 0 && {
					programmeIds: data.programmeIds.map((item) => item.value)
				})
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "School Fees Action Successful ",
					body: "Your school fees assignment was cloned successfully!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "School Fees Action Failed",
					body:
						response?.data?.message ||
						`School fees assignment wasn't cloned correctly!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	return (
		<form
			className={`${styles.form_content} w-100 mt-5`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Jumbotron
				headerText=""
				footerContent={
					<Button
						data-cy="update_fees"
						label="Clone School Fees"
						buttonClass="primary"
						loading={isSubmitting || isPosting}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4">
					<h3 className="fs-5" style={{ color: "#505F79" }}>
						Clone From
					</h3>
					<div className="row">
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="Session"
									>
										Session*
									</label>
								</div>
								<div className="col-lg-8">
									<Controller
										name="oldSessionId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Session"
												options={allSessions}
												searchable={false}
												id="oldSessionId"
												isError={!!errors.studentTypeId}
											/>
										)}
									/>
									{errors.oldSessionId && (
										<p className="text-danger">
											{errors.oldSessionId.message}
										</p>
									)}
								</div>
								<div className={`col-1 d-flex`}>
									<span
										className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
										role="button"
										onClick={() =>
											setValue("oldSessionId", null)
										}
									>
										<RedCancel className="align-middle" />
									</span>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="oldStudentTypeId"
									>
										Student Type
										<span
											style={{
												fontSize: "12px",
												fontWeight: "450"
											}}
										>
											{" "}
											(Optional)
										</span>
									</label>
								</div>
								<div className="col-lg-8">
									<Controller
										name="oldStudentTypeId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Student Type"
												options={allStudentTypes}
												searchable={false}
												id="oldStudentTypeId"
												onChange={(value) =>
													fieldSetterAndClearer({
														value,
														setterFunc: setValue,
														setField:
															"oldStudentTypeId",
														clearFields: [
															"oldLevelId"
														]
													})
												}
												isError={
													!!errors.paymentPurposeId
												}
											/>
										)}
									/>
								</div>
								<div className={`col-1 d-flex`}>
									<span
										className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
										role="button"
										onClick={() =>
											setValue("oldStudentTypeId", null)
										}
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
										htmlFor="oldDepartmentId"
									>
										Department
										<span
											style={{
												fontSize: "12px",
												fontWeight: "450"
											}}
										>
											{" "}
											(Optional)
										</span>
									</label>
								</div>
								<div className="col-lg-8">
									<Controller
										name="oldDepartmentId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="oldDepartmentId"
												placeholder="Select Department"
												options={allDepartments}
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
											setValue("oldDepartmentId", null)
										}
									>
										<RedCancel className="align-middle" />
									</span>
								</div>
							</div>
						</div>
						{isLoadingOldLevels ? (
							<div className="col-md-6">
								<Spinner />
							</div>
						) : (
							""
						)}
						{oldLevels?.data?.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3 d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="oldLevelId"
										>
											Level
											<span
												style={{
													fontSize: "12px",
													fontWeight: "450"
												}}
											>
												{" "}
												(Optional)
											</span>
										</label>
									</div>
									<div className="col-lg-8">
										<Controller
											name="oldLevelId"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="oldLevelId"
													options={allOldLevels}
													placeholder="Select Academic Session"
													searchable={false}
													isError={
														!!errors.oldLevelId
													}
												/>
											)}
										/>
									</div>
									<div className={`col-1 d-flex`}>
										<span
											className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
											role="button"
											onClick={() =>
												setValue("oldLevelId", null)
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
										htmlFor="oldModeOfStudyId"
									>
										Mode of Study
										<span
											style={{
												fontSize: "12px",
												fontWeight: "450"
											}}
										>
											{" "}
											(Optional)
										</span>
									</label>
								</div>
								<div className="col-lg-8">
									<Controller
										name="oldModeOfStudyId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="oldModeOfStudyId"
												options={allStudentModesOfStudy}
												placeholder="Select Mode Of Study"
												searchable={false}
												isError={
													!!errors.oldModeOfStudyId
												}
											/>
										)}
									/>
								</div>
								<div className={`col-1 d-flex`}>
									<span
										className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
										role="button"
										onClick={() =>
											setValue("oldModeOfStudyId", null)
										}
									>
										<RedCancel className="align-middle" />
									</span>
								</div>
							</div>
						</div>
						{allPaymentPurpose && allPaymentPurpose.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3 d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="paymentPurposeId"
										>
											Payment Purpose*
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
													id="paymentPurposeId"
													options={allPaymentPurpose}
													placeholder="Select Payment Purpose"
													searchable={false}
													isError={
														!!errors.paymentPurposeId
													}
												/>
											)}
										/>

										{errors.paymentPurposeId && (
											<p className="text-danger">
												{
													errors.paymentPurposeId
														.message
												}
											</p>
										)}
									</div>
									<div className={`col-1 d-flex`}>
										<span
											className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
											role="button"
											onClick={() =>
												setValue(
													"paymentPurposeId",
													null
												)
											}
										>
											<RedCancel className="align-middle" />
										</span>
									</div>
								</div>
							</div>
						)}
					</div>
				</section>
				<div
					className="border-bottom mx-4 "
					style={{ borderColor: "#dee2e6" }}
				></div>
				<section className="p-4">
					<h3 className="fs-5" style={{ color: "#505F79" }}>
						Clone To
					</h3>
					<div className="row">
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="Session"
									>
										Session*
									</label>
								</div>
								<div className="col-lg-8">
									<Controller
										name="newSessionId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Session"
												options={allSessions}
												searchable={false}
												id="newSessionId"
												isError={!!errors.studentTypeId}
											/>
										)}
									/>
									{errors.newSessionId && (
										<p className="text-danger">
											{errors.newSessionId.message}
										</p>
									)}
								</div>
								<div className={`col-1 d-flex`}>
									<span
										className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
										role="button"
										onClick={() =>
											setValue("newSessionId", null)
										}
									>
										<RedCancel className="align-middle" />
									</span>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="newStudentTypeId"
									>
										Student Type
										<span
											style={{
												fontSize: "12px",
												fontWeight: "450"
											}}
										>
											{" "}
											(Optional)
										</span>
									</label>
								</div>
								<div className="col-lg-8">
									<Controller
										name="newStudentTypeId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select Student Type"
												options={allStudentTypes}
												searchable={false}
												id="newStudentTypeId"
												onChange={(value) =>
													fieldSetterAndClearer({
														value,
														setterFunc: setValue,
														setField:
															"newStudentTypeId",
														clearFields: [
															"newLevelId"
														]
													})
												}
												isError={
													!!errors.newStudentTypeId
												}
											/>
										)}
									/>
								</div>
								<div className={`col-1 d-flex`}>
									<span
										className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
										role="button"
										onClick={() =>
											setValue("newStudentTypeId", null)
										}
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
										htmlFor="newDepartmentId"
									>
										Department
										<span
											style={{
												fontSize: "12px",
												fontWeight: "450"
											}}
										>
											{" "}
											(Optional)
										</span>
									</label>
								</div>
								<div className="col-lg-8">
									<Controller
										name="newDepartmentIds"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<AsyncMultiSelect
												placeholder="Select Department"
												id="newDepartmentIds"
												loadOptions={
													loadDepartmentOptions
												}
												isMulti={true}
												isClearable
												defaultOptions={allDepartments}
												{...field}
												ref={ref}
												searchable={true}
												isError={
													!!errors.newDepartmentIds
												}
											/>
										)}
									/>
								</div>
								<div className={`col-1 d-flex`}>
									<span
										className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
										role="button"
										onClick={() =>
											setValue("newDepartmentIds", null)
										}
									>
										<RedCancel className="align-middle" />
									</span>
								</div>
							</div>
						</div>
						{isLoadingNewLevels ? (
							<div className="col-md-6">
								<Spinner />
							</div>
						) : (
							""
						)}
						{newLevels?.data?.length > 0 && (
							<div className="col-md-6">
								<div className="row mt-5">
									<div className="col-lg-3 d-flex align-items-center">
										<label
											className="font-weight-bold"
											htmlFor="newLevelId"
										>
											Level
											<span
												style={{
													fontSize: "12px",
													fontWeight: "450"
												}}
											>
												{" "}
												(Optional)
											</span>
										</label>
									</div>
									<div className="col-lg-8">
										<Controller
											name="newLevelId"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="newLevelId"
													options={allNewLevels}
													placeholder="Select Academic Session"
													searchable={false}
													isError={
														!!errors.newLevelId
													}
												/>
											)}
										/>
									</div>
									<div className={`col-1 d-flex`}>
										<span
											className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
											role="button"
											onClick={() =>
												setValue("newLevelId", null)
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
										htmlFor="newModeOfStudyId"
									>
										Mode of Study
										<span
											style={{
												fontSize: "12px",
												fontWeight: "450"
											}}
										>
											{" "}
											(Optional)
										</span>
									</label>
								</div>
								<div className="col-lg-8">
									<Controller
										name="newModeOfStudyId"
										control={control}
										rules={{
											required: true
										}}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="newModeOfStudyId"
												options={allStudentModesOfStudy}
												placeholder="Select Mode Of Study"
												searchable={false}
												isError={
													!!errors.newModeOfStudyId
												}
											/>
										)}
									/>
								</div>
								<div className={`col-1 d-flex`}>
									<span
										className={`p-md-2 ${styles.cancel} mt-2 mt-md-0`}
										role="button"
										onClick={() =>
											setValue("newModeOfStudyId", null)
										}
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
