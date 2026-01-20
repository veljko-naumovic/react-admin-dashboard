import { Input, Select, Table } from "antd";
import { useCallback, useMemo, useState } from "react";

import { mockUsers } from "./mockUsers";
import { useDebounce } from "../../hooks/useDebounce";
import type { User, UserRole, UserStatus } from "../../types/user";

import { useAuth } from "../../auth/useAuth";
import { getUsersColumns } from "./usersColumns";

const UsersPage = () => {
	const [search, setSearch] = useState("");
	const [role, setRole] = useState<UserRole | undefined>();
	const [status, setStatus] = useState<UserStatus | undefined>();
	const [page, setPage] = useState(1);

	const { user } = useAuth();

	const debouncedSearch = useDebounce(search);

	const filteredUsers = useMemo(() => {
		return mockUsers.filter((user) => {
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
	}, [debouncedSearch, role, status]);

	const handlePageChange = useCallback((page: number) => {
		setPage(page);
	}, []);

	const handleEdit = (record: User) => {
		console.log("EDIT USER:", record);
	};

	const handleDelete = (id: string) => {
		console.log("DELETE USER:", id);
	};

	const columns = getUsersColumns({
		role: user?.role,
		onEdit: handleEdit,
		onDelete: handleDelete,
	});

	return (
		<>
			<h2>Users</h2>

			<div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
				<Input
					placeholder="Search by name or email"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					allowClear
				/>

				<Select
					placeholder="Role"
					allowClear
					style={{ width: 150 }}
					onChange={(value) => setRole(value)}
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
					onChange={(value) => setStatus(value)}
					options={[
						{ label: "Active", value: "active" },
						{ label: "Blocked", value: "blocked" },
					]}
				/>
			</div>

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
		</>
	);
};

export default UsersPage;
