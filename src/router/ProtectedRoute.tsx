import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "../auth/useAuth";

const ProtectedRoute = () => {
	const auth = useAuth();

	// auth state - is ready
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
