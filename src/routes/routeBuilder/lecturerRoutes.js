import { MainRouter } from "../routers/index";
import { lazy } from "react";
import { staffRoutes } from "./staffRoutes";

const LazyLecturerDashboard = lazy(() =>
	import("../../pages/lecturer/Dashboard/dashboard")
);
const LazyLecturerProfile = lazy(() =>
	import("../../pages/lecturer/Profile/profile")
);
const routesToRemove = ["Dashboard", "Profile"];
export const lecturerRoutes = [
	//add lecturer routes here
	{
		path: "/dashboard",
		component: LazyLecturerDashboard,
		exact: true,
		router: MainRouter,
		title: "Dashboard"
	},
	{
		path: "/profile",
		component: LazyLecturerProfile,
		exact: true,
		router: MainRouter,
		title: "Profile"
	},
	...staffRoutes.filter((item) => !routesToRemove.includes(item.title))
];
