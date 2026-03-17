import { Avatar, Button, Empty, Flex, Input, Segmented, theme, Typography } from 'antd';
import { LucideFolderOpen, Search } from 'lucide-react';
import { CreateProject } from './Create';
import { useEffect, useState } from 'react';
import { useGetProjects } from '@/services';
import { ProjectCard } from './Card';

const { Text } = Typography;

export const Project = () => {
  const [tab, setTab] = useState('Recent');

  const {
    token: { colorBorder, colorPrimary },
  } = theme.useToken();

  const { data: projects, fetchData } = useGetProjects();

  useEffect(() => {
    fetchData();
  }, [tab]);

  return (
    <>
      <Flex
        style={{
          padding: '16px 32px',
          borderBottom: `1px solid ${colorBorder}`,
        }}
        justify="space-between"
      >
        <Flex align="center" gap="small">
          <Avatar
            shape="square"
            icon={<LucideFolderOpen size={18} />}
            style={{
              backgroundColor: 'black',
            }}
          />
          <Text strong>Select your project</Text>
        </Flex>
        <CreateProject refreshData={fetchData} />
      </Flex>
      <Flex
        vertical
        gap="middle"
        style={{
          padding: '16px 32px',
        }}
      >
        <Flex justify="space-between">
          <Segmented<string>
            options={['Recent', 'All Projects', 'Starred']}
            onChange={setTab}
            value={tab}
          />
          <div>
            <Input prefix={<Search size={16} color={colorPrimary} />} />
          </div>
        </Flex>

        {!projects?.length && (
          <div
            style={{
              padding: '32px',
            }}
          >
            <Empty />
          </div>
        )}

        <Flex
          gap="middle"
          style={{
            marginTop: 16,
          }}
        >
          {projects?.map((project) => (
            <ProjectCard project={project} />
          ))}
        </Flex>
      </Flex>
    </>
  );
};
