import * as yup from "yup";

export const addRoleSchema = yup.object().shape({
	Name: yup.string().required("please input role name")
});
