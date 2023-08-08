import {
	Jumbotron,
	Button,
	TextField,
	RadioButtons,
	SMSelect,
	CompulsoryIndicator
} from "../../../../ui_elements";
import { useHistory } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { useApiPatch } from "../../../../api/apiCall";
import {
	getStudentProfileUrl,
	updateStudentProfileUrl
} from "../../../../api/urls";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalInformationSchema } from "./profileSchema";
import { formatDateFromAPI } from "../../../../utils/formatDate";
import { trimItem } from "../../../../utils/trimItem";


export const PersonalInformation = ({ data, allEyeColors }) => {
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiPatch();
	const queryClient = useQueryClient();


	const {
		register,
		formState: { errors },
		handleSubmit,
		control
	} = useForm({
		defaultValues: {
			PermanentAddress: data?.permanentAddress.toUpperCase(),
			ContactAddress: data?.contactAddress.toUpperCase(),
			EyeColorId: (data?.eyeColorId && data?.eyeColor) ? { value: data?.eyeColorId, label: data?.eyeColor } : null,			Height: data?.height || null,
			Weight: data?.weight || null

		},
		resolver: yupResolver(PersonalInformationSchema)
	});
	const onSubmit = async (values) => {
		const formatValue = {
			...values,
			EyeColorId: values?.EyeColorId?.value,
		}
		const data = [];
		Object.keys(formatValue).map((item) => 
			data.push({
				op: "replace",
				path: `/${item}`,
				value: trimItem(formatValue[item])
			})
		);
		const requestBody = {
			url: updateStudentProfileUrl({ refCode: false }),
			data
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
								value={formatDateFromAPI(
									data?.dateOfBirth
								)}
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
							<SMSelect
								placeholder="Choose Local Government"
								searchable={true}
								name="State"
								register={register}
								value={{ label: data?.lga ?? "N/A" }}
								disabled
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
								name="MobileNo"
								value={data?.mobileNumber}
								disabled
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
							<SMSelect
								placeholder="Choose blood group"
								name="BloodGroupId"
								register={register}
								value={{ label: data?.bloodGroup ?? "N/A" }}
								disabled
							/>
						</div>
					</div>
				</div>

				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label>Eye Color</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="EyeColorId"
								control={control}
								rules={{ required: true }}
								render={({ field: { value, onChange } }) => (
									<SMSelect
										value={value}
										onChange={onChange}
										placeholder="Select your eye color"
										searchable={true}
										id="eyeColorId"
										options={allEyeColors}
										isError={!!errors?.EyeColorId}
										errorText={
											errors?.EyeColorId &&
											errors?.EyeColorId.message
										}
										disabled={!!data?.eyeColor}
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
							<SMSelect
								placeholder="Choose blood group"
								name="GenoTypeId"
								register={register}
								value={{ label: data?.genoType ?? "N/A" }}
								disabled
							/>
						</div>
					</div>
				</div>

				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Height</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter Your Height in meters (m)"
								type="text"
								name="Height"
								register={register}
								required
								error={errors.Height}
								errorText={
									errors.Height &&
									errors.Height.message
								}

							/>
						</div>
					</div>
				</div>

				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label>Weight</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter Your Weight in Kilograms (kg)"
								type="text"
								name="Weight"
								register={register}
								required
								error={errors.Weight}
								errorText={
									errors.Weight &&
									errors.Weight.message
								}

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
							<SMSelect
								placeholder="Choose Religion"
								name="Religion"
								register={register}
								value={{ label: data?.religion ?? "N/A" }}
								disabled
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
