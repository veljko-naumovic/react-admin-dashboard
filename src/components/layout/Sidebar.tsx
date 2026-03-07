import { Menu, Button } from "antd";
import {
	DashboardOutlined,
	UserOutlined,
	CloseOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

import "../../styles/sidebar.css";

interface SidebarProps {
	collapsed: boolean;
	onNavigate?: () => void;
}

const Sidebar = ({ collapsed, onNavigate }: SidebarProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<div className="sidebar">
			{/* Close button (mobile drawer only) */}

			{onNavigate && (
				<div className="sidebar-close">
					<Button
						type="text"
						icon={<CloseOutlined />}
						onClick={onNavigate}
					/>
				</div>
			)}

			<Menu
				mode="inline"
				theme="dark"
				inlineCollapsed={collapsed}
				selectedKeys={[location.pathname]}
				onClick={({ key }) => {
					navigate(key);
					onNavigate?.();
				}}
				className="sidebar-menu"
				items={[
					{
						key: "/dashboard",
						icon: <DashboardOutlined />,
						label: "Dashboard",
					},
					{
						key: "/users",
						icon: <UserOutlined />,
						label: "Users",
					},
				]}
			/>
		</div>
	);
};

export default Sidebar;
