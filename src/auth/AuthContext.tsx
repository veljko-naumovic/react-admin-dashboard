import { createContext } from "react";

type Role = "admin" | "manager" | "viewer";

export interface AuthUser {
	name: string;
	role: Role;
}

export interface AuthContextType {
	user: AuthUser | null;
	login: (role: Role) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);
