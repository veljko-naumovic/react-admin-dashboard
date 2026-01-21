import {
	Input,
	Select,
	Table,
	Drawer,
	TreeSelect,
	DatePicker,
	Space,
	Popover,
	Button,
	message,
	Empty,
	notification,
} from "antd";

import { MoreOutlined } from "@ant-design/icons";
import { useCallback, useMemo, useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import { departmentsTree } from "../../constants/departments";

const { RangePicker } = DatePicker;

import { mockUsers } from "./mockUsers";
import { useDebounce } from "../../hooks/useDebounce";
import type { User, UserRole, UserStatus } from "../../types/user";

import { useAuth } from "../../auth/useAuth";
import { getUsersColumns } from "./usersColumns";
import UserFormModal, {
	type UserFormValues,
} from "../../components/modals/UserFormModal";
import { fakeApiCall } from "../../utils/fakeApi";
import dayjs from "dayjs";

const UsersPage = () => {
	const [users, setUsers] = useState<User[]>(mockUsers);
	const [search, setSearch] = useState("");
	const [role, setRole] = useState<UserRole | undefined>();
	const [status, setStatus] = useState<UserStatus | undefined>();
	const [page, setPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<User | undefined>();
	const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
	const [departmentsFilter, setDepartmentsFilter] = useState<string[]>([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [createdRange, setCreatedRange] = useState<
		[Dayjs | null, Dayjs | null] | null
	>(null);
	const [loading, setLoading] = useState(false);
	const [loadingAction, setLoadingAction] = useState<string | null>(null);

	const { user } = useAuth();

	const debouncedSearch = useDebounce(search);

	const filteredUsers = useMemo(() => {
		return users.filter((user) => {
			const matchesSearch =
				user.name
					.toLowerCase()
					.includes(debouncedSearch.toLowerCase()) ||
				user.email
					.toLowerCase()
					.includes(debouncedSearch.toLowerCase());

			const matchesRole = role ? user.role === role : true;
			const matchesStatus = status ? user.status === status : true;

			const matchesDepartments =
				departmentsFilter.length > 0
					? departmentsFilter.some((dep) =>
							user.departments.includes(dep),
						)
					: true;

			const matchesDate = createdRange
				? dayjs(user.createdAt).isBetween(
						createdRange[0],
						createdRange[1],
						"day",
						"[]",
					)
				: true;

			return (
				matchesSearch &&
				matchesRole &&
				matchesStatus &&
				matchesDepartments &&
				matchesDate
			);
		});
	}, [users, debouncedSearch, role, status, departmentsFilter, createdRange]);

	const handlePageChange = useCallback((page: number) => {
		setPage(page);
	}, []);

	const handleEdit = (user: User) => {
		setEditingUser(user);
		setIsModalOpen(true);
	};

	const handleCreate = () => {
		setEditingUser(undefined);
		setIsModalOpen(true);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: (keys: React.Key[]) => {
			setSelectedRowKeys(keys);
		},
	};

	const clearSelection = () => setSelectedRowKeys([]);

	const bulkActivate = () => {
		setUsers((prev) =>
			prev.map((u) =>
				selectedRowKeys.includes(u.id) ? { ...u, status: "active" } : u,
			),
		);
		clearSelection();
	};

	const bulkBlock = () => {
		setUsers((prev) =>
			prev.map((u) =>
				selectedRowKeys.includes(u.id)
					? { ...u, status: "blocked" }
					: u,
			),
		);
		clearSelection();
	};

	const hasAdminSelected = users.some(
		(u) => selectedRowKeys.includes(u.id) && u.role === "admin",
	);

	const handleStatusToggle = async (id: string, checked: boolean) => {
		const prevUsers = users;

		// optimistic update
		setUsers((prev) =>
			prev.map((u) =>
				u.id === id
					? { ...u, status: checked ? "active" : "blocked" }
					: u,
			),
		);

		try {
			setLoading(true);
			await fakeApiCall(true);
			message.success("Status updated");
		} catch {
			// rollback
			setUsers(prevUsers);
			message.error("Failed to update status");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		const prevUsers = users;

		setUsers((prev) => prev.filter((u) => u.id !== id));

		try {
			setLoading(true);
			await fakeApiCall(true);
			message.success("User deleted");
		} catch {
			setUsers(prevUsers);
			message.error("Delete failed");
		} finally {
			setLoading(false);
		}
	};
	const bulkDelete = async () => {
		const prevUsers = users;
		const count = selectedRowKeys.length;

		// optimistic update
		setUsers((prev) => prev.filter((u) => !selectedRowKeys.includes(u.id)));

		try {
			setLoading(true);
			await fakeApiCall(true);

			notification.success({
				title: "Users deleted",
				description: `${count} user${count > 1 ? "s" : ""} successfully deleted.`,
				placement: "bottomRight",
			});

			clearSelection();
		} catch {
			// rollback
			setUsers(prevUsers);

			notification.error({
				title: "Bulk delete failed",
				description: "Something went wrong. Please try again.",
				placement: "bottomRight",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (values: UserFormValues) => {
		const prevUsers = users;

		try {
			setLoading(true);

			if (editingUser) {
				setUsers((prev) =>
					prev.map((u) =>
						u.id === editingUser.id ? { ...u, ...values } : u,
					),
				);
				await fakeApiCall(true);
				message.success("User updated");
			} else {
				const newUser: User = {
					id: crypto.randomUUID(),
					...values,
					createdAt: new Date().toISOString(),
					createdBy: "Admin",
				};

				setUsers((prev) => [newUser, ...prev]);
				await fakeApiCall(true);
				message.success("User created");
			}

			setIsModalOpen(false);
		} catch {
			setUsers(prevUsers);
			message.error("Save failed");
		} finally {
			setLoading(false);
		}
	};

	const columns = getUsersColumns({
		role: user?.role,
		onEdit: handleEdit,
		onDelete: handleDelete,
		onStatusToggle: handleStatusToggle,
		loadingAction: loadingAction,
		setLoadingAction: setLoadingAction,
	});

	return (
		<>
			<h2>Users</h2>

			<div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
				<Input
					placeholder="Search by name or email"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setPage(1);
					}}
					allowClear
				/>

				<Select
					placeholder="Role"
					allowClear
					style={{ width: 150 }}
					onChange={(value) => {
						setRole(value);
						setPage(1);
					}}
					options={[
						{ label: "Admin", value: "admin" },
						{ label: "Manager", value: "manager" },
						{ label: "Viewer", value: "viewer" },
					]}
				/>

				<Select
					placeholder="Status"
					allowClear
					style={{ width: 150 }}
					onChange={(value) => {
						setStatus(value);
						setPage(1);
					}}
					options={[
						{ label: "Active", value: "active" },
						{ label: "Blocked", value: "blocked" },
					]}
				/>
			</div>

			<Button type="primary" onClick={handleCreate}>
				Create User
			</Button>

			<Button
				icon={<FilterOutlined />}
				onClick={() => setIsFilterDrawerOpen(true)}
			>
				Advanced filters
			</Button>

			{user?.role === "admin" && selectedRowKeys.length > 0 && (
				<Popover
					trigger="click"
					placement="bottom"
					content={
						<Space orientation="vertical">
							<Button onClick={bulkActivate}>Activate</Button>
							<Button onClick={bulkBlock}>Block</Button>
							<Button
								danger
								onClick={bulkDelete}
								disabled={hasAdminSelected}
							>
								Delete
							</Button>
						</Space>
					}
				>
					<Button icon={<MoreOutlined />}>
						Bulk actions ({selectedRowKeys.length})
					</Button>
				</Popover>
			)}

			<Table<User>
				rowKey="id"
				columns={columns}
				dataSource={filteredUsers}
				rowSelection={rowSelection}
				pagination={{
					current: page,
					pageSize: 5,
					total: filteredUsers.length,
					onChange: handlePageChange,
				}}
				loading={loading}
				locale={{
					emptyText: <Empty description="No users found" />,
				}}
			/>
			<UserFormModal
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onSubmit={handleSubmit}
				initialValues={editingUser}
			/>
			<Drawer
				title="Advanced filters"
				open={isFilterDrawerOpen}
				onClose={() => setIsFilterDrawerOpen(false)}
				size="small"
			>
				<Space
					orientation="vertical"
					style={{ width: "100%" }}
					size="large"
				>
					{/* Departments */}
					<div>
						<label>Departments</label>
						<TreeSelect
							treeData={departmentsTree}
							treeCheckable
							allowClear
							style={{ width: "100%" }}
							placeholder="Select departments"
							value={departmentsFilter}
							onChange={(value) => {
								setDepartmentsFilter(value);
								setPage(1);
							}}
						/>
					</div>

					{/* Created date range */}
					<div>
						<label>Created date</label>
						<RangePicker
							style={{ width: "100%" }}
							value={createdRange}
							onChange={(range) => {
								setCreatedRange(range);
								setPage(1);
							}}
						/>
					</div>

					{/* Reset */}
					<Button
						onClick={() => {
							setDepartmentsFilter([]);
							setCreatedRange(null);
							setPage(1);
						}}
					>
						Reset filters
					</Button>
				</Space>
			</Drawer>
		</>
	);
};

export default UsersPage;
