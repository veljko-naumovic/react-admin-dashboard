import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "../auth/useAuth";

const ProtectedRoute = () => {
	const auth = useAuth();

	// ⬇️ čekamo da se auth state učita
	if (!auth?.isAuthReady) {
		return (
			<div
				style={{
					minHeight: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Spin size="large" />
			</div>
		);
	}

	return auth.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
