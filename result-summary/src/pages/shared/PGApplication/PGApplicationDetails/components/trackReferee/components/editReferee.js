import styles from "../style.module.css";
import { Button, TextField } from "../../../../../../../ui_elements";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadSchema } from "./uploadSchema";
import {
	getPGRefereeStatusUrl,
	updatePGRefereeUrl
} from "../../../../../../../api/urls";
import { useApiPost } from "../../../../../../../api/apiCall";
import { useQueryClient } from "react-query";

export const EditReferee = ({ data, rrr, closeModal }) => {
	const { mutate, isLoading } = useApiPost();
	const { refereeId } = data;
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			name: data?.name,
			email: data?.email,
			organisation: data?.organisation,
			position: data?.position
		},
		resolver: yupResolver(UploadSchema)
	});
	const onSubmit = (data) => {
		const requestDet = {
			url: updatePGRefereeUrl(refereeId),
			data
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(getPGRefereeStatusUrl(rrr));
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Referee Update Successful!",
					body: "You have successfully updated this referee"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Referee Update Failure!",
					body: response?.data?.message || `Something went wrong`
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
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="name">Referee Name</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="name"
						placeholder="Enter referee name"
						type="text"
						name="name"
						register={register}
						error={errors.name}
						errorText={errors.name && errors.name.message}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="email">Email</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="email"
						placeholder="Enter referee email"
						type="email"
						name="email"
						register={register}
						error={errors.email}
						errorText={errors.email && errors.email.message}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="organisation">Organization</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="organisation"
						placeholder="Enter organization name"
						type="text"
						name="organisation"
						register={register}
						error={errors.organisation}
						errorText={
							errors.organisation && errors.organisation.message
						}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="position">Position</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="position"
						placeholder="Enter positon name"
						type="text"
						name="position"
						register={register}
						error={errors.position}
						errorText={errors.position && errors.position.message}
						required
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					data-cy="update_referee"
					label="Update & Send Mail"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
