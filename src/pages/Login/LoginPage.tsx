import { Button, Card, Form, Input, Alert, Radio, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useState } from "react";
import type { UserRole } from "../../types/user";

import "../../styles/login.css";

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
		<div className="login-page">
			<div className="login-wrapper">
				{/* Logo and title */}
				<div className="login-logo">
					<img src="/favicon.png" alt="logo" />

					<Title level={3} className="login-title">
						Admin Dashboard
					</Title>
				</div>

				<Card title="Login" className="login-card">
					<Alert
						type="info"
						showIcon
						title="Demo mode"
						description="Select a role to preview permissions."
						className="login-alert"
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
							rules={[
								{
									required: true,
									message: "Enter email",
								},
							]}
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

						<Button
							type="primary"
							htmlType="submit"
							block
							className="login-button"
						>
							Login
						</Button>
					</Form>
				</Card>
			</div>
		</div>
	);
};

export default LoginPage;
