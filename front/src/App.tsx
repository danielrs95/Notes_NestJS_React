import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Layout, PageHeader } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import FormNote from './components/FormNote';
import NotesList from './components/NotesList';

function App() {
  // * ========== States ==========
  const [showModal, setShowModal] = useState<boolean>(false);

  // * ========== Handlers ==========
  const buttonOnClick = () => setShowModal(true)

  return (
    <Layout>
      <PageHeader
        title="My notes"
        subTitle={<Button onClick={buttonOnClick}>Add note</Button>}
      />
      <NotesList />
      <Modal
        title="Create note"
        centered
        visible={showModal}
        onCancel={() => setShowModal(false)}
        cancelButtonProps={{ icon: <CloseOutlined /> }}
        okText="Save"
        okButtonProps={{ icon: <SaveOutlined /> }}
      >
        <FormNote />
      </Modal>
    </Layout>
  );
}

export default App;
