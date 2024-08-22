import { useForm, Controller } from "react-hook-form";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect
} from "../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { medicalAndNextOfKinSchema } from "./schema";
import { useApiEdit } from "../../../../api/apiCall";
import { getUserProfileUrl, updateStaffProfileUrl } from "../../../../api/urls";
import { useQueryClient } from "react-query";
import { trimItem } from "../../../../utils/trimItem";
import { useHistory } from "react-router-dom";

export const NextOfKinInformation = ({
	allGenotypes,
	allBloodGroups,
	allSponsorRelationships,
	data,
	nexOfKinData
}) => {
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiEdit();
	const queryClient = useQueryClient();
	const {
		register,
		control,
		formState: { errors },
		handleSubmit
	} = useForm({
		defaultValues: {
			GenotypeId: { value: data?.genoTypeId, label: data?.genoType },
			BloodGroupId: {
				value: data?.bloodGroupId,
				label: data?.bloodGroup
			},
			Height: data?.height,
			Allergies: data?.allergies,
			DiseaseDetails: data?.diseases,
			NextOfKinMobileNo: nexOfKinData?.mobileNumber,
			NextOfKinAddress: nexOfKinData?.address,
			NextOfKinFullname: nexOfKinData?.fullname,
			NextOfKinRelationshipId: {
				value: nexOfKinData?.relationshipId,
				label: nexOfKinData?.relationship
			}
		},
		resolver: yupResolver(medicalAndNextOfKinSchema)
	});

	const onSubmit = (values) => {
		const requestData = [];
		const nextOfKinData = [];
		const {
			GenotypeId,
			BloodGroupId,
			NextOfKinRelationshipId,
			Height,
			Allergies,
			DiseaseDetails,
			NextOfKinFullname,
			NextOfKinAddress,
			NextOfKinMobileNo
		} = values;
		const newObj = {
			GenotypeId: GenotypeId.value,
			BloodGroupId: BloodGroupId.value,
			Height,
			Allergies,
			Diseases: DiseaseDetails
		};
		const nextOfKinObj = {
			Fullname: NextOfKinFullname,
			Address: NextOfKinAddress,
			MobileNumber: NextOfKinMobileNo,
			RelationshipId: NextOfKinRelationshipId.value
		};

		Object.keys(newObj).map((item) =>
			requestData.push({
				op: "replace",
				path: `/${item}`,
				value: trimItem(newObj[item])
			})
		);

		Object.keys(nextOfKinObj).map((item) =>
			nextOfKinData.push({
				op: "replace",
				path: `/NextOfKin/${item}`,
				value: trimItem(nextOfKinObj[item])
			})
		);

		const requestBody = {
			url: updateStaffProfileUrl(),
			data: [...requestData, ...nextOfKinData]
		};
		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(getUserProfileUrl());
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Profile details updated.",
					body: "Your profile details has been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace("#section_c");
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
				headerText={<span>Medical & Next of Kin Details</span>}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="genotypeId">Genotype *</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="GenotypeId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="GenotypeId"
										placeholder="Choose genotype"
										name="GenotypeId"
										options={allGenotypes}
										searchable={false}
										isError={!!errors.GenotypeId}
										errorText={
											errors.GenotypeId &&
											errors.GenotypeId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="bloodGroupId">Blood Group *</label>
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
										name="BloodGroupId"
										options={allBloodGroups}
										searchable={false}
										isError={!!errors.BloodGroupId}
										errorText={
											errors.BloodGroupId &&
											errors.BloodGroupId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="height">Height *</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								id="Height"
								className="w-100"
								placeholder="Enter your Height"
								type="text"
								name="Height"
								register={register}
								error={errors.Height}
								errorText={
									errors.Height && errors.Height.message
								}
							/>
						</div>
					</div>
				</div>
				{/* <div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="email" Email</label>
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
				</div> */}
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="allergies">Allergies</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								id="Allergies"
								className="w-100"
								placeholder="Enter your allergies"
								type="text"
								name="Allergies"
								register={register}
								error={errors.Allergies}
								errorText={
									errors.Allergies && errors.Allergies.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="height">Disease Details</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								id="DiseaseDetails"
								className="w-100"
								placeholder="Enter your Disease Details"
								type="text"
								name="DiseaseDetails"
								register={register}
								error={errors.DiseaseDetails}
								errorText={
									errors.DiseaseDetails &&
									errors.DiseaseDetails.message
								}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
			<Jumbotron
				headerText={<span>Next of Kin</span>}
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
							<label htmlFor="fullname">Full name *</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="NextOfKinFullname"
								autoComplete="off"
								placeholder="Enter next of Kin's full name"
								className="w-100"
								type="text"
								name="NextOfKinFullname"
								register={register}
								error={errors.NextOfKinFullname}
								errorText={
									errors.NextOfKinFullname &&
									errors.NextOfKinFullname.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label htmlFor="address">Address *</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="NextOfKinAddress"
								autoComplete="off"
								placeholder="Enter Next of Kin's address"
								className="w-100"
								inputType="textarea"
								name="NextOfKinAddress"
								register={register}
								error={errors.NextOfKinAddress}
								errorText={
									errors.NextOfKinAddress &&
									errors.NextOfKinAddress.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="mobileNo">Mobile No *</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								id="NextOfKinMobileNo"
								className="w-100"
								placeholder="Enter Next of Kin's phone number"
								type="text"
								name="NextOfKinMobileNo"
								register={register}
								error={errors.NextOfKinMobileNo}
								errorText={
									errors.NextOfKinMobileNo &&
									errors.NextOfKinMobileNo.message
								}
							/>
						</div>
					</div>
				</div>
				{/* <div className="container-fluid px-4 my-3">
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
				</div> */}
				<div className="container-fluid px-4 mt-4 mb-5">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="relationship">Relationship *</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="NextOfKinRelationshipId"
								control={control}
								render={({ field }) => (
									<SMSelect
										placeholder="Choose relationship"
										options={allSponsorRelationships}
										searchable={false}
										id="NextOfKinRelationshipId"
										{...field}
										isError={
											!!errors.NextOfKinRelationshipId
										}
										errorText={
											errors.NextOfKinRelationshipId &&
											errors.NextOfKinRelationshipId
												.message
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
