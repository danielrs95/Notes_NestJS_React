import { CheckOutlined, DeleteOutlined, EditOutlined, FileOutlined, FolderAddOutlined } from '@ant-design/icons';
import { Button, Card, Col, List, Modal, notification, Space } from 'antd'
import Meta from 'antd/lib/card/Meta';
import { Dispatch, FC, SetStateAction } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { archiveNote, deleteNote, restoreNote } from '../redux/notesSlice';

export type Note = {
  id: number,
  title: string,
  content: string,
  archived: boolean,
  tags: Tag[]
}

export type Tag = {
  id: number,
  text: string,
}

type NotesListProps = {
  notes: Note[],
  showArchived: boolean,
  setNote: Dispatch<SetStateAction<Note | undefined>>,
  setShowModal: Dispatch<SetStateAction<boolean>>,
}

const { confirm } = Modal;

const NotesList: FC<NotesListProps> = ({
  notes,
  showArchived,
  setNote,
  setShowModal,
}) => {
  // * ========== Variables ==========
  const dispatch = useAppDispatch()

  // * ========== Handlers ==========
  const deleteHandler = (note: Note) => {
    confirm({
      title: "Delete",
      content: "This operation can't be undone, continue?",
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'No',
      // Return a promise from onOk to later run logic
      onOk() {
        return new Promise((resolve) => {
          // unwrap return a promise wich we can then chain
          dispatch(deleteNote(note.id)).unwrap().then(() => resolve(true))
        })
      },
    });
  }

  const editHandler = (note: Note) => {
    setNote(note)
    setShowModal(true)
  }

  const archiveHandler = (note: Note) => {
    showArchived
      ? dispatch(restoreNote(note))
          .then(() => notification.open({
            message: 'Success',
            description: 'Note restored',
            icon: <CheckOutlined />
          }))
      : dispatch(archiveNote(note))
          .then(() => notification.open({
            message: 'Success',
            description: 'Note archived',
            icon: <CheckOutlined />
          }))
  }

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      dataSource={notes}
      renderItem={(note: Note) => (
        <List.Item>
          <Card
            hoverable
          >
            <Meta
              avatar={<FileOutlined style={{fontSize: "2em"}}/>}
              title={<h2>{note.title}</h2>}
              description={
                <>
                  <p>{note.content}</p>
                  <Space>
                    <Col >
                      <Button
                        icon={<EditOutlined />}
                        size="large"
                        role="button"
                        disabled={showArchived}
                        onClick={() => editHandler(note)}
                      >
                        Edit
                      </Button>
                    </Col>
                    <Col >
                      <Button
                        icon={<FolderAddOutlined />}
                        size="large"
                        role="button"
                        onClick={() => archiveHandler(note)}
                      >
                        { showArchived ? "Restore" : "Archive"}
                      </Button>
                    </Col>
                    <Col >
                      <Button
                        icon={<DeleteOutlined />}
                        size="large"
                        role="button"
                        onClick={() => deleteHandler(note)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Space>
                </>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  )
}

export default NotesList