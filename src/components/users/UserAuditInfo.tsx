import { Descriptions } from "antd";
import dayjs from "dayjs";
import type { User } from "../../types/user";

interface Props {
	user: User;
}

const UserAuditInfo = ({ user }: Props) => {
	return (
		<Descriptions size="small" column={1} bordered>
			<Descriptions.Item label="Created by">
				{user.createdBy}
			</Descriptions.Item>

			<Descriptions.Item label="Created at">
				{dayjs(user.createdAt).format("DD.MM.YYYY HH:mm")}
			</Descriptions.Item>

			{user.updatedAt && (
				<Descriptions.Item label="Updated at">
					{dayjs(user.updatedAt).format("DD.MM.YYYY HH:mm")}
				</Descriptions.Item>
			)}

			{user.lastLoginAt && (
				<Descriptions.Item label="Last login">
					{dayjs(user.lastLoginAt).format("DD.MM.YYYY HH:mm")}
				</Descriptions.Item>
			)}

			{user.lastLoginIp && (
				<Descriptions.Item label="Last login IP">
					{user.lastLoginIp}
				</Descriptions.Item>
			)}
		</Descriptions>
	);
};

export default UserAuditInfo;
