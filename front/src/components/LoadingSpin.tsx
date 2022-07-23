import { Space, Spin } from 'antd';

const LoadingSpin = () => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      height: '100%',
      justifyContent: 'center'
    }}
  >
    <Space align="center">
      <Spin
        size="large"
        style={{
          fontSize: "5em !importan"
        }}
      />
    </Space>
  </div>
);

export default LoadingSpin;
