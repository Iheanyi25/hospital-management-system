import {
	Jumbotron,
	Button,
	TextField,
	RadioButtons
} from "../../../../ui_elements";
// import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { useApiEdit } from "../../../../api/apiCall";
import {
	getLecturerProfileUrl,
	updateLecturerProfileUrl
} from "../../../../api/urls";
import { useQueryClient } from "react-query";
import { trimItem } from "../../../../utils/trimItem";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { checkForCorrectPhoneNumber } from "../../../../utils/formValidations";

export const PersonalInformation = ({ data }) => {
	// const { replace } = useHistory();
	const { mutate, isLoading } = useApiEdit();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			MobileNo: data?.mobileNumber
		},
		resolver: yupResolver(
			yup.object().shape({
				MobileNo: yup
					.string()
					.required("phone number is required")
					.test(
						"text number",
						"invaild phone number",
						checkForCorrectPhoneNumber
					)
			})
		)
	});
	const onSubmit = (newData) => {
		const dataObj = {
			Lastname: data?.lastname,
			Firstname: data?.firstName,
			MiddleName: data?.middlename,
			MobileNumber: newData?.MobileNo,
			Email: data?.email,
			DepartmentId: data?.departmentId,
			GenderId: data?.genderId,
			StudentTypeId: data?.studentTypeId
		};
		Object.keys(dataObj).forEach((item) => {
			return (data[item] = trimItem(dataObj[item]));
		});
		const requestBody = {
			url: updateLecturerProfileUrl(),
			data: dataObj
		};
		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(getLecturerProfileUrl());
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Profile details updated.",
					body: "Your profile details has been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				// replace("#section_b");
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
				headerText="Update your profile"
				footerContent={
					<Button
						data-cy="save"
						label="Save & Continue"
						buttonClass="primary"
						type="submit"
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<span className="font-weight-bold">Full Name</span>
						</div>
						<div className="col-lg-9">
							<div className="row">
								<div className="col-12 col-md-4 mb-4 mb-md-0">
									<TextField
										autoComplete="off"
										placeholder="First Name"
										className="w-100 pr-2"
										name="Firstname"
										value={data?.firstName}
										disabled
									/>
								</div>
								<div className="col-12 col-md-4 mb-4 mb-md-0">
									<TextField
										autoComplete="off"
										placeholder="Middle Name"
										className="w-100 px-2"
										name="MiddleName"
										value={data?.middlename}
										disabled
									/>
								</div>
								<div className="col-12 col-md-4 mb-4 mb-md-0">
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
							<label htmlFor="email">Email Address</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="email"
								autoComplete="off"
								placeholder="example@examplemail.com"
								className="w-100"
								type="email"
								name="Email"
								value={data?.email}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="mobile_no">Phone Number</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								id="mobile_no"
								className="w-100"
								placeholder="Enter phone number"
								type="text"
								name="MobileNo"
								register={register}
								error={errors.MobileNo}
								errorText={
									errors.MobileNo && errors.MobileNo.message
								}
								required
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="department">Department</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="department"
								autoComplete="off"
								placeholder="Department"
								className="w-100 pr-2"
								value={data?.department ?? "N/A"}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="role">Role</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="role"
								autoComplete="off"
								placeholder="Role"
								className="w-100 pr-2"
								value={data?.role ?? "N/A"}
								disabled
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
