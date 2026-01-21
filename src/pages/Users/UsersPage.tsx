import {
	Button,
	Input,
	Select,
	Table,
	Drawer,
	TreeSelect,
	DatePicker,
	Space,
} from "antd";
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
	const [createdRange, setCreatedRange] = useState<
		[Dayjs | null, Dayjs | null] | null
	>(null);

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

	const handleDelete = (id: string) => {
		setUsers((prev) => prev.filter((u) => u.id !== id));
	};

	const handleEdit = (user: User) => {
		setEditingUser(user);
		setIsModalOpen(true);
	};

	const handleStatusToggle = (id: string, checked: boolean) => {
		setUsers((prev) =>
			prev.map((u) =>
				u.id === id
					? { ...u, status: checked ? "active" : "blocked" }
					: u,
			),
		);
	};

	const columns = getUsersColumns({
		role: user?.role,
		onEdit: handleEdit,
		onDelete: handleDelete,
		onStatusToggle: handleStatusToggle,
	});

	const handleCreate = () => {
		setEditingUser(undefined);
		setIsModalOpen(true);
	};

	const handleSubmit = (values: UserFormValues) => {
		if (editingUser) {
			// EDIT
			setUsers((prev) =>
				prev.map((u) =>
					u.id === editingUser.id ? { ...u, ...values } : u,
				),
			);
		} else {
			// CREATE
			const newUser: User = {
				id: crypto.randomUUID(),
				...values,
				createdAt: new Date().toISOString(),
				createdBy: "System",
			};

			setUsers((prev) => [newUser, ...prev]);
		}

		setIsModalOpen(false);
	};

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

			<Table<User>
				rowKey="id"
				columns={columns}
				dataSource={filteredUsers}
				pagination={{
					current: page,
					pageSize: 5,
					total: filteredUsers.length,
					onChange: handlePageChange,
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
