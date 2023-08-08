import { useForm, Controller } from "react-hook-form";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	CompulsoryIndicator
} from "../../../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { SponsorDetailsSchema } from "../profileSchema";
import { memo } from "react";
import {
	getStudentProfileUrl,
	updateStudentProfileUrl
} from "../../../../../../api/urls";
import { useApiPatch } from "../../../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";

export const SponsorInformation = memo(
	({ data, allSponsorRelationships, refCode }) => {
		const { mutate, isLoading } = useApiPatch();
		const queryClient = useQueryClient();
		const {
			register,
			control,
			formState: { errors },
			handleSubmit
		} = useForm({
			defaultValues: {
				Fullname: data?.fullname,
				Address: data?.address,
				MobileNumber: data?.mobileNumber,
				Email: data?.email,
				RelationshipId: findValueAndLabel(
					data?.relationshipId,
					allSponsorRelationships
				)
			},
			resolver: yupResolver(SponsorDetailsSchema)
		});
		const onSubmit = (values) => {
			const data = [];
			Object.keys(values).map((item) => {
				if (typeof values[item] === "object") {
					return data.push({
						op: "replace",
						path: `/StudentSponsorDetail/${item}`,
						value: values[item].value
					});
				} else {
					return data.push({
						op: "replace",
						path: `/StudentSponsorDetail/${item}`,
						value: values[item].toUpperCase()
					});
				}
			});
			const requestBody = {
				url: updateStudentProfileUrl({ refCode }),
				data
			};
			mutate(requestBody, {
				onSuccess: () => {
					queryClient.invalidateQueries(
						getStudentProfileUrl({ refCode })
					);
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Profile details updated.",
						body: "Your student profile details have been successfully updated."
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
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
					headerText={
						<span>
							Your sponsor
							<CompulsoryIndicator />
						</span>
					}
					footerContent={
						<Button
							data-cy="submit_spons"
							label="Update"
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
								<label htmlFor="sponsor_name">
									Sponsor's Fullname
								</label>
							</div>
							<div className="col-lg-9">
								<TextField
									id="sponsor_name"
									autoComplete="off"
									placeholder="Enter sponsor's full name"
									className="w-100"
									type="text"
									name="Fullname"
									register={register}
									error={errors.Fullname}
									errorText={
										errors.Fullname &&
										errors.Fullname.message
									}
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 my-3">
						<div className="row">
							<div className="col-lg-3">
								<label htmlFor="sponsor_address">
									Sponsor's Address
								</label>
							</div>
							<div className="col-lg-9">
								<TextField
									id="sponsor_address"
									autoComplete="off"
									placeholder="Enter sponsor's address"
									className="w-100"
									inputType="textarea"
									name="Address"
									register={register}
									error={errors.Address}
									errorText={
										errors.Address && errors.Address.message
									}
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 my-3">
						<div className="row">
							<div className="col-lg-3 d-flex align-items-center">
								<label htmlFor="sponsor_number">
									Sponsor's Mobile No
								</label>
							</div>
							<div className="d-flex col-lg-9">
								<TextField
									id="sponsor_number"
									className="w-100"
									placeholder="Enter sponsor's phone number"
									type="text"
									name="MobileNumber"
									register={register}
									error={errors.MobileNumber}
									errorText={
										errors.MobileNumber &&
										errors.MobileNumber.message
									}
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 my-3">
						<div className="row">
							<div className="col-lg-3 d-flex align-items-center">
								<label htmlFor="sponsor_email">
									Sponsor's Email
								</label>
							</div>
							<div className="col-lg-9">
								<TextField
									id="sponsor_email"
									autoComplete="off"
									placeholder="example@examplemail.com"
									className="w-100"
									type="email"
									name="Email"
									register={register}
									error={errors.Email}
									errorText={
										errors.Email && errors.Email.message
									}
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 mt-4 mb-5">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="RelationshipId">
									Relationship
								</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="RelationshipId"
									control={control}
									render={({ field }) => (
										<SMSelect
											placeholder="Choose relationship"
											options={allSponsorRelationships}
											searchable={false}
											id="RelationshipId"
											{...field}
											isError={!!errors.RelationshipId}
											errorText={
												errors.RelationshipId &&
												errors.RelationshipId.message
											}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				</Jumbotron>
			</form>
		);
	}
);
