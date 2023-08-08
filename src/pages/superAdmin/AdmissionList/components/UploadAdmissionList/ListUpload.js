import styles from "../../style.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
	Button,
	SignatureUpload as FileUpload,
	SMSelect
} from "../../../../../ui_elements";
import {
	checkIfFilesAreCorrectType,
	checkIfFilesAreTooBig
} from "../../../../../utils/FileValidation";
import { downloadAdmissionsListTemplateUrl } from "../../../../../api/urls";
import { useApiBlob } from "../../../../../api/apiCall";

const schema = yup.object().shape({
	resultSheet: yup
		.mixed()
		.test("required", "Please select an excel file!", (value) => {
			return value && value.length;
		})
		.test(
			"is-correct-file",
			"The file you selected is too big!",
			checkIfFilesAreTooBig
		)
		.test(
			"is-big-file",
			"Wrong file type, ensure this an excel file!",
			checkIfFilesAreCorrectType
		),
	admissionType: yup.mixed().required("please select admission batch")
});

export const ListUpload = ({
	setUploaded,
	allAdmissionTypes,
	setAdmissionTypeId,
	setFileData
}) => {
	const [downloadFile, setDownloadFile] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		watch
	} = useForm({ resolver: yupResolver(schema) });
	const onSubmit = (data) => {
		setUploaded(true);
		setAdmissionTypeId(data.admissionType.value);
		setFileData(data.resultSheet[0]);
	};
	const fileFieldValue = watch("resultSheet");

	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(downloadAdmissionsListTemplateUrl(), {
		enabled: downloadFile,
		refetchOnWindowFocus: false
	});
	const downloadXLSFile = useCallback(async () => {
		setDownloadFile(true);
		if (fileError || !file?.data) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: `Failed To Download `,
				body: `Couldn't download template`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		} else {
			const outputFilename = `AdmissionListSample.xlsx`;
			// file file actions.
			const url = URL.createObjectURL(new Blob([file.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", outputFilename);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			const successFlag = window.AJS.flag({
				type: "success",
				title: "Template download successful"
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
			setDownloadFile(false);
		}
	}, [file, fileError]);
	useEffect(() => {
		if (file && downloadFile) {
			downloadXLSFile();
		}
	}, [file, downloadFile, downloadXLSFile]);
	return (
		<form
			className={`${styles.form_content} w-100 mt-3`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="admission_batch"
						className={styles.admission_list_edit_label}
					>
						Admission batch
					</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="admissionType"
						control={control}
						render={({ field }) => (
							<SMSelect
								placeholder="Choose admission batch"
								searchable={true}
								id="admission_batch"
								{...field}
								options={allAdmissionTypes}
								isError={!!errors.admissionType}
								errorText={
									errors.admissionType &&
									errors.admissionType.message
								}
							/>
						)}
					/>
				</div>
			</div>
			<FileUpload
				name="resultSheet"
				register={register}
				required={true}
				errorText={errors?.resultSheet?.message}
				fileName={fileFieldValue && fileFieldValue[0]?.name}
			/>
			<div className="d-flex justify-content-end  mt-4">
				<Button
					data-cy="upload_result"
					label="Upload List"
					buttonClass="primary"
					type="submit"
				/>
				<Button
					data-cy="download_excel_temp"
					label="Download excel template"
					buttonClass="standard"
					type="button"
					onClick={() => setDownloadFile(true)}
					loading={fileLoading}
				/>
			</div>
		</form>
	);
};
