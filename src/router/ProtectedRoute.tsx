import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "../auth/useAuth";

import "../styles/auth.css";

const ProtectedRoute = () => {
	const auth = useAuth();

	// wait until auth is initialized
	if (!auth?.isAuthReady) {
		return (
			<div className="auth-loading">
				<Spin size="large" />
			</div>
		);
	}

	return auth.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
