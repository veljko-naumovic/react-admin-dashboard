// import { Card, Col, Row, Statistic } from "antd";
// import { Line, Pie, Column } from "@ant-design/charts";
// import React, { useEffect, useMemo } from "react";

// import { mockUsers } from "../Users/mockUsers";

// const DashboardPage = () => {
// 	/* =======================
//      KPI CALCULATIONS
//   ======================= */

// 	const totalUsers = mockUsers.length;
// 	const activeUsers = mockUsers.filter((u) => u.status === "active").length;
// 	const blockedUsers = mockUsers.filter((u) => u.status === "blocked").length;

// 	/* =======================
//      PIE / DONUT DATA
//   ======================= */

// 	const usersByRole = useMemo(
// 		() => [
// 			{
// 				type: "Admin",
// 				value:
// 					mockUsers.filter((u) => u.role === "admin").length /
// 					totalUsers,
// 			},
// 			{
// 				type: "Manager",
// 				value:
// 					mockUsers.filter((u) => u.role === "manager").length /
// 					totalUsers,
// 			},
// 			{
// 				type: "Viewer",
// 				value:
// 					mockUsers.filter((u) => u.role === "viewer").length /
// 					totalUsers,
// 			},
// 		],
// 		[totalUsers],
// 	);

// 	/* =======================
//      OTHER CHART DATA
//   ======================= */

// 	const usersByStatus = [
// 		{ status: "Active", count: activeUsers },
// 		{ status: "Blocked", count: blockedUsers },
// 	];

// 	const usersGrowth = [
// 		{ month: "Jan", users: 20 },
// 		{ month: "Feb", users: 35 },
// 		{ month: "Mar", users: 55 },
// 		{ month: "Apr", users: 80 },
// 		{ month: "May", users: 120 },
// 	];

// 	/* =======================
//      RENDER
//   ======================= */

// 	const [data, setData] =
// 		React.useState<{ type: string; value: number }[]>(usersByRole);

// 	useEffect(() => {
// 		setData(usersByRole);
// 	}, [usersByRole]);

// 	return (
// 		<>
// 			{/* KPI CARDS */}
// 			<Row gutter={[16, 16]}>
// 				<Col xs={24} lg={24} xl={8}>
// 					<Card>
// 						<Statistic title="Total users" value={totalUsers} />
// 					</Card>
// 				</Col>

// 				<Col xs={24} lg={24} xl={8}>
// 					<Card>
// 						<Statistic
// 							title="Active users"
// 							value={activeUsers}
// 							suffix="users"
// 							styles={{ content: { color: "#3f8600" } }}
// 						/>
// 					</Card>
// 				</Col>

// 				<Col xs={24} lg={24} xl={8}>
// 					<Card>
// 						<Statistic
// 							title="Blocked users"
// 							value={blockedUsers}
// 							suffix="users"
// 							styles={{ content: { color: "#cf1322" } }}
// 						/>
// 					</Card>
// 				</Col>
// 			</Row>

// 			{/* DONUT + COLUMN (STACK UNTIL XL) */}
// 			<Row gutter={[16, 16]} style={{ marginTop: 24 }}>
// 				<Col xs={24} lg={24} xl={12}>
// 					<Card title="Users by role" style={{ height: "100%" }}>
// 						<Pie
// 							data={data}
// 							angleField="value"
// 							colorField="type"
// 							radius={0.9}
// 							innerRadius={0.4}
// 							label={{
// 								text: (item: { type: string; value: number }) =>
// 									`${Math.round(item.value * 100)} %`,
// 								style: {
// 									fontWeight: "bold",
// 									fontSize: "20px",
// 								},
// 							}}
// 							statistic={{
// 								title: {
// 									content: "Total users",
// 									style: {
// 										fontSize: 14,
// 										color: "#8c8c8c",
// 									},
// 								},
// 								content: {
// 									content: "100%",
// 									style: {
// 										fontSize: 24,
// 										fontWeight: 700,
// 									},
// 								},
// 							}}
// 							legend={{
// 								position: "right",
// 							}}
// 							tooltip={{
// 								items: [
// 									(data) => {
// 										return {
// 											name: data.type,
// 											value: `${data.value * 100}%`,
// 										};
// 									},
// 								],
// 							}}
// 						/>
// 					</Card>
// 				</Col>

// 				<Col xs={24} lg={24} xl={12}>
// 					<Card title="Users by status" style={{ height: "100%" }}>
// 						<Column
// 							data={usersByStatus}
// 							xField="status"
// 							yField="count"
// 							label={{
// 								style: { fill: "#fff" },
// 							}}
// 						/>
// 					</Card>
// 				</Col>
// 			</Row>

