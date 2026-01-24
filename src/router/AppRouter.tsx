import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import UsersPage from "../pages/Users/UsersPage";
import LoginPage from "../pages/Login/LoginPage";
import AdminLayout from "../components/layout/AdminLayout";

const AppRouter = () => {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />

			<Route element={<ProtectedRoute />}>
				<Route element={<AdminLayout />}>
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/users" element={<UsersPage />} />
				</Route>
			</Route>

			<Route path="*" element={<Navigate to="/dashboard" replace />} />
		</Routes>
	);
};

export default AppRouter;
