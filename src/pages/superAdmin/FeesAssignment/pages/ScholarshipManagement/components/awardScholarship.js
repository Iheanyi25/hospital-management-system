import { Button, SMSelect } from "../../../../../../ui_elements";
import { useApiGet, useApiPost } from "../../../../../../api/apiCall";
import { Controller, useForm } from "react-hook-form";
import {
	getStudentScholarshipsUrl,
	awardScholarshipUrl,
	getStudentsScholarshipsUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { AwardScholarshipSchema } from "./awardScholarshipSchema";
import { AwardPersonnelCard } from "./awardPersonnelCard";
import { useState } from "react";
import { SearchStudent } from "./searchStudent";

export const AwardScholarship = ({ data, filter, closeModal, allSessions }) => {
	const { scholarshipId } = data;
	const [matricNo, setMatricNo] = useState("");
	const queryClient = useQueryClient();

	const { data: studentData, isLoading: isLoadingStudentData } = useApiGet(
		getStudentScholarshipsUrl({ userId: matricNo }),
		{
			refetchOnWindowFocus: false,
			enabled: !!matricNo
		}
	);
	const { mutate, isLoading } = useApiPost();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: yupResolver(AwardScholarshipSchema)
	});

	const onSubmit = ({ endSession, startSession }) => {
		const requestDet = {
			url: awardScholarshipUrl(),
			data: {
				userId: matricNo,
				scholarshipId,
				StartSessionId: startSession.value,
				EndSessionId: endSession.value
			}
		};
		mutate(requestDet, {
			onSuccess: (data) => {
				queryClient.invalidateQueries(
					getStudentsScholarshipsUrl({
						scholarshipId,
						sessionId: filter.session
					})
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Scholarship awarded!",
					body:
						data?.data?.data ||
						"You successfully awarded a scholarship"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Award scholarship Failed!",
					body:
						response?.data?.message || `Scholarship wasn't awarded`
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
			value: studentData?.data?.fullname
		},
		{
			title: "Email",
			value: studentData?.data?.email
		},
		{
			title: "Phone",
			value: studentData?.data?.mobileNumber
		},
		{ title: "Matric No", value: studentData?.data?.matricNumber },
		{ title: "Faculty", value: studentData?.data?.faculty },
		{ title: "Department", value: studentData?.data?.department },
		{ title: "Entry Mode", value: studentData?.data?.modeOfEntry }
	];

	return (
		<form className={`w-100 mt-5`} onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-5">
				<SearchStudent
					isLoading={isLoadingStudentData}
					setMatricNo={setMatricNo}
				/>
			</div>
			{studentData && (
				<div className="my-5">
					<AwardPersonnelCard
						noMargin={false}
						noLogo={true}
						details={details}
						user={{
							fullName: studentData?.data?.fullname,
							passport: studentData?.data?.passport
						}}
					/>
				</div>
			)}
			<div className="row mb-4  justify-content-between border-top pt-4">
				<div className="row col-md-6 align-items-center">
					<div className="col-lg-4">
						<label htmlFor="ServiceTypeId">Start Session</label>
					</div>
					<div className="col-lg-8">
						<Controller
							name="startSession"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<SMSelect
									{...field}
									id="startSession"
									options={allSessions}
									placeholder="Select Session"
									searchable={true}
									isError={!!errors.startSession}
								/>
							)}
						/>
					</div>
				</div>
				<div className="row col-md-6 align-items-center">
					<div className="col-lg-4">
						<label htmlFor="ServiceTypeId">End Session</label>
					</div>
					<div className="col-lg-8">
						<Controller
							name="endSession"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<SMSelect
									{...field}
									id="endSession"
									options={allSessions}
									placeholder="Select Session"
									searchable={true}
									isError={!!errors.endSession}
								/>
							)}
						/>
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					label="Cancel"
					data-cy="cancel"
					type="button"
					onClick={closeModal}
				/>
				<Button
					label="Award Scholarship"
					data-cy="award_scholarship"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
					disabled={!matricNo}
				/>
			</div>
		</form>
	);
};
