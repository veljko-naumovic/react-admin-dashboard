import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const { Header, Content } = Layout;

const AdminLayout = () => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar />

			<Layout>
				<Header style={{ background: "#fff", padding: "0 16px" }}>
					Admin Dashboard
				</Header>

				<Content style={{ margin: "16px" }}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;
