import { Flex, Typography } from 'antd';
import type { LucideIcon } from 'lucide-react';

const { Title, Text } = Typography;

type IPropsType = {
  Icon?: LucideIcon;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

export const TitleBar = ({ Icon, title, description, action }: IPropsType) => (
  <Flex
    align="center"
    justify="space-between"
    style={{
      margin: '12px 0',
    }}
    wrap="wrap"
  >
    <Flex align="center" gap="middle">
      {Icon && (
        <Flex justify="center" align="center">
          <Icon />
        </Flex>
      )}
      <Flex vertical>
        <Title
          level={5}
          style={{
            margin: 0,
          }}
        >
          {title}
        </Title>
        <Text
          type="secondary"
          style={{
            whiteSpace: 'normal',
            fontWeight: 400,
            fontSize: 13,
          }}
        >
          {description}
        </Text>
      </Flex>
    </Flex>
    <div>{action}</div>
  </Flex>
);
