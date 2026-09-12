import styles from "../style.module.css";
import { Controller, useForm } from "react-hook-form";
import { Button, SMSelect } from "../../../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { addClaimSchema } from "./componentsSchema";
import { useApiGet, useApiPost } from "../../../../../../api/apiCall";
import {
	createUserClaimsUrl,
	getAllMenuClaimsUrl,
	getUserClaimsUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { useMemo } from "react";

export const AddUserClaim = ({ currentFilterState, closeModal, userId }) => {
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(addClaimSchema)
	});

	const {
		data,
		isLoading: isMenuClaimLoading,
		error
	} = useApiGet(getAllMenuClaimsUrl(), {
		refetchOnWindowFocus: false,
		keepPreviousData: true
	});

	const menuClaimList = useMemo(
		() =>
			data?.data.map((claim) => {
				return { label: claim, value: claim };
			}),
		[data?.data]
	);

	const onSubmit = ({ claim }) => {
		const requestDet = {
			url: createUserClaimsUrl(),
			data: {
				userId,
				claims: claim.map((claim) => claim.value)
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getUserClaimsUrl(currentFilterState)
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Add Claim Success!",
					body: "You have added a new claim successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				closeModal();
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Add Claim Failed!",
					body:
						response?.data?.message ||
						`Add claim wasn't successfully`
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
					<label htmlFor="ClaimName">Claim Name</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="claim"
						control={control}
						// rules={{ required: true }}
						render={({ field }) => (
							<SMSelect
								{...field}
								id="claim"
								options={menuClaimList}
								placeholder="Select claim"
								loading={isMenuClaimLoading}
								disabled={isMenuClaimLoading || error}
								searchable
								isMulti
								isError={!!errors.claim}
								errorText={errors.claim && errors.claim.message}
							/>
						)}
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					data-cy="create_claim"
					label="Create Claim"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
