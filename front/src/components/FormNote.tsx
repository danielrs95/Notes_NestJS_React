import { Col, Form, Input, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { Note } from './NotesList'

const FormNote = () => {
  return (
    <Form<Note>
      // onFinish={onSubmit}
      // initialValues={initialValues}
      // form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      // layout="horizontal"
      >
      <Row justify="center">
        <Form.Item hidden name="id" />

        <Col flex="1 1 300px">
          <Form.Item label="Title">
            <Input />
          </Form.Item>
        </Col>

        <Col flex="1 1 300px">
          <Form.Item label="Content">
            <TextArea />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default FormNote
