import { Card, Col, Row, Statistic, Skeleton } from "antd";
import { Line, Pie, Column } from "@ant-design/charts";
import { useEffect, useMemo, useState } from "react";

import { mockUsers } from "../Users/mockUsers";
import "../../styles/dashboard.css";

const KpiSkeleton = () => (
	<Card className="dashboard-card kpi-skeleton">
		<Skeleton active title={{ width: "60%" }} paragraph={false} />
	</Card>
);

const ChartSkeleton = () => (
	<Card className="chart-card">
		<Skeleton active paragraph={{ rows: 6 }} />
	</Card>
);

const DashboardPage = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1000);
		return () => clearTimeout(timer);
	}, []);

	const totalUsers = mockUsers.length;
	const activeUsers = mockUsers.filter((u) => u.status === "active").length;
	const blockedUsers = mockUsers.filter((u) => u.status === "blocked").length;

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
		<div className="dashboard-page">
			{/* KPI CARDS */}
			<Row gutter={[16, 16]}>
				<Col xs={24} xl={8}>
					{loading ? (
						<KpiSkeleton />
					) : (
						<Card className="dashboard-card">
							<Statistic title="Total users" value={totalUsers} />
						</Card>
					)}
				</Col>

				<Col xs={24} xl={8}>
					{loading ? (
						<KpiSkeleton />
					) : (
						<Card className="dashboard-card stat-active">
							<Statistic
								title="Active users"
								value={activeUsers}
							/>
						</Card>
					)}
				</Col>

				<Col xs={24} xl={8}>
					{loading ? (
						<KpiSkeleton />
					) : (
						<Card className="dashboard-card stat-blocked">
							<Statistic
								title="Blocked users"
								value={blockedUsers}
							/>
						</Card>
					)}
				</Col>
			</Row>

			{/* Donut + Column */}
			<Row gutter={[16, 16]} className="dashboard-section">
				<Col xs={24} xl={12}>
					{loading ? (
						<ChartSkeleton />
					) : (
						<Card title="Users by role" className="chart-card">
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
									className: "pie-label",
								}}
								statistic={{
									title: {
										content: "Total users",
									},
									content: {
										content: "100%",
									},
								}}
								legend={{
									position: "right",
								}}
								tooltip={{
									items: [
										(data) => ({
											name: data.type,
											value: `${data.value * 100}%`,
										}),
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
						<Card title="Users by status" className="chart-card">
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

			{/* Line Chart */}
			<Row gutter={[16, 16]} className="dashboard-section">
				<Col xs={24}>
					{loading ? (
						<ChartSkeleton />
					) : (
						<Card title="Users growth" className="chart-card">
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
		</div>
	);
};

export default DashboardPage;
