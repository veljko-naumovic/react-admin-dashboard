import { Button, Input, Select, Table } from "antd";
import { useCallback, useMemo, useState } from "react";

import { mockUsers } from "./mockUsers";
import { useDebounce } from "../../hooks/useDebounce";
import type { User, UserRole, UserStatus } from "../../types/user";

import { useAuth } from "../../auth/useAuth";
import { getUsersColumns } from "./usersColumns";
import UserFormModal, {
	type UserFormValues,
} from "../../components/modals/UserFormModal";

const UsersPage = () => {
	const [users, setUsers] = useState<User[]>(mockUsers);
	const [search, setSearch] = useState("");
	const [role, setRole] = useState<UserRole | undefined>();
	const [status, setStatus] = useState<UserStatus | undefined>();
	const [page, setPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<User | undefined>();

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

			return matchesSearch && matchesRole && matchesStatus;
		});
	}, [users, debouncedSearch, role, status]);

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

	const columns = getUsersColumns({
		role: user?.role,
		onEdit: handleEdit,
		onDelete: handleDelete,
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
		</>
	);
};

export default UsersPage;
