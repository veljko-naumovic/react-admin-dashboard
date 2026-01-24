export type UserRole = "admin" | "manager" | "viewer";
export type UserStatus = "active" | "blocked";

export interface User {
	id: string;
	name: string;
	email: string;
	role: "admin" | "manager" | "viewer";
	status: "active" | "blocked";

	// auth-related
	lastLoginAt: string;
	lastLoginIp?: string;

	// ui helpers
	departments?: string[];
}
