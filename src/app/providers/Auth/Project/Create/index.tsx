import { Button, Form, Input, Modal } from 'antd';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useCreateProject } from '@/services';
import { ICreateProjectRequestType } from '@shared';

type IPropsType = {
  refreshData: () => void;
};

export const CreateProject = ({ refreshData }: IPropsType) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<ICreateProjectRequestType>();
  const [okDisabled, setOkDisabled] = useState(true);

  const { fetchData: createUser, loading } = useCreateProject({
    success: {
      message: 'Project created successfully',
      action: () => {
        refreshData();
        setOpen(false);
      },
    },
  });

  const handleOk = async () => {
    const values = await form.validateFields();
    await createUser({ data: values });
  };

  const handleFieldsChange = () => {
    const hasErrors = form.getFieldsError().some((field) => field.errors.length > 0);
    setOkDisabled(hasErrors);
  };

  return (
    <>
      <Button
        type="primary"
        icon={
          <Plus
            size={16}
            style={{
              marginTop: 4,
            }}
          />
        }
        onClick={() => setOpen(true)}
      >
        Create Project
      </Button>

      <Modal
        title="Create User"
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
        okText="Create"
        okButtonProps={{ disabled: okDisabled, loading }}
        afterClose={() => {
          form.resetFields();
          setOkDisabled(true);
        }}
        destroyOnHidden
        centered
        width={480}
      >
        <Form autoComplete="off" form={form} layout="vertical" onFieldsChange={handleFieldsChange}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input name' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
