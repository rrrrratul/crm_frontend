import axios from "axios";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { BASE_URL } from "../Constants";

const UpdateTicketModal = ({
  showModal,
  setShowModal,
  ticketDetails,
  changeTicketDetails,
  ticketList,
  setTicketList,
  statusOptions,
}) => {
  async function updateTicketDetails(event) {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/crm/api/v1/tickets/${ticketDetails.id}`,
        ticketDetails,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      setShowModal(false);
      setTicketList(
        ticketList.map((ticket) =>
          ticketDetails.id === ticket.id ? data : ticket
        )
      );
    } catch (ex) {}
  }
  return (
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
        <form onSubmit={updateTicketDetails}>
          <div className="p-1">
            <h5 className="cars-subtitle mb-2 text-primary lead">
              Ticket Id : {ticketDetails.id}
            </h5>
            <hr />
            <div className="input-group mb-3">
              <span className="input-group-text">Title</span>
              <input
                type="text"
                className="form-control"
                name="title"
                value={ticketDetails.title}
                required
                onChange={changeTicketDetails}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Assignee</span>
              <input
                type="text"
                className="form-control"
                value={ticketDetails.assignee}
                disabled
                name="assignee"
                onChange={changeTicketDetails}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Priority</span>
              <input
                type="text"
                name="ticketPriority"
                className="form-control"
                value={ticketDetails.ticketPriority}
                required
                onChange={changeTicketDetails}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Description</span>
              <textarea
                type="text"
                className="form-control"
                name="description"
                color={3}
                value={ticketDetails.description}
                required
                onChange={changeTicketDetails}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Status</span>
              <select
                name="status"
                required
                onChange={changeTicketDetails}
                className="form-select"
                value={ticketDetails.status}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </ModalBody>

      <ModalFooter>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={updateTicketDetails}>
          {" "}
          Update{" "}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateTicketModal;
