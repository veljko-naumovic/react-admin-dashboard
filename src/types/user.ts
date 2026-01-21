export type UserRole = "admin" | "manager" | "viewer";
export type UserStatus = "active" | "blocked";

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	status: UserStatus;
	createdAt: string;
	departments: string[];
}
