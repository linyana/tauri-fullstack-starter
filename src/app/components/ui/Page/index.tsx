import { Link } from 'react-router-dom';
import { Button, type FlexProps, Typography, Flex, Avatar } from 'antd';
import { ChevronLeft, type LucideIcon } from 'lucide-react';

type IPropsType = {
  backTo?: string;
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  Icon?: LucideIcon;
  contentProps?: FlexProps | null;
};

const { Title, Text } = Typography;

export const Page = ({
  backTo,
  children,
  title,
  description,
  actions,
  Icon,
  contentProps = {
    vertical: true,
    gap: 'middle',
  },
}: IPropsType) => {
  return (
    <>
      {backTo && (
        <Link to={backTo} style={{ display: 'inline-block', marginBottom: 16 }}>
          <Button
            style={{ padding: 0 }}
            size="small"
            icon={
              <ChevronLeft
                size={14}
                style={{
                  marginTop: 4,
                }}
              />
            }
            color="default"
            variant="link"
          >
            Back
          </Button>
        </Link>
      )}
      <Flex style={{ width: '100%', paddingBottom: 16 }} justify="space-between" align="flex-start">
        <Flex align="center" gap={12}>
          {Icon && (
            <Avatar
              size={48}
              style={{
                background: '#fff',
                border: '1px solid #d9d9d9',
                color: 'black',
              }}
            >
              <Flex align="center" justify="center">
                <Icon />
              </Flex>
            </Avatar>
          )}
          {title && (
            <div>
              <Title
                level={3}
                style={{
                  margin: 0,
                  minWidth: 80,
                }}
              >
                {title}
              </Title>
              <div>
                {description && (
                  <Text type="secondary" style={{ fontSize: 13, whiteSpace: 'normal' }}>
                    {description}
                  </Text>
                )}
              </div>
            </div>
          )}
        </Flex>
        <Flex gap={16}>{actions}</Flex>
      </Flex>
      {contentProps ? <Flex {...contentProps}>{children}</Flex> : <>{children}</>}
    </>
  );
};
