import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

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
import { SAVE_PUTME_INFO } from "../../../../store/constant";

import { UploadCertificateSchema } from "../predegreeSchema";

import formatImageToBase64 from "../../../../utils/formatImage";
import { putmeCertificateDetailsFormUrl } from "../../../../api/urls";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../../utils/FileValidation";

export const UploadCertificate = ({ oLevelDocumentTypes }) => {
	const [certificateList, setCertificateList] = useState([0]);
	const [fileToUpload, setFileToUpload] = useState([
		{ index: 0, file: null }
	]);

	const putmeStoreData = useSelector((state) => state.putmeData);
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/putme_login");
	}

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const {
		handleSubmit,
		control,
		setValue,
		getValues,
		formState: { errors }
	} = useForm({
		defaultValues: {
			certificates: putmeStoreData?.uploadCertificate?.certificates?.map(
				(certificate) => ({
					certificateType: {
						value: certificate?.certificateType?.value,
						label: certificate?.certificateType?.label
					},
					certificateData: certificate?.certificateData
				})
			)
		},
		resolver: yupResolver(UploadCertificateSchema)
	});

	const handleFileUpload = async (e, index) => {
		if (!checkIfFilesAreTooBig(e.target.files)) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "File too Large."
			});
			setTimeout(() => {
				errorFlag.close();
			}, 3000);
			return;
		} else if (!checkIfImagesAreCorrectType(e.target.files)) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "Invalid file type. Try again"
			});
			setTimeout(() => {
				errorFlag.close();
			}, 3000);
			return;
		}
		const filteredUploads = fileToUpload.filter(
			(file) => file.index !== index
		);
		filteredUploads.splice(index, 0, { index, file: e.target.files[0] });
		setValue(
			`certificates.${index}.certificateData`,
			await formatImageToBase64(e.target.files[0])
		);
		setFileToUpload(filteredUploads);
	};

	const handleAddAnother = () => {
		setCertificateList([...certificateList, 0]);
		setFileToUpload([
			...fileToUpload,
			{ index: certificateList.length, file: null }
		]);
	};

	const handleRemoveItem = (targetElement) => {
		setValue("certificates", [
			...getValues()?.certificates?.filter(
				(_, index) => index !== targetElement
			)
		]);
		setCertificateList(
			certificateList.filter((_, index) => index !== targetElement)
		);
		setFileToUpload(
			fileToUpload.filter((_, index) => index !== targetElement)
		);
	};

	const onSubmit = (uploadCertificate) => {
		const requestBody = {
			url: putmeCertificateDetailsFormUrl(),
			data: {
				PostUtmeApplicantBasicInformationId:
					putmeStoreData?.personalInfo
						?.postUtmeApplicantBasicInformationId,
				CerticateInfo: uploadCertificate?.certificates?.map(
					(certificateInfo) => ({
						...certificateInfo,
						certificateType: certificateInfo?.certificateType?.value
					})
				)
			}
		};
		mutate(requestBody, {
			onSuccess: (data) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Successfully uploaded certificate(s)",
					body: "That would be all!!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: SAVE_PUTME_INFO,
					payload: {
						...putmeStoreData,
						uploadCertificate
					}
				});
				replace({
					pathname: "/putme_application/preview",
					state: { details: data?.data?.data }
				});
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

	useEffect(() => {
		if (Object.values(errors)?.length > 0) {
			const successFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "You have to submit at least one certificate with certificate type!"
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
		}
	}, [errors]);

	useEffect(() => {
		if (putmeStoreData?.uploadCertificate?.certificates?.length) {
			for (
				let i = 1;
				i < putmeStoreData?.uploadCertificate?.certificates.length;
				i++
			) {
				setCertificateList((prevCertList) => [...prevCertList, 0]);
				setFileToUpload((prevFileList) => [
					...prevFileList,
					{ index: i, file: null }
				]);
			}
		}
	}, [putmeStoreData?.uploadCertificate?.certificates]);

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
						paragraph={`All Scanned Certificates must be in JPG, PNG or JPEG file format.
						 All documents to be uploaded must be less than 100kb`}
					/>
				</div>
				{certificateList.map((_, index) => (
					<div className="container-fluid px-4 my-3 mb-5" key={index}>
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
									name={`certificates.${index}.certificateType`}
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											searchable={false}
											placeholder="Choose certificate type"
											options={oLevelDocumentTypes}
											isError={
												errors?.certificates?.[index]
													?.certificateType
											}
											errorText={
												errors?.certificates?.[index]
													?.certificateType &&
												errors?.certificates?.[index]
													?.certificateType?.message
											}
											id={`certificates.${index}.certificateTypeId`}
										/>
									)}
								/>
							</div>
						</div>
						<SignatureUpload
							name={`certificates.${index}.certificateData`}
							onChange={(e) => handleFileUpload(e, index)}
							currentValue={
								fileToUpload[index]?.file
									? fileToUpload[index]?.file
									: putmeStoreData?.uploadCertificate
											?.certificates?.[index]
											?.certificateData
									? putmeStoreData?.uploadCertificate
											?.certificates?.[index]
											?.certificateData
									: ""
							}
							errorText={
								errors?.certificates?.[index]
									?.certificateData &&
								errors?.certificates?.[index]?.certificateData
									?.message
							}
						/>
						<div className="container-fluid px-4">
							<div className="d-flex justify-content-end mt-5">
								{index > 0 && (
									<SecondaryLink
										type="button"
										label="Delete"
										linkType="danger-link"
										onClick={() => handleRemoveItem(index)}
									/>
								)}
							</div>
						</div>
					</div>
				))}
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
