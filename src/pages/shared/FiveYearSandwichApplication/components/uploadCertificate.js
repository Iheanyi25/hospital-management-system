import { useEffect, useMemo } from "react";
import { useHistory } from "react-router";

import {
	Jumbotron,
	Button,
	Note,
	SMSelect,
	SignatureUpload,
	SecondaryLink
} from "../../../../ui_elements";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { useApiPost } from "../../../../api/apiCall";

import { useDispatch, useSelector } from "react-redux";
import { SAVE_FIVE_YEAR_SANDWICH_APPLICATION } from "../../../../store/constant";

import { UploadCertificateSchema } from "../fiveYearSandwichSchema";
import formatImageToBase64 from "../../../../utils/formatImage";
import { addOrUpdateSandwichCertificateUrl } from "../../../../api/urls";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../../utils/FileValidation";
import { useLocation } from "react-router-dom";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";

const defaultIds = {
	olevel: 8
};

const initialObj = {
	certificate: "",
	certificateTypeId: null
};

export const UploadCertificate = ({ oLevelDocumentTypes }) => {
	const defaultArrayValues = useMemo(
		() => [
			{
				certificateTypeId: findValueAndLabel(
					defaultIds.olevel,
					oLevelDocumentTypes
				),
				certificate: ""
			}
		],
		[oLevelDocumentTypes]
	);

	const fiveYearSandwichState = useSelector(
		(state) => state.fiveYearSandwichData
	);
	const { certificates, applicantId } = fiveYearSandwichState;
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const {
		handleSubmit,
		control,
		setValue,
		getValues,
		setError,
		clearErrors,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			certificates
		},
		resolver: yupResolver(UploadCertificateSchema)
	});

	const onChange = async (e, fieldName) => {
		const value = e.target.files;
		if (!(value && value.length)) {
			setError(fieldName, { message: "Please select an image file!" });
		} else if (!checkIfFilesAreTooBig(value)) {
			setError(fieldName, {
				message: "The file you selected is too big!"
			});
		} else if (!checkIfImagesAreCorrectType(value)) {
			setError(fieldName, {
				message: "Wrong file type, ensure this an image file!"
			});
		} else {
			clearErrors(fieldName);
			setValue(fieldName, await formatImageToBase64(e.target.files[0]));
		}
	};
	function hasDuplicate(arr) {
		return arr.length !== new Set(arr).size;
	}
	const onSubmit = async ({ certificates }) => {
		let newCertificates = [];
		let error = false;
		if (
			!hasDuplicate(
				certificates.map((item) => item.certificateTypeId.value)
			)
		) {
			for (let index = 0; index < certificates.length; index++) {
				if (
					certificates[index]?.certificate?.length > 0 ||
					!!certificates[index]?.certificate
				) {
					newCertificates?.push({
						...certificates[index],
						certificateType:
							certificates[index]?.certificateTypeId.label,
						certificateTypeId:
							certificates[index]?.certificateTypeId.value,
						certificate: certificates[index]?.certificate
					});
				} else {
					error = true;
					setError(`certificates.${index}.certificate`, {
						message: "Please select an image file!"
					});
				}
			}
		} else {
			error = true;
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "You have duplicate items in your certificate type field!"
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
		if (!error) {
			const requestBody = {
				url: addOrUpdateSandwichCertificateUrl(),
				data: {
					applicationFormId: applicantId,
					certificates: newCertificates
				}
			};
			mutate(requestBody, {
				onSuccess: (data) => {
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Application details updated.",
						body: "Your certificate details have been updated successfully!"
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
					dispatch({
						type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
						payload: {
							...fiveYearSandwichState,
							certificates
						}
					});
					replace({ hash: "#section_f", state });
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
		}
	};

	useEffect(() => {
		if (!certificates || !certificates.length) {
			dispatch({
				type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
				payload: {
					...fiveYearSandwichState,
					certificates: defaultArrayValues
				}
			});
			setValue("certificates", defaultArrayValues);
		}
	}, [
		certificates,
		fiveYearSandwichState,
		dispatch,
		setValue,
		defaultArrayValues
	]);

	const handleAddAnother = () => {
		dispatch({
			type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
			payload: {
				...fiveYearSandwichState,
				certificates: [...certificates, { ...initialObj }]
			}
		});
		setValue("certificates", [
			...getValues().certificates,
			{ ...initialObj }
		]);
	};

	const handleRemoveItem = (targetElement) => {
		dispatch({
			type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
			payload: {
				...fiveYearSandwichState,
				certificates: certificates.filter(
					(_, index) => index !== targetElement
				)
			}
		});
		setValue(
			"certificates",
			getValues().certificates.filter(
				(_, index) => index !== targetElement
			)
		);
	};

	const fileFieldValue = watch("certificates");

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Upload Certificate</span>}
				footerContent={
					<Button
						data-cy="sumit_profile"
						label="Next"
						buttonClass="primary"
						type="submit"
						loading={isFormLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="p-4">
					<Note
						blueVariant
						paragraph={`NB: All Scanned Certificates must be in JPG, BMP or JPEG file format. Any vague/unclear document you upload could lead to your disqualification. For upload of documents, save each certificate using this format- Certificatename_JAMBREG For example: Birth_1234568IG, SSCE_87654321GH`}
					/>
				</div>
				{certificates?.map((_, index) => {
					return (
						<div
							className="container-fluid px-4 my-3 mb-5"
							key={index}
						>
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label
										htmlFor={`certificates.${index}.certificateTypeId`}
									>
										Certificate Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name={`certificates.${index}.certificateTypeId`}
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												searchable={false}
												placeholder="Choose certificate type"
												options={oLevelDocumentTypes}
												isError={
													errors?.certificates?.[
														index
													]?.certificateTypeId
												}
												errorText={
													errors?.certificates?.[
														index
													]?.certificateTypeId &&
													errors?.certificates?.[
														index
													]?.certificateTypeId
														?.message
												}
												disabled={index < 1}
												id={`certificates.${index}.certificateTypeId`}
											/>
										)}
									/>
								</div>
							</div>
							<SignatureUpload
								name={`certificates.${index}.certificate`}
								onChange={(e) => {
									onChange(
										e,
										`certificates.${index}.certificate`
									);
								}}
								currentValue={
									fileFieldValue?.[index].certificate &&
									typeof fileFieldValue?.[index]
										.certificate === "object"
										? fileFieldValue?.[index].certificate[0]
										: fileFieldValue?.[index].certificate
								}
								errorText={
									errors?.certificates?.[index]
										?.certificate &&
									errors?.certificates?.[index]?.certificate
										?.message
								}
							/>
							<div className="container-fluid px-4">
								<div className="d-flex justify-content-end mt-5">
									{index > 2 && (
										<SecondaryLink
											type="button"
											label="Delete"
											linkType="danger-link"
											onClick={() =>
												handleRemoveItem(index)
											}
										/>
									)}
								</div>
							</div>
						</div>
					);
				})}
				<div className="px-4 pb-3 text-right">
					<button
						className="clickable"
						type="button"
						onClick={handleAddAnother}
					>
						<span className="text-primary">
							+ Add another certificate
						</span>
					</button>
				</div>
			</Jumbotron>
		</form>
	);
};
