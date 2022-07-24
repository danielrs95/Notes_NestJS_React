import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, FormInstance, Input, List, Row, Select, Space, Switch, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { Option } from 'antd/lib/mentions';
import { FC, useEffect, useState } from 'react';
import { Note } from './NotesList'

type FormNoteProps = {
  form: FormInstance;
  formTag: FormInstance;
  initialValues?: Partial<Note>;
  note?: boolean;
  onSubmit: (note: Partial<Note>) => void;
  onSubmitTag: (note: Partial<Note>) => void;
}

const FormNote: FC<FormNoteProps> = ({
  form,
  formTag,
  initialValues,
  note,
  onSubmit,
  onSubmitTag,
}) => {
  useEffect(() => {
    form?.resetFields();
  }, [form, initialValues]);

  return (
    <Form<Note>
      onFinish={onSubmit}
      initialValues={initialValues}
      form={form}
      size='large'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      >
      <Row style={{flexDirection: "column"}} >
        <Form.Item hidden name="id" />
        <Form.Item hidden name="archieved" />

        <Col>
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item label="Content" name="content">
            <TextArea />
          </Form.Item>
        </Col>

        { note ? (
          <Col>
            <Form.Item label="Archive" name="archived" >
              <Switch />
            </Form.Item>
          </Col>
        ) : <></>}

        { initialValues ? (
          <Col>
            <List
              size="small"
              bordered
            >
              {initialValues.tags!.map(
                tag => <List.Item>{tag.text}</List.Item>
              )}
            </List>
            <Form
              form={formTag}
              onFinish={onSubmitTag}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
              layout="inline"
            >
              <Form.Item hidden name="noteId" initialValue={initialValues.id} />
              <Form.Item label="tag" name="text" style={{width: '70%'}}>
                <Input />
              </Form.Item>
              <Button
                type="primary"
                onClick={() => formTag.submit()}
                // onClick={() => console.log(initialValues)}
                // htmlType="submit"
              >
                Add
              </Button>
            </Form>
          </Col>
        ) : null}
      </Row>
    </Form>
  )
}

export default FormNote
