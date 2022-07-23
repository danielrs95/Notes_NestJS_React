import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, List, Row } from 'antd'
import { FC } from 'react';

export type Note = {
  title: string,
  content: string,
  archived: boolean,
}

type NotesListProps = {
  notes: Note[],
}

const NotesList: FC<NotesListProps> = ({
  notes,
}) => (
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
            >
              Edit
            </Button>
          </Col>
          </Row>
        </Card>
      </List.Item>
    )}
  />
)

export default NotesList