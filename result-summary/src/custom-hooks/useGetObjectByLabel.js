import { useMemo } from "react";

export const useGetObjectByLabel = (data, targetLabel) =>
	useMemo(() => {
		if (!data || !targetLabel) {
			return null;
		}
		return data.find((item) => item.label === targetLabel);
	}, [data, targetLabel]);
