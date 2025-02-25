import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useApiPost } from "../../../api/apiCall";
import { ChangePasswordUrl } from "../../../api/urls";
import { PageTitle, Button, TextField, Jumbotron } from "../../../ui_elements";
import { checkForValidPassword } from "../../../utils/formValidations";

const changePasswordSchema = yup.object().shape({
	oldPassword: yup
		.string()
		.required("Old password is required")
		.test(
			"validate password",
			"password must be between 8 to 15 characters which contains at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
			checkForValidPassword
		),
	newPassword: yup
		.string()
		.required("New password is required")
		.test(
			"validate password",
			"password must be between 8 to 15 characters which contains at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
			checkForValidPassword
		),
	confirmPassword: yup
		.string()
		.test("passwords-match", "Passwords do not match", function (value) {
			return this.parent.newPassword === value;
		})
});

const ChangePassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }, reset
	} = useForm({
		resolver: yupResolver(changePasswordSchema)
	});
	const mutation = useApiPost();

	const onSubmit = (data) => {
		const requestDet = {
			url: ChangePasswordUrl(),
			data: {
				currentPassword: data.oldPassword,
				newPassword: data.newPassword
			}
		};
		return mutation.mutate(requestDet, {
			onSuccess: () => {
				reset();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Password successfully updated!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed to change password!",
					body:
						response?.data?.message ||
						response?.data?.title ||
						`check your details `
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	return (
		<div className="row">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="col-12 col-md-8 mx-auto">
					<div>
						<PageTitle title="Change Password" />
					</div>
					<div style={{ marginTop: "52px" }}>
						<Jumbotron
							headerText="Create new password"
							footerContent={
								<Button
									data-cy="change_password"
									label="Change password"
									buttonClass="primary"
									type="submit"
									loading={isSubmitting || mutation.isLoading}
								/>
							}
							footerStyle="d-flex justify-content-end"
						>
							<div className="container-fluid px-4 my-3">
								<div className="row mb-4">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="old_password">
											Old Password
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											id="old_password"
											placeholder="Old Password"
											type="password"
											name="oldPassword"
											required
											register={register}
											error={errors.oldPassword}
											errorText={
												errors.oldPassword &&
												errors.oldPassword.message
											}
										/>
									</div>
								</div>
								<div className="row mb-4">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="new_password">
											New Password
										</label>
									</div>
									<div className="d-flex col-lg-9">
										<TextField
											id="new_password"
											placeholder="New Password"
											type="password"
											name="newPassword"
											required
											register={register}
											error={errors.newPassword}
											errorText={
												errors.newPassword &&
												errors.newPassword.message
											}
										/>
									</div>
								</div>
								<div className="row mb-4">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="retype_password">
											Retype Password
										</label>
									</div>
									<div className="d-flex col-lg-9">
										<TextField
											id="retype_password"
											placeholder="Retype Password"
											type="password"
											name="confirmPassword"
											required
											register={register}
											error={errors.confirmPassword}
											errorText={
												errors.confirmPassword &&
												errors.confirmPassword.message
											}
										/>
									</div>
								</div>
							</div>
						</Jumbotron>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ChangePassword;
