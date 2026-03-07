import { Button, Card, Form, Input, Alert, Radio, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useState } from "react";
import type { UserRole } from "../../types/user";

const { Title } = Typography;

const LoginPage = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [role, setRole] = useState<UserRole>("admin");

	const onFinish = async (values: { email: string; password: string }) => {
		await login(values.email, role);
		navigate("/dashboard");
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "#f5f5f5",
				padding: 16,
			}}
		>
			<div style={{ textAlign: "center" }}>
				{/* Logo and title */}
				<div
					style={{
						marginBottom: 24,
						display: "flex",
						justifyContent: "center",
					}}
				>
					<img
						src="/favicon.png"
						alt="logo"
						style={{ height: 40, marginRight: 10 }}
					/>

					<Title level={3} style={{ margin: 0 }}>
						Admin Dashboard
					</Title>
				</div>

				<Card title="Login" style={{ width: 380 }}>
					<Alert
						type="info"
						showIcon
						title="Demo mode"
						description="Select a role to preview permissions."
						style={{ marginBottom: 16 }}
					/>

					<Form
						layout="vertical"
						onFinish={onFinish}
						initialValues={{
							email: "test_user@example.com",
							password: "123456",
						}}
					>
						<Form.Item label="Demo role">
							<Radio.Group
								value={role}
								onChange={(e) => setRole(e.target.value)}
							>
								<Radio.Button value="admin">Admin</Radio.Button>
								<Radio.Button value="manager">
									Manager
								</Radio.Button>
								<Radio.Button value="viewer">
									Viewer
								</Radio.Button>
							</Radio.Group>
						</Form.Item>

						<Form.Item
							name="email"
							label="Email"
							rules={[{ required: true, message: "Enter email" }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name="password"
							label="Password"
							rules={[
								{
									required: true,
									message: "Enter password",
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						<Button type="primary" htmlType="submit" block>
							Login
						</Button>
					</Form>
				</Card>
			</div>
		</div>
	);
};

export default LoginPage;
