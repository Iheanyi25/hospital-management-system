import styles from "../style.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
	Button,
	SignatureUpload as FileUpload
} from "../../../../../ui_elements";
import {
	checkIfFilesAreCorrectType,
	checkIfFilesAreTooBig
} from "../../../../../utils/FileValidation";
import { useApiBlob } from "../../../../../api/apiCall";
import { downloadDirectEntryListTemplateUrl } from "./../../../../../api/urlCategories/DirectEntryApplication";

const schema = yup.object().shape({
	resultSheet: yup
		.mixed()
		.test("required", "Please select an excel file!", (value) => {
			return value && value.length;
		})
		.test("is-big-file", "The file you selected is too big!", (files) =>
			checkIfFilesAreTooBig(files, 1000)
		)
		.test(
			"is-correct-file",
			"Wrong file type, ensure this an excel file!",
			checkIfFilesAreCorrectType
		)
});

export const ListUpload = ({ setUploaded, setFileData }) => {
	const [downloadFile, setDownloadFile] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm({ resolver: yupResolver(schema) });
	const onSubmit = (data) => {
		setUploaded(true);
		setFileData(data.resultSheet[0]);
	};
	const fileFieldValue = watch("resultSheet");

	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(downloadDirectEntryListTemplateUrl(), {
		//ttyiyu
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
			const outputFilename = `Direct Entry List Upload Template.xlsx`;
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
					label="Upload"
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
