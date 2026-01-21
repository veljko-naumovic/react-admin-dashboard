import { Button, Popconfirm, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

import { canEditUser, canDeleteUser } from "../../utils/permissions";
import type { UserRole, User, UserStatus } from "../../types/user";

interface ColumnsArgs {
	role?: UserRole;
	onEdit: (user: User) => void;
	onDelete: (id: string) => void;
}

export const getUsersColumns = ({
	role,
	onEdit,
	onDelete,
}: ColumnsArgs): ColumnsType<User> => [
	{
		title: "Name",
		dataIndex: "name",
	},
	{
		title: "Email",
		dataIndex: "email",
	},
	{
		title: "Role",
		dataIndex: "role",
		render: (role: UserRole) => <Tag color="blue">{role}</Tag>,
	},
	{
		title: "Status",
		dataIndex: "status",
		render: (status: UserStatus) => (
			<Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
		),
	},
	{
		title: "Created",
		dataIndex: "createdAt",
		render: (date: string) => dayjs(date).format("DD.MM.YYYY"),
	},
	{
		title: "Departments",
		dataIndex: "departments",
		render: (deps: string[]) => deps.join(", "),
	},
	{
		title: "Actions",
		render: (_, record) => (
			<Space>
				{role && canEditUser(role) && (
					<Button type="link" onClick={() => onEdit(record)}>
						Edit
					</Button>
				)}

				{role && canDeleteUser(role) && (
					<Popconfirm
						title="Delete user?"
						onConfirm={() => onDelete(record.id)}
					>
						<Button type="link" danger>
							Delete
						</Button>
					</Popconfirm>
				)}
			</Space>
		),
	},
];
