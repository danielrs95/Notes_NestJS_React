import { CheckOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Form, Layout, notification, PageHeader } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FormNote from './components/FormNote';
import NotesList, { Note } from './components/NotesList';

const App = () => {
  // * ========== Variables ==========
  const [formNote] = Form.useForm();

  // * ========== States ==========
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  // * ========== Handlers ==========
  const buttonOnClick = () => setShowModal(true)

  const submitNote = async (note: Partial<Note>) => {
    console.log(note)
    await axios.post('/api/notes', note)
      .then(() => notification.open({
        message: 'Success',
        description: 'Note creation',
        icon: <CheckOutlined />
      }))
      .then(() => setShowModal(false))
  }

  const onOkModal = () => {
    formNote.validateFields()
    .then(() => formNote.submit())
    .catch(err => { throw err })
  }

  // * ========== UseEffects ==========
  useEffect(() => {
    axios.get('/api/notes')
    .then(response => setNotes(response.data))
    .catch(err => { throw err })
  }, [])

  return (
    <Layout>
      <PageHeader
        title="My notes"
        subTitle={<Button onClick={buttonOnClick}>Add note</Button>}
      />
      <NotesList
        notes={notes}
      />
      <Modal
        title="Create note"
        centered
        visible={showModal}
        onCancel={() => setShowModal(false)}
        cancelButtonProps={{ icon: <CloseOutlined /> }}
        okText="Save"
        okButtonProps={{ icon: <SaveOutlined /> }}
        onOk={onOkModal}
      >
        <FormNote
          form={formNote}
          initialValues={{}}
          onSubmit={submitNote}
        />
      </Modal>
    </Layout>
  )
}

export default App
