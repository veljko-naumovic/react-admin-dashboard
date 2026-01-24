import { createContext } from "react";
import type { User, UserRole } from "../types/user";

export type AuthContextType = {
	user: User | null;
	login: (email: string, role: UserRole) => Promise<void>;
	logout: () => void;
	isAuthReady: boolean;
};
export const AuthContext = createContext<AuthContextType | null>(null);
