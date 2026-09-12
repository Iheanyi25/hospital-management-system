import AppRoute from "./routes";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect, useRef } from "react";
import useNetwork from "../src/custom-hooks/useNetwork";

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: ({ response }) => {
			if (response?.status === 401 ||
				response?.data?.message ===
					"Request failed with status code 401") {
				window.location.href = "/";
			}
		}
	})
});

function App() {
	//use this prevent online message from showing, only after the user has gone offline atleast once
	const offlineCount = useRef(0);
	const isOnline = useNetwork();
	useEffect(() => {
	  if (isOnline && offlineCount.current > 0) {
		const successFlag = window.AJS.flag({
			type: "success",
			title: "Online.",
			body: "you are back online!"
		});
		setTimeout(() => {
			successFlag.close();
		}, 5000);
	  }
	  if (!isOnline) {
		offlineCount.current = offlineCount.current + 1;
		const errorFlag = window.AJS.flag({
			type: "error",
			title: "Offline!",
			body: "oops!, looks you are offline!"
		});
		setTimeout(() => {
			errorFlag.close();
		}, 5000);
	  }
	}, [isOnline]);
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<AppRoute />
		</QueryClientProvider>
	);
}

export default App;
