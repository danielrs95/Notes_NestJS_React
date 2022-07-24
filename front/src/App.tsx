import { CheckOutlined, CloseOutlined, FolderAddOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Form, Layout, notification, PageHeader, Space } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useEffect, useState } from 'react';
import FormNote from './components/FormNote';
import LoadingSpin from './components/LoadingSpin';
import NotesList, { Note, Tag } from './components/NotesList';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { addTag, getAll, getAllArchived, insert, removeTag, updateNote } from './redux/notesSlice';
import { RootState } from './store';

const { Content } = Layout;

const App = () => {
  // * ========== Variables ==========
  const [formNote] = Form.useForm();
  const [formTag] = Form.useForm();
  const dispatch = useAppDispatch()

  // * ========== States ==========
  const [showModal, setShowModal] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<Note>();

  // * ========== Mapped from state ==========
  const notesStatus = useAppSelector((state: RootState) => state.notes.status)
  const notesFromState = useAppSelector((state: RootState) => state.notes.notes)
  const showArchived = useAppSelector((state: RootState) => state.notes.showingArchived)
  const idLastUpdatedNote = useAppSelector((state: RootState) => state.notes.idLastUpdatedNote)
  const lastUpdatedNote = useAppSelector((state: RootState) => {
    return state.notes.notes.filter(
      note => note.id === idLastUpdatedNote
    )
  })

  // * ========== Handlers ==========
  const addNoteOnClick = () => setShowModal(true)
  const showArchivedOnClick = () => {
    showArchived ? dispatch(getAll()) : dispatch(getAllArchived())
  }

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
          setInitialValues(undefined)
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
          setInitialValues(undefined)
          formNote.resetFields()
        })
    }
  }

  const submitTag = async (tag: Partial<Tag>) => {
    dispatch(addTag(tag))
  }

  const onDeleteTag = async (id:number) => {
    dispatch(removeTag(id))
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

  // Update initialValues of note being shown on Modal
  useEffect(() => {
    if (idLastUpdatedNote !== 0) setInitialValues(lastUpdatedNote[0])
  }, [notesFromState, idLastUpdatedNote, lastUpdatedNote])

  return (
    <Layout
      style={{
        height: '100vh',
        width: '100vw'
      }}
    >
      <PageHeader>
        <span style={{
          fontSize: '3em',
          padding: '10px 50px'
        }}>
          { showArchived ? "Archived" : "My notes"}
        </span>
        <Space>
          <Button
            onClick={addNoteOnClick}
            disabled={showArchived}
            icon={<PlusOutlined />}
            size="large"
            role="button"
            shape='round'
          >
            Add note
          </Button>
          <Button
            onClick={showArchivedOnClick}
            icon={<FolderAddOutlined />}
            size="large"
            role="button"
            shape='round'
          >
            { showArchived ? "Back to Notes" : "Show Archived"}
          </Button>
        </Space>
      </PageHeader>
      <Content
        style={{padding: '0 50px' }}
      >
        {notesStatus === 'loading' ? (
          <LoadingSpin />
        ) : (
          <NotesList
            notes={notesFromState}
            setNote={setInitialValues}
            setShowModal={setShowModal}
            showArchived={showArchived}
          />
        ) }
      </Content>
      <Modal
        title={
          initialValues
            ? <span style={{fontSize: "2em"}}>Edit note</span>
            : <span style={{fontSize: "2em"}}>Add note</span>
        }
        centered
        visible={showModal}
        onCancel={() => setShowModal(false)}
        cancelButtonProps={{
          icon: <CloseOutlined />,
          size: "middle",
          shape: "round"
        }}
        okText={ initialValues ? "Update" : "Save"}
        okButtonProps={{
          icon: <SaveOutlined />,
          size: "middle",
          shape: "round",
          type: "default"
        }}
        onOk={onOkModal}
        afterClose={() => setInitialValues(undefined)}
      >
        <FormNote
          form={formNote}
          formTag={formTag}
          initialValues={initialValues}
          onSubmit={submitNote}
          onSubmitTag={submitTag}
          onDeleteTag={onDeleteTag}
          note={!!initialValues}
        />
      </Modal>
    </Layout>
  )
}

export default App
