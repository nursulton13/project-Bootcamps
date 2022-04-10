import "./App.css";
import "antd/dist/antd.css";
import Layout from "./comps/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Users, Courses, Login, Bootcamps } from "./pages";
import { Token } from "./const";
function App() {
  const token=localStorage.getItem(Token)
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="bootcamps" /> : <Navigate to="login" />
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="/">
          <Route
            path="/bootcamps"
            element={
              <Layout>
                <Bootcamps />
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <Users />
              </Layout>
            }
          />
          <Route
            path="/courses"
            element={
              <Layout>
                <Courses />
              </Layout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
