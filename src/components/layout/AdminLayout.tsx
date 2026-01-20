import { Layout, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../auth/useAuth";

const { Header, Content } = Layout;

const AdminLayout = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login", { replace: true });
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar />

			<Layout>
				<Header
					style={{
						background: "#fff",
						padding: "0 16px",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<span>Admin Dashboard</span>

					<div>
						<span style={{ marginRight: 12 }}>
							{user?.name} ({user?.role})
						</span>
						<Button onClick={handleLogout}>Logout</Button>
					</div>
				</Header>

				<Content style={{ margin: "16px" }}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;
