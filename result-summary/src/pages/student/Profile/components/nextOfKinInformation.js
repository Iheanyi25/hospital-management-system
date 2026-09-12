import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router";
import { useApiPatch } from "../../../../api/apiCall";
import {
	getStudentProfileUrl,
	updateStudentProfileUrl
} from "../../../../api/urls";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	CompulsoryIndicator
} from "../../../../ui_elements";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
import { trimItem } from "../../../../utils/trimItem";
import { NextOfKinDetailsSchema } from "./profileSchema";

export const NextOfKinInformation = ({ data, relationships }) => {
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiPatch();
	const queryClient = useQueryClient();
	const {
		register,
		control,
		formState: { errors },
		handleSubmit
	} = useForm({
		defaultValues: {
			Fullname: data?.fullname.toUpperCase(),
			Address: data?.address.toUpperCase(),
			MobileNumber: data?.mobileNumber,
			Email: data?.email.toUpperCase(),
			Relationship: findValueAndLabel(data?.relationshipId, relationships)
		},
		resolver: yupResolver(NextOfKinDetailsSchema)
	});
	const onSubmit = (values) => {
		const requestData = [];
		const { Relationship, ...editedValues } = values;
		const newObj = {
			...editedValues,
			RelationshipId: Relationship.value
		};
		Object.keys(newObj).map((item) =>
			requestData.push({
				op: "replace",
				path: `/StudentNextOfKin/${item}`,
				value: trimItem(newObj[item])
			})
		);
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
				replace("#section_d");
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
						Next of Kin
						<CompulsoryIndicator />
					</span>
				}
				footerContent={
					<Button
						data-cy="sub_next_of_kin"
						label="Save & Continue"
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
							<label htmlFor="mobileNo">
								Next of Kin's Mobile No
							</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								id="mobileNo"
								className="w-100"
								placeholder="Enter Next of Kin's phone number"
								type="text"
								name="MobileNumber"
								register={register}
								error={errors.MobileNumber}
								errorText={
									errors.MobileNumber && errors.MobileNumber.message
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
							<label htmlFor="relationship">Relationship</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="Relationship"
								control={control}
								render={({ field }) => (
									<SMSelect
										placeholder="Choose relationship"
										options={relationships}
										searchable={false}
										id="relationship"
										{...field}
										isError={!!errors.Relationship}
										errorText={
											errors.Relationship &&
											errors.Relationship.message
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
