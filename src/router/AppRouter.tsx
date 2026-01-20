import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import UsersPage from "../pages/Users/UsersPage";
import LoginPage from "../pages/Login/LoginPage";
import { useAuth } from "../auth/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const { user } = useAuth();
	if (!user) return <Navigate to="/login" replace />;
	return children;
};

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPage />} />

				<Route
					path="/"
					element={
						<ProtectedRoute>
							<AdminLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<DashboardPage />} />
					<Route path="users" element={<UsersPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
