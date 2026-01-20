import { Input, Select, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";

import { mockUsers } from "./mockUsers";
import { useDebounce } from "../../hooks/useDebounce";
import type { User, UserRole, UserStatus } from "../../types/user";

const UsersPage = () => {
	const [search, setSearch] = useState("");
	const [role, setRole] = useState<UserRole | undefined>();
	const [status, setStatus] = useState<UserStatus | undefined>();
	const [page, setPage] = useState(1);

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

	const columns: ColumnsType<User> = useMemo(
		() => [
			{
				title: "Name",
				dataIndex: "name",
				key: "name",
			},
			{
				title: "Email",
				dataIndex: "email",
				key: "email",
			},
			{
				title: "Role",
				dataIndex: "role",
				key: "role",
				render: (role: UserRole) => <Tag color="blue">{role}</Tag>,
			},
			{
				title: "Status",
				dataIndex: "status",
				key: "status",
				render: (status: UserStatus) => (
					<Tag color={status === "active" ? "green" : "red"}>
						{status}
					</Tag>
				),
			},
			{
				title: "Created",
				dataIndex: "createdAt",
				key: "createdAt",
				render: (date: string) => dayjs(date).format("DD.MM.YYYY"),
			},
		],
		[],
	);

	const handlePageChange = useCallback((page: number) => {
		setPage(page);
	}, []);

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
