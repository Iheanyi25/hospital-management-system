import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiGet, useApiPost } from "../../../../api/apiCall";
import {
	getDepartmentOptionUrl,
	getFeesForSundryPaymentUrl
} from "../../../../api/urls";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { Schema } from "../schema";
import { UserDetailsForm } from "./userDetailsForm";

export const UserDetailsContainer = ({
	filter,
	data,
	isFetching,
	watchInfo,
	allDepartments,
	contractorPaymentSelected,
	isUnderGraduateSelected,
	allSessions
}) => {
	const [watchData, setWatchData] = useState({
		departmentId: data?.departmentId,
		destDepartmentId: data?.destDepartmentId,
		subCategoryId: "",
		numberOfCertificates: 1,
		setupCategoryTypeId: ""
	});
	const { isLoading } = useApiPost();
	const isCertifcateVerification = filter?.subCategoryId?.value?.id === 20;
	const changeOfDegreeId = 1;
	const extraCredit = 30;
	const isUnderGraduate = filter?.setupCategoryTypeId;
	console.log(isUnderGraduate);
	const checkForParticularSelection =
		filter?.subCategoryId?.value?.id === changeOfDegreeId;
	const checkForExtraCredit =
		filter?.subCategoryId?.value?.id === extraCredit;
	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: watchData?.departmentId,
				studentTypeId: isUnderGraduate ? 1 : 4
			}),
			{
				refetchOnWindowFocus: false,
				enabled: !!watchData?.departmentId
			}
		);
	const {
		data: destDepartmentOption,
		isLoading: isLoadingdestDepartmentOption
	} = useApiGet(
		getDepartmentOptionUrl({
			departmentId: watchData?.destDepartmentId,
			studentTypeId: isUnderGraduate ? 1 : 4
		}),
		{
			refetchOnWindowFocus: false,
			enabled: !!watchData?.destDepartmentId
		}
	);

	const { data: fees, isLoading: isLoadingFees } = useApiGet(
		getFeesForSundryPaymentUrl({
			setupCategoryId: watchInfo?.setupCategoryTypeId?.value,
			setupCategoryFeeId: watchInfo?.subCategoryId?.value?.id
		}),
		{
			enabled: !!(
				watchData?.departmentId || watchInfo.setupCategoryId.value
			),
			refetchOnWindowFocus: false
		}
	);
	const allDepartmentOption = useMemo(
		() =>
			formatSelectItems(
				departmentOption?.data,
				"departmentOption",
				"departmentOptionId"
			),
		[departmentOption]
	);
	const alldestDepartmentOptions = useMemo(
		() =>
			formatSelectItems(
				destDepartmentOption?.data,
				"departmentOption",
				"departmentOptionId"
			),
		[destDepartmentOption]
	);
	const {
		register,
		control,
		watch,
		setValue,
		formState: { errors },
		handleSubmit
	} = useForm({
		defaultValues: {
			surname: data?.lastname ?? "",
			firstName: data?.firstname ?? "",
			middleName: data?.middlename ?? "",
			regNo: contractorPaymentSelected ? "" : filter?.mobileNumber,
			phoneNo: contractorPaymentSelected ? filter?.mobileNumber : "",
			email: data?.email ?? "",
			departmentId: findValueAndLabel(data?.departmentId, allDepartments),
			departmentOptionId: data?.departmentOptionId
				? findValueAndLabel(
						data?.departmentOptionId,
						allDepartmentOption
				  )
				: null,
			amount: fees?.data,
			name: ""
		},
		resolver: yupResolver(Schema),
		context: {
			contractorPaymentSelected,
			isCertifcateVerification,
			// isDepartmentRequired:
			// 	contractorPaymentSelected || isCertifcateVerification
			// 		? false
			// 		: true,
			isDepartmentOptionRequired:
				departmentOption?.data?.length > 0 ? true : false,
			isNameRequired: !isCertifcateVerification,
			isSemesterRequired: checkForExtraCredit
		}
	});
	useEffect(() => {
		const subscription = watch(
			({ departmentId, destDepartmentId, numberOfCertificates }) => {
				setWatchData((state) => ({
					...state,
					departmentId: departmentId?.value,
					numberOfCertificates: numberOfCertificates?.value,
					destDepartmentId: destDepartmentId?.value
				}));
			}
		);
		return () => subscription.unsubscribe();
	}, [watch]);
	useEffect(() => {
		setValue(
			"departmentOptionId",
			findValueAndLabel(data?.departmentOptionId, allDepartmentOption)
		);
		if (isCertifcateVerification) {
			setValue(
				"amount",
				watchData?.numberOfCertificates * (fees?.data ?? 0)
			);
		} else {
			setValue("amount", fees?.data ?? "0");
		}
	}, [
		data?.departmentOptionId,
		allDepartmentOption,
		fees,
		setValue,
		isCertifcateVerification,
		watchData?.numberOfCertificates
	]);
	return (
		<UserDetailsForm
			filter={filter}
			data={data}
			isFetching={isFetching}
			isLoading={isLoading}
			departmentOption={departmentOption}
			isLoadingDepartmentOption={isLoadingDepartmentOption}
			allDepartments={allDepartments}
			allDepartmentOption={allDepartmentOption}
			alldestDepartmentOptions={alldestDepartmentOptions}
			isLoadingdestDepartmentOption={isLoadingdestDepartmentOption}
			allSessions={allSessions}
			watchInfo={watchInfo}
			contractorPaymentSelected={contractorPaymentSelected}
			isLoadingFees={isLoadingFees}
			isCertifcateVerification={isCertifcateVerification}
			register={register}
			control={control}
			handleSubmit={handleSubmit}
			checkForParticularSelection={
				checkForParticularSelection && !!watchData?.departmentId
			}
			checkForExtraCredit={checkForExtraCredit}
			isUnderGraduateSelected={isUnderGraduateSelected}
			fees={fees}
			errors={errors}
		/>
	);
};
