import { memo, useEffect, useMemo, useRef } from "react";
import { PageTitle, SideTabs, Spinner } from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation } from "react-router";

import { PersonalDetails, ProgrammeDetails } from "./components";

import { parent } from "../../../ui_elements/layout/layout";

import { useApiGet } from "../../../api/apiCall";
import {
	getDepartmentsUrl,
	getDepartmentOptionUrl,

} from "../../../api/urls";

import Avatar from "react-avatar";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import { useSelector } from "react-redux";


const SupplementaryApplication = () => {
	const supplementaryStoreData = useSelector((state) => state.supplementaryData);
	const ref = useRef();	

	const { hash, state } = useLocation();

	useEffect(() => {
		parent.current?.scrollTo(0, 0);
	}, [hash]);

	const { data: departments, isLoading: isLoadingDepartments } = useApiGet(
		getDepartmentsUrl(supplementaryStoreData?.StudentTypeId),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: departmentsOptions, isLoading: isLoadingDepartmentsOptions } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: supplementaryStoreData?.programmeInfo?.department?.value,
				studentTypeId: supplementaryStoreData?.StudentTypeId
			}),
			{
				refetchOnWindowFocus: false,
				enabled:
					supplementaryStoreData?.programmeInfo?.department?.value !==
					undefined
			}
		);

	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	const allDepartmentOptions = formatSelectItems(
		departmentsOptions?.data,
		"departmentOption",
		"departmentOptionId"
	);

	const navs = useMemo(
		() => [
			{
				linkName: "Personal & Sponsor Details",
				hashName: "#section_a",
				state
			},
			{
				linkName: "JAMB & Programme Details",
				hashName: "#section_b",
				state
			}
		],
		[state]
	);


	if (
		isLoadingDepartments ||
		isLoadingDepartmentsOptions
	)
		return <Spinner />;
	
	

	return (
		<div className={styles.container} ref={ref}>
			<div className="row mb-3 mx-1 mx-md-5">
				<div className="col-12 col-md-2 col-lg-2 d-flex align-items-end">
					<Avatar
						name={`${supplementaryStoreData?.personalInfo?.surName} ${supplementaryStoreData?.personalInfo?.firstName}`}
						className={styles.profile_img}
						src={supplementaryStoreData?.passport?.passport}
						size={100}
						round={true}
						maxInitials={2}
					/>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<div className="">
						<PageTitle
							title={`${supplementaryStoreData?.personalInfo?.surName}
							${supplementaryStoreData?.personalInfo?.firstName}`}
						/>
					</div>
				</div>
			</div>
			<div className="row mx-1 mx-md-5">
				<div className="col-12 col-md-2 col-lg-2">
					<div className={styles.key_comes_tabs}>
						<div className={styles.key_comes_sticky}>
							<SideTabs
								navItems={navs}
								disallowForwardMovement={true}
							/>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<DisplayInformation
						allDepartments={allDepartments}
						allDepartmentOptions={allDepartmentOptions}
					/>
				</div>
			</div>
		</div>
	);
};

const DisplayInformation = memo(
	({
		allDepartments,
		allDepartmentOptions,
	}) => {
		const location = useLocation();
		switch (location.hash) {
			case "#section_a":
				return (
					<PersonalDetails/>
				);
			case "#section_b":
				return (
					<ProgrammeDetails
						allDepartments={allDepartments}
						allDepartmentOptions={allDepartmentOptions}
					/>
				);
			default:
				return (
					<PersonalDetails/>
				);
		}
	}
);

export default SupplementaryApplication;