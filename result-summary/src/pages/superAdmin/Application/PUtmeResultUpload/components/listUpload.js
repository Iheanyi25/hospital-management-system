import styles from "../style.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import {
	Button,
	SignatureUpload as FIleUpload,
	SMSelect,
	Spinner
} from "../../../../../ui_elements";
import {
	checkIfFilesAreCorrectType,
	checkIfFilesAreTooBig
} from "../../../../../utils/FileValidation";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { useApiBlob, useApiGet } from "../../../../../api/apiCall";
import {
	downloadPutmeResultTemplateUrl,
	getAllSessionsUrl
} from "../../../../../api/urls";

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
		),
	sessionId: yup.mixed().required("please choose a session")
});

export const ListUpload = ({ setUploaded, setFileDataPayload }) => {
	const [downloadFile, setDownloadFile] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		control
	} = useForm({ resolver: yupResolver(schema) });
	const onSubmit = (data) => {
		setUploaded(true);
		setFileDataPayload({
			fileData: data.resultSheet[0],
			sessionId: data.sessionId?.value
		});
	};
	const fileFieldValue = watch("resultSheet");
	const sessionId = watch("sessionId");

	const { data: sessions, isLoading: isLoadingSessions } = useApiGet(
		getAllSessionsUrl()
	);
	const allSessions = formatSelectItems(sessions?.data, "session", "id");

	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(
		downloadPutmeResultTemplateUrl({ sessionId: sessionId?.value }),
		{
			enabled: downloadFile,
			refetchOnWindowFocus: false
		}
	);

	const downloadXLSFile = useCallback(async () => {
		if (fileError) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: `Failed To Download `,
				body: `Couldn't download template`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
			setDownloadFile(false);
		}

		if (file) {
			const outputFilename = `Putme Result Template ${sessionId?.label}.xlsx`;
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file, fileError]);

	useEffect(() => {
		if (downloadFile) {
			downloadXLSFile();
		}
	}, [file, downloadFile, downloadXLSFile]);

	if (isLoadingSessions) return <Spinner height="280px" />;

	return (
		<form
			className={`${styles.form_content} w-100 mt-2`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="row mb-4">
				<div className="col-lg-12">
					<Controller
						name="sessionId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id="sessionId"
								options={allSessions}
								placeholder="Select Session"
								is
								searchable={false}
								isError={!!errors.sessionId}
								errorText={
									errors.sessionId && errors.sessionId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			<FIleUpload
				name="resultSheet"
				register={register}
				required={true}
				errorText={errors?.resultSheet?.message}
				fileName={fileFieldValue && fileFieldValue[0]?.name}
			/>
			<div className="d-flex justify-content-end mt-4">
				<Button
					data-cy="download_excel_temp"
					label="Download excel template"
					buttonClass="standard"
					type="button"
					disabled={!sessionId?.value}
					onClick={() => setDownloadFile(true)}
					loading={fileLoading}
				/>
				<Button
					data-cy="upload_result"
					label="Upload"
					buttonClass="primary"
					type="submit"
				/>
			</div>
		</form>
	);
};
