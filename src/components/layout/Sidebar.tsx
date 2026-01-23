import { Layout, Menu } from "antd";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Sider collapsible breakpoint="lg">
			<Menu
				theme="dark"
				mode="inline"
				selectedKeys={[location.pathname]}
				onClick={({ key }) => navigate(key)}
				items={[
					{
						key: "/",
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
		</Sider>
	);
};

export default Sidebar;
