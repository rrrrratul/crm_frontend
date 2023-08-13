import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatusRow from "../components/StatusRow";
import MaterialTable from "@material-table/core";
import { BASE_URL } from "../Constants";

import axios from "axios";
import Loader from "../components/Loader";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import WelcomeMsg from "../components/WelcomeMsg";
import useTickets from "../hooks/useTickets";
import UpdateTicketModal from "../components/UpdateTicketModal";

const Engineer = () => {
  useAuth();

  const [isLoading, ticketList, setTicketList] = useTickets();
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

  return (
    <>
      <div className="row bg-light">
        <Sidebar />
        <div className="col my-4 ">
          <div className="container">
            <div>
              <WelcomeMsg
                name={localStorage.getItem("name")}
                userType={"Engineer"}
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
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <UpdateTicketModal
        showModal={showModal}
        setShowModal={setShowModal}
        ticketDetails={ticketDetails}
        changeTicketDetails={changeTicketDetails}
        ticketList={ticketList}
        setTicketList={setTicketList}
        statusOption={["OPEN", "CLOSED", "IN_PROGRESS", "BLOCKED"]}
      />
    </>
  );
};

export default Engineer;
