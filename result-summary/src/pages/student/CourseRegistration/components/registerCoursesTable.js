import { useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useApiPost } from "../../../../api/apiCall";
import {
	generateFeesInvoiceUrl,
	postCourseRegistrationUrl
} from "../../../../api/urls";
import {
	Checkbox,
	TMTable,
	Button,
	ProfileContext
} from "../../../../ui_elements";
import { EXTERNAL_STUDENT_PAYMENT_DETAILS } from "../../../../utils/constants";
import numberFormatter from "../../../../utils/numberFormatter";

export const RegisterCoursesTable = ({
	data = [],
	handleCheckboxChange,
	isSelecetd,
	selectedCourses,
	studentData,
	totalSelectedCreditUnit,
	unitLoad
}) => {
	const studentContextData = useContext(ProfileContext);
	const { push } = useHistory();

	const { state } = useLocation();

	const { mutate, isLoading: generating } = useApiPost();

	const history = useHistory();
	const mutation = useApiPost();

	const handleRegistration = () => {
		const { semesterId, sessionId, levelId, studentId } = studentData;
		const coursesToRegister = selectedCourses.map(
			({ courseAssignedForDepartmentId, unitLoadId }) => {
				return {
					courseAssignedForDepartmentId,
					unitLoadId
				};
			}
		);
		const requestDet = {
			url: postCourseRegistrationUrl(),
			data: {
				semesterId,
				sessionId,
				studentId,
				levelId: state?.yearOfStudyId || state?.levelId,
				coursesToRegister
			}
		};
		return mutation.mutate(requestDet, {
			onSuccess: () => {
				history.push({
					pathname: "/course_registration/view",
					state: {
						semesterId,
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
				accessor: "courseName"
			},
			{
				Header: "Course Unit",
				accessor: "unitLoadId"
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

	const [totalAmount, setTotalAmount] = useState(0);

	// total amount
	useEffect(() => {
		const newTotalAmount = selectedCourses.reduce(
			(sum, obj) => sum + obj.amount,
			0
		);

		setTotalAmount(newTotalAmount);
	}, [selectedCourses]);

	const generateInvoice = () => {
		if (totalSelectedCreditUnit > unitLoad.maximum) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invoice generation failed",
				body: `You can’t register more than 14 units. Kindly pay your school fees.`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		} else {
			const reqData = {
				amount: totalAmount,
				numberOfCoursesToRegister: selectedCourses.length,
				semesterId: studentData.semesterId,
				sessionId: studentData.sessionId,
				levelId: state.yearOfStudyId,
				paymentTypeId: EXTERNAL_STUDENT_PAYMENT_DETAILS.paymentType,
				paymentPurposeId:
					EXTERNAL_STUDENT_PAYMENT_DETAILS.paymentPurpose,
				coursesToRegister: selectedCourses.map((item) => {
					return {
						courseAssignedForDepartmentId:
							item.courseAssignedForDepartmentId,
						unitLoadId: item.unitLoadId
					};
				})
			};
			const requestBody = {
				url: generateFeesInvoiceUrl(),
				data: reqData
			};
			mutate(requestBody, {
				onSuccess: (data) => {
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Invoice successfully generated",
						body: "You generated an invoice"
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);

					push({
						pathname: "/course_registration/invoice",
						state: { details: data?.data?.data, fromVerify: true }
					});
				},
				onError: (error) => {
					const errorFlag = window.AJS.flag({
						type: "error",
						title: "Invoice generation failed",
						body:
							error?.response?.data?.message ||
							`an error occured.`
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
				}
			});
		}
	};

	return (
		<div className="mt-5">
			<TMTable
				columns={tableData.header}
				data={tableData.data}
				title={"Register Courses"}
				additonalTitleData={
					studentContextData?.profileData?.personalData?.role ===
					"external" ? (
						<div
							className={
								totalSelectedCreditUnit > unitLoad.maximum
									? "u-danger"
									: "u-success"
							}
						>
							{`${totalSelectedCreditUnit} of ${unitLoad.maximum} units`}
						</div>
					) : (
						<div
							className={
								totalSelectedCreditUnit < unitLoad.minimum ||
								totalSelectedCreditUnit > unitLoad.maximum
									? "u-danger"
									: "u-success"
							}
						>{`${totalSelectedCreditUnit} of ${unitLoad.maximum} units`}</div>
					)
				}
			/>
			<div className="w-100 d-flex justify-content-end p-4 border border-top-0">
				{studentContextData?.profileData?.personalData?.role ===
				"external" ? (
					<Button
						data-cy="register_course"
						label={`Pay  ₦ (${numberFormatter(totalAmount)})`}
						disabled={selectedCourses <= 0}
						onClick={generateInvoice}
						buttonClass={"primary"}
						loading={generating}
					/>
				) : (
					<Button
						data-cy="register_course"
						label={"Register Courses"}
						onClick={handleRegistration}
						buttonClass={"primary"}
						loading={mutation.isLoading}
					/>
				)}
			</div>
		</div>
	);
};
