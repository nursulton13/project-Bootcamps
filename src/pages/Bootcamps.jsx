import React, { useEffect, useState } from "react";
import {
  Table,
  Radio,
  Divider,
  Button,
  Modal,
  Form,
  Input,
  Select,
  AutoComplete,
  message,
} from "antd";
import { CAREERS } from "../const";
import { deleteData, getData, postData, putData } from "../server/common";
import "./style.css";
import { Loading3 } from "../loading/Loading3";
import TextArea from "antd/lib/input/TextArea";
import { Loading4 } from "../loading/loading4";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Website",
    dataIndex: "website",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Careers",
    dataIndex: "careers",
  },
  {
    title: "Address",
    dataIndex: "location",
    render: (_, row) => row.location.city,
    key: "address",
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

const Bootcamps = () => {
  const [form] = Form.useForm();
  const [selected, setSelected] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [data, setData] = useState([]);

  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelected(selectedRows);
    },
  };

  useEffect(() => {
    getBotcamps();
  }, []);

  const getBotcamps = () => {
    getData("bootcamps").then((res) => {
      setData(res.data.data);
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (
      (form.getFieldsValue().name === undefined,
      form.getFieldsValue().description === undefined,
      form.getFieldsValue().slug === undefined,
      form.getFieldsValue().phone === undefined,
      form.getFieldsValue().website === undefined,
      form.getFieldsValue().address === undefined,
      form.getFieldsValue().careers === undefined,
      form.getFieldsValue().user === undefined)
    ) {
      message.error("Please, fill out the form completely!");
    } else {
      setIsModalVisible(false);
      let values = form.getFieldValue();
      if (selected.length === 0) {
        postData("bootcamps", values).then((res) => {
          getBotcamps();
          form.resetFields();
        });
      } else {
        putData(`bootcamps/${selected[0].id}`, values).then((res) => {
          getBotcamps();
          setSelected([]);
          form.resetFields();
        });
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net", ".uz"].map(
          (domain) => `https://${value}${domain}`
        )
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const edit = () => {
    form.setFieldsValue(selected[0]);
    showModal();
  };

  const Delete = () => {
    selected.map((botcamp) => {
      deleteData(`bootcamps/${botcamp.id}`).then(() => {
        getBotcamps();
        setSelected([]);
      });
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between  align-items-center">
        <h3>Bootcamps</h3>
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
          selectedRowKeys: selected.map((item) => item.id),
        }}
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={data.length === 0 ? Loading4 : false}
      />

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <Form
          {...layout}
          form={form}
          name="bootcamp"
          initialValues={{ jobGuarantee: false }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <Input placeholder="Slug" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item
            name="website"
            label="Website"
            rules={[
              {
                required: true,
                message: "Please input website!",
              },
            ]}
          >
            <AutoComplete
              options={websiteOptions}
              onChange={onWebsiteChange}
              placeholder="website"
            >
              <Input />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item
            name="careers"
            label="Careers"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select careers"
            >
              {CAREERS.map((career, index) => (
                <Select.Option key={index} value={career}>
                  {career}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="user"
            label="User"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <Input placeholder="User" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Not filled" }]}
          >
            <TextArea placeholder="Description..." />
          </Form.Item>
          <Form.Item name="jobGuarantee" label="Job Guarantee">
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Bootcamps;
