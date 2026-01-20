import { useState } from "react";
import { AuthContext, type AuthUser } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<AuthUser | null>(null);

	const login = (role: AuthUser["role"]) => {
		setUser({ name: "Demo User", role });
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
