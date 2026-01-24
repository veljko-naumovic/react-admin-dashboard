// import { Layout, Button, Modal } from "antd";
// import { Outlet, useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import { useAuth } from "../../auth/useAuth";

// const { Header, Content } = Layout;

// const AdminLayout = () => {
// 	const { user, logout } = useAuth();
// 	const navigate = useNavigate();

// 	const handleLogout = () => {
// 		Modal.confirm({
// 			title: "Confirm logout",
// 			content: "Are you sure you want to log out?",
// 			okText: "Logout",
// 			okType: "danger",
// 			cancelText: "Cancel",
// 			onOk: () => {
// 				logout();
// 				navigate("/login", { replace: true });
// 			},
// 		});
// 	};

// 	return (
// 		<Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
// 			<Sidebar />

// 			<Layout>
// 				<Header
// 					style={{
// 						background: "#fff",
// 						padding: "0 16px",
// 						display: "flex",
// 						justifyContent: "space-between",
// 						alignItems: "center",
// 					}}
// 				>
// 					<span>Admin Dashboard</span>

// 					<div>
// 						<span style={{ marginRight: 12 }}>
// 							{user?.name} ({user?.role})
// 						</span>
// 						<Button onClick={handleLogout}>Logout</Button>
// 					</div>
// 				</Header>

// 				<Content style={{ padding: 16, overflowX: "hidden" }}>
// 					<Outlet />
// 				</Content>
// 			</Layout>
// 		</Layout>
// 	);
// };

// export default AdminLayout;

import { Layout, Button } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../auth/useAuth";
import { useState } from "react";

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
	const { user, logout } = useAuth();
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider
				width={220}
				collapsible // ⬅️ KLJUČNO
				collapsed={collapsed} // ⬅️ KLJUČNO
				onCollapse={(value) => setCollapsed(value)}
				breakpoint="lg"
				collapsedWidth={80} // ili 0 ako želiš drawer feel
				style={{
					position: "sticky",
					top: 0,
					height: "100vh",
				}}
			>
				<Sidebar collapsed={collapsed} />
			</Sider>

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
						<Button onClick={logout}>Logout</Button>
					</div>
				</Header>

				<Content style={{ padding: 16, overflowX: "hidden" }}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;
