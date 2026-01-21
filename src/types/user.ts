export type UserRole = "admin" | "manager" | "viewer";
export type UserStatus = "active" | "blocked";

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	status: UserStatus;
	departments: string[];
	createdAt?: string;
	createdBy: string;
	updatedAt?: string;
	lastLoginAt?: string;
	lastLoginIp?: string;
}
