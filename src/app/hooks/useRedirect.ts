import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function useRedirect() {
	const routeHistory = useHistory();
	const location = useLocation();

	useEffect(() => {
		const shouldRedirectToMain =
			location.pathname !== "/" && routeHistory.action === "POP";
		shouldRedirectToMain && routeHistory.push("/");
	}, []);
}
