import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [id, setid] = useState([]);

  //Block User
  const block = async (id) => {
    console.log(id);
    try {
      const res = await axios.post(
        "/api/v1/admin/block-user",
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Active user
  const active = async (id) => {
    console.log(id);
    try {
      const res = await axios.post(
        "/api/v1/admin/active-user",
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // antD table col
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <span>{record.status ? "Active" : "Blocked"}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "status",
      render: (text, record) => (
        <div className="d-flex">
          {record.status ? (
            <>
              <button
                className="btn btn-danger"
                onClick={() => block(record._id)}
              >
                Block
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-primary"
                onClick={() => active(record._id)}
              >
                Active
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center bg-dark text-light">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;
