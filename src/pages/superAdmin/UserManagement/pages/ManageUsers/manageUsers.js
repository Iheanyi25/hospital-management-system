import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useDebouncedCallback } from "use-debounce";
import { useApiGet, useApiPut } from "../../../../../api/apiCall";
import {
	getDepartmentsUrl,
	getAllUsersUrl,
	getAllUnpaginatedRolesUrl,
	toggleUserStatusUrl,
	getStudentTypesUrl,
	getGendersUrl,
	getAllCampusesUrl
} from "../../../../../api/urls";

import { Button, PageTitle, Spinner } from "../../../../../ui_elements";
import { Form, Table } from "./components";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";

import styles from "./style.module.css";

const ManageUsers = () => {
	const [filter, setFilter] = useState({
		roleName: "",
		pageSize: PAGESIZE.sm,
		pageNumber: 1
	});

	
	const [searchTerm, setSearchTerm] = useState("");
	const [addOpen, setAddOpen] = useState(false);

	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);

	const { mutate, isLoading: isPosting, error: rolesError } = useApiPut();

	const queryClient = useQueryClient();
	const {
		data: userList,
		isLoading: isLoadingUserList,
		isFetching: isFetchingUserList,
		error: userListError
	} = useApiGet(getAllUsersUrl({ ...filter, pageNumber: filter.pageNumber, searchTerm }), {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		enabled: !!filter.roleName
	});
	const { data: studentTypes, isLoading: isLoadingStudentTypes } = useApiGet(
		getStudentTypesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const {
		data: departments,
		isLoading: isDepartmentLoading,
		error: departmentError
	} = useApiGet(getDepartmentsUrl(1), {
		refetchOnWindowFocus: false
	});

	const { data: roles, isLoading: isRolesLoading } = useApiGet(
		getAllUnpaginatedRolesUrl({}),
		{
			refetchOnWindowFocus: false,
			keepPreviousData: true
		}
	);
	const { data: genders, isLoading: isLoadingGenders } = useApiGet(
		getGendersUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: campuses, isLoading: isLoadingCampuses } = useApiGet(
		getAllCampusesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const {
		control,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const allRoles = formatSelectItems(roles?.data, "name", "name");
	const allGenders = formatSelectItems(genders?.data, "name", "id");
	const allCampuses = formatSelectItems(campuses?.data, "name", "id");
	const allDepartments = formatSelectItems(departments?.data, "name", "id");
	const allStudentTypes = formatSelectItems(studentTypes?.data, "name", "id");

	const toggleUserStatus = (userId) => {
		const requestDet = {
			url: toggleUserStatusUrl(userId)
		};
		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getAllUsersUrl({
						...filter,
						pageNumber: filter.pageNumber,
						searchTerm
					})
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Status Change Success!",
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

	if (
		isRolesLoading ||
		isDepartmentLoading ||
		isLoadingStudentTypes ||
		isLoadingGenders ||
		isLoadingCampuses
	)
		return <Spinner />;
	if (rolesError || departmentError || userListError)
		return "An error has occurred: " + rolesError?.message;

	return (
		<>
			<PageTitle
				title="Manage Users"
				buttonGroup={
					<>
						<Button
							data-cy="default"
							buttonClass="primary"
							label="Create User"
							onClick={() => {
								setAddOpen(true);
							}}
						/>
					</>
				}
			/>
			<div className={styles.container}>
				<div className={styles.page_content}>
					<div className="w-100">
						<Form
							control={control}
							watch={watch}
							errors={errors}
							allRoles={allRoles}
							setFilter={setFilter}
							handleSubmit={handleSubmit}
							isLoadingUserList={isLoadingUserList}
						/>
						<Table
							data={userList?.data?.items || []}
							allDepartments={allDepartments}
							allStudentTypes={allStudentTypes}
							allRoles={allRoles}
							allGenders={allGenders}
							allCampuses={allCampuses}
							addOpen={addOpen}
							setAddOpen={setAddOpen}
							filter={filter}
							hasPerformedQuery={!!filter.departmentId}
							paginationProps={userList?.data?.metaData || {}}
							currentFilterState={{
								...filter,
								pageNumber:filter.pageNumber,
								searchTerm
							}}
							setPageNumber={(page) => setFilter(prev => ({ ...prev, pageNumber: page }))}
							debouncedSearch={debounced}
							pageNumber={filter.pageNumber}
							pageSize={filter.pageSize}
							searchValue={searchTerm}
							loading={isFetchingUserList}
							isPosting={isPosting}
							metaData={userList?.data.metaData}
							onSubmit={toggleUserStatus}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ManageUsers;