// 			{/* LINE CHART */}
// 			<Row gutter={[16, 16]} style={{ marginTop: 24 }}>
// 				<Col xs={24}>
// 					<Card title="Users growth">
// 						<Line
// 							data={usersGrowth}
// 							xField="month"
// 							yField="users"
// 							smooth
// 						/>
// 					</Card>
// 				</Col>
// 			</Row>
// 		</>
// 	);
// };

// export default DashboardPage;

import { Card, Col, Row, Statistic, Skeleton } from "antd";
import { Line, Pie, Column } from "@ant-design/charts";
import { useEffect, useMemo, useState } from "react";

import { mockUsers } from "../Users/mockUsers";

/* =======================
   SKELETON COMPONENTS
======================= */

const KpiSkeleton = () => (
	<Card>
		<Skeleton active title={{ width: "60%" }} paragraph={false} />
	</Card>
);

const ChartSkeleton = () => (
	<Card>
		<Skeleton active paragraph={{ rows: 6 }} />
	</Card>
);

/* =======================
   DASHBOARD PAGE
======================= */

const DashboardPage = () => {
	const [loading, setLoading] = useState(true);

	/* Simulate API load */
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1000);
		return () => clearTimeout(timer);
	}, []);

	/* =======================
	   KPI CALCULATIONS
	======================= */

	const totalUsers = mockUsers.length;
	const activeUsers = mockUsers.filter((u) => u.status === "active").length;
	const blockedUsers = mockUsers.filter((u) => u.status === "blocked").length;

	/* =======================
	   CHART DATA
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

	const [data, setData] =
		useState<{ type: string; value: number }[]>(usersByRole);

	useEffect(() => {
		setData(usersByRole);
	}, [usersByRole]);

	return (
		<>
			{/* KPI CARDS */}
			<Row gutter={[16, 16]}>
				<Col xs={24} xl={8}>
					{loading ? (
						<KpiSkeleton />
					) : (
						<Card>
							<Statistic title="Total users" value={totalUsers} />
						</Card>
					)}
				</Col>

				<Col xs={24} xl={8}>
					{loading ? (
						<KpiSkeleton />
					) : (
						<Card>
							<Statistic
								title="Active users"
								value={activeUsers}
								styles={{
									content: { color: "#3f8600" },
								}}
							/>
						</Card>
					)}
				</Col>

				<Col xs={24} xl={8}>
					{loading ? (
						<KpiSkeleton />
					) : (
						<Card>
							<Statistic
								title="Blocked users"
								value={blockedUsers}
								styles={{
									content: { color: "#cf1322" },
								}}
							/>
						</Card>
					)}
				</Col>
			</Row>

			{/* DONUT + COLUMN */}
			<Row gutter={[16, 16]} style={{ marginTop: 24 }}>
				<Col xs={24} xl={12}>
					{loading ? (
						<ChartSkeleton />
					) : (
						<Card title="Users by role">
							<Pie
								data={data}
								angleField="value"
								colorField="type"
								radius={0.9}
								innerRadius={0.4}
								label={{
									text: (item: {
										type: string;
										value: number;
									}) => `${Math.round(item.value * 100)} %`,
									style: {
										fontWeight: "bold",
										fontSize: "20px",
									},
								}}
								statistic={{
									title: {
										content: "Total users",
										style: {
											fontSize: 14,
											color: "#8c8c8c",
										},
									},
									content: {
										content: "100%",
										style: {
											fontSize: 24,
											fontWeight: 700,
										},
									},
								}}
								legend={{
									position: "right",
								}}
								tooltip={{
									items: [
										(data) => {
											return {
												name: data.type,
												value: `${data.value * 100}%`,
											};
										},
									],
								}}
							/>
						</Card>
					)}
				</Col>

				<Col xs={24} xl={12}>
					{loading ? (
						<ChartSkeleton />
					) : (
						<Card title="Users by status">
							<Column
								data={usersByStatus}
								xField="status"
								yField="count"
								label={{
									style: { fill: "#fff" },
								}}
							/>
						</Card>
					)}
				</Col>
			</Row>

			{/* LINE CHART */}
			<Row gutter={[16, 16]} style={{ marginTop: 24 }}>
				<Col xs={24}>
					{loading ? (
						<ChartSkeleton />
					) : (
						<Card title="Users growth">
							<Line
								data={usersGrowth}
								xField="month"
								yField="users"
								smooth
							/>
						</Card>
					)}
				</Col>
			</Row>
		</>
	);
};

export default DashboardPage;
