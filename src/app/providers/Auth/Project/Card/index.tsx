import { IProjectType } from '@shared';
import { Avatar, Card, Flex } from 'antd';
import { Edit, Folder, MoreHorizontal, Settings } from 'lucide-react';

const { Meta } = Card;

type IPropsType = {
  project: IProjectType;
};

export const ProjectCard = ({ project }: IPropsType) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <div
          style={{
            backgroundColor: 'rgb(95, 123, 216)',
            height: 120,
          }}
        />
      }
      actions={[
        <Settings
          key="setting"
          size={18}
          style={{
            verticalAlign: 'middle',
          }}
        />,
        <Edit
          key="edit"
          size={18}
          style={{
            verticalAlign: 'middle',
          }}
        />,
        <MoreHorizontal
          key="ellipsis"
          size={18}
          style={{
            verticalAlign: 'middle',
          }}
        />,
      ]}
    >
      <Meta
        avatar={
          <Folder
            size={18}
            style={{
              verticalAlign: 'middle',
            }}
          />
        }
        title={project.name}
        description="A project for Tauri Starter"
      />
    </Card>
  );
};
