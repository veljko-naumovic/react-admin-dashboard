import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const LoginPage = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleLogin = () => {
		login("admin");
		navigate("/", { replace: true });
	};

	return (
		<Card style={{ width: 300, margin: "100px auto" }}>
			<Button type="primary" block onClick={handleLogin}>
				Login as Admin
			</Button>
		</Card>
	);
};

export default LoginPage;
