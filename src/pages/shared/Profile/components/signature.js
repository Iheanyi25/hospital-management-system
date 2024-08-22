import { useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useApiEdit } from "../../../../api/apiCall";
import { getUserProfileUrl, updateStaffProfileUrl } from "../../../../api/urls";
import { Jumbotron, Button, SignatureUpload } from "../../../../ui_elements";
import formatImageToBase64 from "../../../../utils/formatImage";
import { trimItem } from "../../../../utils/trimItem";

export const Signature = ({ signature }) => {
	const { replace } = useHistory();
	const ref = useRef();
	const { mutate, isLoading } = useApiEdit();
	const queryClient = useQueryClient();
	const [fileToUpload, setFileToUpload] = useState();

	const uploadImage = async () => {
		if (
			fileToUpload.size < 200000 ||
			fileToUpload.type === "image/png" ||
			fileToUpload.type === "image/jpg" ||
			fileToUpload.type === "image/jpeg"
		) {
			const requestData = [];
			const newObj = {
				Signature: await formatImageToBase64(fileToUpload)
			};

			Object.keys(newObj).map((item) =>
				requestData.push({
					op: "replace",
					path: `/${item}`,
					value: trimItem(newObj[item])
				})
			);

			const requestBody = {
				url: updateStaffProfileUrl(),
				data: requestData
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
					// replace("#section_b");
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
		} else {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body:
					fileToUpload.size > 200000
						? "File too Large. File should be less than 1MB"
						: "Invalid file type. Try again"
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	};
	return (
		<>
			<Jumbotron
				headerText={
					signature ? "Update Signature" : "Upload your signature"
				}
				// headerContainer={
				// 	<div className="d-flex justify-content-between">
				// 		<label className={`${styles.sub_header}`}>
				// 			Upload your signature
				// 		</label>
				// 		{signature && (
				// 			<label
				// 				className={`${styles.sub_header} ${styles.signature_text_style} px-4`}
				// 				onClick={() => ref?.current?.click()}
				// 			>
				// 				Update Signature
				// 			</label>
				// 		)}
				// 	</div>
				// }
				footerContent={
					<>
						<Button
							data-cy="submit_qualification"
							label="Previous"
							buttonClass="secondary"
							type="submit"
							onClick={() => replace("#section_f")}
						/>
						<Button
							data-cy="submit"
							label="Submit"
							buttonClass="primary"
							type="button"
							disabled={!fileToUpload}
							loading={isLoading}
							onClick={uploadImage}
						/>
					</>
				}
				footerStyle="d-flex justify-content-between"
			>
				<div className="container-fluid px-4 mt-4 mb-3">
					<div>
						<SignatureUpload
							name="Hello"
							onChange={(e) => setFileToUpload(e.target.files[0])}
							currentValue={
								fileToUpload ? fileToUpload : signature
							}
							parentRef={ref}
						/>
					</div>
				</div>
			</Jumbotron>
		</>
	);
};
