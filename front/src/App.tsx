import { CheckOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Form, Layout, notification, PageHeader } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useEffect, useState } from 'react';
import FormNote from './components/FormNote';
import LoadingSpin from './components/LoadingSpin';
import NotesList, { Note } from './components/NotesList';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getAll, insert, updateNote } from './redux/notesSlice';
import { RootState } from './store';

const { Content } = Layout;

const App = () => {
  // * ========== Variables ==========
  const [formNote] = Form.useForm();
  const dispatch = useAppDispatch()

  // * ========== States ==========
  const [showModal, setShowModal] = useState<boolean>(false);
  const [note, setNote] = useState<Note>();

  // * ========== Mapped from state ==========
  const notesStatus = useAppSelector((state: RootState) => state.notes.status)
  const notesFromState = useAppSelector((state: RootState) => state.notes.notes)

  // * ========== Handlers ==========
  const buttonOnClick = () => setShowModal(true)

  const submitNote = async (note: Partial<Note>) => {
    if (note.id) {
      dispatch(updateNote(note))
        .then(() => notification.open({
          message: 'Success',
          description: 'Note updated',
          icon: <CheckOutlined />
        }))
        .then(() => {
          setShowModal(false)
          setNote(undefined)
          formNote.resetFields()
        })
    } else {
      dispatch(insert(note))
        .then(() => notification.open({
          message: 'Success',
          description: 'Note creation',
          icon: <CheckOutlined />
        }))
        .then(() => {
          setShowModal(false)
          setNote(undefined)
          formNote.resetFields()
        })
    }

  }

  const onOkModal = () => {
    formNote.validateFields()
    .then(() => formNote.submit())
    .catch(err => { throw err })
  }

  // * ========== UseEffects ==========
  useEffect(() => {
    if (notesStatus === 'idle') dispatch(getAll())
  }, [dispatch, notesStatus])

  return (
    <Layout
      style={{
        maxHeight: '100vh',
        width: '100vw'
      }}
    >
      <PageHeader
        title="My notes"
        subTitle={<Button onClick={buttonOnClick}>Add note</Button>}
        style={{ padding: '10px 50px' }}
      />
      <Content
        style={{padding: '0 50px' }}
      >
        {notesStatus === 'loading' ? (
          <LoadingSpin />
        ) : (
          <NotesList
            notes={notesFromState}
            setNote={setNote}
            setShowModal={setShowModal}
          />
        ) }
      </Content>
      <Modal
        title="Create note"
        centered
        visible={showModal}
        onCancel={() => setShowModal(false)}
        cancelButtonProps={{ icon: <CloseOutlined /> }}
        okText="Save"
        okButtonProps={{ icon: <SaveOutlined /> }}
        onOk={onOkModal}
        afterClose={() => setNote(undefined)}
      >
        <FormNote
          form={formNote}
          initialValues={note}
          onSubmit={submitNote}
        />
      </Modal>
    </Layout>
  )
}

export default App
