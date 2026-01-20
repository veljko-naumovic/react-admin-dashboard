import type { User } from "../../types/user";

export const mockUsers: User[] = [
	{
		id: "1",
		name: "Marko Petrović",
		email: "marko@company.com",
		role: "admin",
		status: "active",
		createdAt: "2024-11-10T10:00:00Z",
	},
	{
		id: "2",
		name: "Ana Jovanović",
		email: "ana@company.com",
		role: "manager",
		status: "active",
		createdAt: "2024-10-01T09:15:00Z",
	},
	{
		id: "3",
		name: "Ivan Nikolić",
		email: "ivan@company.com",
		role: "viewer",
		status: "blocked",
		createdAt: "2024-09-20T14:30:00Z",
	},
];
