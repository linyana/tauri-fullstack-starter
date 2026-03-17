import { Layout } from '@/providers';
import { Spin } from 'antd';

export const GlobalLoading = () => {
  return (
    <Layout.Centered>
      <Spin
        size="large"
        description={
          <div
            style={{
              marginTop: 16,
            }}
          >
            Loading...
          </div>
        }
      >
        <div style={{ padding: 50 }} />
      </Spin>
    </Layout.Centered>
  );
};
