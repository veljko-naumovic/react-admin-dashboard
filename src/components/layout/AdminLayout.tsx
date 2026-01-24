import {
	Layout,
	Button,
	Drawer,
	Grid,
	Dropdown,
	Avatar,
	type MenuProps,
} from "antd";
import { Outlet } from "react-router-dom";
import { LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";
import { useAuth } from "../../auth/useAuth";
import { useState } from "react";

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const AdminLayout = () => {
	const { user, logout } = useAuth();
	const screens = useBreakpoint();
	const isMobile = !screens.lg;
	const isXs = !screens.sm;

	const userMenu: MenuProps["items"] = [
		{
			key: "logout",
			icon: <LogoutOutlined />,
			label: "Logout",
			onClick: logout,
		},
	];

	const [collapsed, setCollapsed] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<Layout style={{ minHeight: "100vh" }}>
			{/* DESKTOP SIDEBAR */}
			{!isMobile && (
				<Sider
					width={220}
					collapsible
					collapsed={collapsed}
					onCollapse={setCollapsed}
					breakpoint="lg"
					style={{
						position: "sticky",
						top: 0,
						height: "100vh",
					}}
				>
					<Sidebar collapsed={collapsed} />
				</Sider>
			)}

			{/* MOBILE DRAWER */}
			{isMobile && (
				<Drawer
					open={drawerOpen}
					placement="left"
					size={220}
					onClose={() => setDrawerOpen(false)}
					closable={false} // ⬅️ uklanja X
					// headerStyle={{ display: "none" }} // ⬅️ uklanja header
					styles={{
						header: { display: "none" },
						body: { padding: 0 },
					}}
					// bodyStyle={{ padding: 0 }}
				>
					<Sidebar
						collapsed={false}
						onNavigate={() => setDrawerOpen(false)}
					/>
				</Drawer>
			)}

			<Layout>
				<Header
					style={{
						background: "#fff",
						padding: "0 12px",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					{/* LEFT */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 8,
						}}
					>
						{isMobile && (
							<Button
								icon={<MenuOutlined />}
								type="text"
								onClick={() => setDrawerOpen(true)}
							/>
						)}

						<span style={{ fontWeight: 600 }}>
							{isXs ? "Admin" : "Admin Dashboard"}
						</span>
					</div>

					{/* RIGHT */}
					<div>
						{isXs ? (
							<Dropdown
								menu={{ items: userMenu }}
								placement="bottomRight"
							>
								<Avatar icon={<UserOutlined />} />
							</Dropdown>
						) : (
							<>
								<span style={{ marginRight: 12 }}>
									{user?.name} ({user?.role})
								</span>
								<Button onClick={logout}>Logout</Button>
							</>
						)}
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
