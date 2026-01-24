import { Button, Card, Form, Input, Alert, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useState } from "react";
import type { UserRole } from "../../types/user";

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
				display: "grid",
				placeItems: "center",
			}}
		>
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
							<Radio.Button value="manager">Manager</Radio.Button>
							<Radio.Button value="viewer">Viewer</Radio.Button>
						</Radio.Group>
					</Form.Item>

					<Form.Item name="email" label="Email">
						<Input />
					</Form.Item>

					<Form.Item name="password" label="Password">
						<Input.Password />
					</Form.Item>

					<Button type="primary" htmlType="submit" block>
						Login
					</Button>
				</Form>
			</Card>
		</div>
	);
};

export default LoginPage;
