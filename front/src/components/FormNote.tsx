import {  PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, FormInstance, Input, Row, Select, Switch, Tooltip } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { FC, useEffect, useState } from 'react';
import { Note } from './NotesList'
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../store';

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
  // * ========== Mapped from state ==========
  const tags = useAppSelector((state: RootState) => state.tags.tags)

  // * ========== States ==========
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const filteredOptions = tags.filter(o => !selectedItems.includes(o.text));

  console.log({selectedItems, filteredOptions})

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

        <Form.Item label="Select" name="tagsIds">
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Add tag to note"
            defaultValue={
              initialValues?.tags!.map( tag => tag.text )
            }
            value={selectedItems}
            onChange={setSelectedItems}
          >
            {
              filteredOptions.map(tag =>
                <Select.Option key={tag.id} value={tag.id}>
                  {tag.text}
                </Select.Option>
              )
            }
          </Select>
        </Form.Item>

        <Form
          form={formTag}
          onFinish={onSubmitTag}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          layout="inline"
        >
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
      </Row>
    </Form>
  )
}

export default FormNote
