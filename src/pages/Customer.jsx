import axios from "axios";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { BASE_URL } from "../Constants";
import Sidebar from "../components/Sidebar";

import WelcomeMsg from "../components/WelcomeMsg";

import MaterialTable from "@material-table/core";
import React, { useState } from "react";

import Loader from "../components/Loader";
import StatusRow from "../components/StatusRow";
import UpdateTicketModal from "../components/UpdateTicketModal";
import useAuth from "../hooks/useAuth";
import useTickets from "../hooks/useTickets";

const Customer = () => {
  const [isLoading, ticketList, setTicketList] = useTickets();
  useAuth();

  const [showModal, setShowModal] = useState(false);

  const [ticketDetails, setTicketDetails] = useState({});

  function changeTicketDetails(event) {
    setTicketDetails({
      ...ticketDetails,
      [event.target.name]: event.target.value,
    });
  }

  function handleRowClick(event, rowData) {
    setShowModal(true);
    setTicketDetails(rowData);
  }

  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);

  const [ticketCreationData, setTicketCreationData] = useState({});

  function handleTicketCreateFormChange(event) {
    setTicketCreationData({
      ...ticketCreationData,
      [event.target.name]: event.target.value,
    });
  }

  async function createTicket(event) {
    try {
      event.preventDefault();

      const formData = {
        title: ticketCreationData.title,
        description: ticketCreationData.description,
      };

      await axios.post(BASE_URL + "/crm/api/v1/tickets", formData, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      console.log(ticketDetails);

      setTicketDetails(formData);

      setShowCreateTicketModal(false);
      toast.success("ticket created successfully");
    } catch {
      toast.error("Error occured while Creating a ticket");
    }
  }

  return (
    <>
      <div className="row bg-light vh-100">
        <Sidebar />

        <div className="col my-4">
          <div className="container">
            <div>
              <WelcomeMsg
                name={localStorage.getItem("name")}
                userType={"User"}
              />
              <StatusRow ticketList={ticketList} />

              <hr />

              {isLoading ? (
                <Loader />
              ) : (
                <MaterialTable
                  onRowClick={handleRowClick}
                  title="Ticket Assigned"
                  data={ticketList}
                  columns={[
                    { title: "USER ID", field: "id" },
                    { title: "Title", field: "title" },
                    { title: "Description", field: "description" },
                    { title: "Priority", field: "ticketPriority" },
                    { title: "Status", field: "status" },
                    { title: "Assignee", field: "assignee" },
                    { title: "Reporter", field: "reporter" },
                  ]}
                  actions={[
                    {
                      icon: () => <i class="bi bi-plus-circle-fill"></i>,
                      tooltip: "Add Ticket",
                      isFreeAction: true,
                      onClick: () => setShowCreateTicketModal(true),
                    },
                  ]}
                />
              )}
            </div>

            <Modal
              centered
              show={showCreateTicketModal}
              onHide={() => setShowCreateTicketModal(false)}
              keyboard={false}
              backdrop="static"
            >
              <ModalHeader closeButton>
                <ModalTitle>Create Ticket</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <form>
                  <div className="p-1">
                    <div className="input-group">
                      <input
                        name="title"
                        placeholder="Title"
                        className="form-control"
                        value={ticketCreationData.title}
                        onChange={handleTicketCreateFormChange}
                      />
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="input-group">
                      <textarea
                        name="description"
                        placeholder="Description"
                        className="form-control"
                        value={ticketCreationData.description}
                        onChange={handleTicketCreateFormChange}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="secondary"
                  onClick={() => setShowCreateTicketModal(false)}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={createTicket}>
                  Create
                </Button>
              </ModalFooter>
            </Modal>

            <UpdateTicketModal
              showModal={showModal}
              setShowModal={setShowModal}
              ticketDetails={ticketDetails}
              changeTicketDetails={changeTicketDetails}
              ticketList={ticketList}
              setTicketList={setTicketList}
              statusOptions={["OPEN", "CLOSED"]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
