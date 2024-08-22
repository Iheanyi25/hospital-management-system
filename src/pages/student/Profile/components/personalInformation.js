import {
	Jumbotron,
	Button,
	TextField,
	RadioButtons,
	SMSelect,
	CompulsoryIndicator
} from "../../../../ui_elements";
import { useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useApiPatch } from "../../../../api/apiCall";
import {
	getStudentProfileUrl,
	updateStudentProfileUrl
} from "../../../../api/urls";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalInformationSchema } from "./profileSchema";
import { formatDateFromAPI } from "../../../../utils/formatDate";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";

export const PersonalInformation = ({
	data,
	allBloodGroups,
	allGenotypes,
	allReligions,
	allLGAs
}) => {
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiPatch();
	const queryClient = useQueryClient();
	const {
		control,
		register,
		formState: { errors },
		handleSubmit
	} = useForm({
		defaultValues: {
			PermanentAddress: data?.permanentAddress.toUpperCase(),
			ContactAddress: data?.contactAddress.toUpperCase(),
			MobileNumber: data?.mobileNumber,
			BloodGroupId: {
				value: data?.bloodGroupId,
				label: data?.bloodGroup
			},
			GenoTypeId: { value: data?.genoTypeId, label: data.genoType },
			ReligionId: { value: data?.religionId, label: data.religion }
		},
		resolver: yupResolver(PersonalInformationSchema)
	});

	const onSubmit = async (values) => {
		const requestData = [];
		const { ReligionId, GenoTypeId, BloodGroupId, ...editedValues } =
			values;
		const newObj = {
			...editedValues,
			ReligionId: ReligionId.value,
			GenoTypeId: GenoTypeId.value,
			BloodGroupId: BloodGroupId.value
		};
		Object.keys(newObj).forEach((item) => {
			if (typeof values[item] === "object") {
				requestData.push({
					op: "replace",
					path: `/${item}`,
					value: values[item]?.value
				});
			} else {
				requestData.push({
					op: "replace",
					path: `/${item}`,
					value: newObj[item]
				});
			}
		});
		const requestBody = {
			url: updateStudentProfileUrl({ refCode: false }),
			data: requestData
		};
		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getStudentProfileUrl({ refCode: false })
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Profile details updated.",
					body: "Your student profile details have been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace("#section_b");
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body: response?.data?.message || "Something went wrong"
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
				headerText={
					<span>
						Tell us about yourself
						<CompulsoryIndicator />
					</span>
				}
				footerContent={
					<Button
						data-cy="sub_program"
						label="Save & Continue"
						buttonClass="primary"
						type="submit"
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Full Name</label>
						</div>
						<div className="col-lg-9">
							<div className="row">
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="First Name"
										className="w-100 pr-2"
										value={data?.firstname}
										disabled
									/>
								</div>
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="Middle Name"
										className="w-100 px-2"
										name="Middlename"
										value={data?.middlename}
										disabled
									/>
								</div>
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="Last Name"
										className="w-100"
										name="Surname"
										value={data?.lastname}
										disabled
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label>Gender</label>
						</div>
						<div className="col-lg-9" name="gender">
							<RadioButtons
								label="Female"
								value="Female"
								name="gender"
								checked={data?.gender === "Female"}
								disabled
							/>
							<RadioButtons
								label="Male"
								value="Male"
								name="gender"
								checked={data?.gender === "Male"}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Date of Birth</label>
						</div>
						<div className="col-lg-3">
							<TextField
								type="date"
								name="DateOfBirth"
								value={formatDateFromAPI(data?.dateOfBirth)}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label>Country</label>
						</div>
						<div className="col-lg-9">
							<SMSelect
								placeholder="Choose country"
								searchable={true}
								name="Country"
								register={register}
								value={{ label: data?.country ?? "N/A" }}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label>State of Origin</label>
						</div>
						<div className="col-lg-9">
							<SMSelect
								placeholder="Choose state"
								searchable={true}
								name="State"
								register={register}
								value={{ label: data?.state ?? "N/A" }}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label>LGA Of Origin</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="lgaId"
								control={control}
								defaultValue={findValueAndLabel(
									data?.lgaId,
									allLGAs
								)}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Choose Local Government"
										searchable={true}
										name="lgaId"
										options={allLGAs}
										register={register}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Home Town</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter home town"
								className="w-100"
								type="text"
								name="HomeTown"
								value={data?.homeTown}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label>Permanent Address</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter permanent address"
								className="w-100"
								inputType="textarea"
								name="PermanentAddress"
								register={register}
								error={errors.PermanentAddress}
								errorText={
									errors.PermanentAddress &&
									errors.PermanentAddress.message
								}
								required
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Email Address</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="example@examplemail.com"
								className="w-100"
								type="email"
								name="Email"
								value={data?.email}
								required
								error={errors.Email}
								errorText={errors.Email && errors.Email.message}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Phone Number</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter phone number"
								type="text"
								name="MobileNumber"
								register={register}
								error={errors.MobileNumber}
								errorText={
									errors.MobileNumber &&
									errors.MobileNumber.message
								}
								//disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label>Contact Address</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter contact address"
								className="w-100"
								inputType="textarea"
								name="ContactAddress"
								register={register}
								required
								error={errors.ContactAddress}
								errorText={
									errors.ContactAddress &&
									errors.ContactAddress.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label>Blood Group</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="BloodGroupId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="BloodGroupId"
										placeholder="Choose blood group"
										options={allBloodGroups}
										searchable={false}
										isError={!!errors.BloodGroupId}
										errorText={
											errors.BloodGroupId &&
											errors.BloodGroupId.message
										}
										disabled={data.bloodGroupId !== 0}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label>Genotype</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="GenoTypeId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="GenoTypeId"
										placeholder="Choose a genotype"
										options={allGenotypes}
										searchable={false}
										isError={!!errors.GenoTypeId}
										errorText={
											errors.GenoTypeId &&
											errors.GenoTypeId.message
										}
										disabled={data.genoTypeId !== 0}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label>Religion</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="ReligionId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										searchable={false}
										placeholder="Choose a religion"
										id="ReligionId"
										options={allReligions}
										isError={!!errors.religion}
										errorText={
											errors.ReligionId &&
											errors.ReligionId.message
										}
										disabled={data.religionId !== 0}
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
