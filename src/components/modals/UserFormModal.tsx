import { Modal, Form, Input, Select } from "antd";
import { useEffect } from "react";
import type { User, UserRole, UserStatus } from "../../types/user";

interface Props {
	open: boolean;
	onCancel: () => void;
	onSubmit: (values: UserFormValues) => void;
	initialValues?: User;
}

export interface UserFormValues {
	name: string;
	email: string;
	role: UserRole;
	status: UserStatus;
}

const UserFormModal = ({ open, onCancel, onSubmit, initialValues }: Props) => {
	const [form] = Form.useForm<UserFormValues>();

	useEffect(() => {
		if (initialValues) {
			form.setFieldsValue(initialValues);
		} else {
			form.resetFields();
		}
	}, [initialValues, form]);

	return (
		<Modal
			open={open}
			title={initialValues ? "Edit User" : "Create User"}
			okText={initialValues ? "Save" : "Create"}
			onCancel={onCancel}
			onOk={() => form.submit()}
			destroyOnHidden
		>
			<Form form={form} layout="vertical" onFinish={onSubmit}>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: true, message: "Name is required" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					rules={[
						{ required: true, message: "Email is required" },
						{ type: "email", message: "Invalid email" },
					]}
				>
					<Input disabled={!!initialValues} />
				</Form.Item>

				<Form.Item
					label="Role"
					name="role"
					rules={[{ required: true }]}
				>
					<Select
						options={[
							{ label: "Admin", value: "admin" },
							{ label: "Manager", value: "manager" },
							{ label: "Viewer", value: "viewer" },
						]}
					/>
				</Form.Item>

				<Form.Item
					label="Status"
					name="status"
					rules={[{ required: true }]}
				>
					<Select
						options={[
							{ label: "Active", value: "active" },
							{ label: "Blocked", value: "blocked" },
						]}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default UserFormModal;
