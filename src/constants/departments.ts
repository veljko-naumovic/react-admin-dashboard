import type { TreeSelectProps } from "antd";

export const departmentsTree: TreeSelectProps["treeData"] = [
	{
		title: "Company",
		value: "company",
		children: [
			{
				title: "Engineering",
				value: "engineering",
				children: [
					{ title: "Frontend", value: "engineering_frontend" },
					{ title: "Backend", value: "engineering_backend" },
				],
			},
			{
				title: "Sales",
				value: "sales",
				children: [
					{ title: "Online", value: "sales_online" },
					{ title: "Retail", value: "sales_retail" },
				],
			},
			{
				title: "HR",
				value: "hr",
			},
		],
	},
];
