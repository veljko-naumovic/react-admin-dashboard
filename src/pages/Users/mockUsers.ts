import type { User } from "../../types/user";

export const mockUsers: User[] = [
	{
		id: "1",
		name: "Marko Petrović",
		email: "marko@company.com",
		role: "admin",
		status: "active",
		departments: ["engineering_frontend"],
		lastLoginAt: "2025-01-10T14:32:00Z",
		lastLoginIp: "192.168.1.10",
	},
	{
		id: "2",
		name: "Ana Jovanović",
		email: "ana@company.com",
		role: "manager",
		status: "active",
		departments: ["engineering_backend"],
		lastLoginAt: "2025-01-10T14:32:00Z",
		lastLoginIp: "192.168.1.10",
	},
	{
		id: "3",
		name: "Ivan Nikolić",
		email: "ivan@company.com",
		role: "viewer",
		status: "blocked",
		departments: ["marketing"],
		lastLoginAt: "2025-01-10T14:32:00Z",
		lastLoginIp: "192.168.1.10",
	},
	{
		id: "4",
		name: "Ana Nikolić",
		email: "ana@company.com",
		role: "viewer",
		status: "active",
		departments: ["marketing"],
		lastLoginAt: "2025-01-10T14:32:00Z",
		lastLoginIp: "192.168.1.10",
	},
];
