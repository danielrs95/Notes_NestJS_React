import { Col, Form, FormInstance, Input, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { FC, useEffect } from 'react';
import { Note } from './NotesList'

type FormNoteProps = {
  form: FormInstance;
  initialValues?: Partial<Note>;
  onSubmit: (note: Partial<Note>) => void;
}

const FormNote: FC<FormNoteProps> = ({
  form,
  initialValues,
  onSubmit,
}) => {
  useEffect(() => {
    form?.resetFields();
  }, [form, initialValues]);

  return (
    <Form<Note>
      onFinish={onSubmit}
      initialValues={initialValues}
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      >
      <Row justify="center">
        <Form.Item hidden name="id" />
        <Form.Item hidden name="archieved" />

        <Col flex="1 1 300px">
          <Form.Item label="Title" name="title" required>
            <Input />
          </Form.Item>
        </Col>

        <Col flex="1 1 300px">
          <Form.Item label="Content" name="content" required>
            <TextArea />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default FormNote
