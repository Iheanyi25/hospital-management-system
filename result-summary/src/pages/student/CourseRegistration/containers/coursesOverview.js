import { useRef, useEffect } from "react";
import {
	PageTitle,
	Breadcrumbs,
	Spinner,
	Button
} from "../../../../ui_elements";
import { useHistory, useLocation } from "react-router-dom";
import { useApiGet } from "../../../../api/apiCall";
import { getCoursesToAddOrDropUrl } from "../../../../api/urls";
import { useReactToPrint } from "react-to-print";
import CourseRegPrintout from "./courseRegPrintout";

const pageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 5rem;
}

// @media all {
//   .pagebreak {
//     display: none;
//   }
// }

@media print {
.pagebreak {
// page-break-before: always;

}
}
`;

const CourseOverview = () => {
	const location = useLocation();
	const history = useHistory();
	const ref = useRef();
	const handlePrint = useReactToPrint({
		content: () => ref.current,
		pageStyle: pageStyle
	});

	const {
		data: registeredCourses,
		isLoading,
		error
	} = useApiGet(
		getCoursesToAddOrDropUrl({
			semesterId: location?.state?.semesterId,
			sessionId: location?.state?.sessionId
		})
	);

	useEffect(() => {
		if (
			location?.state?.from === "course_register" &&
			registeredCourses?.data?.registerableCourses?.length > 0
		) {
			const successFlag = window.AJS.flag({
				type: "success",
				title: "Course Registration Successful",
				body: `You have successfully registered your ${registeredCourses?.data?.session} courses. `
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
		}
	}, [location?.state?.from, registeredCourses?.data]);

	//if data was not passed through route, take the user back
	if (!(location?.state?.semester || location?.state?.sessionId)) {
		history.push("/course_registration");
	}

	const crumbs = [
		{
			name: "Course Registration",
			path: "/course_registration"
		},
		{
			name: `${registeredCourses?.data?.session} Session`,
			path: ""
		}
	];
	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;
	return (
		<section>
			<Breadcrumbs crumbs={crumbs} />
			<PageTitle
				title={"Course Registration"}
				buttonGroup={
					<Button
						data-cy="print"
						buttonClass="success"
						label="Print"
						onClick={handlePrint}
					/>
				}
			/>
			<CourseRegPrintout
				registeredCourses={registeredCourses}
				dataRef={ref}
			/>
		</section>
	);
};

export default CourseOverview;
