import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, Radio, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Loading3 } from "../loading/Loading3";
import { deleteData, getData, postData, putData } from "../server/common";
import "./style.css";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
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

const Users = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelected(selectedRows);
    },
  };

  const getUsers = () => {
    getData("users").then((res) => {
      setData(res.data.data);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    let values = form.getFieldValue();
    if (selected.length === 0) {
      postData("users", values).then(() => {
        getUsers();
        form.resetFields();
      });
    } else {
      putData(`users/${selected[0]._id}`, values).then(() => {
        getUsers();
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
    selected.map((user) => {
      deleteData(`users/${user._id}`).then(() => {
        getUsers();
        setSelected([]);
      });
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between  align-items-center">
        <h3>Users</h3>
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
        loading={data.length === 0 ? Loading3 : false}
      />

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <Form {...layout} form={form} name="user">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <Input.Password
              type="password"
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item name="role" label="Role">
            <Radio.Group>
              <Radio value="user">User</Radio>
              <Radio value="publisher">Publisher</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
