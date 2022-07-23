import { CheckOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Form, Layout, notification, PageHeader } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import FormNote from './components/FormNote';
import NotesList, { Note } from './components/NotesList';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getNotes } from './redux/notesSlice';
import { RootState } from './store';

const App = () => {
  // * ========== Variables ==========
  const [formNote] = Form.useForm();
  const dispatch = useAppDispatch()

  // * ========== States ==========
  const [showModal, setShowModal] = useState<boolean>(false);

  // * ========== Mapped from state ==========
  const notesStatus = useAppSelector((state: RootState) => state.notes.status)
  const notesFromState = useAppSelector((state: RootState) => state.notes.notes)

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
    if (notesStatus === 'idle') dispatch(getNotes())
  }, [dispatch, notesStatus])

  return (
    <Layout>
      <PageHeader
        title="My notes"
        subTitle={<Button onClick={buttonOnClick}>Add note</Button>}
      />
      <NotesList
        notes={notesFromState}
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

const mapStateToProps = (state: any) => {
  const { notes } = state
  console.log(state)
  return { notes }
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
