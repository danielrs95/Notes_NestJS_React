import { CheckOutlined, DeleteOutlined, EditOutlined, FileOutlined, FolderAddOutlined, TagOutlined } from '@ant-design/icons';
import { Button, Card, Col, List, Modal, notification, Row, Tag, Tooltip, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta';
// import Paragraph from 'antd/lib/skeleton/Paragraph';
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
  note: Note[],
}

type NotesListProps = {
  notes: Note[],
  showArchived: boolean,
  setNote: Dispatch<SetStateAction<Note | undefined>>,
  setShowModal: Dispatch<SetStateAction<boolean>>,
}

const { confirm } = Modal;
const { Paragraph } = Typography

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
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 2,
      }}
      dataSource={notes}
      renderItem={(note: Note) => (
        <List.Item>
          <Card
            hoverable
          >
            <Meta
              avatar={
                <div
                  style={{
                    minHeight: "100%",
                    fontSize: "2.5em"
                  }}
                >
                  <FileOutlined/>
                </div>
              }
              title={<h3>{note.title}</h3>}
              description={
                <>
                  <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
                    {note.content}
                  </Paragraph>
                  <Row justify='start' gutter={16}>
                    <Col>
                      <Tooltip title="Edit">
                        <Button
                          icon={<EditOutlined />}
                          size="middle"
                          role="button"
                          shape='circle'
                          disabled={showArchived}
                          onClick={() => editHandler(note)}
                        />
                      </Tooltip>
                    </Col>
                    <Col >
                      <Tooltip title={ showArchived ? "Restore" : "Archive"}>
                        <Button
                          icon={<FolderAddOutlined />}
                          size="middle"
                          role="button"
                          shape='circle'
                          onClick={() => archiveHandler(note)}
                        />
                      </Tooltip>
                    </Col>
                    <Col >
                      <Tooltip title="Edit">
                        <Button
                          icon={<DeleteOutlined />}
                          size="middle"
                          role="button"
                          shape='circle'
                          onClick={() => deleteHandler(note)}
                        />
                      </Tooltip>
                    </Col>
                    {
                      note.tags.map(
                        (tag) => <Tag icon={<TagOutlined/>}>{tag.text}</Tag>
                      )
                    }
                  </Row>
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