import { DeleteOutlined, EditOutlined, FileOutlined, FolderAddOutlined } from '@ant-design/icons';
import { Button, Card, Col, List, Modal, Row, Space } from 'antd'
import Meta from 'antd/lib/card/Meta';
import { Dispatch, FC, SetStateAction } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { deleteNote } from '../redux/notesSlice';

export type Note = {
  id: number,
  title: string,
  content: string,
  archived: boolean,
}

type NotesListProps = {
  notes: Note[],
  setNote: Dispatch<SetStateAction<Note | undefined>>,
  setShowModal: Dispatch<SetStateAction<boolean>>,
}

const { confirm } = Modal;

const NotesList: FC<NotesListProps> = ({
  notes,
  setNote,
  setShowModal,
}) => {
  // * ========== Variables ==========
  const dispatch = useAppDispatch()

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
            // title={note.title}
          >
            <Meta
              avatar={<FileOutlined style={{fontSize: "3em"}}/>}
              title={
                <>
                  <h2>{note.title}</h2>
                </>
              }
              description={
                <>
                  <p>{note.content}</p>
                  <Space>
                    <Col >
                      <Button
                        icon={<EditOutlined />}
                        size="large"
                        role="button"
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
                        // onClick={}
                      >
                        Archive
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

            {/* <h3>{note.content}</h3> */}
            {/* <Row>
              <Col flex="1 1 30px">
                <Button
                  icon={<EditOutlined />}
                  role="button"
                  onClick={() => editHandler(note)}
                >
                  Edit
                </Button>
              </Col>
              <Col flex="1 1 30px">
                <Button
                  icon={<FolderAddOutlined />}
                  role="button"
                  // onClick={}
                >
                  Archive
                </Button>
              </Col>
              <Col flex="1 1 30px">
                <Button
                  icon={<DeleteOutlined />}
                  role="button"
                  onClick={() => deleteHandler(note)}
                >
                  Delete
                </Button>
              </Col>
            </Row> */}
          </Card>
        </List.Item>
      )}
    />
  )
}

export default NotesList