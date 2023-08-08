import { useMemo } from "react";
import { useHistory } from "react-router";
import { useApiPost } from "../../../../api/apiCall";
import { postCourseRegistrationUrl } from "../../../../api/urls";
import { Checkbox, TMTable, Button } from "../../../../ui_elements";

export const RegisterCoursesTable = ({
	data = [],
	handleCheckboxChange,
	isSelecetd,
	selectedCourses,
	studentData,
	totalSelectedCreditUnit,
	unitLoad
}) => {
	const history = useHistory();
	const mutation = useApiPost();
	const handleRegistration = () => {
		const { semesterId, sessionId, levelId, studentId } = studentData;
		const courses = selectedCourses.map(
			({ courseAssignedForDepartmentId, courseUnit }) => {
				return {
					courseAssignedForDepartmentId,
					courseUnit
				};
			}
		);
		const requestDet = {
			url: postCourseRegistrationUrl(),
			data: { semesterId, sessionId, studentId, levelId, courses }
		};
		return mutation.mutate(requestDet, {
			onSuccess: () => {
				history.push({
					pathname: "/course_registration/view",
					state: {
						semester: semesterId,
						sessionId,
						yearOfStudyId: levelId,
						from: "course_register"
					}
				});
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Course Registration Failed!",
					body:
						response?.data?.message ||
						`Course registration Failed, please contact admin `
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	const columns = useMemo(
		() => [
			{
				Header: "Register",
				accessor: "register",
				Cell: ({ cell: { row } }) => (
					<div className="mx-3">
						<Checkbox
							label={""}
							onSelect={() => handleCheckboxChange(row.original)}
							checked={
								!!isSelecetd[
									row.original.courseAssignedForDepartmentId
								]
							}
						/>
					</div>
				)
			},
			{
				Header: "Course Code",
				accessor: "courseCode"
			},
			{
				Header: "Course Title",
				accessor: "courseTitle"
			},
			{
				Header: "Course Unit",
				accessor: "courseUnit"
			},
			{
				Header: "Course Type",
				accessor: "courseType"
			}
		],
		[handleCheckboxChange, isSelecetd]
	);

	const tableData = {
		header: columns,
		data: data
	};

	return (
		<div className="mt-5">
			<TMTable
				columns={tableData.header}
				data={tableData.data}
				title={"Register Courses"}
				additonalTitleData={
					<div
						className={
							totalSelectedCreditUnit < unitLoad.min ||
							totalSelectedCreditUnit > unitLoad.max
								? "u-danger"
								: "u-success"
						}
					>{`${totalSelectedCreditUnit} of ${unitLoad.max} units`}</div>
				}
			/>
			<div className="w-100 d-flex justify-content-end p-4 border border-top-0">
				<Button
					data-cy="register_course"
					label={"Register Courses"}
					onClick={handleRegistration}
					buttonClass={"primary"}
					loading={mutation.isLoading}
				/>
			</div>
		</div>
	);
};
