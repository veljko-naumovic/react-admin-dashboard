import { Menu, Button } from "antd";
import {
	DashboardOutlined,
	UserOutlined,
	CloseOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
	collapsed: boolean;
	onNavigate?: () => void; // ⬅️ samo za mobile drawer
}

const Sidebar = ({ collapsed, onNavigate }: SidebarProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<div style={{ height: "100%" }}>
			{/* ⬇️ CLOSE BUTTON (Samo mobile drawer) */}
			{onNavigate && (
				<div
					style={{
						padding: 12,
						textAlign: "right",
						backgroundColor: "#002140",
					}}
				>
					<Button
						type="text"
						icon={<CloseOutlined style={{ color: "whitesmoke" }} />}
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
					onNavigate?.(); // ⬅️ zatvara drawer na klik
				}}
				style={{ height: "100%", borderRight: 0 }}
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
