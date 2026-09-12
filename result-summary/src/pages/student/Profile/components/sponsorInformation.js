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
import { SponsorDetailsSchema } from "./profileSchema";

export const SponsorInformation = ({ data, allSponsorRelationships }) => {
	const { replace } = useHistory();
	const queryClient = useQueryClient();
	const { mutate, isLoading } = useApiPatch();
	const {
		register,
		formState: { errors },
		control,
		handleSubmit
	} = useForm({
		defaultValues: {
			Fullname: data?.fullname.toUpperCase(),
			Address: data?.address.toUpperCase(),
			MobileNumber: data?.mobileNumber,
			Email: data?.email.toUpperCase(),
			Relationship: findValueAndLabel(
				data?.relationshipId,
				allSponsorRelationships
			)
		},
		resolver: yupResolver(SponsorDetailsSchema)
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
				path: `/StudentSponsorDetail/${item}`,
				value: newObj[item]
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
				replace("#section_c");
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
						Your sponsor
						<CompulsoryIndicator />
					</span>
				}
				footerContent={
					<Button
						data-cy="sub_spons"
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
									errors.Fullname && errors.Fullname.message
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
									errors.MobileNumber && errors.MobileNumber.message
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
								errorText={errors.Email && errors.Email.message}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 mt-4 mb-5">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label>Relationship</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="Relationship"
								control={control}
								render={({ field }) => (
									<SMSelect
										placeholder="Choose relationship"
										options={allSponsorRelationships}
										searchable={false}
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
