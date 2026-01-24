import { Menu } from "antd";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Menu
			mode="inline" // ⬅️ OBAVEZNO
			theme="dark"
			selectedKeys={[location.pathname]}
			onClick={({ key }) => navigate(key)}
			style={{ height: "100%", borderRight: 0 }} // ⬅️ BITNO
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
	);
};

export default Sidebar;
