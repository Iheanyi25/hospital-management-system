import React from "react";
import { Button } from "../../../../../ui_elements";
import { getAllStudentsUrl, activateStudentUrl } from "../../../../../api/urls";
import { useApiPut } from "../../../../../api/apiCall";
import { useQueryClient } from "react-query";

export const ActivateStudentModal = ({
	studentData,
	closeModal,
	filter,
	pageNumber,
	searchTerm
}) => {
	const { mutate, isLoading } = useApiPut();
	const queryClient = useQueryClient();

	const toggleUserStatus = (userId) => {
		const requestDet = {
			url: activateStudentUrl(userId),
			data: { userId }
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllStudentsUrl({
						...filter,
						pageNumber,
						searchTerm
					})
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Status Changed to Active!",
					body: `User status was changed successfully!`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Status Change Failure!",
					body:
						response?.data?.message ||
						`User status change was not successful!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	return (
		<div>
			<p className="border-top border-bottom py-4">{`You are about to activate ${
				studentData?.fullName
			}. This will change ${studentData?.role?.toUpperCase()} to Active, Do you want to proceed ?`}</p>
			<div className="d-flex justify-content-end mt-3">
				<Button
					type="submit"
					label="Yes, Activate"
					buttonClass="primary"
					onClick={() => toggleUserStatus(studentData?.userId)}
					loading={isLoading}
				/>
				<Button type="submit" label="Cancel" onClick={closeModal} />
			</div>
		</div>
	);
};
