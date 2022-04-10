import React, { useState } from "react";
import { Layout as AntLayout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UserSwitchOutlined,
  HeatMapOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { API_URL, Token } from "../const";
import axios from "axios";

const { Header, Sider, Content } = AntLayout;
const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
    console.log(collapsed);
    if (collapsed === false) {
      document.querySelector(".ant-layout.site-layout").style.marginLeft =
        "80px";
    } else {
      document.querySelector(".ant-layout.site-layout").style.marginLeft =
        "200px";
    }
  };

  const Logout=()=>{
    localStorage.removeItem(Token);
    axios.get(API_URL+'logout')
    window.location.href='/'
  }
  return (
    <AntLayout id="components-layout-demo-custom-trigger">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link to="/">
          <div className="logo">
            <HeatMapOutlined className="w-100" />
          </div>
        </Link>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/bootcamps">Bootcamps</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserSwitchOutlined />}>
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
            <Link to="/courses">Courses</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={Logout}>
            Log Out
          </Menu.Item>
        </Menu>
      </Sider>
      <AntLayout className="site-layout">
        <Header
          id="head"
          className="site-layout-background"
          style={{ padding: 0 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
