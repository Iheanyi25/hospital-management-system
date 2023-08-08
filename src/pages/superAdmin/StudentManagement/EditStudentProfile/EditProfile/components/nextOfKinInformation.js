import { useForm, Controller } from "react-hook-form";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	CompulsoryIndicator
} from "../../../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextOfKinDetailsSchema } from "../profileSchema";
import { useQueryClient } from "react-query";
import { useApiPatch } from "../../../../../../api/apiCall";
import {
	getStudentProfileUrl,
	updateStudentProfileUrl
} from "../../../../../../api/urls";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";

export const NextOfKinInformation = ({ data, relationships, refCode }) => {
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
				relationships
			)
		},
		resolver: yupResolver(NextOfKinDetailsSchema)
	});
	const onSubmit = (values) => {
		const data = [];
		Object.keys(values).map((item) => {
			if (typeof values[item] === "object") {
				return data.push({
					op: "replace",
					path: `/StudentNextOfKin/${item}`,
					value: values[item].value
				});
			} else {
				return data.push({
					op: "replace",
					path: `/StudentNextOfKin/${item}`,
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
						Next of Kin
						<CompulsoryIndicator />
					</span>
				}
				footerContent={
					<Button
						data-cy="submit_next_of_kin"
						label="Next"
						buttonClass="primary"
						type="submit"
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 mt-4 mb-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="fullname">
								Next of Kin's fullname
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="fullname"
								autoComplete="off"
								placeholder="Enter next of Kin's full name"
								className="w-100"
								type="text"
								name="Fullname"
								register={register}
								error={errors.Fullname}
								errorText={
									errors.Fullname && errors.Fullname.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label htmlFor="address">
								Next of Kin's Address
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="address"
								autoComplete="off"
								placeholder="Enter Next of Kin's address"
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
							<label htmlFor="MobileNumber">
								Next of Kin's Mobile No
							</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								id="MobileNumber"
								className="w-100"
								placeholder="Enter Next of Kin's phone number"
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
							<label htmlFor="email">Next of Kin's Email</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="email"
								autoComplete="off"
								placeholder="example@examplemail.com"
								className="w-100"
								type="email"
								name="Email"
								register={register}
								error={errors.Email}
								errorText={errors.Email && errors.Email.message}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 mt-4 mb-5">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="RelationshipId">Relationship</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="RelationshipId"
								control={control}
								render={({ field }) => (
									<SMSelect
										placeholder="Choose relationship"
										options={relationships}
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
};
