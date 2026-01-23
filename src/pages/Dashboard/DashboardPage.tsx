import { Card, Col, Row, Statistic } from "antd";
import { Line, Pie, Column } from "@ant-design/charts";
import React, { useEffect, useMemo } from "react";

import { mockUsers } from "../Users/mockUsers";

const DashboardPage = () => {
	/* =======================
     KPI CALCULATIONS
  ======================= */

	const totalUsers = mockUsers.length;
	const activeUsers = mockUsers.filter((u) => u.status === "active").length;
	const blockedUsers = mockUsers.filter((u) => u.status === "blocked").length;

	/* =======================
     PIE / DONUT DATA
  ======================= */

	const usersByRole = useMemo(
		() => [
			{
				type: "Admin",
				value:
					mockUsers.filter((u) => u.role === "admin").length /
					totalUsers,
			},
			{
				type: "Manager",
				value:
					mockUsers.filter((u) => u.role === "manager").length /
					totalUsers,
			},
			{
				type: "Viewer",
				value:
					mockUsers.filter((u) => u.role === "viewer").length /
					totalUsers,
			},
		],
		[totalUsers],
	);

	/* =======================
     OTHER CHART DATA
  ======================= */

	const usersByStatus = [
		{ status: "Active", count: activeUsers },
		{ status: "Blocked", count: blockedUsers },
	];

	const usersGrowth = [
		{ month: "Jan", users: 20 },
		{ month: "Feb", users: 35 },
		{ month: "Mar", users: 55 },
		{ month: "Apr", users: 80 },
		{ month: "May", users: 120 },
	];

	/* =======================
     RENDER
  ======================= */

	const [data, setData] =
		React.useState<{ type: string; value: number }[]>(usersByRole);

	useEffect(() => {
		setData(usersByRole);
	}, [usersByRole]);

	return (
		<>
			{/* KPI CARDS */}
			<Row gutter={[16, 16]}>
				<Col xs={24} lg={24} xl={8}>
					<Card>
						<Statistic title="Total users" value={totalUsers} />
					</Card>
				</Col>

				<Col xs={24} lg={24} xl={8}>
					<Card>
						<Statistic
							title="Active users"
							value={activeUsers}
							suffix="users"
							styles={{ content: { color: "#3f8600" } }}
						/>
					</Card>
				</Col>

				<Col xs={24} lg={24} xl={8}>
					<Card>
						<Statistic
							title="Blocked users"
							value={blockedUsers}
							suffix="users"
							styles={{ content: { color: "#cf1322" } }}
						/>
					</Card>
				</Col>
			</Row>

			{/* DONUT + COLUMN (STACK UNTIL XL) */}
			<Row gutter={[16, 16]} style={{ marginTop: 24 }}>
				<Col xs={24} lg={24} xl={12}>
					<Card title="Users by role" style={{ height: "100%" }}>
						<Pie
							data={data}
							angleField="value"
							colorField="type"
							radius={0.9}
							innerRadius={0.4}
							label={{
								text: (item: { type: string; value: number }) =>
									`${Math.round(item.value * 100)} %`,
								style: {
									fontWeight: "bold",
									fontSize: "20px",
								},
							}}
							legend={{
								color: {
									title: false,
									position: "right",
									rowPadding: 5,
								},
							}}
						/>
					</Card>
				</Col>

				<Col xs={24} lg={24} xl={12}>
					<Card title="Users by status" style={{ height: "100%" }}>
						<Column
							data={usersByStatus}
							xField="status"
							yField="count"
							label={{
								style: { fill: "#fff" },
							}}
						/>
					</Card>
				</Col>
			</Row>

			{/* LINE CHART */}
			<Row gutter={[16, 16]} style={{ marginTop: 24 }}>
				<Col xs={24}>
					<Card title="Users growth">
						<Line
							data={usersGrowth}
							xField="month"
							yField="users"
							smooth
						/>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default DashboardPage;
