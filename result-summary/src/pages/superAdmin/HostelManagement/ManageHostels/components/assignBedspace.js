import { Button } from "../../../../../ui_elements";
import { useApiGet, useApiPost } from "../../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { AssignPersonnelCard } from "./assignPersonnelCard";
import { useState } from "react";
import { SearchStudent } from "./searchStudent";
import { assignHostelBedUrl, getUsersUrl } from "../../../../../api/urls";

export const AssignBedspace = ({ data, filter, closeModal }) => {
	const [matricNo, setMatricNo] = useState("");
	const queryClient = useQueryClient();

	const { data: studentData, isLoading: isLoadingStudentData } = useApiGet(
		getUsersUrl({ userId: matricNo }),
		{
			refetchOnWindowFocus: false,
			enabled: !!matricNo
		}
	);

	const { mutate, isLoading } = useApiPost();

	const onSubmit = (e) => {
		e.preventDefault();
		const requestDet = {
			url: assignHostelBedUrl(),
			data: {
				userId: matricNo,
				// sessionId: data.sessionId,
				hostelBedId: data.id
			}
		};
		mutate(requestDet, {
			onSuccess: (data) => {
				queryClient.invalidateQueries(filter);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Bedspace Assigned!",
					body:
						data?.data?.data ||
						"You successfully assigned a bedspace!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Assign Bedspace Failed!",
					body:
						response?.data?.message || `Bedspace wasn't assigned!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const details = [
		{
			title: "Full Name",
			value: studentData?.data?.fullName
		},
		{
			title: "Email",
			value: studentData?.data?.email
		},
		{
			title: "Phone",
			value: studentData?.data?.mobileNumber
		},
		{
			title: "Matric No",
			value: studentData?.data?.regNumber
		},
		{
			title: "Faculty",
			value: studentData?.data?.faculty
		},
		{
			title: "Department",
			value: studentData?.data?.department
		},
		{
			title: "Entry Mode",
			value: studentData?.data?.studentType
		}
	];

	return (
		<form className={`w-100 mt-5`}>
			<div className="mb-5">
				<SearchStudent
					isLoading={isLoadingStudentData}
					setMatricNo={setMatricNo}
				/>
			</div>
			{studentData && (
				<div className="my-5">
					<AssignPersonnelCard
						noMargin={false}
						noLogo={true}
						details={details}
						user={{
							fullName: studentData?.data?.fullName,
							passport: studentData?.data?.passport
						}}
					/>
				</div>
			)}
			<div className="d-flex justify-content-end">
				<Button
					label="Cancel"
					data-cy="cancel"
					type="button"
					onClick={closeModal}
				/>
				<Button
					label="Assign Bedspace"
					data-cy="assign_bedspace"
					buttonClass="primary"
					loading={isLoading}
					disabled={!matricNo || !studentData}
					type="submit"
					onClick={onSubmit}
				/>
			</div>
		</form>
	);
};
