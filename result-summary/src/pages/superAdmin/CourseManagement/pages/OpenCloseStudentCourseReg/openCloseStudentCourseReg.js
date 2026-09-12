import { Spinner } from "../../../../../ui_elements";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet, useApiPost } from "../../../../../api/apiCall";
import {
	studentOpenCloseCourseRegUrl,
	getAllSessionsUrl
} from "../../../../../api/urls";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { Form, Table } from "./components";
import { useQueryClient } from "react-query";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";

const OpenCloseStudentCourseReg = () => {
	const [filter, setFilter] = useState({
		sessionId: "",
		matricNo: "",
		semesterId: ""
	});
	const queryClient = useQueryClient();
	const { mutate, isLoading: isPosting } = useApiPost();

	const {
		data: courseReg,
		isLoading: isLoadingCourseReg,
		isFetching: isFetchingUCourseReg,
		error: courseRegError,
		isFetched
	} = useApiGet(
		studentOpenCloseCourseRegUrl({
			semesterId: filter.semesterId,
			userId: filter.matricNo,
			sessionId: filter.sessionId
		}),
		{
			enabled: !!filter.sessionId,
			keepPreviousData: true
		}
	);

	const { data: sessions, isLoading, error } = useApiGet(getAllSessionsUrl());

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm();

	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const sessionName = findValueAndLabel(
		filter?.sessionId,
		allSessions
	)?.label;

	useEffect(() => {
		if (isFetched && courseRegError) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Course Action Failed!",
				body:
					courseRegError?.response?.data?.message ||
					`Course wasn't dropped successfully`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [isFetched, courseRegError]);

	const toggleCourseRegOpening = () => {
		const requestDet = {
			url: studentOpenCloseCourseRegUrl({ userId: filter.matricNo }),

			data: {
				semesterId: filter.semesterId,
				sessionId: filter.sessionId
			}
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					studentOpenCloseCourseRegUrl({
						semesterId: filter.semesterId,
						userId: filter.matricNo,
						sessionId: filter.sessionId
					})
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Course Reg Action Success!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Action Success!",
					body: response?.data?.message
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<div className={styles.container}>
			<div className={styles.page_content}>
				<div className="w-100">
					<Form
						control={control}
						setValue={setValue}
						errors={errors}
						allSessions={allSessions}
						setFilter={setFilter}
						handleSubmit={handleSubmit}
						isLoadingUnitLoads={isLoadingCourseReg}
					/>
					<Table
						data={courseReg?.data || []}
						hasPerformedQuery={!!filter.semesterId}
						sessionName={sessionName}
						filter={filter}
						loading={isLoadingCourseReg || isFetchingUCourseReg}
						isPosting={isPosting}
						onSubmit={toggleCourseRegOpening}
					/>
				</div>
			</div>
		</div>
	);
};

export default OpenCloseStudentCourseReg;
