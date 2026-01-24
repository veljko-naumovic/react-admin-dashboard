import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User, UserRole } from "../types/user";

const AUTH_STORAGE_KEY = "auth_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// ✅ lazy initialization (čitamo localStorage PRE prvog rendera)
	const [user, setUser] = useState<User | null>(() => {
		const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
		return storedUser ? JSON.parse(storedUser) : null;
	});

	// auth je odmah spreman
	const isAuthReady = true;

	const login = async (email: string, role: UserRole) => {
		await new Promise((res) => setTimeout(res, 600));

		const now = new Date().toISOString();

		const authUser: User = {
			id: crypto.randomUUID(),
			name: email.split("@")[0],
			email,
			role,
			status: "active",
			lastLoginAt: now,
			lastLoginIp: "127.0.0.1",
		};

		setUser(authUser);
		localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem(AUTH_STORAGE_KEY);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isAuthReady }}>
			{children}
		</AuthContext.Provider>
	);
};
