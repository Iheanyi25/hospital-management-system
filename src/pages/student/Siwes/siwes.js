import { useEffect } from "react";
import { PageTitle, SideTabs, Spinner } from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation } from "react-router";
import { PersonalInformation, SiwesDetails } from "./components";
import { parent } from "../../../ui_elements/layout/layout";
import { useApiGet } from "../../../api/apiCall";
import {
	getAllStatesUrl,
	getStudentSiwesUrl
} from "../../../api/urls";
import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";

const Siwes = () => {
	const { hash } = useLocation();

	useEffect(() => {
		parent.current?.scrollTo(0, 0);
	}, [hash]);

	const {
		data: studentsSiwes,
		isLoading: isLoadingStudentsSiwes,
		error: studentsSiwesError
	} = useApiGet(getStudentSiwesUrl(), {
		refetchOnWindowFocus: false
	});

	const {
		data: studentsSiwesState,
		isLoading: isLoadingState,
		error: studentsSiwesStateError
	} = useApiGet(getAllStatesUrl(160), {
		refetchOnWindowFocus: false
	});

	const allSiwesStates = formatSelectItems(
		studentsSiwesState?.data,
		"name",
		"id"
	);

	if (isLoadingStudentsSiwes || isLoadingState) return <Spinner />;
	if (studentsSiwesError || studentsSiwesStateError)
		return (
			"An error has occurred: " +
			studentsSiwesError?.response?.data?.message
		);
	const navs = [
		{
			linkName: "Personal Information",
			hashName: "#section_a"
		},
		{
			linkName: "SIWES Details",
			hashName: "#section_b"
		}
	];

	return (
		<div className={styles.container}>
			<div className="row mb-3 mx-0">
				<div className="col-12 col-md-2 col-lg-2">
					<Avatar
						name={`${studentsSiwes?.data?.personalDetails.lastname} ${studentsSiwes?.data?.personalDetails.firstname}`?.toUpperCase()}
						className={styles.profile_img}
						src={studentsSiwes?.data?.personalDetails.passport}
						size={100}
						round={true}
						maxInitials={2}
					/>
				</div>
				<div className="col-12 col-md-10 col-lg-10 py-4">
					<PageTitle
						title={
							"Student Industrial Work Experience Placement Form"
						}
					/>
				</div>
			</div>
			<div className="row mx-0">
				<div className="col-12 col-md-2 col-lg-2">
					<div className={styles.key_comes_tabs}>
						<div className={styles.key_comes_sticky}>
							<SideTabs navItems={navs} />
						</div>
					</div>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<DisplayInformation
						studentsSiwesData={studentsSiwes?.data?.personalDetails}
						studentsSiwesDetails={studentsSiwes?.data?.siwesDetails}
						allSiwesStates={allSiwesStates}
					/>
				</div>
			</div>
		</div>
	);
};
export default Siwes;

const DisplayInformation = ({
	studentsSiwesData,
	studentsSiwesDetails,

	allSiwesStates
}) => {
	const location = useLocation();
	switch (location.hash) {
		case "#section_a":
			return <PersonalInformation data={studentsSiwesData} />;
		case "#section_b":
			return (
				<SiwesDetails
					data={studentsSiwesDetails}
					allSiwesStates={allSiwesStates}
				/>
			);
		default:
			return <PersonalInformation data={studentsSiwesData} />;
	}
};
