import { useCallback, useEffect, useMemo, useState } from "react";
import { TMTable, Button } from "../../../../../../../../ui_elements";
import { downloadApplicationFileUrl } from "../../../../../../../../api/urls";
import { useApiBlob } from "../../../../../../../../api/apiCall";

export const CertificateTable = ({ editData, filter }) => {
	const [downloadFile, setDownloadFile] = useState(false);
	const [data, setData] = useState({});
	const outputTitle = `${data?.name} Certificate for ${editData?.fullname}`;
	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(
		downloadApplicationFileUrl({
			applicationTypeId: filter?.applicationTypeId,
			certicateTypeId: data?.id,
			rrr: editData?.rrr
		}),
		{
			enabled: !!(downloadFile && data?.id),
			refetchOnWindowFocus: false
		}
	);
	const downloadXLSFile = useCallback(async () => {
		setDownloadFile(true);
		if (fileError || !file?.data) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: `Failed To Download `,
				body: `Couldn't download file`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		} else {
			// file file actions.
			const url = URL.createObjectURL(new Blob([file.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${outputTitle}.png`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			setDownloadFile(false);
		}
	}, [file?.data, outputTitle, fileError]);

	useEffect(() => {
		if (file && downloadFile) {
			downloadXLSFile();
		}
	}, [file, downloadFile, downloadXLSFile]);
	const columns = useMemo(
		() => [
			{
				Header: "S/N",
				accessor: "serialNo",
				Cell: ({ cell: { row } }) => (
					<div>
						<span>{row.index + 1}</span>
					</div>
				)
			},
			{
				Header: "Document",
				accessor: "name"
			},
			{
				Header: "Action",
				accessor: "cert",
				Cell: ({ cell: { row } }) => (
					<Button
						label={`Download`}
						buttonClass="secondary"
						onClick={() => {
							setData(row.original);
							setDownloadFile(true);
						}}
						loading={fileLoading && data?.id === row.original.id}
					/>
				)
			}
		],
		[fileLoading, data?.id]
	);

	return (
		<>
			<TMTable
				columns={columns}
				data={editData?.certificationsInfo}
				title="Certs "
			/>
		</>
	);
};
