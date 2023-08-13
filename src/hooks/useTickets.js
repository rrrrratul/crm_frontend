import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../Constants";

export default function useTickets() {
  const [ticketList, setTicketList] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  async function fetchTickets() {
    setIsloading(true);
    try {
      const { data } = await axios.get(BASE_URL + "/crm/api/v1/tickets", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setTicketList(data);
    } catch (ex) {
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) fetchTickets();
  }, [localStorage.getItem("token")]);

  return [isLoading, ticketList, setTicketList];
}
