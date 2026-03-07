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

import "../../styles/layout.css";

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
		<Layout className="app-layout">
			{/* Desktop Sidebar */}

			{!isMobile && (
				<Sider
					width={220}
					collapsible
					collapsed={collapsed}
					onCollapse={setCollapsed}
					breakpoint="lg"
					className="app-sider"
				>
					<Sidebar collapsed={collapsed} />
				</Sider>
			)}

			{/* Mobile Drawer */}

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
				<Header className="app-header">
					{/* Left */}

					<div className="header-left">
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
							<div className="header-logo">
								<img
									src="/favicon.png"
									alt="logo"
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

					{/* Flex space */}

					<div className="header-spacer" />

					{/* Right */}

					<div className="header-right">
						{isXs ? (
							<Dropdown
								menu={{ items: userMenu }}
								placement="bottomRight"
							>
								<Avatar icon={<UserOutlined />} />
							</Dropdown>
						) : (
							<>
								<span className="header-user">
									{user?.name} ({user?.role})
								</span>

								<Button onClick={logout}>Logout</Button>
							</>
						)}
					</div>
				</Header>

				{/* Content */}

				<Content className="app-content">
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;
