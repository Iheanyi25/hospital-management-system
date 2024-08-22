import { Spinner } from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet, useApiPost } from "../../../../../api/apiCall";
import {
	getCourseRegsToToggleUrl,
	getStudentTypesUrl,
	yearOfStudyUrl,
	toggleCourseRegistrationOpenCloseUrl,
	getAllSessionsUrl
} from "../../../../../api/urls";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { Form, Table } from "./components";
import { useQueryClient } from "react-query";

const OpenCloseCourseRegistration = () => {
	const { mutate, isLoading: isPosting } = useApiPost();
	const queryClient = useQueryClient();
	const [filter, setFilter] = useState({
		sessionId: "",
		studentTypeId: "",
		yearOfStudyId: ""
	});
	const {
		data: courseReg,
		isLoading: isLoadingCourseReg,
		isFetching: isFetchingUCourseReg,
		error: courseRegError
	} = useApiGet(
		getCourseRegsToToggleUrl({
			sessionId: filter.sessionId,
			studentTypeId: filter.studentTypeId,
			levelId: filter.yearOfStudyId
		}),
		{
			enabled: !!filter.sessionId
		}
	);
	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());
	const {
		control,
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm();
	const watchData = watch({
		studentTypeId: "studentTypeId"
	});
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: levels, isLoading: isLoadingLevels } = useApiGet(
		yearOfStudyUrl({ studentTypeId: watchData?.studentTypeId?.value }),
		{
			refetchOnWindowFocus: false,
			enabled: !!watchData?.studentTypeId?.value
		}
	);
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");
	const allLevels = formatSelectItems(levels?.data, "code", "id");

	const toggleCourseRegOpening = ({
		isOpen,
		modeOfEntryId,
		semesterId,
		id
	}) => {
		const requestDet = {
			url: toggleCourseRegistrationOpenCloseUrl(id),

			data: {
				sessionId: courseReg?.data?.sessionId,
				levelId: courseReg?.data?.levelId,
				studentTypeId: courseReg?.data?.studentTypeId,
				modeOfEntryId,
				semesterId
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getCourseRegsToToggleUrl({
						sessionId: filter.sessionId,
						studentTypeId: filter.studentTypeId,
						levelId: filter.yearOfStudyId
					})
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Course Action Success!",
					body: `Course registration was ${
						isOpen ? "activated" : "deactivated"
					} successfully!`
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Action Success!",
					body:
						response?.data?.message ||
						`Course registration wasn't ${
							isOpen ? "activated" : "deactivated"
						} successfully!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	if (isLoading || isLoadingStudentTypes) return <Spinner />;
	if (error || courseRegError)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<div className={styles.page_content}>
				<div className="w-100">
					<Form
						control={control}
						errors={errors}
						allSessions={allSessions}
						allStudentTypes={allStudentTypes}
						isLoadingLevels={isLoadingLevels}
						levels={levels}
						allLevels={allLevels}
						setFilter={setFilter}
						setValue={setValue}
						handleSubmit={handleSubmit}
						isLoadingCourseReg={isLoadingCourseReg}
					/>
					<Table
						data={courseReg?.data?.courseRegistrationStatuses || []}
						loading={isFetchingUCourseReg}
						isPosting={isPosting}
						onSubmit={toggleCourseRegOpening}
					/>
				</div>
			</div>
		</div>
	);
};

export default OpenCloseCourseRegistration;
