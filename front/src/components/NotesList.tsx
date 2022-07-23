import { DeleteOutlined, FolderAddOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, List, Row } from 'antd'
import { FC } from 'react';
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
}

const NotesList: FC<NotesListProps> = ({
  notes,
}) => {
  // * ========== Variables ==========
  const dispatch = useAppDispatch()

  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={notes}
      renderItem={(note: Note) => (
        <List.Item>
          <Card
            hoverable
            title={note.title}
          >
            <h2>{note.content}</h2>
            <Row>
              <Col flex="1 1 30px">
                <Button
                  icon={<PlusOutlined />}
                  role="button"
                  // onClick={editOnClick}
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
                  onClick={() => dispatch(deleteNote(note.id))}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  )
}

export default NotesList