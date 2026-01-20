import type { UserRole } from "../types/user";

export const canEditUser = (role: UserRole) =>
	role === "admin" || role === "manager";

export const canDeleteUser = (role: UserRole) => role === "admin";
