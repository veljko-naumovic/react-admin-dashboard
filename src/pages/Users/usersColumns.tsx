import {
	Button,
	Popconfirm,
	Space,
	Switch,
	Tag,
	Popover,
	Typography,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import UserAuditInfo from "../../components/users/UserAuditInfo";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

import { canEditUser, canDeleteUser } from "../../utils/permissions";
import type { UserRole, User } from "../../types/user";

interface ColumnsArgs {
	role?: UserRole;
	onEdit: (user: User) => void;
	onDelete: (id: string) => void;
	onStatusToggle: (id: string, checked: boolean) => void;
}

export const getUsersColumns = ({
	role,
	onEdit,
	onDelete,
	onStatusToggle,
}: ColumnsArgs): ColumnsType<User> => [
	{
		title: "Name",
		dataIndex: "name",
		render: (_name, record) => (
			<Space>
				<Typography.Text>{record.name}</Typography.Text>

				<Popover
					content={<UserAuditInfo user={record} />}
					title="Audit info"
					trigger="click"
				>
					<InfoCircleOutlined style={{ color: "#1677ff" }} />
				</Popover>
			</Space>
		),
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
		render: (_status, record) => {
			const isActive = record.status === "active";
			const canToggle = role === "admin";

			return (
				<Space>
					<Switch
						checked={isActive}
						disabled={!canToggle}
						onChange={(checked) =>
							onStatusToggle(record.id, checked)
						}
					/>

					<Tag color={isActive ? "green" : "red"}>
						{record.status}
					</Tag>
				</Space>
			);
		},
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
