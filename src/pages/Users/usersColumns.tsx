// import {
// 	Button,
// 	Popconfirm,
// 	Space,
// 	Switch,
// 	Tag,
// 	Popover,
// 	Typography,
// 	Tooltip,
// } from "antd";
// import { InfoCircleOutlined } from "@ant-design/icons";
// import UserAuditInfo from "../../components/users/UserAuditInfo";
// import type { ColumnsType } from "antd/es/table";
// import dayjs from "dayjs";

// import { canEditUser, canDeleteUser } from "../../utils/permissions";
// import type { UserRole, User } from "../../types/user";

// interface ColumnsArgs {
// 	role?: UserRole;
// 	onEdit: (user: User) => void;
// 	onDelete: (id: string) => void;
// 	onStatusToggle: (id: string, checked: boolean) => void;
// 	loadingAction: string | null;
// 	setLoadingAction: React.Dispatch<React.SetStateAction<string | null>>;
// }

// export const getUsersColumns = ({
// 	role,
// 	onEdit,
// 	onDelete,
// 	onStatusToggle,
// 	loadingAction,
// 	setLoadingAction,
// }: ColumnsArgs): ColumnsType<User> => [
// 	{
// 		title: "Name",
// 		dataIndex: "name",
// 		render: (_name, record) => (
// 			<Space>
// 				<Typography.Text>{record.name}</Typography.Text>

// 				<Popover
// 					content={<UserAuditInfo user={record} />}
// 					title="Audit info"
// 					trigger="click"
// 				>
// 					<InfoCircleOutlined style={{ color: "#1677ff" }} />
// 				</Popover>
// 			</Space>
// 		),
// 	},
// 	{
// 		title: "Email",
// 		dataIndex: "email",
// 	},
// 	{
// 		title: "Role",
// 		dataIndex: "role",
// 		render: (role: UserRole) => <Tag color="blue">{role}</Tag>,
// 	},
// 	{
// 		title: "Status",
// 		dataIndex: "status",
// 		render: (_status, record) => {
// 			const isActive = record.status === "active";
// 			const canToggle = role === "admin";

// 			return (
// 				<Space>
// 					<Tooltip title="Only admin can change status">
// 						<Switch
// 							checked={isActive}
// 							disabled={!canToggle}
// 							loading={loadingAction === record.id}
// 							onChange={async (checked) => {
// 								setLoadingAction(record.id);
// 								await onStatusToggle(record.id, checked);
// 								setLoadingAction(null);
// 							}}
// 						/>
// 					</Tooltip>

// 					<Tag color={isActive ? "green" : "red"}>
// 						{record.status}
// 					</Tag>
// 				</Space>
// 			);
// 		},
// 	},
// 	{
// 		title: "Last Login At",
// 		dataIndex: "lastLoginAt",
// 		render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
// 	},
// 	{
// 		title: "Departments",
// 		dataIndex: "departments",
// 		render: (deps: string[]) => deps.join(", "),
// 	},
// 	{
// 		title: "Actions",
// 		render: (_, record) => (
// 			<Space>
// 				{role && canEditUser(role) && (
// 					<Button type="link" onClick={() => onEdit(record)}>
// 						Edit
// 					</Button>
// 				)}

// 				{role && canDeleteUser(role) && (
// 					<Popconfirm
// 						title="Delete user?"
// 						onConfirm={() => onDelete(record.id)}
// 					>
// 						<Button type="link" danger>
// 							Delete
// 						</Button>
// 					</Popconfirm>
// 				)}
// 			</Space>
// 		),
// 	},
// ];

import {
	Button,
	Popconfirm,
	Space,
	Switch,
	Tag,
	Popover,
	Typography,
	Tooltip,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

import UserAuditInfo from "../../components/users/UserAuditInfo";
import { canEditUser, canDeleteUser } from "../../utils/permissions";
import type { User, UserRole } from "../../types/user";

interface ColumnsArgs {
	role?: UserRole;
	onEdit: (user: User) => void;
	onDelete: (id: string) => void;
	onStatusToggle: (id: string, checked: boolean) => Promise<void>;
	loadingAction: string | null;
	setLoadingAction: React.Dispatch<React.SetStateAction<string | null>>;
}

export const getUsersColumns = ({
	role,
	onEdit,
	onDelete,
	onStatusToggle,
	loadingAction,
	setLoadingAction,
}: ColumnsArgs): ColumnsType<User> => [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		width: 180,
		fixed: "left",
		render: (_, record) => (
			<Space>
				<Typography.Text strong>{record.name}</Typography.Text>

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
		key: "email",
		width: 220,
		responsive: ["md"], // hide on mobile
	},

	{
		title: "Role",
		dataIndex: "role",
		key: "role",
		width: 120,
		render: (role: UserRole) => <Tag color="blue">{role}</Tag>,
	},

	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		width: 160,
		render: (_, record) => {
			const isActive = record.status === "active";
			const canToggle = role === "admin";

			return (
				<Space>
					<Tooltip title="Only admin can change status">
						<Switch
							checked={isActive}
							disabled={!canToggle}
							loading={loadingAction === record.id}
							onChange={async (checked) => {
								setLoadingAction(record.id);
								await onStatusToggle(record.id, checked);
								setLoadingAction(null);
							}}
						/>
					</Tooltip>

					<Tag color={isActive ? "green" : "red"}>
						{record.status}
					</Tag>
				</Space>
			);
		},
	},

	{
		title: "Last Login",
		dataIndex: "lastLoginAt",
		key: "lastLoginAt",
		width: 150,
		responsive: ["md"],
		render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
	},

	{
		title: "Departments",
		dataIndex: "departments",
		key: "departments",
		width: 220,
		responsive: ["lg"], // desktop only
		render: (deps: string[]) => deps.join(", "),
	},

	{
		title: "Actions",
		key: "actions",
		width: 160,
		fixed: "right",
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
