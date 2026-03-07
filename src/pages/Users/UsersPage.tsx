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
	Modal,
} from "antd";

import { MoreOutlined, FilterOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import type { Dayjs } from "dayjs";

import "../../styles/users.css";

import { departmentsTree } from "../../constants/departments";
import { mockUsers } from "./mockUsers";
import { useDebounce } from "../../hooks/useDebounce";
import type { User, UserRole, UserStatus } from "../../types/user";

import { useAuth } from "../../auth/useAuth";
import { getUsersColumns } from "./usersColumns";
import UserFormModal, {
	type UserFormValues,
} from "../../components/modals/UserFormModal";
import { fakeApiCall } from "../../utils/fakeApi";

const { RangePicker } = DatePicker;

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
							user?.departments?.includes(dep),
						)
					: true;

			return (
				matchesSearch &&
				matchesRole &&
				matchesStatus &&
				matchesDepartments
			);
		});
	}, [users, debouncedSearch, role, status, departmentsFilter]);

	/* Crud actions */

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

	const handleStatusToggle = async (id: string, checked: boolean) => {
		const prevUsers = users;

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

	const confirmBulkDelete = () => {
		const count = selectedRowKeys.length;

		Modal.confirm({
			title: "Delete users",
			content: (
				<>
					<p>
						You are about to delete <strong>{count}</strong> user
						{count > 1 ? "s" : ""}.
					</p>
					<p style={{ color: "#ff4d4f" }}>
						This action cannot be undone.
					</p>
				</>
			),
			okText: "Delete",
			okType: "danger",
			cancelText: "Cancel",
			onOk: bulkDelete,
		});
	};

	const bulkDelete = async () => {
		const prevUsers = users;

		setUsers((prev) => prev.filter((u) => !selectedRowKeys.includes(u.id)));

		try {
			setLoading(true);
			await fakeApiCall(true);
			message.success("Users deleted");
			clearSelection();
		} catch {
			setUsers(prevUsers);
			message.error("Bulk delete failed");
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
					lastLoginAt: new Date().toISOString(),
					...values,
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
		loadingAction,
		setLoadingAction,
	});

	const hasAdminSelected = users.some(
		(u) => selectedRowKeys.includes(u.id) && u.role === "admin",
	);

	return (
		<div className="users-page">
			<h2 className="users-title">Users</h2>

			{/* Filters */}
			<div className="users-filters">
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
					className="users-select"
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
					className="users-select"
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

			{/* Action buttons */}
			<div className="users-actions">
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
							<Space direction="vertical">
								<Button onClick={bulkActivate}>Activate</Button>

								<Button onClick={bulkBlock}>Block</Button>

								<Button
									danger
									onClick={confirmBulkDelete}
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
			</div>

			{/* Table */}
			<div className="users-table-wrapper">
				<Table<User>
					rowKey="id"
					columns={columns}
					dataSource={filteredUsers}
					rowSelection={rowSelection}
					pagination={{
						current: page,
						pageSize: 5,
						total: filteredUsers.length,
						onChange: (page) => setPage(page),
					}}
					loading={loading}
					scroll={{ x: 900 }}
					locale={{
						emptyText: <Empty description="No users found" />,
					}}
				/>
			</div>

			{/* User modal */}
			<UserFormModal
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onSubmit={handleSubmit}
				initialValues={editingUser}
			/>

			{/* Filter Drawer */}
			<Drawer
				title="Advanced filters"
				open={isFilterDrawerOpen}
				onClose={() => setIsFilterDrawerOpen(false)}
				size="small"
			>
				<Space
					direction="vertical"
					size="large"
					style={{ width: "100%" }}
				>
					<div className="filter-section">
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

					<div className="filter-section">
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
		</div>
	);
};

export default UsersPage;
