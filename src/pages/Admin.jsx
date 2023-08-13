import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MaterialTable from "@material-table/core";
import { BASE_URL } from "../Constants";
import { toast } from "react-toastify";

import axios from "axios";
import Loader from "../components/Loader";
import { Button, Form, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import StatusRow from "../components/StatusRow";
import WelcomeMsg from "../components/WelcomeMsg";

const Admin = () => {
  useAuth();

  const [userList, setUserList] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [userDetail, setUserDetail] = useState({});

  const [ticketList, setTicketList] = useState([]);

  async function fetchTickets() {
    try {
      const { data } = await axios.get(BASE_URL + "/crm/api/v1/tickets/all", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setTicketList(data);
    } catch (ex) {
    } finally {
    }
  }

  useEffect(() => {
    fetchTickets();
    console.log(ticketList);
  }, []);

  async function updateUserDetails(event) {
    event.preventDefault();

    try {
      await axios.put(
        BASE_URL + `/crm/api/v1/users/${userDetail.userId}`,
        userDetail,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );

      setUserList(
        userList.map((user) =>
          user.userId === userDetail.userId ? userDetail : user
        )
      );

      setShowModal(false);
      toast.success("User Detail Updated Successfully");
    } catch (ex) {
      toast.error("Error Ocurred while Updating User Details");
    } finally {
      setShowModal(false);
    }
  }

  function changeUserDetails(event) {
    setUserDetail({
      ...userDetail,
      [event.target.name]: event.target.value,
    });
  }

  function handleRowClick(event, rowData) {
    setShowModal(true);
    setUserDetail({
      name: rowData.name,
      userId: rowData.userId,
      email: rowData.email,
      userStatus: rowData.userStatus,
      userType: rowData.userType,
    });
  }

  async function fetchUsers() {
    try {
      setIsUserLoading(true);
      const { data } = await axios.get(BASE_URL + "/crm/api/v1/users/", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      setUserList(data);
    } catch (ex) {
      toast.error("Error occured while fetching users");
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUsers();
    }
  }, []);

  return (
    <>
      <div className="row bg-light ">
        <Sidebar />
        <div className="col my-4 ">
          <div className="container">
            <div>
              <WelcomeMsg
                name={localStorage.getItem("name")}
                userType={"Admin"}
              />
              <StatusRow ticketList={ticketList} />
              <hr />

              {isUserLoading ? (
                <Loader />
              ) : (
                <MaterialTable
                  onRowClick={handleRowClick}
                  title="USER RECORDS"
                  data={userList}
                  columns={[
                    { title: "USER ID", field: "userId" },
                    { title: "Name", field: "name" },
                    { title: "Email", field: "email" },
                    { title: "Role", field: "userType" },
                    { title: "Status", field: "userStatus" },
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        keyboard={false}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User Details</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <form>
            <h5 className="card-subtitle mb-2 text-primary lead">
              USER ID : {userDetail.userId}
            </h5>
            <hr />
            <div className="input-group mb-3">
              <span className="input-group-text">Name :</span>
              <input
                type="text"
                value={userDetail.name}
                className="form-control"
                name="name"
                onChange={changeUserDetails}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Email :</span>
              <input
                type="email"
                value={userDetail.email}
                className="form-control"
                name="email"
                onChange={changeUserDetails}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">User Type :</span>
              <Form.Select
                aria-label="user-type-selection"
                value={userDetail.userType}
                name="userType"
                onChange={changeUserDetails}
              >
                <option value="CUSTOMER">CUSTOMER</option>
                <option value="ENGINEER">ENGINEER</option>
                <option value="ADMIN">ADMIN</option>
              </Form.Select>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">User Status :</span>
              <Form.Select
                aria-label="user-type-selection"
                value={userDetail.userStatus}
                name="userStatus"
                onChange={changeUserDetails}
              >
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
                <option value="PENDING">PENDING</option>
              </Form.Select>
            </div>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUserDetails}>
            {" "}
            Update{" "}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Admin;
