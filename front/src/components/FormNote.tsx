import { DeleteOutlined, PlusOutlined, TagOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, FormInstance, Input, List, Row, Select, Space, Switch, Tooltip, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { Option } from 'antd/lib/mentions';
import { FC, useEffect, useState } from 'react';
import { Note } from './NotesList'
import VirtualList from 'rc-virtual-list';

type FormNoteProps = {
  form: FormInstance;
  formTag: FormInstance;
  initialValues?: Partial<Note>;
  note?: boolean;
  onSubmit: (note: Partial<Note>) => void;
  onSubmitTag: (note: Partial<Note>) => void;
  onDeleteTag: (id:number) => void;
}

const FormNote: FC<FormNoteProps> = ({
  form,
  formTag,
  initialValues,
  note,
  onSubmit,
  onSubmitTag,
  onDeleteTag,
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
          <Col style={{ margin: "0px 20px" }}>
            <List
              size="small"
              bordered
            >
              <VirtualList
                data={initialValues.tags!}
                height={250}
                itemKey="tag"
                style={{margin: "0"}}
              >
                {(item) => (
                  <List.Item>
                    <TagOutlined />
                    <h4>{item.text}</h4>
                    <Tooltip title="Delete tag">
                      <Button
                        size='middle'
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => onDeleteTag(item.id)}
                      />
                    </Tooltip>
                  </List.Item>
                )}
              </VirtualList>
            </List>
            <Form
              form={formTag}
              onFinish={onSubmitTag}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
              layout="inline"
            >
              <Form.Item hidden name="noteId" initialValue={initialValues.id} />
              <Form.Item label="Tags" name="text" style={{ flex: "1 1 0%", margin: "10px 0" }}>
                <Input />
              </Form.Item>
              <Tooltip title="Add tag">
                <Button
                  type="default"
                  size='middle'
                  shape="circle"
                  onClick={() => formTag.submit()}
                  style={{ margin: "10px 0", flex: "0 1 0" }}
                  icon={<PlusOutlined />}
                />
              </Tooltip>
            </Form>
          </Col>
        ) : null}
      </Row>
    </Form>
  )
}

export default FormNote
