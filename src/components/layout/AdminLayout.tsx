import {
	Layout,
	Button,
	Drawer,
	Grid,
	Dropdown,
	Avatar,
	type MenuProps,
	Typography,
} from "antd";
import { Outlet } from "react-router-dom";
import { LogoutOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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

	const [collapsed, setCollapsed] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const navigate = useNavigate();

	const userMenu: MenuProps["items"] = [
		{
			key: "logout",
			icon: <LogoutOutlined />,
			label: "Logout",
			onClick: logout,
		},
	];

	return (
		<Layout style={{ height: "100vh" }}>
			{/* DESKTOP SIDEBAR */}
			{!isMobile && (
				<Sider
					width={220}
					collapsible
					collapsed={collapsed}
					onCollapse={setCollapsed}
					breakpoint="lg"
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
					closable={false}
					styles={{
						header: { display: "none" },
						body: { padding: 0 },
					}}
				>
					<Sidebar
						collapsed={false}
						onNavigate={() => setDrawerOpen(false)}
					/>
				</Drawer>
			)}

			<Layout>
				{/* HEADER */}
				<Header
					style={{
						background: "#fff",
						padding: "0 12px",
						display: "flex",
						alignItems: "center",
						gap: 12,
					}}
				>
					{/* LEFT */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 10,
						}}
					>
						{isMobile && (
							<Button
								icon={<MenuOutlined />}
								type="text"
								onClick={() => setDrawerOpen(true)}
							/>
						)}

						{isXs ? (
							<span style={{ fontWeight: 600 }}>Admin</span>
						) : (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 10,
								}}
							>
								<img
									src="/favicon.png"
									alt="logo"
									style={{ height: 32, cursor: "pointer" }}
									onClick={() => navigate("/dashboard")}
								/>

								<Typography.Title
									level={4}
									style={{ margin: 0 }}
								>
									Admin Dashboard
								</Typography.Title>
							</div>
						)}
					</div>

					{/* FLEX SPACER */}
					<div style={{ flex: 1 }} />

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
				{/* CONTENT */}
				<Content
					style={{
						padding: 16,
						overflow: "auto",
						background: "#f5f5f5",
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;
