import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Table,
} from "antd";
import { MINIMUMSKILLS } from "../const";
import { deleteData, getData, putData } from "../server/common";
import { Loading1 } from "../loading/Loading1";
import "./style.css";
import TextArea from "antd/lib/input/TextArea";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Minimum Skill",
    dataIndex: "minimumSkill",
  },
  {
    title: "Tuition",
    dataIndex: "tuition",
  },
  {
    title: "Weeks",
    dataIndex: "weeks",
  },
];

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const Courses = () => {
  const [form] = Form.useForm();
  const [selected, setSelected] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelected(selectedRows);
    },
  };

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    getData("courses").then((res) => {
      setData(res.data.data);
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    let values = form.getFieldsValue();
    if (selected.length === 0) {
    } else {
      putData(`courses/${selected[0]._id}`, values).then(() => {
        getCourses();
        setSelected([]);
        form.resetFields();
      });
    }
  };

  const edit = () => {
    form.setFieldsValue(selected[0]);
    showModal();
  };

  const Delete = () => {
    selected.map((cour) => {
      deleteData(`courses/${cour._id}`).then(() => {
        getCourses();
        setSelected([]);
      });
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between  align-items-center">
        <h3>Courses</h3>
        {selected.length !== 0 && (
          <div id="actions">
            {selected.length === 1 && (
              <Button className="me-2" type="primary" onClick={edit}>
                Edit
              </Button>
            )}
            <Button type="danger" onClick={Delete}>
              Delete
            </Button>
          </div>
        )}
        <Button type="primary" onClick={showModal}>
          Add
        </Button>
      </div>

      <Divider />

      <Table
        rowSelection={{
          type: "chackbox",
          ...rowSelection,
          selectedRowKeys: selected.map((item) => item._id),
        }}
        rowKey="_id"
        columns={columns}
        dataSource={data}
        loading={data.length === 0 ? Loading1 : false}
      />

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          form={form}
          name="user"
          initialValues={{ scholarshipAvailable: false }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="minimumSkill"
            label="Minimum Skill"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select careers"
            >
              {MINIMUMSKILLS.map((minimumSkill, index) => (
                <Select.Option key={index} value={minimumSkill}>
                  {minimumSkill}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="tuition"
            label="Tuition"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="weeks"
            label="Weeks"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descreption"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item name="scholarshipAvailable" label="Scholar ship Available">
            <Radio.Group>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Courses;
